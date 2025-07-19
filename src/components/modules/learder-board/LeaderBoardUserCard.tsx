import { LeaderboardUser } from "@/types/debate";
import { Card } from "@/components/ui/card";
import { Trophy, Users } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";

const trophyColors: Record<number, string> = {
  1: "text-yellow-400",
  2: "text-gray-400",
  3: "text-orange-500",
};

const LeaderBoardUserCard = ({ user }: { user: LeaderboardUser }) => {
  return (
    <Card
      key={user.email}
      className={cn(
        "flex items-center justify-between p-4 shadow-lg rounded-2xl",
        user.position === 1
          ? "bg-yellow-50 dark:bg-yellow-900/20"
          : "bg-muted dark:bg-gray-900"
      )}
    >
      <div className="flex items-center gap-4">
        <Image
          src={user?.image || "https://github.com/shadcn.png"}
          alt={user.name}
          width={60}
          height={60}
          className="rounded-full border border-gray-300 dark:border-gray-700"
        />
        <div>
          <h2 className="font-semibold text-lg">{user.name}</h2>
          <p className="text-sm text-muted-foreground">{user.email}</p>
          <p className="text-sm mt-1">
            🗳 Votes: <span className="font-medium">{user.totalVotes}</span> · 🧑‍🤝‍🧑
            Debates:{" "}
            <span className="font-medium">{user.debatesParticipated}</span>
          </p>
        </div>
      </div>

      <div className="flex flex-col items-center justify-center">
        {user.position <= 3 ? (
          <Trophy
            size={32}
            className={cn(
              "drop-shadow-sm",
              trophyColors[user.position] || "text-muted-foreground"
            )}
          />
        ) : (
          <Users size={32} className="text-muted-foreground" />
        )}
        <span className="text-sm font-semibold mt-1">#{user.position}</span>
      </div>
    </Card>
  );
};

export default LeaderBoardUserCard;
