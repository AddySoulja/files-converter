import { PDFDocument } from "pdf-lib";
import createPDF from "./newPdfPage.js";

const pdfController = async (file) => {
  const { buffer } = file;

  const pdfDoc = await PDFDocument.load(buffer);
  console.log("pdf: ", pdfDoc);

  // const newContentStream = createPDF(newContent);
  // page.setContents(newContentStream);

  const modifiedPdf = await pdfDoc.save();
  console.log("modded: ", modifiedPdf);

  return modifiedPdf;
};

export default pdfController;
