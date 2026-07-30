import { Response } from "express";
import fs from "fs";
import path from "path";
import File from "../models/File";
import type { AuthRequest } from "../middleware/auth.middleware";
import { AIService } from "../services/ai.service";

const resolveUploadPath = (filePath: string) => {
  return path.isAbsolute(filePath)
    ? filePath
    : path.join(process.cwd(), filePath);
};

export const uploadFile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({ message: "Not authorized" });
      return;
    }

    if (!req.file) {
      res.status(400).json({ message: "No file uploaded" });
      return;
    }

    // Save file metadata to MongoDB
    const file = await File.create({
      filename: req.file.filename,
      originalname: req.file.originalname,
      mimetype: req.file.mimetype,
      size: req.file.size,
      path: req.file.path,
      uploadedBy: req.userId,
    });

    // Supported document types for AI indexing
    const supportedTypes = [
      "application/pdf",
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      "text/plain",
    ];

    // Automatically index supported files
    if (supportedTypes.includes(file.mimetype)) {
      try {
        await AIService.ingest(
          file.path,
          file.originalname,
          req.userId,
          file._id.toString()
        );

        console.log(`✅ Indexed ${file.originalname} successfully`);
      } catch (err) {
        console.error("❌ AI indexing failed:", err);

        // Don't fail upload if AI service is unavailable
      }
    }

    res.status(201).json(file);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const getFiles = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const files = await File.find({
      uploadedBy: req.userId,
    }).sort({
      createdAt: -1,
    });

    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const downloadFile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    const file = await File.findOne({
      _id: req.params.id,
      uploadedBy: req.userId,
    });

    if (!file) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }

    const filePath = resolveUploadPath(file.path);

    if (!fs.existsSync(filePath)) {
      res.status(404).json({
        message: "Physical file not found",
      });
      return;
    }

    res.download(filePath, file.originalname);
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

export const deleteFile = async (
  req: AuthRequest,
  res: Response
): Promise<void> => {
  try {
    if (!req.userId) {
      res.status(401).json({
        message: "Not authorized",
      });
      return;
    }

    const file = await File.findOne({
      _id: req.params.id,
      uploadedBy: req.userId,
    });

    if (!file) {
      res.status(404).json({
        message: "File not found",
      });
      return;
    }

    const filePath = resolveUploadPath(file.path);

    // ---------------------------------------------
    // Remove document from RAG vector database
    // ---------------------------------------------

    try {
      await AIService.deleteFile(
        req.userId,
        file._id.toString()
      );

      console.log(
        `🗑️ Removed ${file.originalname} from AI index`
      );
    } catch (error) {
      console.error(
        "AI vector cleanup failed:",
        error
      );

      // Don't prevent normal file deletion
      // if AI service is temporarily unavailable.
    }

    // ---------------------------------------------
    // Remove physical file
    // ---------------------------------------------

    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    // ---------------------------------------------
    // Remove MongoDB record
    // ---------------------------------------------

    await File.findByIdAndDelete(file._id);

    res.status(200).json({
      message: "File deleted successfully",
    });
  } catch (error) {
    console.error(
      "Delete file error:",
      error
    );

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};