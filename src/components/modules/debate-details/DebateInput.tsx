"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useState } from "react";

export const DebateInput = () => {
  const [value, setValue] = useState("");

  const handleSubmit = () => {
    if (value.trim()) {
      console.log("Submitted:", value);
      setValue("");
    }
  };

  return (
    <div className="flex items-center gap-2 border rounded-lg p-3">
      <Input
        placeholder="Type your argument..."
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <Button onClick={handleSubmit}>Send</Button>
    </div>
  );
};
