from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ساخت قالب نوت
class Note(BaseModel):
    title: str
    content: str
    date: str
    color: str
# لیست برای ذخیره نوت ها
notes = []


@app.get("/")
def home():
    return {
        "message": "API is running"
    }


@app.get("/notes")
def get_notes():
    return notes


@app.post("/notes")
def create_note(note: Note):

    new_note = {
        "id": len(notes) + 1,
        "title": note.title,
        "content": note.content,
        "date": note.date,
        "color": note.color,
    }

    notes.append(new_note)

    return new_note


@app.delete("/notes/{note_id}")
def delete_note(note_id: int):

    global notes

    notes = [n for n in notes if n["id"] != note_id]

    return {"message": "deleted"}


@app.put("/notes/{note_id}")
def update_note(note_id: int, updated: Note):

    for i in range(len(notes)):

        if notes[i]["id"] == note_id:

            notes[i] = {
                "id": note_id,
                "title": updated.title,
                "content": updated.content,
               "date": updated.date,
                "color": updated.color,
            }

            return notes[i]

    return {"error": "Note not found"}
