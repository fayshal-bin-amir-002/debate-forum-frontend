"use client";
import { useState } from "react";
import FilterSection from "./FilterSection";
import DebatesContainer from "./DebatesContainer";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";

const DebatesPageManagement = () => {
  return (
    <div className="my-6 md:my-10 lg:my-12">
      <ClientSideDebatesPage />
    </div>
  );
};

export default DebatesPageManagement;

function ClientSideDebatesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<
    "newest" | "mostVoted" | "endingSoon" | "all"
  >("all");

  return (
    <div>
      <div className="p-4 bg-gray-50 dark:bg-gray-900 mb-6 rounded-lg shadow-md flex justify-center md:items-center md:justify-between gap-4 md:gap-8 flex-col md:flex-row">
        <h3 className="text-lg font-semibold text-gray-700 dark:text-gray-100">
          Have a topic in mind? Start a new debate!
        </h3>
        <Link href="/create-debate">
          <Button>
            Start a Debate
            <Plus />
          </Button>
        </Link>
      </div>

      <FilterSection
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />
      <DebatesContainer searchTerm={searchTerm} sortBy={sortBy} />
    </div>
  );
}
