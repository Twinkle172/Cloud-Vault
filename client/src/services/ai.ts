import api from "../api/axios";

export interface AISource {
  fileId: string;
  fileName: string;
}

export interface ChatResponse {
  answer: string;
  sources: AISource[];
}

export const askAI = async (
  question: string
): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>("/ai/chat", {
    question,
  });

  return response.data;
};

export const summarizeFile = async (
  fileId: string
): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>("/ai/summarize", {
    fileId,
  });

  return response.data;
};

export const askFileAI = async (
  fileId: string,
  question: string
): Promise<ChatResponse> => {
  const response = await api.post<ChatResponse>(
    "/ai/chat/file",
    {
      fileId,
      question,
    }
  );

  return response.data;
};