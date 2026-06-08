export default function Sidebar({ menuOpen, setMenuOpen, addNote }: any) {
    {/* Sidebar */ }
    return (
        <aside className="w-22 md:w-30 bg-zinc-900 rounded-2xl p-3 flex flex-col items-center gap-4  h-[95vh]">
            <div className="text-white text-sm font-bold mb-4">
                Notebook
            </div>
            {/* دکمه + */}
            <button
                onClick={(e) => {
                    e.stopPropagation();
                    setMenuOpen((prev: any) => !prev);
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
    );
}
