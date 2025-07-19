"use client";

import { useState, useEffect } from "react";
import { LeaderboardCardSkeleton } from "@/components/shared/Loader/LeaderboardCardSkeleton";
import { getLeaderBoard } from "@/services/debate";
import { toast } from "sonner";
import { LeaderboardUser } from "@/types/debate";
import LeaderBoardUserCard from "./LeaderBoardUserCard";

const LeaderBoardManagement = () => {
  const [filter, setFilter] = useState<"weekly" | "monthly" | "all-time">(
    "all-time"
  );
  const [users, setUsers] = useState<LeaderboardUser[]>([]);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const res = await getLeaderBoard(filter);
        if (res?.success) {
          setUsers(res?.data);
        } else {
          toast.error(res?.message || "Something went wrong");
        }
      } catch (err: any) {
        toast.error(err?.message || "Failed to fetch leaderboard");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [filter]);

  return (
    <div className="bg-background text-foreground">
      <h1 className="text-3xl font-bold mb-8 text-center">🏆 Leaderboard</h1>

      <div className="max-w-2xl mx-auto flex justify-start items-center gap-3 mb-6">
        <label htmlFor="filter" className="block mb-1 font-medium">
          Filter by:
        </label>
        <select
          id="filter"
          value={filter}
          onChange={(e) => setFilter(e.target.value as any)}
          className="w-[200px] rounded-md border border-gray-300 bg-white px-3 py-2 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:bg-gray-800 dark:border-gray-600 dark:text-white"
        >
          <option value="all-time">All-Time</option>
          <option value="weekly">Weekly</option>
          <option value="monthly">Monthly</option>
        </select>
      </div>

      <div className="grid grid-cols-1 gap-6 max-w-2xl mx-auto">
        {loading ? (
          Array.from({ length: 3 }).map((_, i) => (
            <LeaderboardCardSkeleton key={i} />
          ))
        ) : users.length === 0 ? (
          <p className="text-center text-muted-foreground">
            No data available.
          </p>
        ) : (
          users.map((user) => (
            <LeaderBoardUserCard user={user} key={user?.email} />
          ))
        )}
      </div>
    </div>
  );
};

export default LeaderBoardManagement;
