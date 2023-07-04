import express from "express";
import authenticate from "../middleware/authMiddleware.js";
import multer from "multer";
import { convertFiles } from "../controllers/converterController.js";
const router = express.Router();

const upload = multer({ storage: multer.memoryStorage() });

router.route("/").post(authenticate, upload.single("file"), convertFiles);
export default router;
