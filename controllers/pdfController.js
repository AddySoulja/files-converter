import { PDFDocument } from "pdf-lib";
import createPDF from "./newPdfPage.js";

const pdfController = async (file, content) => {
  const { buffer } = file;
  const pdfDoc = await PDFDocument.load(buffer);
  await createPDF(pdfDoc, content);
  return await pdfDoc.save();
};

export default pdfController;
