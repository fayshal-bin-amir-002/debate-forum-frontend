// components/HowItWorks.tsx
"use client";

import { LucideSparkles, LucideUsers, LucideArrowUpCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const steps = [
  {
    icon: <LucideUsers className="w-8 h-8 text-primary" />,
    title: "Start or Join",
    description: "Create or join an ongoing debate on topics you care about.",
  },
  {
    icon: <LucideSparkles className="w-8 h-8 text-primary" />,
    title: "Take a Side",
    description: "Pick Support or Oppose and present your best arguments.",
  },
  {
    icon: <LucideArrowUpCircle className="w-8 h-8 text-primary" />,
    title: "Earn Votes",
    description: "Get voted by others and climb the scoreboard.",
  },
];

export function HowItWorks() {
  return (
    <section className="py-12 lg:py-16 px-4 md:px-8 bg-muted/50 rounded-lg shadow-md">
      <div className="max-w-5xl mx-auto text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
        <p className="text-muted-foreground mb-10">
          Join engaging debates and earn recognition for your best arguments.
        </p>

        <div className="grid gap-6 md:grid-cols-3">
          {steps.map((step, index) => (
            <Card key={index} className="p-6 text-left">
              <CardContent className="flex flex-col items-start gap-4 p-0">
                {step.icon}
                <h3 className="text-xl font-semibold">{step.title}</h3>
                <p className="text-muted-foreground">{step.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
