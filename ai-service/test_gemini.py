from rag.generate import generate_answer

response = generate_answer(
    "Explain what Retrieval-Augmented Generation (RAG) is in 3 lines."
)

print(response)