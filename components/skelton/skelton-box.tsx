export default function SkeletonBookBox() {
    return (
      <div className="animate-pulse min-h-[350px] bg-slate-200 dark:bg-gray-800 rounded-md p-4">
        <div className="h-[200px] bg-gray-300 dark:bg-gray-700 rounded-md"></div>
        <div className="mt-4 h-6 bg-gray-300 dark:bg-gray-700 rounded"></div>
        <div className="mt-2 h-4 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
      </div>
    );
  }
  