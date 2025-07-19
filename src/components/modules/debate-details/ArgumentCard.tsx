import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { editArguement, voteArguement } from "@/services/debate";
import { Argument } from "@/types/debate";
import { IUserProps } from "@/types/user";
import { Heart, Edit } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Textarea } from "@/components/ui/textarea";
import ButtonLoader from "@/components/shared/Loader/ButtonLoader";

interface Props {
  session: IUserProps | null;
  argument: Argument;
  refetch: () => Promise<void>;
}

export const ArgumentCard = ({ session, argument, refetch }: Props) => {
  const [updatedContent, setUpdatedContent] = useState("");
  const [loadingUpdate, setLoadingUpdate] = useState(false);
  const [loadingVote, setLoadingVote] = useState(false);
  const [open, setOpen] = useState(false);
  const { content, side, voteCount, user, createdAt, id } = argument;

  const createdAtDate = new Date(createdAt);
  const now = new Date();

  const FIVE_MINUTES = 5 * 60 * 1000;
  const canEdit =
    now.getTime() - createdAtDate.getTime() <= FIVE_MINUTES &&
    session?.user?.email === argument?.user?.email;

  const handleVote = async (id: string) => {
    const payload = {
      email: session?.user?.email,
      argumentId: id,
    };

    setLoadingVote(true);

    try {
      const res = await voteArguement(payload);
      await refetch();
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Could not join!");
    } finally {
      setLoadingVote(false);
    }
  };

  const handleEdit = async (id: string) => {
    const payload = {
      userEmail: session?.user?.email,
      argumentId: id,
      content: updatedContent,
    };

    setLoadingUpdate(true);

    try {
      const res = await editArguement(payload);
      await refetch();
      if (res?.success) {
        toast.success(res?.message);
      } else {
        toast.error(res?.message);
      }
    } catch (err: any) {
      toast.error(err?.message || "Could not join!");
    } finally {
      setUpdatedContent("");
      setOpen(false);
      setLoadingUpdate(false);
    }
  };

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
        <div className="flex gap-2">
          {canEdit && (
            <Popover onOpenChange={setOpen} open={open}>
              <PopoverTrigger asChild>
                <Button size="sm" variant="secondary">
                  Edit <Edit className="w-4 h-4 ml-1" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80">
                <div className="grid gap-4">
                  <div className="space-y-2">
                    <h4 className="leading-none font-medium">
                      Edit Your Arguemnt
                    </h4>
                  </div>
                  <div>
                    <div className="w-full">
                      <Textarea
                        id="width"
                        defaultValue={content || ""}
                        className="w-full h-32"
                        onChange={(e) => setUpdatedContent(e.target?.value)}
                      />
                    </div>
                    <Button
                      onClick={() => handleEdit(id)}
                      className="mt-3"
                      disabled={loadingUpdate}
                    >
                      Update {loadingUpdate && <ButtonLoader />}
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
          <Button
            size="sm"
            variant="outline"
            onClick={() => handleVote(id)}
            disabled={loadingVote}
          >
            Vote {loadingVote ? <ButtonLoader /> : <Heart />}
          </Button>
        </div>
      </div>
    </div>
  );
};
