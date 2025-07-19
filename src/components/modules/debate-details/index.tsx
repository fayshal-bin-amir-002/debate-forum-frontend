"use client";

import { useEffect, useState } from "react";
import { getDebateDetails } from "@/services/debate";
import { IUserProps } from "@/types/user";
import SpinLoader from "@/components/shared/Loader/SpinLoader";
import ArgumentContainer from "./ArgumentContainer";
import { DebateDetails } from "@/types/debate";
import { toast } from "sonner";

interface DebateManagementProps {
  id: string;
  session: IUserProps | null;
}

const DebateManagement = ({ id, session }: DebateManagementProps) => {
  const [debateData, setDebateData] = useState<DebateDetails | null>(null);

  const fetchDebate = async () => {
    try {
      const res = await getDebateDetails(id, session?.user?.email as string);
      const data = res?.data;

      setDebateData(data ?? null);
    } catch (error: any) {
      toast.error(error?.message);
      setDebateData(null);
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

  if (debateData) {
    return (
      <div>
        <ArgumentContainer
          data={debateData}
          session={session}
          refetch={fetchDebate}
        />
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
