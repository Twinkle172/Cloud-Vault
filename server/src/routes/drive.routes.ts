import express from "express";

import { DriveController } from "../controllers/drive.controller";

import { protect } from "../middleware/auth.middleware";


const router = express.Router();


// ==================================================
// GOOGLE OAUTH
// ==================================================

router.get(
  "/connect",
  DriveController.connect
);


router.get(
  "/callback",
  DriveController.callback
);


// ==================================================
// PROTECTED DRIVE OPERATIONS
// ==================================================

router.get(
  "/status",
  protect,
  DriveController.status
);


router.get(
  "/files",
  protect,
  DriveController.listFiles
);


router.post(
  "/import/:fileId",
  protect,
  DriveController.importFile
);


export default router;