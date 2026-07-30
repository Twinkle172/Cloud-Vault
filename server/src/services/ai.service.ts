import axios from "axios";
import path from "path";

const AI_BASE_URL =
  process.env.AI_SERVICE_URL || "http://127.0.0.1:8000";

export class AIService {
  // Ask across ALL documents belonging to the user
  static async chat(
    question: string,
    userId: string
  ) {
    const response = await axios.post(
      `${AI_BASE_URL}/chat`,
      {
        question,
        userId,
      }
    );

    return response.data;
  }

  // Ask ONE specific document
  static async chatFile(
    question: string,
    userId: string,
    fileId: string
  ) {
    const response = await axios.post(
      `${AI_BASE_URL}/chat/file`,
      {
        question,
        userId,
        fileId,
      }
    );

    return response.data;
  }

  // Summarize ONE specific document
  static async summarize(
    userId: string,
    fileId: string
  ) {
    const response = await axios.post(
      `${AI_BASE_URL}/summarize`,
      {
        userId,
        fileId,
      }
    );

    return response.data;
  }

  // Automatically index uploaded document
  static async ingest(
    filePath: string,
    source: string,
    userId: string,
    fileId: string
  ) {
    const absolutePath = path.resolve(filePath);

    console.log("Sending file to AI service:", absolutePath);

    const response = await axios.post(
      `${AI_BASE_URL}/ingest`,
      {
        filePath: absolutePath,
        source,
        userId,
        fileId,
      }
    );

    return response.data;
  }

  static async health() {
    const response = await axios.get(
      `${AI_BASE_URL}/health`
    );

    return response.data;
  }

  static async deleteFile(
  userId: string,
  fileId: string
) {
  const response = await axios.post(
    `${AI_BASE_URL}/delete`,
    {
      userId,
      fileId,
    }
  );

  return response.data;
}
}

