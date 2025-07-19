"use client";

import { Button } from "@/components/ui/button";
import { DebateHeader } from "./DebateHeader";
import { ArgumentCard } from "./ArgumentCard";
import { DebateInput } from "./DebateInput";
import { DebateDetailsRunning } from "@/types/debate";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { useState } from "react";
import { IUserProps } from "@/types/user";
import { joinDebate, postArguement, voteArguement } from "@/services/debate";
import { toast } from "sonner";

const ArgumentContainer = ({
  data,
  session,
  refetch,
}: {
  data: DebateDetailsRunning;
  session: IUserProps | null;
  refetch: () => Promise<void>;
}) => {
  const [open, setOpen] = useState(false);

  const handleJoinDebate = async (side: string) => {
    const payload = {
      debateId: data?.debateId,
      side,
      email: session?.user?.email,
    };
    try {
      const res = await joinDebate(payload);
      await refetch();
      toast.success(res?.message);
    } catch (err: any) {
      toast.error(err?.message || "Could not join!");
    } finally {
      setOpen(false);
    }
  };

  const handlePostArgument = async (content: string) => {
    const payload = {
      content,
      debateId: data?.debateId,
      side: data?.mySide,
      userEmail: session?.user?.email,
    };
    try {
      const res = await postArguement(payload);
      await refetch();
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Could not join!");
    }
  };

  const handleVote = async (id: string) => {
    const payload = {
      email: session?.user?.email,
      argumentId: id,
    };

    try {
      const res = await voteArguement(payload);
      await refetch();
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Could not join!");
    }
  };

  return (
    <div
      className={`max-w-3xl mx-auto h-[80vh] flex flex-col gap-4 border rounded-lg p-4`}
    >
      <div className="flex-none">
        <DebateHeader endsAt={data?.endsAt} debateStatus={data.debateStatus} />
      </div>

      {/* Arguments scroll */}
      <div className="flex-1 overflow-y-auto space-y-4">
        {data?.arguments?.map((arg: any) => (
          <ArgumentCard key={arg.id} argument={arg} handleVote={handleVote} />
        ))}
      </div>

      {/* Input or Join Button */}
      <div className="flex-none pt-2 border-t">
        {data.iParticipated ? (
          <DebateInput handlePostArgument={handlePostArgument} />
        ) : (
          <Popover onOpenChange={setOpen} open={open}>
            <PopoverTrigger asChild>
              <Button className="w-full">Join Debate</Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <p className="text-center mb-6 font-medium">Choose your side</p>
              <div className="space-y-4">
                <Button
                  onClick={() => handleJoinDebate("Support")}
                  className="w-full bg-green-600 hover:bg-green-500"
                >
                  Support
                </Button>
                <Button
                  onClick={() => handleJoinDebate("Oppose")}
                  className="w-full bg-red-600 hover:bg-red-500"
                >
                  Oppose
                </Button>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
};

export default ArgumentContainer;
