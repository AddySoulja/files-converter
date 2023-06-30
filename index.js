import dotEnv from "dotenv";
import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import passport from "passport";
import multer from "multer";
// import path, { dirname } from "path";
// import { fileURLToPath } from "url";
import { errorHandler, notFoundHandler } from "./middleware/errorMiddleware.js";
import { configPass } from "./configs/passport.js";
import userRoutes from "./routes/userRoutes.js";
import connectDb from "./configs/db.js";
dotEnv.config();

const app = express();
app.use(cors());
const upload = multer();
const pass = configPass(passport);
const port = process.env.PORT || 5000;
connectDb();

app.use(upload.single("photo"));
app.use(express.json());
app.use(cookieParser());
app.use(pass.initialize());

app.use("/api/users", userRoutes);

// const __filename = fileURLToPath(import.meta.url);
// const __dirname = dirname(__filename);
// app.use(express.static(path.join(__dirname, "sellmycar/build")));
// app.get("*", (req, res) => {
//   res.sendFile(path.join(__dirname, "sellmycar/build", "index.html"));
// });

app.use(errorHandler);
app.use(notFoundHandler);
app.listen(port, () => console.log(`Server started...: ${port}`));

export default app;
