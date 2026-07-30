import mongoose, { Schema, Document } from "mongoose";

export interface IFile extends Document {
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path: string;
  uploadedBy: mongoose.Types.ObjectId;
}

const FileSchema = new Schema(
  {
    filename: {
      type: String,
      required: true,
    },
    originalname: {
      type: String,
      required: true,
    },
    mimetype: {
      type: String,
      required: true,
    },
    size: {
      type: Number,
      required: true,
    },
    path: {
      type: String,
      required: true,
    },
    uploadedBy: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export default mongoose.model<IFile>("File", FileSchema);