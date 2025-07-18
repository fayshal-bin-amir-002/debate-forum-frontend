export const DebateCardSkeleton = () => (
  <div className="border border-gray-200 rounded-lg p-5 shadow-sm animate-pulse flex flex-col justify-between space-y-4">
    <div className="h-5 bg-gray-300 rounded w-3/4"></div>
    <div className="h-3 bg-gray-300 rounded w-1/3"></div>
    <div className="h-3 bg-gray-300 rounded w-1/2"></div>
    <div className="h-3 bg-gray-300 rounded w-1/4"></div>
    <div className="h-3 bg-gray-300 rounded w-1/5"></div>
    <div className="flex flex-wrap gap-2 mt-3">
      <div className="h-4 bg-gray-300 rounded-full w-10"></div>
      <div className="h-4 bg-gray-300 rounded-full w-12"></div>
      <div className="h-4 bg-gray-300 rounded-full w-8"></div>
    </div>
  </div>
);
