import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";
import { convertFiles } from "../controllers/converterController.js";
import multer from "multer";
const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage });

router.post("/", registerUser);
router.post("/auth", authUser);
router.post(
  "/converter",
  authenticate,
  upload.single("existingFile"),
  convertFiles
);
router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);
export default router;
