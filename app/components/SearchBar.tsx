import { Search } from "lucide-react";

export default function SearchBar({ search, setSearch }: any) {
  return (
    <div className="mb-6">
      <div className="flex items-center gap-2 bg-zinc-300/70 px-3 py-2 rounded-xl border border-transparent transition">

        <Search className="w-4 h-4 text-black" />

        <input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full bg-transparent outline-none text-black placeholder-white/100"
          placeholder="جستجو..."
        />
      </div>
    </div>
  );
}
