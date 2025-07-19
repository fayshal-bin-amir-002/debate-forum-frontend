"use client";

import { useState, useEffect } from "react";

interface FilterSectionProps {
  searchTerm: string;
  setSearchTerm: (val: string) => void;
  sortBy: "newest" | "mostVoted" | "endingSoon" | "all";
  setSortBy: (val: "newest" | "mostVoted" | "endingSoon" | "all") => void;
}

const FilterSection = ({
  searchTerm,
  setSearchTerm,
  sortBy,
  setSortBy,
}: FilterSectionProps) => {
  const [inputValue, setInputValue] = useState(searchTerm);

  useEffect(() => {
    const handler = setTimeout(() => {
      setSearchTerm(inputValue);
    }, 500);

    return () => clearTimeout(handler);
  }, [inputValue, setSearchTerm]);

  return (
    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6 gap-4">
      <input
        type="text"
        placeholder="Search debates by title, tag, or category..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:max-w-md"
      />

      <select
        value={sortBy}
        onChange={(e) => setSortBy(e.target.value as any)}
        className="border border-gray-300 rounded px-4 py-2 w-full md:max-w-xs"
      >
        <option value="all">All (default newest)</option>
        <option value="newest">Newest</option>
        <option value="mostVoted">Most Voted</option>
        <option value="endingSoon">Ending Soon</option>
      </select>
    </div>
  );
};

export default FilterSection;
