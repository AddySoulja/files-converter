import { PDFDocument, StandardFonts } from "pdf-lib";

const createPDF = async (data) => {
  const pdfDoc = await PDFDocument.create();
  const page = pdfDoc.addPage();
  const { width, height } = page.getSize();

  const font = await pdfDoc.embedFont(StandardFonts.Helvetica);

  let y = height - 50;

  const headers = ["Name", "Education", "ISBN Number", "Address"];

  let x = 50;
  headers.forEach((header, columnIndex) => {
    page.drawText(header, { x, y, font });
    x += 150;
  });

  y -= 20;
  data.forEach((row, rowIndex) => {
    x = 50;
    Object.values(row).forEach((value, columnIndex) => {
      page.drawText(value.toString(), { x, y, font });
      x += 150;
    });
    y -= 20;
  });

  const pdfBytes = await pdfDoc.save();
  return pdfBytes;
};

export default createPDF;
