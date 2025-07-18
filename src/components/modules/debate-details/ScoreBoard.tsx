import React from "react";
import { DebateDetailsClosed } from "@/types/debate";

interface ScoreBoardProps {
  data: DebateDetailsClosed;
}

const ScoreBoard: React.FC<ScoreBoardProps> = ({ data }) => {
  const { winnerSide, scoreBoard } = data;

  return (
    <div className="p-6 max-w-3xl mx-auto border rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-center">
        Debate Closed — Winner:{" "}
        <span
          className={`capitalize font-extrabold ${
            winnerSide === "Support" && "text-green-600"
          } ${winnerSide === "Oppose" && "text-red-600"} ${
            winnerSide === "Draw" && "text-amber-600"
          }`}
        >
          {winnerSide ?? "N/A"}
        </span>
      </h2>

      <div className="overflow-x-auto">
        <table className="w-full border-collapse border border-gray-300 dark:border-gray-600">
          <thead>
            <tr className="bg-gray-100 dark:bg-gray-800">
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                Name
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-left text-gray-800 dark:text-gray-200">
                Email
              </th>
              <th className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-gray-800 dark:text-gray-200">
                Votes
              </th>
            </tr>
          </thead>
          <tbody>
            {scoreBoard.map(({ name, email, totalVotes }, i) => (
              <tr
                key={i}
                className="odd:bg-white even:bg-gray-50 hover:bg-gray-100 transition-colors dark:odd:bg-gray-900 dark:even:bg-gray-800 dark:hover:bg-gray-700"
              >
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {name}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-gray-900 dark:text-gray-100">
                  {email}
                </td>
                <td className="border border-gray-300 dark:border-gray-600 px-4 py-2 text-center text-gray-900 dark:text-gray-100">
                  {totalVotes}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ScoreBoard;
