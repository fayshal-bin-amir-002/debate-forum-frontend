export const LeaderboardCardSkeleton = () => {
  return (
    <div className="flex items-center justify-between p-5 rounded-3xl bg-muted dark:bg-gray-800 animate-pulse">
      {/* Left: Avatar & info */}
      <div className="flex items-center gap-5">
        <div className="w-16 h-16 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="space-y-2">
          <div className="w-40 h-5 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="w-48 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
          <div className="w-32 h-4 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        </div>
      </div>

      {/* Right: Trophy/Position */}
      <div className="flex flex-col items-center justify-center min-w-[60px] space-y-2">
        <div className="w-9 h-9 rounded-full bg-gray-300 dark:bg-gray-700"></div>
        <div className="w-8 h-5 bg-gray-300 dark:bg-gray-700 rounded-md"></div>
      </div>
    </div>
  );
};
