import asyncHandler from "express-async-handler";
import pdfController from "./pdfController.js";
import PDF from "../models/PDF.js";

const convertFiles = asyncHandler(async () => {
  const { id, newContent } = req.body;
  const file = req.file.buffer;
  console.log(req.body);
  console.log(req.file);
  const modifiedPdf = await pdfController(file, newContent);
  const pdf = await PDF.create({ id, data: modifiedPdf });
  res.status(200).json({ pdf });
});

export { convertFiles };
