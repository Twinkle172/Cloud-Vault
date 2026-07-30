import express from "express";
import { AIController } from "../controllers/ai.controller";
import { protect } from "../middleware/auth.middleware";

const router = express.Router();

// AI service health check
router.get("/health", AIController.health);

// Ask questions across ALL documents of logged-in user
router.post(
  "/chat",
  protect,
  AIController.chat
);

// Ask questions about ONE specific file
router.post(
  "/chat/file",
  protect,
  AIController.chatFile
);

// Summarize ONE specific file
router.post(
  "/summarize",
  protect,
  AIController.summarize
);

export default router;