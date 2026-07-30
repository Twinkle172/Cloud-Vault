import api from "./axios";

export interface DriveFile {
  id: string;
  name: string;
  mimeType?: string;
  modifiedTime?: string;
  size?: string;
  webViewLink?: string;
  iconLink?: string;
}

// ==================================================
// CONNECT GOOGLE DRIVE
// ==================================================

export const connectGoogleDrive = () => {
  const token = localStorage.getItem("token");

  if (!token) {
    throw new Error("Authentication token missing");
  }

  const apiBaseUrl =
    import.meta.env.VITE_API_URL || "http://localhost:5000/api";

  window.location.href =
    `${apiBaseUrl}/drive/connect?token=${encodeURIComponent(token)}`;
};

// ==================================================
// DRIVE CONNECTION STATUS
// ==================================================

export const getDriveStatus = async () => {
  const response = await api.get("/drive/status");
  return response.data;
};

// ==================================================
// LIST GOOGLE DRIVE FILES
// ==================================================

export const getDriveFiles = async (): Promise<DriveFile[]> => {
  const response = await api.get("/drive/files");

  return response.data.files ?? [];
};

// ==================================================
// IMPORT GOOGLE DRIVE FILE
// ==================================================

export const importDriveFile = async (fileId: string) => {
  const response = await api.post(
    `/drive/import/${encodeURIComponent(fileId)}`
  );

  return response.data;
};