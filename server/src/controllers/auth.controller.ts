import { Request, Response } from "express";
import bcrypt from "bcryptjs";
import { OAuth2Client } from "google-auth-library";

import User from "../models/User";
import { generateToken } from "../utils/jwt";

const googleClient = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

/* =====================================================
   REGISTER WITH EMAIL + PASSWORD
===================================================== */

export const register = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      res.status(400).json({
        message: "Name, email, and password are required",
      });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    const exists = await User.findOne({
      email: normalizedEmail,
    });

    if (exists) {
      res.status(400).json({
        message: "User already exists",
      });
      return;
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      name,
      email: normalizedEmail,
      password: hashedPassword,
      authProvider: "local",
    });

    res.status(201).json({
      token: generateToken(user._id.toString()),
      user,
    });
  } catch (error) {
    console.error("Register error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/* =====================================================
   LOGIN WITH EMAIL + PASSWORD
===================================================== */

export const login = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      res.status(400).json({
        message: "Email and password are required",
      });
      return;
    }

    const normalizedEmail = email.toLowerCase().trim();

    const user = await User.findOne({
      email: normalizedEmail,
    });

    if (!user) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    // Google-only accounts don't have a local password
    if (!user.password) {
      res.status(401).json({
        message: "This account uses Google Sign-In",
      });
      return;
    }

    const match = await bcrypt.compare(
      password,
      user.password
    );

    if (!match) {
      res.status(401).json({
        message: "Invalid email or password",
      });
      return;
    }

    res.status(200).json({
      token: generateToken(user._id.toString()),
      user,
    });
  } catch (error) {
    console.error("Login error:", error);

    res.status(500).json({
      message: "Internal Server Error",
    });
  }
};

/* =====================================================
   LOGIN / REGISTER WITH GOOGLE
===================================================== */

export const googleLogin = async (
  req: Request,
  res: Response
): Promise<void> => {
  try {
    const { credential } = req.body;

    // Google should send an ID token to our backend
    if (!credential) {
      res.status(400).json({
        message: "Google credential is required",
      });
      return;
    }

    if (!process.env.GOOGLE_CLIENT_ID) {
      console.error("GOOGLE_CLIENT_ID is missing");

      res.status(500).json({
        message: "Google Sign-In is not configured",
      });
      return;
    }

    // Verify that the credential actually came from Google
    const ticket = await googleClient.verifyIdToken({
      idToken: credential,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();

    if (!payload?.email || !payload.sub) {
      res.status(401).json({
        message: "Invalid Google account",
      });
      return;
    }

    if (payload.email_verified === false) {
      res.status(401).json({
        message: "Google email is not verified",
      });
      return;
    }

    const email = payload.email.toLowerCase().trim();

    // Check whether this email already exists in CloudVault
    let user = await User.findOne({
      email,
    });

    if (!user) {
      // First Google login -> create CloudVault account
      user = await User.create({
        name: payload.name || email.split("@")[0],
        email,
        googleId: payload.sub,
        avatar: payload.picture || "",
        authProvider: "google",
      });
    } else {
      // Existing CloudVault account -> connect Google account
      if (user.googleId && user.googleId !== payload.sub) {
        res.status(409).json({
          message: "This email is linked to another Google account",
        });
        return;
      }

      if (!user.googleId) {
        user.googleId = payload.sub;
      }

      if (!user.avatar && payload.picture) {
        user.avatar = payload.picture;
      }

      await user.save();
    }

    // Give Google users the SAME CloudVault JWT as normal users
    res.status(200).json({
      token: generateToken(user._id.toString()),
      user,
    });
  } catch (error) {
    console.error("Google login error:", error);

    res.status(401).json({
      message: "Google Sign-In failed",
    });
  }
};