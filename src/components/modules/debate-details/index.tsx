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
  const [debateData, setDebateData] = useState<DebateDetails | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchDebate = async () => {
    try {
      setLoading(true);
      const res = await getDebateDetails(id, session?.user?.email as string);
      const data = res?.data;

      setDebateData(data ?? null);
    } catch (error) {
      console.error("Failed to fetch debate details:", error);
      setDebateData(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    let isMounted = true;
    let intervalId: NodeJS.Timeout;

    fetchDebate();

    const shouldPoll = () => {
      if (
        typeof debateData === "object" &&
        debateData &&
        debateData.debateStatus === "running"
      ) {
        return new Date(debateData.endsAt) > new Date();
      }
      return true;
    };

    if (shouldPoll()) {
      intervalId = setInterval(fetchDebate, 60 * 1000);
    }

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };
  }, [id, session?.user?.email]);

  if (debateData && debateData.debateStatus === "running") {
    const runningData = debateData as DebateDetailsRunning;
    return (
      <div>
        <ArgumentContainer
          data={runningData}
          session={session}
          refetch={fetchDebate}
        />
      </div>
    );
  }

  if (debateData && debateData.debateStatus === "closed") {
    const closedData = debateData as DebateDetailsClosed;
    return (
      <div>
        <ScoreBoard data={closedData} />
      </div>
    );
  }

  return (
    <div>
      <SpinLoader />
    </div>
  );
};

export default DebateManagement;
