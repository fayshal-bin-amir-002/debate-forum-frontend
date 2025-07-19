import { CountdownTimer } from "./CountdownTimer";

interface Props {
  debateStatus: string;
  endsAt: string;
  winerSide?: string;
}

export const DebateHeader = ({ debateStatus, endsAt, winerSide }: Props) => {
  return (
    <div className="flex items-center justify-between p-4 border rounded-xl shadow-sm">
      {winerSide ? (
        <h3 className="text-2xl font-medium">
          <span>Winner Side: </span>
          <span
            className={` ${winerSide === "Support" && "text-green-600"} ${
              winerSide === "Oppose" && "text-red-600"
            } ${winerSide === "Draw" && "text-amber-600"}`}
          >
            {winerSide}
          </span>
        </h3>
      ) : (
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
      )}
    </div>
  );
};
