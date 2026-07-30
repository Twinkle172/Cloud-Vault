import chromadb

client = chromadb.PersistentClient(
    path="./vectorstore/chroma_db"
)

collection = client.get_or_create_collection(
    name="cloudvault_documents"
)


# --------------------------------------------------
# STORE / UPDATE DOCUMENT EMBEDDINGS
# --------------------------------------------------

def store_embeddings(
    chunks,
    embeddings,
    source,
    user_id: str,
    file_id: str
):
    ids = [
        f"{file_id}_{i}"
        for i in range(len(chunks))
    ]

    metadata = []

    for i in range(len(chunks)):
        metadata.append({
            "source": source,
            "chunk": i,
            "userId": user_id,
            "fileId": file_id,
        })

    collection.upsert(
        ids=ids,
        documents=chunks,
        embeddings=embeddings,
        metadatas=metadata
    )


# --------------------------------------------------
# RETRIEVE FROM ALL USER DOCUMENTS
# --------------------------------------------------

def retrieve(
    query_embedding,
    user_id: str,
    top_k: int = 3
):
    return collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where={
            "userId": user_id
        }
    )


# --------------------------------------------------
# RETRIEVE FROM ONE SPECIFIC DOCUMENT
# --------------------------------------------------

def retrieve_from_file(
    query_embedding,
    user_id: str,
    file_id: str,
    top_k: int = 3
):
    return collection.query(
        query_embeddings=[query_embedding],
        n_results=top_k,
        where={
            "$and": [
                {
                    "userId": user_id
                },
                {
                    "fileId": file_id
                }
            ]
        }
    )


# --------------------------------------------------
# DELETE DOCUMENT EMBEDDINGS
# --------------------------------------------------

def delete_file_embeddings(
    user_id: str,
    file_id: str
):
    collection.delete(
        where={
            "$and": [
                {
                    "userId": user_id
                },
                {
                    "fileId": file_id
                }
            ]
        }
    )

    print(
        f"Deleted AI embeddings for file {file_id}"
    )

# --------------------------------------------------
# DEBUG DOCUMENTS
# --------------------------------------------------

def debug_documents():
    data = collection.get(
        include=["metadatas", "documents"]
    )

    print("TOTAL CHUNKS:", len(data["ids"]))

    for i in range(min(5, len(data["ids"]))):
        print("----------------")
        print("ID:", data["ids"][i])
        print("METADATA:", data["metadatas"][i])


def delete_file_embeddings(
    user_id: str,
    file_id: str
):
    collection.delete(
        where={
            "$and": [
                {"userId": user_id},
                {"fileId": file_id}
            ]
        }
    )

    print(
        f"🗑️ Deleted AI embeddings for file {file_id}"
    )