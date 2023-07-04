import { PageSizes, rgb } from "pdf-lib";

const createPDF = async (pdfDoc, pageContent) => {
  const content = JSON.parse(pageContent);
  const page = pdfDoc.addPage(PageSizes.A4);
  const fontSize = 12;
  const padding = 8;
  const startX = 50;
  const startY = page.getHeight() - 50;
  let count = 1;
  const height = padding * 5 * count;

  content.forEach((object, idx) => {
    // Set up table parameters
    const table = {
      rows: 4,
      columns: 2,
      startX: startX + height,
      startY: startY - idx * (fontSize + padding) * 4 + height,
      rowHeight: fontSize + padding,
      columnWidth: (page.getWidth() - startX * 2) / 2,
      borderWidth: 1,
    };

    // Draw table borders
    // page.drawRectangle({
    //   x: table.startX,
    //   y: table.startY - table.rowHeight,
    //   width: table.columns * table.columnWidth,
    //   height: table.rows * table.rowHeight,
    //   borderWidth: table.borderWidth,
    //   borderColor: rgb(0, 0, 0),
    // });

    // Draw table header
    // page.drawText(`Details of Autor - ${object.name}`, {
    //   x: table.startX + table.borderWidth,
    //   y: table.startY + height,
    //   size: fontSize,
    //   color: rgb(0, 0, 0),
    // });

    // Draw table content
    const propertyLabels = ["Name", "Education", "ISBN Number", "ADDRESS"];
    const properties = ["name", "education", "isbnNumber", "address"];

    propertyLabels.forEach((label, rowIndex) => {
      const cellX = table.startX;
      const cellY = table.startY - (rowIndex + 3) * table.rowHeight; // Add 2 to account for header and label row

      page.drawText(label, {
        x: cellX + table.borderWidth + padding,
        y: cellY - table.borderWidth - padding,
        size: fontSize,
        color: rgb(0, 0, 0),
      });

      const value = object[properties[rowIndex]];

      page.drawText(value.toString(), {
        x: cellX + table.columnWidth + table.borderWidth + padding,
        y: cellY - table.borderWidth - padding,
        size: fontSize,
        color: rgb(0, 0, 0),
      });
    });
    count++;
  });

  // Save the modified PDF
  const modifiedPdfBytes = await pdfDoc.save();
  return modifiedPdfBytes;
};

export default createPDF;
