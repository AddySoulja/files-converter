import fs from "fs";
import { PDFDocument, StandardFonts } from "pdf-lib";
import createPDF from "./newPdfPage.js";

const pdfController = async (existingPath, newContent) => {
  const existingPDFBytes = await fs.readFile(existingPath);
  const pdfDoc = await PDFDocument.load(existingPDFBytes);

  const newContentStream = createPDF(newContent);
  page.setContents(newContentStream);

  // Save the modified PDF to a buffer
  const modifiedPDFBytes = await pdfDoc.save();

  // Return the modified PDF buffer
  return modifiedPDFBytes;
};

export default pdfController;
