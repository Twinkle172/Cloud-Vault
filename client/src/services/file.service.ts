import api from "../api/axios";
import type { CloudFile } from "../types/file";

export const fileService = {
  getFiles: async () => {
    const response = await api.get<CloudFile[]>("/files");
    return response.data;
  },

  uploadFile: async (file: File) => {
    const formData = new FormData();
    formData.append("file", file);

    const response = await api.post<CloudFile>("/files/upload", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    return response.data;
  },

  deleteFile: async (id: string) => {
    await api.delete(`/files/${id}`);
  },
};
