import express from "express";
import {
  authUser,
  registerUser,
  getUserProfile,
  updateUserProfile,
} from "../controllers/userController.js";
import authenticate from "../middleware/authMiddleware.js";
import multer from "multer";
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.post("/", upload.single("photo"), registerUser);
router.post("/auth", upload.fields(["email", "password"]), authUser);
router
  .route("/profile")
  .get(authenticate, getUserProfile)
  .put(authenticate, updateUserProfile);
export default router;
