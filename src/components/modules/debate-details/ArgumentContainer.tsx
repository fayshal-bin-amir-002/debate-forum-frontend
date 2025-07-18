"use client";

import { Button } from "@/components/ui/button";
import { useState } from "react";
import { DebateHeader } from "./DebateHeader";
import { ArgumentCard } from "./ArgumentCard";
import { DebateInput } from "./DebateInput";
import { DebateDetailsRunning } from "@/types/debate";

const ArgumentContainer = ({ data }: { data: DebateDetailsRunning }) => {
  return (
    <div
      className={`max-w-3xl mx-auto h-[80vh] flex flex-col gap-4 border rounded-lg p-4`}
    >
      <div className="flex-none">
        <DebateHeader
          endsAt={data?.endsAt}
          debateStatus={data.debateStatus}
          iParticipated={data.iParticipated}
        />
      </div>

      {/* Arguments scroll */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {data?.arguments?.map((arg: any) => (
          <ArgumentCard key={arg.id} argument={arg} />
        ))}
      </div>

      {/* Input or Join Button */}
      <div className="flex-none pt-2 border-t">
        {data.iParticipated ? (
          <DebateInput />
        ) : (
          <Button className="w-full">Join Debate</Button>
        )}
      </div>
    </div>
  );
};

export default ArgumentContainer;
