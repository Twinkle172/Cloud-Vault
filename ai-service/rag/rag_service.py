from rag.retrieve import (
    search_documents,
    search_file,
)

from rag.prompt import build_prompt
from rag.generate import generate_answer


def _get_documents(results):
    documents = results.get("documents")

    if not documents or not documents[0]:
        return []

    return documents[0]


def _get_sources(results):
    metadatas = results.get("metadatas")

    if not metadatas or not metadatas[0]:
        return []

    sources = []
    seen = set()

    for metadata in metadatas[0]:
        file_id = metadata.get("fileId")
        source = metadata.get("source")

        # Avoid showing the same file repeatedly
        key = (file_id, source)

        if key in seen:
            continue

        seen.add(key)

        sources.append({
            "fileId": file_id,
            "fileName": source,
        })

    return sources


# --------------------------------------------------
# ASK ACROSS ALL USER DOCUMENTS
# --------------------------------------------------

def ask_question(
    question: str,
    user_id: str
):
    results = search_documents(
        question=question,
        user_id=user_id,
        top_k=5
    )

    documents = _get_documents(results)

    if not documents:
        return {
            "answer": (
                "I couldn't find relevant information "
                "in your CloudVault documents."
            ),
            "sources": []
        }

    prompt = build_prompt(
        question,
        documents
    )

    answer = generate_answer(prompt)

    return {
        "answer": answer,
        "sources": _get_sources(results)
    }


# --------------------------------------------------
# ASK ONE SPECIFIC FILE
# --------------------------------------------------

def ask_file(
    question: str,
    user_id: str,
    file_id: str
):
    results = search_file(
        question=question,
        user_id=user_id,
        file_id=file_id,
        top_k=5
    )

    documents = _get_documents(results)

    if not documents:
        return {
            "answer": (
                "I couldn't find information "
                "in this document."
            ),
            "sources": []
        }

    prompt = build_prompt(
        question,
        documents
    )

    answer = generate_answer(prompt)

    return {
        "answer": answer,
        "sources": _get_sources(results)
    }


# --------------------------------------------------
# SUMMARIZE ONE FILE
# --------------------------------------------------

def summarize_file(
    user_id: str,
    file_id: str
):
    summary_request = (
        "Summarize this document clearly. "
        "Explain its main purpose, important points, "
        "key facts, and conclusions. "
        "Use concise bullet points where useful."
    )

    return ask_file(
        question=summary_request,
        user_id=user_id,
        file_id=file_id
    )