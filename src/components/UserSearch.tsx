// components/UserSearch.tsx
"use client";

import { useState, useRef, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

type User = { id: string; username: string; name?: string; image?: string };

export default function UserSearch() {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const debounceRef = useRef<number | undefined>(undefined);

  // close dropdown on outside click
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(e.target as Node)
      ) {
        setSuggestions([]);
      }
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  // fetch dropdown suggestions
  const fetchSuggestions = async (q: string) => {
    if (q.trim().length < 3) {
      setSuggestions([]);
      return;
    }
    setLoading(true);
    try {
      const res = await fetch(
        `/api/users/search?q=${encodeURIComponent(q)}&limit=5`
      );
      const { users }: { users: User[] } = await res.json();
      setSuggestions(users);
    } catch {
      setSuggestions([]);
    } finally {
      setLoading(false);
    }
  };

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value;
    setQuery(v);
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => fetchSuggestions(v), 200);
  };

  const onSelect = (u: User) => {
    router.push(`/profile/${u.username}`);
  };

  const onSearch = () => {
    if (query.trim().length < 3) return;
    router.push(`/explore?query=${encodeURIComponent(query.trim())}`);
  };

  return (
    <div ref={containerRef} className="relative w-full mb-5">
      <div className="flex gap-x-2">
        <Input
          className="flex-1"
          value={query}
          placeholder={loading ? "Searching…" : "Search users (min 3 chars)…"}
          onChange={onChange}
          onKeyDown={(e) => e.key === "Enter" && onSearch()}
        />
        <Button disabled={query.trim().length < 3} onClick={onSearch}>
          {loading ? "…" : <Search className="h-4 w-4" />}
        </Button>
      </div>

      {suggestions.length > 0 && (
        <ul className="absolute z-20 mt-1 w-full bg-white dark:bg-gray-800 border rounded-md shadow-lg max-h-60 overflow-y-auto">
          {suggestions.map((u) => (
            <li
              key={u.id}
              className="flex items-center p-2 hover:bg-gray-100 dark:hover:bg-gray-700 cursor-pointer"
              onClick={() => onSelect(u)}
            >
              {u.image && (
                <img
                  src={u.image}
                  alt={u.username}
                  className="h-6 w-6 rounded-full mr-2 object-cover"
                />
              )}
              <div>
                <p className="text-sm font-medium">{u.name ?? u.username}</p>
                <p className="text-xs text-gray-500">@{u.username}</p>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
