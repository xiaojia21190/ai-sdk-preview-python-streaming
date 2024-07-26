import os
from fastapi import FastAPI
from openai import OpenAI
from pydantic import BaseModel
from .utils.prompt import ClientMessage, convert_to_openai_messages
from typing import List
from dotenv import load_dotenv

load_dotenv()

app = FastAPI()

client = OpenAI(
    api_key=os.environ.get("OPENAI_API_KEY"),
)


class Request(BaseModel):
    messages: List[ClientMessage]


def generate_text(messages):
    completion = client.chat.completions.create(
        stream=False,
        messages=messages,
        model="gpt-4o",
    )

    return completion.choices[0].message.content


@app.post("/api/chat")
def hello_world(request: Request):
    messages = request.messages
    openai_messages = convert_to_openai_messages(messages)
    return generate_text(openai_messages)
