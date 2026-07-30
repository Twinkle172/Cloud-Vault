def build_prompt(question, documents):
    context = "\n\n".join(documents)

    prompt = f"""
You are an AI assistant.

Answer ONLY using the information below.

Context:
{context}

Question:
{question}

Answer:
"""

    return prompt