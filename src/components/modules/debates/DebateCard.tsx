"use client";

import { IDebate } from "@/types/debate";
import { useState } from "react";
import DebateDetailsModal from "./DebateDetailsModal";

const DebateCard = ({ debate }: { debate: IDebate }) => {
  const [open, setOpen] = useState(false);
  return (
    <>
      <div
        onClick={() => setOpen(true)}
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between"
      >
        <div>
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-1 truncate">
            {debate.title}
          </h2>

          <p className="text-xs text-indigo-600 dark:text-indigo-400 font-semibold mb-1 uppercase tracking-wide">
            {debate.category}
          </p>

          <p className="text-xs text-gray-600 dark:text-gray-300 mb-2 truncate">
            By <span className="font-medium">{debate.authorName}</span>
          </p>

          <p className="text-xs mb-1 text-gray-800 dark:text-gray-300">
            Status:{" "}
            <span
              className={`font-semibold ${
                debate.status === "Running"
                  ? "text-green-600 dark:text-green-400"
                  : "text-red-600 dark:text-red-400"
              }`}
            >
              {debate.status}
            </span>
          </p>

          <p className="text-xs text-gray-700 dark:text-gray-300 font-medium mb-1">
            Votes: {debate.voteCount}
          </p>
          <p className="text-xs text-gray-700 dark:text-gray-300 font-medium">
            Duration: {debate.duration} hr
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {debate.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-indigo-100 dark:bg-indigo-900 text-indigo-800 dark:text-indigo-300 text-[10px] font-semibold px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
      <DebateDetailsModal open={open} setOpen={setOpen} debate={debate} />
    </>
  );
};

export default DebateCard;
