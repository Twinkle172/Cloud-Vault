from embeddings.embed import generate_query_embedding
from vectorstore.chroma_store import retrieve

def search_documents(question: str):
    query_embedding = generate_query_embedding(question)
    results = retrieve(query_embedding, top_k=3)
    return results