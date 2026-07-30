import { Response } from "express";
import { AIService } from "../services/ai.service";
import type { AuthRequest } from "../middleware/auth.middleware";

export class AIController {
  // ==================================================
  // ASK ACROSS ALL USER DOCUMENTS
  // ==================================================

  static async chat(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({
          message: "Not authorized",
        });
        return;
      }

      const { question } = req.body;

      if (!question || !question.trim()) {
        res.status(400).json({
          message: "Question is required",
        });
        return;
      }

      const data = await AIService.chat(
        question.trim(),
        req.userId
      );

      res.status(200).json(data);
    } catch (error) {
      console.error("AI Chat Error:", error);

      res.status(500).json({
        message: "AI Chat Failed",
      });
    }
  }

  // ==================================================
  // ASK ONE SPECIFIC FILE
  // ==================================================

  static async chatFile(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({
          message: "Not authorized",
        });
        return;
      }

      const { question, fileId } = req.body;

      if (!question || !question.trim()) {
        res.status(400).json({
          message: "Question is required",
        });
        return;
      }

      if (!fileId) {
        res.status(400).json({
          message: "File ID is required",
        });
        return;
      }

      const data = await AIService.chatFile(
        question.trim(),
        req.userId,
        fileId
      );

      res.status(200).json(data);
    } catch (error) {
      console.error("AI File Chat Error:", error);

      res.status(500).json({
        message: "AI File Chat Failed",
      });
    }
  }

  // ==================================================
  // SUMMARIZE ONE FILE
  // ==================================================

  static async summarize(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({
          message: "Not authorized",
        });
        return;
      }

      const { fileId } = req.body;

      if (!fileId) {
        res.status(400).json({
          message: "File ID is required",
        });
        return;
      }

      const data = await AIService.summarize(
        req.userId,
        fileId
      );

      res.status(200).json(data);
    } catch (error) {
      console.error("AI Summary Error:", error);

      res.status(500).json({
        message: "AI Summary Failed",
      });
    }
  }

  // ==================================================
  // MANUAL INGEST
  // ==================================================

  static async ingest(req: AuthRequest, res: Response): Promise<void> {
    try {
      if (!req.userId) {
        res.status(401).json({
          message: "Not authorized",
        });
        return;
      }

      const { filePath, source, fileId } = req.body;

      if (!filePath || !source || !fileId) {
        res.status(400).json({
          message: "filePath, source and fileId are required",
        });
        return;
      }

      const data = await AIService.ingest(
        filePath,
        source,
        req.userId,
        fileId
      );

      res.status(200).json(data);
    } catch (error) {
      console.error("AI Index Error:", error);

      res.status(500).json({
        message: "Index Failed",
      });
    }
  }

  // ==================================================
  // AI HEALTH
  // ==================================================

  static async health(req: AuthRequest, res: Response): Promise<void> {
    try {
      const data = await AIService.health();

      res.status(200).json(data);
    } catch (error) {
      console.error("AI Health Error:", error);

      res.status(503).json({
        message: "AI Service Unavailable",
      });
    }
  }
}