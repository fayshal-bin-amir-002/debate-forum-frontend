"use client";

import ButtonLoader from "@/components/shared/Loader/ButtonLoader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { toast } from "sonner";

export const DebateInput = ({
  handlePostArgument,
}: {
  handlePostArgument: (payload: string) => Promise<void>;
}) => {
  const [value, setValue] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async () => {
    if (value.trim()) {
      setLoading(true);
      const data = value;
      setValue("");
      try {
        await handlePostArgument(data);
      } catch (err: any) {
        toast.error(err?.message);
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="flex items-center gap-2 border rounded-lg p-3">
      <Input
        placeholder="Type your argument..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleSubmit} disabled={loading}>
        Send {loading && <ButtonLoader />}
      </Button>
    </div>
  );
};
