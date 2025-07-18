"use client";

import { useEffect, useState } from "react";

interface CountdownTimerProps {
  endsAt: string; // ISO timestamp string
}

export const CountdownTimer = ({ endsAt }: CountdownTimerProps) => {
  const [timeLeft, setTimeLeft] = useState({
    hours: "00",
    minutes: "00",
    seconds: "00",
    ended: false,
  });

  useEffect(() => {
    const targetTime = new Date(endsAt).getTime();

    const pad = (num: number) => num.toString().padStart(2, "0");

    const updateCountdown = () => {
      const now = new Date().getTime();
      const distance = targetTime - now;

      if (distance <= 0) {
        setTimeLeft((t) => ({ ...t, ended: true }));
        return;
      }

      const hours = Math.floor(distance / (1000 * 60 * 60));
      const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((distance % (1000 * 60)) / 1000);

      setTimeLeft({
        hours: pad(hours),
        minutes: pad(minutes),
        seconds: pad(seconds),
        ended: false,
      });
    };

    updateCountdown();
    const interval = setInterval(updateCountdown, 1000);
    return () => clearInterval(interval);
  }, [endsAt]);

  if (timeLeft.ended) {
    return (
      <p className="text-center text-red-600 font-semibold text-lg animate-pulse">
        🛑 Debate Ended
      </p>
    );
  }

  return (
    <div className="inline-flex gap-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white px-6 py-3 rounded-xl shadow-lg select-none font-mono text-xl font-bold tracking-widest">
      <TimeBlock label="HRS" value={timeLeft.hours} />
      <TimeBlock label="MIN" value={timeLeft.minutes} />
      <TimeBlock label="SEC" value={timeLeft.seconds} />
    </div>
  );
};

const TimeBlock = ({ label, value }: { label: string; value: string }) => {
  return (
    <div className="flex flex-col items-center">
      <span className="text-3xl">{value}</span>
      <span className="text-xs uppercase tracking-widest">{label}</span>
    </div>
  );
};
