import { deleteNoteApi } from "@/lib/api";
import type { Note } from "@/lib/types";
type Props = {
    note: Note;
    cardStyle: string;
    contentBox: string;
    editingNote: number | null;
    editText: string;
    setEditText: (value: string) => void;
    editContent: string;
    setEditContent: (value: string) => void;
    editDate: string;
    setEditDate: (value: string) => void;
    setEditingNote: (value: number | null) => void;
    setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
};
const BASE_URL = "http://127.0.0.1:8000";
export default function NoteCard({
    note,
    cardStyle,
    contentBox,
    editingNote,
    editText,
    setEditText,
    editContent,
    setEditContent,
    editDate,
    setEditDate,
    setEditingNote,
    setNotes,
}: Props) {
    return (
        <div
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
    );
}
