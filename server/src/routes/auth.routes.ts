import express from "express";
import {
  login,
  register,
  googleLogin,
} from "../controllers/auth.controller";

const router = express.Router();

// Normal email/password registration
router.post("/register", register);

// Normal email/password login
router.post("/login", login);

// Google Sign-In
router.post("/google", googleLogin);

export default router;