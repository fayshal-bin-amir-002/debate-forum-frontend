"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="w-full bg-gradient-to-br from-slate-50 to-slate-200 dark:from-gray-900 dark:to-gray-800 py-20 my-10 md:my-12 rounded-lg shadow-md">
      <div className="container mx-auto px-4 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 dark:text-white mb-6">
          Debate. Defend. Decide.
        </h1>

        <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 mb-10 max-w-2xl">
          Join passionate minds in logical battles. Pick a side and let your
          argument shine.
        </p>

        <div className="flex gap-4 flex-wrap justify-center">
          <Link href="/create-debate">
            <Button size="lg">Start a Debate</Button>
          </Link>
          <Link href="/debates">
            <Button variant="outline" size="lg">
              Explore Debates
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
