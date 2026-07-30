import os
import time
from dotenv import load_dotenv
from google import genai
from google.genai import errors

load_dotenv()

GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if not GEMINI_API_KEY:
    raise ValueError("GEMINI_API_KEY is missing from .env")

client = genai.Client(
    api_key=GEMINI_API_KEY
)

MODEL = "gemini-3.6-flash"

def generate_answer(prompt: str):
    max_retries = 3

    for attempt in range(max_retries):
        try:
            print(
                f"🤖 Gemini generation attempt "
                f"{attempt + 1}/{max_retries}"
            )

            response = client.models.generate_content(
                model=MODEL,
                contents=prompt,
            )

            if not response.text:
                return (
                    "I found relevant information in your documents, "
                    "but I couldn't generate an answer."
                )

            return response.text

        except errors.ServerError as error:

            print(f"⚠️ Gemini server error: {error}")

            # Retry only if more attempts remain
            if attempt < max_retries - 1:
                wait_time = 2 ** (attempt + 1)

                print(
                    f"⏳ Retrying in {wait_time} seconds..."
                )

                time.sleep(wait_time)

            else:
                print("❌ Gemini unavailable after retries.")

                return (
                    "CloudVault found relevant information in your "
                    "documents, but the AI model is temporarily busy. "
                    "Please try again shortly."
                )

        except Exception as error:
            print(f"❌ Gemini generation error: {error}")

            return (
                "CloudVault found relevant information in your "
                "documents, but the AI couldn't generate a response."
            )