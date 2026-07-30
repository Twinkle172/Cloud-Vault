from loaders.document_loader import extract_document_text
from rag.chunker import chunk_text
from embeddings.embed import generate_embeddings
from vectorstore.chroma_store import store_embeddings


def ingest_document(
    pdf_path: str,
    source: str,
    user_id: str,
    file_id: str
):
    print(f"📄 Starting AI ingestion: {source}")

    # Extract text from PDF / DOCX / TXT
    text = extract_document_text(pdf_path)

    print(
        f"✓ Extracted {len(text)} characters"
    )

    # Split document into chunks
    chunks = chunk_text(text)

    if not chunks:
        raise ValueError(
            "Document produced no text chunks"
        )

    print(
        f"✓ Created {len(chunks)} chunks"
    )

    # Generate vector embeddings
    embeddings = generate_embeddings(chunks)

    if len(embeddings) != len(chunks):
        raise ValueError(
            "Embedding count does not match chunk count"
        )

    print(
        f"✓ Generated {len(embeddings)} embeddings"
    )

    # Store in ChromaDB
    store_embeddings(
        chunks=chunks,
        embeddings=embeddings,
        source=source,
        user_id=user_id,
        file_id=file_id
    )

    print(
        f"✅ Indexed {source} into CloudVault AI"
    )

    return len(chunks)