import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";
import Image from "next/image";

interface Props {
  argument: {
    id: string;
    content: string;
    side: "Support" | "Oppose";
    voteCount: number;
    user: {
      name: string;
      email: string;
      image: string | null;
    };
  };
}

export const ArgumentCard = ({ argument }: Props) => {
  const { content, side, voteCount, user } = argument;

  return (
    <div className="p-4 border rounded-lg shadow-sm flex flex-col gap-2">
      <div className="flex items-center gap-3">
        {user.image ? (
          <Image
            src={user.image}
            alt="user"
            width={40}
            height={40}
            className="rounded-full"
          />
        ) : (
          <div className="w-10 h-10 bg-gray-300 rounded-full flex items-center justify-center text-white font-semibold">
            {user.name[0]}
          </div>
        )}
        <div className="flex-1">
          <p className="font-semibold">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
        <Badge variant={side === "Support" ? "default" : "destructive"}>
          {side}
        </Badge>
      </div>

      <p className="text-base">{content}</p>

      <div className="flex items-center justify-between mt-2">
        <p className="text-sm text-muted-foreground">Votes: {voteCount}</p>
        <Button size="sm" variant="outline">
          Vote <Heart />
        </Button>
      </div>
    </div>
  );
};
