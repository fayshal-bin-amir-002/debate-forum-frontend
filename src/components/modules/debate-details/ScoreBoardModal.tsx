import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { DebateDetails } from "@/types/debate";
import Image from "next/image";

interface ScoreBoardModalProps {
  data: DebateDetails;
  scoreOpen: boolean;
  setScoreOpen: (open: boolean) => void;
}

const sideColors: Record<string, string> = {
  Support:
    "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
  Oppose: "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
  // fallback
  Unknown: "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400",
};

const ScoreBoardModal = ({
  data,
  scoreOpen,
  setScoreOpen,
}: ScoreBoardModalProps) => {
  const { scoreBoard } = data;

  return (
    <Dialog open={scoreOpen} onOpenChange={setScoreOpen}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Scoreboard</DialogTitle>
          <DialogDescription className="mb-4">
            View the final vote tally and participants.
          </DialogDescription>
        </DialogHeader>

        <div className="max-h-[400px] overflow-y-auto space-y-4">
          {scoreBoard && scoreBoard.length > 0 ? (
            scoreBoard.map(({ name, email, image, totalVotes, side }, i) => (
              <div
                key={email}
                className="flex items-center gap-4 p-3 rounded-lg border border-gray-200 bg-white shadow-sm dark:border-gray-700 dark:bg-gray-800"
              >
                <div className="relative w-12 h-12 rounded-full overflow-hidden border border-gray-300 dark:border-gray-600">
                  {image ? (
                    <Image
                      src={image}
                      alt={name}
                      fill
                      sizes="48px"
                      className="object-cover"
                    />
                  ) : (
                    <div className="flex items-center justify-center w-full h-full bg-gray-300 dark:bg-gray-600 text-gray-600 dark:text-gray-300">
                      {name.charAt(0)}
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-2">
                    <p className="text-base font-semibold text-gray-900 dark:text-gray-100 truncate">
                      {name}
                    </p>
                    <span
                      className={`px-2 py-0.5 rounded-full text-xs font-medium select-none ${
                        sideColors[side ?? "Unknown"]
                      }`}
                    >
                      {side ?? "Unknown"}
                    </span>
                  </div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                    {email}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-lg font-bold text-indigo-600 dark:text-indigo-400">
                    {totalVotes}
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500">
                    Votes
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 dark:text-gray-400">
              No participants found.
            </p>
          )}
        </div>

        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" className="mt-4 w-full">
              Close
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ScoreBoardModal;
