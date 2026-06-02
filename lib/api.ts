// React (UI)
//    ↓
// api.ts (این فایل)
//    ↓
// FastAPI (server)

import type { CreateNote } from "./types";
const BASE_URL = "http://127.0.0.1:8000";

//گرفتن نوت
export const getNotes = async () => {
    const res = await fetch(`${BASE_URL}/notes`);
    return res.json();
};
//ساخت نوت جدید
export const createNote = async (note: CreateNote) => {
    const res = await fetch(`${BASE_URL}/notes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return res.json();
};

//حذف نوت
export const deleteNoteApi = async (id: number) => {
    await fetch(`${BASE_URL}/notes/${id}`, {
        method: "DELETE",
    });
};

//ویرایش نوت
export const updateNoteApi = async (id: number, note: CreateNote) => {
    const res = await fetch(`${BASE_URL}/notes/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(note),
    });
    return res.json();
};
