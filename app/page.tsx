"use client";
import { useState, useEffect } from "react";
import { getNotes } from "@/lib/api";
import { createNote } from "@/lib/api";
import type { Note } from "@/lib/types";
import { deleteNoteApi } from "@/lib/api";
import SearchBar from "@/app/components/SearchBar";
import Sidebar from "@/app/components/Sidebar";
import NoteCard from "@/app/components/NoteCard";

// برای اینکه صفحه رندر بشه
export default function Home() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [notes, setNotes] = useState<Note[]>([])
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editText, setEditText] = useState("");
    const [editingNote, setEditingNote] = useState<number | null>(null);
    const [editContent, setEditContent] = useState("");
    const BASE_URL = "http://127.0.0.1:8000";
    const [editDate, setEditDate] = useState("");
    //استایل کل کارت و  / متن داخلش
    //component/ globals.css
    const cardStyle = `
    p-4
    rounded-2xl
    min-h-[220px]
    flex flex-col justify-between
    shadow-sm
    hover:scale-[1.02]
    transition
    `;
    const contentBox = `
    mt-4
    bg-white/40
    rounded-xl
    p-3
    border border-white/20
    `;
    //بک اند/دیتا میگیره2
    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getNotes();
                setNotes(data);
            } catch (err) {
                console.log("error:", err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    },
        []);
    //اد نوت
    const addNote = async () => {
        const colors = [
            "bg-yellow-200",
            "bg-green-200",
            "bg-pink-200",
            "bg-blue-200",
            "bg-purple-200",
        ];

        const randomColor =
            colors[Math.floor(Math.random() * colors.length)];

        //
        const newNote = {
            // id: Date.now(),
            title: "عنوان",
            content: "متن جدید",
            date: "۱۴۰۵/۰۱/۱۰",
            color: randomColor,
        };
        try {
            const savedNote = await createNote(newNote);

            setNotes((prev) => [savedNote, ...prev]);
        } catch (error) {
            console.log("POST error:", error);
        }
    };
    const editProps = {
        editingNote,
        editText,
        setEditText,
        editContent,
        setEditContent,
        editDate,
        setEditDate,
        setEditingNote,
        setNotes,
    };
    return (
        <main className="min-h-screen bg-gray-100 p-4">

            {/* loading UI */}
            {loading ? (
                <p className="text-black-500">Loading notes...</p>
            ) : (
                <div className="grid gap-3">
                    {notes.map((note) => (
                        <div key={note.id} className="p-3 bg-gray-100 rounded">
                            <h3>{note.title}</h3>
                            <p>{note.content}</p>
                        </div>
                    ))}
                </div>
            )}



            <div className="flex gap-4">
                {/* Sidebar */}
                <Sidebar
                    menuOpen={menuOpen}
                    setMenuOpen={setMenuOpen}
                    addNote={addNote}
                />
                {/* Main */}
                <section className="flex-1 bg-white rounded-2xl p-6">
                    {/* Search bar */}
                    <SearchBar search={search} setSearch={setSearch} />

                    {/* Notes grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {notes
                            .filter((note) =>
                                note.title.includes(search)
                            )
                            //ui تبدیل ب
                            .map((note: Note) => (
                                <NoteCard
                                    key={note.id}
                                    note={note}
                                    cardStyle={cardStyle}
                                    contentBox={contentBox}
                                    {...editProps}
                                />
                            ))}
                    </div>

                </section>

            </div>

        </main>
    );

}
