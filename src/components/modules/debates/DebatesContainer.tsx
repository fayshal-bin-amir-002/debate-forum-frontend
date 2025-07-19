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
    async function fetchDebates() {
      setLoading(true);
      const sortParam = sortBy === "all" ? "newest" : sortBy;

      try {
        const res = await getAllDebates({ searchTerm, sortParam });
        setDebates(res.data);
      } catch (error) {
        console.error("Failed to fetch debates", error);
      } finally {
        setLoading(false);
      }
    }

    fetchDebates();

    const intervalId = setInterval(fetchDebates, 60000);

    return () => clearInterval(intervalId);
  }, [searchTerm, sortBy]);

  if (debates?.length > 0) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
        {debates?.map((debate) => (
          <DebateCard debate={debate} key={debate.id} />
        ))}
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pt-6">
      {!loading && debates?.length === 0 ? (
        <div className="h-20 flex items-center justify-center">
          <p>No Debates Found!</p>
        </div>
      ) : (
        [1, 2, 3].map((n) => <DebateCardSkeleton key={n} />)
      )}
    </div>
  );
};

export default DebatesContainer;
