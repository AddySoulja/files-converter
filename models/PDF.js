import mongoose from "mongoose";

const pdfSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    data: { type: Buffer, required: true },
  },
  { collection: "PDF" },
  {
    timestamps: true,
  }
);

const PDF = mongoose.model("PDF", pdfSchema);

export default PDF;
