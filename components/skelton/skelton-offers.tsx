
export default function SkeletonOffers() {
    return (
        <div className="text-black dark:bg-gray-900 grid grid-cols-1 md:grid-cols-2 shadow-lg p-4 rounded-md gap-2 dark:text-slate-200 animate-pulse">
            <div className="w-full h-32 bg-gray-300 dark:bg-gray-700 rounded"></div>
            <div className="space-y-2">
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
            </div>
          </div>
    );
  }
  