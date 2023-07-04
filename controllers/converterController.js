import asyncHandler from "express-async-handler";
import pdfController from "./pdfController.js";
import PDF from "../models/PDF.js";

const convertFiles = asyncHandler(async (req, res) => {
  const { file } = req;
  const { content } = req.body;
  const modifiedPdf = await pdfController(file, content);
  return res.status(200).json({ ok: true, file: [...modifiedPdf] });
  // console.log(modifiedPdf);
  // const pdf = await PDF.create({ id, data: modifiedPdf });
  // res.status(200).json({ pdf: modifiedPdf });
});

export { convertFiles };
