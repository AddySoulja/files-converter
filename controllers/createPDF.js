import { PageSizes, rgb } from "pdf-lib";

const createPDF = async (pdfDoc, pageContent) => {
  const page = pdfDoc.addPage(PageSizes.A4);
  const content = JSON.parse(pageContent);
  const fontSize = 14;
  const startX = 100;
  let startY = page.getHeight() - 100;
  const cellHeight = 25;
  const cellWidth = 150;
  let marginBottom = 25;

  for (let i = 0; i < content.length; i++) {
    const author = content[i];
    const keys = Object.keys(author);

    page.drawText(`Details of Author ${author["name"]}`, {
      x: startX,
      y: startY + cellHeight,
      size: 16,
    });
    for (let j = 0; j < keys.length; j++) {
      const key = keys[j];

      page.drawText(key, {
        x: startX,
        y: startY - cellHeight * j,
        size: fontSize,
      });

      page.drawText(author[key], {
        x: startX + cellWidth,
        y: startY - cellHeight * j,
        size: fontSize,
      });
    }

    startY -= cellHeight * keys.length + marginBottom;
  }

  const modifiedPdfBytes = await pdfDoc.save();
  return modifiedPdfBytes;
};

export default createPDF;
