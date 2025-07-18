"use client";

import { useEffect, useState } from "react";
import { getDebateDetails } from "@/services/debate";
import { IUserProps } from "@/types/user";
import SpinLoader from "@/components/shared/Loader/SpinLoader";
import {
  DebateDetails,
  DebateDetailsRunning,
  DebateDetailsClosed,
} from "@/types/debate";
import ArgumentContainer from "./ArgumentContainer";
import ScoreBoard from "./ScoreBoard";

interface DebateManagementProps {
  id: string;
  session: IUserProps | null;
}

const DebateManagement = ({ id, session }: DebateManagementProps) => {
  // Initial state is null, better than empty object for type safety
  const [debateData, setDebateData] = useState<DebateDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const ONE_MINUTE = 60 * 1000;
    let isMounted = true;

    const fetchDebate = async () => {
      try {
        setLoading(true);
        const res = await getDebateDetails(id, session?.user?.email as string);
        if (isMounted) setDebateData(res?.data ?? null);
      } catch (error) {
        console.error("Failed to fetch debate details:", error);
        if (isMounted) setDebateData(null);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchDebate();

    const intervalId = setInterval(fetchDebate, ONE_MINUTE);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [id, session?.user?.email]);

  if (loading) return <SpinLoader />;

  if (!debateData)
    return (
      <div className="p-4 text-center text-red-600">
        <p>No debate data found.</p>
      </div>
    );

  if (debateData.debateStatus === "running") {
    // Type narrowing for running debate data
    const runningData = debateData as DebateDetailsRunning;
    return (
      <div>
        <ArgumentContainer data={runningData} />
      </div>
    );
  }

  if (debateData.debateStatus === "closed") {
    // Type narrowing for closed debate data
    const closedData = debateData as DebateDetailsClosed;
    return (
      <div>
        <ScoreBoard data={closedData} />
      </div>
    );
  }

  return (
    <div className="p-4 text-center">
      <p>Unknown debate status.</p>
    </div>
  );
};

export default DebateManagement;
