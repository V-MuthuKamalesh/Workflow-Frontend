"use client";

import { useState } from "react";
import { Search } from "lucide-react";

export default function SearchBar() {
  const [query, setQuery] = useState("");
  const [isFocused, setIsFocused] = useState(false);

  const data = [
    "Project A",
    "Task 1: Design homepage",
    "Team Member: John Doe",
    "Project B",
    "Task 2: Develop API",
    "Team Member: Jane Smith",
  ];

  const filteredData = query
    ? data.filter((item) => item.toLowerCase().includes(query.toLowerCase()))
    : [];

  return (
    <div className="relative mx-auto mt-5 max-w-4xl">
      <div className="relative">
        <input
          type="text"
          placeholder="Search projects, tasks, or team members..."
          className="w-full border border-gray-300 rounded-full py-3 px-5 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setTimeout(() => setIsFocused(false), 150)}
        />
        <Search className="absolute top-3 right-4 text-gray-500" size={24} />
      </div>

      {isFocused && query && (
        <div className="absolute w-full bg-white border border-gray-300 rounded-lg mt-2 shadow-lg z-10">
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
              <div
                key={index}
                className="px-4 py-2 hover:bg-blue-100 cursor-pointer transition"
                onMouseDown={() => alert(`You selected: ${item}`)}
              >
                {item}
              </div>
            ))
          ) : (
            <div className="px-4 py-2 text-gray-500">No results found</div>
          )}
        </div>
      )}
    </div>
  );
}
