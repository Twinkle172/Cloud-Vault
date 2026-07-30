import { Request, Response } from "express";
import jwt from "jsonwebtoken";
import fs from "fs";
import path from "path";
import crypto from "crypto";

import User from "../models/User";
import File from "../models/File";
import type { AuthRequest } from "../middleware/auth.middleware";
import { AIService } from "../services/ai.service";

import {
  createAuthorizedDriveClient,
  exchangeGoogleCode,
  getGoogleDriveAuthUrl,
} from "../services/drive/googleDrive.service";

interface DriveStatePayload {
  id: string;
}

export class DriveController {
  // ==================================================
  // CONNECT GOOGLE DRIVE
  // ==================================================

  static async connect(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const tokenParam = req.query.token;

      const token =
        typeof tokenParam === "string"
          ? tokenParam
          : undefined;

      if (!token) {
        res.status(401).json({
          message: "Authentication token missing",
        });
        return;
      }

      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("JWT_SECRET is missing");
      }

      jwt.verify(token, jwtSecret);

      const authUrl = getGoogleDriveAuthUrl(token);

      res.redirect(authUrl);
    } catch (error) {
      console.error("Google Drive connect error:", error);

      res.status(401).json({
        message: "Unable to connect Google Drive",
      });
    }
  }

  // callback continues here...
  // ==================================================
  // GOOGLE OAUTH CALLBACK
  // ==================================================

  static async callback(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const codeParam = req.query.code;
      const stateParam = req.query.state;

      const code =
        typeof codeParam === "string"
          ? codeParam
          : undefined;

      const state =
        typeof stateParam === "string"
          ? stateParam
          : undefined;

      if (!code || !state) {
        res.status(400).json({
          message: "Invalid Google OAuth callback",
        });
        return;
      }

      const jwtSecret = process.env.JWT_SECRET;

      if (!jwtSecret) {
        throw new Error("JWT_SECRET is missing");
      }

      const decoded = jwt.verify(
        state,
        jwtSecret
      ) as DriveStatePayload;

      if (!decoded.id) {
        res.status(401).json({
          message: "Invalid authentication state",
        });
        return;
      }

      const userId = decoded.id;

      const tokens = await exchangeGoogleCode(code);

      // Refresh token has select:false in User model,
      // so explicitly request it here.
      const user = await User.findById(userId).select(
        "+googleDriveRefreshToken"
      );

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      // Google may not return a new refresh token
      // on every authorization.
      if (tokens.refresh_token) {
        user.googleDriveRefreshToken =
          tokens.refresh_token;
      }

      if (!user.googleDriveRefreshToken) {
        res.status(400).json({
          message:
            "Google did not return a refresh token. Please reconnect Google Drive.",
        });
        return;
      }

      user.googleDriveConnected = true;

      await user.save();

      console.log(
        `Google Drive connected for user ${user._id}`
      );

      const clientUrl =
        process.env.CLIENT_URL ||
        "http://localhost:5173";

      res.redirect(
  `${clientUrl}/drive?connected=true`
);
    } catch (error) {
      console.error(
        "Google Drive callback error:",
        error
      );

      res.status(500).json({
        message:
          "Google Drive authorization failed",
      });
    }
  }

  // ==================================================
  // GOOGLE DRIVE CONNECTION STATUS
  // ==================================================

  static async status(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({
          message: "Not authorized",
        });
        return;
      }

      const user = await User.findById(req.userId);

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      res.status(200).json({
        connected: Boolean(
          user.googleDriveConnected
        ),
      });
    } catch (error) {
      console.error(
        "Drive status error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to check Google Drive status",
      });
    }
  }

  // ==================================================
  // LIST GOOGLE DRIVE FILES
  // ==================================================

  static async listFiles(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({
          message: "Not authorized",
        });
        return;
      }

      const user = await User.findById(
        req.userId
      ).select("+googleDriveRefreshToken");

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      if (
        !user.googleDriveConnected ||
        !user.googleDriveRefreshToken
      ) {
        res.status(400).json({
          message: "Google Drive is not connected",
        });
        return;
      }

      const drive = createAuthorizedDriveClient(
        user.googleDriveRefreshToken
      );

      const response = await drive.files.list({
        pageSize: 50,
        q: "trashed = false",
        orderBy: "modifiedTime desc",
        fields:
          "files(id,name,mimeType,size,modifiedTime,iconLink,webViewLink)",
      });

      res.status(200).json({
        files: response.data.files ?? [],
      });
    } catch (error) {
      console.error(
        "Google Drive list error:",
        error
      );

      res.status(500).json({
        message:
          "Failed to fetch Google Drive files",
      });
    }
  }

  // ==================================================
  // IMPORT FILE FROM GOOGLE DRIVE
  // ==================================================

  static async importFile(
    req: AuthRequest,
    res: Response
  ): Promise<void> {
    let localFilePath: string | null = null;
    let fileSavedToDatabase = false;

    try {
      if (!req.userId) {
        res.status(401).json({
          message: "Not authorized",
        });
        return;
      }

      // Express typings may expose params as
      // string | string[], so normalize it.
      const fileIdParam = req.params.fileId;

      const googleFileId: string | undefined =
        Array.isArray(fileIdParam)
          ? fileIdParam[0]
          : fileIdParam;

      if (!googleFileId) {
        res.status(400).json({
          message:
            "Google Drive file ID is required",
        });
        return;
      }

      // ------------------------------------------------
      // GET USER + REFRESH TOKEN
      // ------------------------------------------------

      const user = await User.findById(
        req.userId
      ).select("+googleDriveRefreshToken");

      if (!user) {
        res.status(404).json({
          message: "User not found",
        });
        return;
      }

      if (
        !user.googleDriveConnected ||
        !user.googleDriveRefreshToken
      ) {
        res.status(400).json({
          message:
            "Connect Google Drive before importing files",
        });
        return;
      }

      const drive = createAuthorizedDriveClient(
        user.googleDriveRefreshToken
      );

      // ------------------------------------------------
      // GET GOOGLE DRIVE FILE METADATA
      // ------------------------------------------------

      const metadataResponse =
        await drive.files.get({
          fileId: googleFileId,
          fields: "id,name,mimeType,size",
        });

      const driveFile = metadataResponse.data;

      const originalName =
        driveFile.name ||
        `drive-file-${googleFileId}`;

      const mimeType =
        driveFile.mimeType ||
        "application/octet-stream";

      // ------------------------------------------------
      // GOOGLE DOCS / SHEETS / SLIDES
      // ------------------------------------------------

      // Google-native files cannot be downloaded with
      // alt=media. They need files.export().
      if (
        mimeType.startsWith(
          "application/vnd.google-apps."
        )
      ) {
        res.status(400).json({
          message:
            "Google Docs, Sheets, and Slides require export support. Please choose a regular PDF, DOCX, TXT, image, video, or other uploaded file for now.",
        });
        return;
      }

      // ------------------------------------------------
      // CREATE UPLOAD DIRECTORY
      // ------------------------------------------------

      const uploadDirectory = path.join(
        process.cwd(),
        "uploads"
      );

      if (!fs.existsSync(uploadDirectory)) {
        fs.mkdirSync(uploadDirectory, {
          recursive: true,
        });
      }

      // ------------------------------------------------
      // CREATE UNIQUE LOCAL FILE NAME
      // ------------------------------------------------

      const extension =
        path.extname(originalName);

      const uniqueName =
        `${Date.now()}-${crypto.randomUUID()}${extension}`;

      localFilePath = path.join(
        uploadDirectory,
        uniqueName
      );

      // ------------------------------------------------
      // DOWNLOAD FILE FROM GOOGLE DRIVE
      // ------------------------------------------------

      const downloadResponse =
        await drive.files.get(
          {
            fileId: googleFileId,
            alt: "media",
          },
          {
            responseType: "stream",
          }
        );

      const downloadStream =
        downloadResponse.data;

      await new Promise<void>(
        (resolve, reject) => {
          const writer =
            fs.createWriteStream(
              localFilePath as string
            );

          downloadStream.on(
            "error",
            reject
          );

          writer.on(
            "error",
            reject
          );

          writer.on(
            "finish",
            resolve
          );

          downloadStream.pipe(writer);
        }
      );

      // ------------------------------------------------
      // GET ACTUAL FILE SIZE
      // ------------------------------------------------

      const stats =
        fs.statSync(localFilePath);

      // ------------------------------------------------
      // SAVE FILE IN MONGODB
      // ------------------------------------------------

      const file = await File.create({
        filename: uniqueName,
        originalname: originalName,
        mimetype: mimeType,
        size: stats.size,
        path: localFilePath,
        uploadedBy: req.userId,
      });

      fileSavedToDatabase = true;

      console.log(
        `Imported Google Drive file: ${originalName}`
      );

      // ------------------------------------------------
      // RAG INDEXING
      // ------------------------------------------------

      const supportedAITypes = [
        "application/pdf",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
        "text/plain",
      ];

      if (
        supportedAITypes.includes(mimeType)
      ) {
        try {
          await AIService.ingest(
            localFilePath,
            originalName,
            req.userId,
            file._id.toString()
          );

          console.log(
            `Indexed Drive file: ${originalName}`
          );
        } catch (aiError) {
          // The file remains imported even when the
          // AI service is temporarily unavailable.
          console.error(
            "Drive file AI indexing failed:",
            aiError
          );
        }
      }

      // ------------------------------------------------
      // SUCCESS
      // ------------------------------------------------

      res.status(201).json({
        success: true,
        message:
          "File imported from Google Drive successfully",
        file,
      });
    } catch (error) {
      console.error(
        "Google Drive import error:",
        error
      );

      // Only remove the physical file when MongoDB
      // creation has NOT succeeded.
      if (
        localFilePath &&
        !fileSavedToDatabase &&
        fs.existsSync(localFilePath)
      ) {
        try {
          fs.unlinkSync(localFilePath);
        } catch (cleanupError) {
          console.error(
            "Failed to clean partial Drive file:",
            cleanupError
          );
        }
      }

      res.status(500).json({
        message:
          "Failed to import Google Drive file",
      });
    }
  }
}