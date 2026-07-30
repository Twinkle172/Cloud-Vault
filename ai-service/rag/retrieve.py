from embeddings.embed import generate_query_embedding
from vectorstore.chroma_store import (
    retrieve,
    retrieve_from_file,
)


# --------------------------------------------------
# SEARCH ACROSS ALL USER DOCUMENTS
# --------------------------------------------------

def search_documents(
    question: str,
    user_id: str,
    top_k: int = 3
):
    query_embedding = generate_query_embedding(question)

    results = retrieve(
        query_embedding=query_embedding,
        user_id=user_id,
        top_k=top_k
    )

    return results


# --------------------------------------------------
# SEARCH ONE SPECIFIC DOCUMENT
# --------------------------------------------------

def search_file(
    question: str,
    user_id: str,
    file_id: str,
    top_k: int = 5
):
    query_embedding = generate_query_embedding(question)

    results = retrieve_from_file(
        query_embedding=query_embedding,
        user_id=user_id,
        file_id=file_id,
        top_k=top_k
    )

    return results