export type FileCategory = "Documents" | "Images" | "Videos";

export interface CloudFile {
  _id: string;
  filename: string;
  originalname: string;
  mimetype: string;
  size: number;
  path?: string;
  uploadedBy?: string;
  createdAt: string;
  updatedAt?: string;
}

export interface FolderSummary {
  title: string;
  files: number;
  size: string;
  updated: string;
}
