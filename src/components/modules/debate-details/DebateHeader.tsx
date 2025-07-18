import { Button } from "@/components/ui/button";
import { CountdownTimer } from "./CountdownTimer"; // adjust path if needed

interface Props {
  debateStatus: string;
  endsAt: string;
}

export const DebateHeader = ({ debateStatus, endsAt }: Props) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm">
      <div className="flex items-center justify-between w-full">
        <h2 className={`text-2xl font-semibold capitalize`}>
          <span
            className={` ${
              debateStatus === "running" ? "text-green-600" : "text-red-600"
            }`}
          >
            {debateStatus}
          </span>
        </h2>
        <CountdownTimer endsAt={endsAt} />
      </div>
    </div>
  );
};
