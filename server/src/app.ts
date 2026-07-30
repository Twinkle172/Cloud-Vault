import path from "path";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import authRoutes from "./routes/auth.routes";
import fileRoutes from "./routes/file.routes";
import aiRoutes from "./routes/aiRoutes";
import driveRoutes from "./routes/drive.routes";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_URL || "http://localhost:5173",
    credentials: true,
  })
);
app.use(express.json());
app.use("/uploads", express.static(path.join(__dirname, "../uploads")));
app.get("/api/health", (_req, res) => {
  res.status(200).json({
    success: true,
    message: "CloudVault API is running",
  });
});

app.use("/api/auth", authRoutes);
app.use("/api/files", fileRoutes);
app.use("/api/ai", aiRoutes);
app.use("/api/drive", driveRoutes);

export default app;
