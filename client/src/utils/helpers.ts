import type { FileCategory } from "../types/file";

export const getFileCategory = (mimetype: string): FileCategory => {
  if (mimetype.startsWith("image/")) return "Images";
  if (mimetype.startsWith("video/")) return "Videos";
  return "Documents";
};

export const formatFileSize = (bytes: number) => {
  if (bytes >= 1024 * 1024 * 1024) {
    return `${(bytes / 1024 / 1024 / 1024).toFixed(2)} GB`;
  }

  if (bytes >= 1024 * 1024) {
    return `${(bytes / 1024 / 1024).toFixed(2)} MB`;
  }

  return `${(bytes / 1024).toFixed(2)} KB`;
};

export const formatDate = (value: string) =>
  new Intl.DateTimeFormat("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(value));
