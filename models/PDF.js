import mongoose from "mongoose";

const pdfSchema = mongoose.Schema(
  {
    id: { type: String, required: true },
    fieldname: { type: String },
    originalname: { type: String },
    encoding: { type: String },
    mimetype: { type: String },
    buffer: { type: Buffer },
  },
  { collection: "PDF" },
  {
    timestamps: true,
  }
);

const PDF = mongoose.model("PDF", pdfSchema);

export default PDF;
