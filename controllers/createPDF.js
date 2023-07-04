import { PageSizes, rgb } from "pdf-lib";

const createPDF = async (file, contentInJSON) => {
  const content = JSON.parse(contentInJSON);
  const page = file.addPage(PageSizes.A4);
  const table = {
    rows: Object.keys(content[0]).length,
    columns: 2,
    startX: 50,
    startY: page.getHeight() - 200,
    rowHeight: 20,
    columnWidth: 150,
    borderWidth: 1,
  };

  content.forEach((obj, objIndex) => {
    const tableStartY = table.startY - objIndex * table.rows * table.rowHeight;

    page.drawRectangle({
      x: table.startX,
      y: tableStartY,
      width: table.columns * table.columnWidth,
      height: table.rows * table.rowHeight,
      borderWidth: table.borderWidth,
      borderColor: rgb(0, 0, 0),
    });

    const propertyRow = Object.keys(obj);
    propertyRow.forEach((property, rowIndex) => {
      const cellX = table.startX;
      const cellY = tableStartY - rowIndex * table.rowHeight;

      page.drawLine({
        start: { x: cellX, y: cellY },
        end: { x: cellX, y: cellY - table.rowHeight },
        thickness: table.borderWidth,
        color: rgb(0, 0, 0),
      });

      page.drawLine({
        start: { x: cellX + table.columnWidth, y: cellY },
        end: { x: cellX + table.columnWidth, y: cellY - table.rowHeight },
        thickness: table.borderWidth,
        color: rgb(0, 0, 0),
      });

      if (rowIndex !== 0) {
        page.drawLine({
          start: { x: cellX, y: cellY - table.rowHeight },
          end: {
            x: cellX + table.columns * table.columnWidth,
            y: cellY - table.rowHeight,
          },
          thickness: table.borderWidth,
          color: rgb(0, 0, 0),
        });
      }

      page.drawText(property, {
        x: cellX + table.borderWidth,
        y: cellY - table.borderWidth,
        size: 12,
        color: rgb(0, 0, 0),
      });

      const value = obj[property];

      page.drawText(value.toString(), {
        x: cellX + table.columnWidth + table.borderWidth,
        y: cellY - table.borderWidth,
        size: 12,
        color: rgb(0, 0, 0),
      });
    });
  });
};

export default createPDF;
