"use client";

import { useEffect, useState } from "react";
import DebateCard from "./DebateCard";
import { IDebate } from "@/types/debate";
import { DebateCardSkeleton } from "@/components/shared/Loader/DebateCardSkeleton";
import { getAllDebates } from "@/services/debate";

interface DebatesContainerProps {
  searchTerm: string;
  sortBy: "newest" | "mostVoted" | "endingSoon" | "all";
}

const DebatesContainer = ({ searchTerm, sortBy }: DebatesContainerProps) => {
  const [debates, setDebates] = useState<IDebate[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let intervalId: NodeJS.Timeout;

    async function fetchDebates() {
      setLoading(true);
      const sortParam = sortBy === "all" ? "newest" : sortBy;

      const query = new URLSearchParams();
      if (searchTerm) query.append("searchTerm", searchTerm);
      if (sortParam) query.append("sortBy", sortParam);

      try {
        const res = await getAllDebates(query);
        setDebates(res.data);
      } catch (error) {
        console.error("Failed to fetch debates", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDebates();

    intervalId = setInterval(fetchDebates, 60000);

    return () => clearInterval(intervalId);
  }, [searchTerm, sortBy]);

  if (!loading && debates?.length === 0) {
    return (
      <div className="h-20 flex items-center justify-center">
        <p>No Debates Found!</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
      {loading
        ? [1, 2, 3].map((n) => <DebateCardSkeleton key={n} />)
        : debates?.map((debate) => (
            <DebateCard debate={debate} key={debate.id} />
          ))}
    </div>
  );
};

export default DebatesContainer;
