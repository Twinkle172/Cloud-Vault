import os
from docx import Document

from loaders.pdf_loader import extract_pdf_text


def extract_document_text(file_path: str) -> str:

    extension = os.path.splitext(file_path)[1].lower()

    # PDF
    if extension == ".pdf":
        text = extract_pdf_text(file_path)

    # TXT
    elif extension == ".txt":
        with open(file_path, "r", encoding="utf-8", errors="ignore") as file:
            text = file.read()

    # DOCX
    elif extension == ".docx":
        document = Document(file_path)

        paragraphs = [
            paragraph.text
            for paragraph in document.paragraphs
            if paragraph.text.strip()
        ]

        text = "\n".join(paragraphs)

    else:
        raise ValueError(
            f"Unsupported document type: {extension}"
        )

    if not text or not text.strip():
        raise ValueError(
            "No readable text found in document"
        )

    return text.strip()