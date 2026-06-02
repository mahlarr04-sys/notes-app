"use client";
import { useState, useEffect } from "react";
import { Search } from "lucide-react";
import { getNotes } from "@/lib/api";
import { createNote } from "@/lib/api";
import type { Note } from "@/lib/types";
import { deleteNoteApi } from "@/lib/api";

// برای اینکه صفحه رندر بشه
export default function Home() {
    //منو اول بسته ست
    const [menuOpen, setMenuOpen] = useState(false)
    //نوت ها رو از بک اند میگیره/ همه نوت ها اینجا ذخیره میشن
    const [notes, setNotes] = useState<Note[]>([])
    //اول صفحه در حال لود
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [editText, setEditText] = useState("");
    const [editingNote, setEditingNote] = useState<number | null>(null);
    //ادیت متن اصلی
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
    //ui اپدیت میشه
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
                <aside className="w-22 md:w-30 bg-zinc-900 rounded-2xl p-3 flex flex-col items-center gap-4  h-[95vh]">
                    <div className="text-white text-sm font-bold mb-4">
                        Notebook
                    </div>
                    {/* دکمه + */}
                    <button
                        onClick={(e) => {
                            e.stopPropagation();
                            setMenuOpen((prev) => !prev);
                        }} className="relative  w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center"
                    >
                        +
                    </button>

                    {menuOpen && (
                        <div className="mt-6 flex flex-col gap-4 text-white ">
                            {/* Notes */}
                            <button
                                onClick={addNote}
                                className="
                                flex items-center gap-2
                                hover:text-green-400
                                transition
                                cursor-pointer
                            "
                            >
                                {/* //دایره وضعیت */}
                                <span className="w-3 h-3 bg-green-400 rounded-full"></span>
                                <span className="text-sm">
                                    نوت جدید
                                </span>

                            </button>

                            {/* Archive */}
                            <div className="flex items-center gap-2 justify-between hover:text-yellow-400 cursor-pointer">
                                <span className="w-3 h-3 bg-yellow-400 rounded-full"></span>
                                <span>نوت آرشیو</span>

                            </div>

                        </div>
                    )}
                </aside>



                {/* Main */}
                <section className="flex-1 bg-white rounded-2xl p-6">
                    {/* Search bar */}
                    <div className="mb-6">
                        <div className="flex items-center gap-2 bg-zinc-300/70 px-3 py-2 rounded-xl border border-transparent  transition">

                            {/* Icon */}
                            <Search className="w-4 h-4 text-whit/100" />

                            {/* Input */}
                            <input
                                value={search}
                                //اپدیت state
                                onChange={(e) => setSearch(e.target.value)}
                                className="w-full bg-transparent outline-none text-black placeholder-white/100"
                                placeholder="جستجو..."
                            />
                        </div>
                    </div>

                    {/* Notes grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                        {notes
                            .filter((note) =>
                                note.title.includes(search)
                            )
                            //ui تبدیل ب
                            .map((note: Note) => (<div
                                key={note.id}
                                className={`${cardStyle} ${note.color}`}
                            >
                                {/* Top */}
                                <div className="flex items-start justify-between">

                                    {editingNote === note.id ? (
                                        <input
                                            value={editText}
                                            onChange={(e) => setEditText(e.target.value)}
                                            className="
                                            w-full
                                            bg-white/20
                                            text-zinc-800
                                            outline-none
                                            focus:outline-none
                                            focus:ring-0
                                            text-sm
                                            font-semibold
                                            rounded-lg
                                            px-2
                                            py-1
                                            border border-white/20
"                              />
                                    ) : (
                                        <h3 className="font-semibold text-zinc-800 text-sm">
                                            {note.title}
                                        </h3>
                                    )}
                                    {/* منو نوت */}
                                    <div className="relative group">
                                        <button className="text-zinc-500 hover:text-black transition">
                                            •••
                                        </button>

                                        {/* Menu */}
                                        <div className="
                                        absolute left-0 top-full pt-2
                                        hidden group-hover:flex
                                        flex-col
                                        bg-white
                                        shadow-md
                                        rounded-xl
                                        overflow-hidden
                                        text-sm
                                        min-w-[120px]
                                        z-50
                                        ">
                                            <button
                                                onClick={() => {
                                                    setEditingNote(note.id);
                                                    setEditText(note.title);
                                                    setEditContent(note.content);
                                                    setEditDate(note.date);

                                                }}
                                                className="px-4 py-2 hover:bg-blue-100 text-blue-500 text-right"
                                            >
                                                ویرایش
                                            </button>

                                            <button className="px-4 py-2 hover:bg-yellow-100 text-yellow-600 text-right">
                                                آرشیو
                                            </button>

                                            <button
                                                onClick={async () => {
                                                    await deleteNoteApi(note.id);
                                                    // ui اینجا اپیدت میشه
                                                    setNotes((prev) =>
                                                        prev.filter((n) => n.id !== note.id)
                                                    );
                                                }} className="px-4 py-2 hover:bg-red-100 text-red-500 text-right"
                                            >
                                                حذف
                                            </button>
                                        </div>

                                    </div>

                                </div>

                                {/* Content */}
                                <div className={contentBox}>

                                    {editingNote === note.id ? (
                                        <textarea
                                            value={editContent}
                                            onChange={(e) => setEditContent(e.target.value)}
                                            className="
                                            w-full
                                            bg-transparent
                                            text-zinc-800
                                            outline-none
                                            focus:outline-none
                                            focus:ring-0
                                            text-sm
                                            leading-7
                                            resize-none
                                            "
                                        />

                                    ) : (

                                        <p className="text-zinc-700 text-sm leading-7 text-right">
                                            {note.content}
                                        </p>

                                    )}

                                </div>

                                {/* Footer */}
                                {editingNote === note.id ? (

                                    <input
                                        value={editDate}
                                        onChange={(e) => setEditDate(e.target.value)}
                                        className="
                                        text-xs
                                        bg-white/20
                                        rounded-lg
                                        px-2
                                        py-1
                                        border border-white/20                                        text-zinc-700
                                        outline-none
                                        focus:outline-none
                                        focus:ring-0
                                        "                                    />

                                ) : (

                                    <div className="mt-6 text-xs text-zinc-500">
                                        {note.date}
                                    </div>

                                )}
                                {/* دکمه ذخیره */}
                                {editingNote === note.id && (
                                    <button
                                        onClick={async () => {
                                            await fetch(`${BASE_URL}/notes/${note.id}`, {
                                                method: "PUT",
                                                headers: {
                                                    "Content-Type": "application/json",
                                                },
                                                body: JSON.stringify({
                                                    title: editText,
                                                    content: editContent,
                                                    date: editDate,
                                                    color: note.color,
                                                }),
                                            });
                                            setNotes((prev) =>
                                                prev.map((n) =>
                                                    n.id === note.id
                                                        ? {
                                                            ...n, title: editText,
                                                            content: editContent,
                                                            date: editDate,
                                                        }
                                                        : n
                                                )
                                            );

                                            setEditingNote(null);
                                        }}
                                        className="text-black text-xs mt-2"
                                    >
                                        ذخیره
                                    </button>
                                )}

                            </div>

                            ))}
                    </div>



                </section>

            </div>

        </main>
    );

}
