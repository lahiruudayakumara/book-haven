export default function SkeletonAvatar() {
    return (
        <div className="animate-pulse flex flex-col items-center">
        <div className="w-[100px] h-[100px] bg-gray-300 dark:bg-gray-800 rounded-full"></div> {/* Skeleton Avatar */}
        <div className="w-[80px] h-[20px] mt-2 bg-gray-300 dark:bg-gray-800 rounded"></div> {/* Skeleton Text */}
      </div>
    );
  }
  