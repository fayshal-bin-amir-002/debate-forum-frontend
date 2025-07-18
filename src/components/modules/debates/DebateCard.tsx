import { IDebate } from "@/types/debate";
import Link from "next/link";

const DebateCard = ({ debate }: { debate: IDebate }) => {
  return (
    <Link href={`/debates/${debate?.id}`}>
      <div className="bg-white border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-lg transition-shadow duration-300 cursor-pointer flex flex-col justify-between">
        <div>
          <h2 className="text-lg font-semibold text-gray-900 mb-1 truncate">
            {debate.title}
          </h2>

          <p className="text-xs text-indigo-600 font-semibold mb-1 uppercase tracking-wide">
            {debate.category}
          </p>

          <p className="text-xs text-gray-600 mb-2 truncate">
            By <span className="font-medium">{debate.authorName}</span>
          </p>

          <p className="text-xs mb-1">
            Status:{" "}
            <span
              className={`font-semibold ${
                debate.status === "Running" ? "text-green-600" : "text-red-600"
              }`}
            >
              {debate.status}
            </span>
          </p>

          <p className="text-xs text-gray-700 font-medium mb-1">
            Votes: {debate.voteCount}
          </p>
          <p className="text-xs text-gray-700 font-medium">
            Duration: {debate.duration} hr
          </p>
        </div>

        <div className="flex flex-wrap gap-2 mt-4">
          {debate.tags.map((tag: string) => (
            <span
              key={tag}
              className="bg-indigo-100 text-indigo-800 text-[10px] font-semibold px-2 py-0.5 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
};

export default DebateCard;
