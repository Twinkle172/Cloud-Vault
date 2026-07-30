from fastapi import FastAPI
from pydantic import BaseModel
from vectorstore.chroma_store import debug_documents
from vectorstore.chroma_store import delete_file_embeddings

from rag.ingest import ingest_document
from rag.rag_service import (
    ask_question,
    ask_file,
    summarize_file,
)

app = FastAPI(
    title="CloudVault AI",
    version="2.0.0"
)


# ==================================================
# REQUEST MODELS
# ==================================================

class IngestRequest(BaseModel):
    filePath: str
    source: str
    userId: str
    fileId: str


class ChatRequest(BaseModel):
    question: str
    userId: str


class FileChatRequest(BaseModel):
    question: str
    userId: str
    fileId: str


class SummarizeRequest(BaseModel):
    userId: str
    fileId: str

class DeleteFileRequest(BaseModel):
    userId: str
    fileId: str

# ==================================================
# HEALTH CHECK
# ==================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "CloudVault AI"
    }


# ==================================================
# DOCUMENT INGESTION
# ==================================================

@app.post("/ingest")
def ingest(data: IngestRequest):

    chunks = ingest_document(
        pdf_path=data.filePath,
        source=data.source,
        user_id=data.userId,
        file_id=data.fileId,
    )

    return {
        "message": "Document Indexed Successfully",
        "chunks": chunks,
        "fileId": data.fileId
    }


# ==================================================
# ASK ALL USER DOCUMENTS
# ==================================================

@app.post("/chat")
def chat(data: ChatRequest):

    return ask_question(
        question=data.question,
        user_id=data.userId
    )


# ==================================================
# ASK ONE SPECIFIC FILE
# ==================================================

@app.post("/chat/file")
def chat_file(data: FileChatRequest):

    return ask_file(
        question=data.question,
        user_id=data.userId,
        file_id=data.fileId
    )


# ==================================================
# SUMMARIZE ONE FILE
# ==================================================

@app.post("/summarize")
def summarize(data: SummarizeRequest):

    return summarize_file(
        user_id=data.userId,
        file_id=data.fileId
    )

# ==================================================
# DEBUG
# ==================================================

@app.get("/debug/chroma")
def debug_chroma():
    debug_documents()

    return {
        "message": "Check AI service terminal"
    }

# ==================================================
# DELETE DOCUMENT FROM VECTOR DATABASE
# ==================================================

@app.post("/delete")
def delete_document(data: DeleteFileRequest):

    delete_file_embeddings(
        user_id=data.userId,
        file_id=data.fileId
    )

    return {
        "message": "Document embeddings deleted successfully",
        "fileId": data.fileId
    }