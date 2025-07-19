"use client";

import Image from "next/image";
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
import { IDebate } from "@/types/debate";
import Link from "next/link";

interface DebateDetailsModalProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  debate: IDebate;
}

const DebateDetailsModal: React.FC<DebateDetailsModalProps> = ({
  open,
  setOpen,
  debate,
}) => {
  return (
    <Dialog onOpenChange={setOpen} open={open}>
      <DialogContent className="sm:max-w-[650px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold leading-snug">
            {debate.title}
          </DialogTitle>
          <DialogDescription className="text-sm text-muted-foreground">
            Category: {debate.category}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-6 py-4">
          {/* Author Info */}
          <div className="flex items-center gap-3">
            <Image
              src={debate?.authorImage || "https://github.com/shadcn.png"}
              alt={debate.authorName}
              width={40}
              height={40}
              className="rounded-full"
            />
            <div>
              <p className="font-medium">{debate.authorName}</p>
              <p className="text-xs text-muted-foreground">
                {debate.authorEmail}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div>
            <p className="text-sm font-medium mb-1">Tags:</p>
            <div className="flex flex-wrap gap-2">
              {debate.tags.map((tag) => (
                <span
                  key={tag}
                  className="bg-muted px-2 py-1 rounded text-xs text-muted-foreground"
                >
                  #{tag.trim()}
                </span>
              ))}
            </div>
          </div>

          {/* Description with scroll */}
          <div>
            <p className="text-sm font-medium mb-1">Description:</p>
            <div className="bg-muted p-3 rounded-md max-h-[200px] overflow-y-auto text-sm text-muted-foreground">
              {debate.description}
            </div>
          </div>

          {/* Other Info */}
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Duration:</p>
              <p>{debate.duration} hr</p>
            </div>
            <div>
              <p className="text-muted-foreground">Vote Count:</p>
              <p>{debate.voteCount}</p>
            </div>
            <div>
              <p className="text-muted-foreground">Status:</p>
              <p
                className={`font-semibold ${
                  debate.status === "Running"
                    ? "text-green-600 dark:text-green-400"
                    : "text-red-600 dark:text-red-400"
                }`}
              >
                {debate.status}
              </p>
            </div>
            <div>
              <p className="text-muted-foreground">Debate ID:</p>
              <p className="break-words text-xs">{debate.id}</p>
            </div>
          </div>
        </div>

        <DialogFooter className="gap-6">
          <DialogClose asChild>
            <Button variant="outline">Close</Button>
          </DialogClose>
          <Link href={`/debates/${debate?.id}`}>
            <Button>Go to Debate</Button>
          </Link>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DebateDetailsModal;
