import api from "../api/axios";

export interface GoogleDriveFile {
  id: string;
  name: string;
  mimeType: string;
  size?: string;
  modifiedTime?: string;
  iconLink?: string;
  webViewLink?: string;
}

export interface DriveStatusResponse {
  connected: boolean;
}

export interface DriveFilesResponse {
  files: GoogleDriveFile[];
}

export const getDriveStatus = async (): Promise<boolean> => {
  const response =
    await api.get<DriveStatusResponse>("/drive/status");

  return response.data.connected;
};

export const getDriveFiles = async (): Promise<GoogleDriveFile[]> => {
  const response =
    await api.get<DriveFilesResponse>("/drive/files");

  return response.data.files;
};

export const importDriveFile = async (fileId: string) => {
  const response =
    await api.post(`/drive/import/${encodeURIComponent(fileId)}`);

  return response.data;
};