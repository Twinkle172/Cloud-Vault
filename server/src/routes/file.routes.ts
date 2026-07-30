import express from "express";
import {
  deleteFile,
  downloadFile,
  getFiles,
  uploadFile,
} from "../controllers/file.controller";
import { protect } from "../middleware/auth.middleware";
import upload from "../middlewares/upload";

const router = express.Router();

router.get("/", protect, getFiles);
router.post("/upload", protect, upload.single("file"), uploadFile);
router.get("/download/:id", protect, downloadFile);
router.delete("/:id", protect, deleteFile);

export default router;
