import asyncHandler from "express-async-handler";
import { PDFDocument } from "pdf-lib";
import createPDF from "./createPDF.js";

const convertFiles = asyncHandler(async (req, res) => {
  const { buffer } = req.file;
  const { content } = req.body;

  const pdfDoc = await PDFDocument.load(buffer);
  await createPDF(pdfDoc, content);
  const modifiedPdf = await pdfDoc.save();

  return res.status(200).json({ ok: true, file: [...modifiedPdf] });
});

export { convertFiles };
