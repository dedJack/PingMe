import React from "react";

const SideBarSkeleton = () => {
  return (
    <div>
      <div className="flex flex-col p-4 gap-6 w-64">
        {/* Profile Section Skeleton */}
        <div className="flex items-center gap-4">
          <div className="skeleton rounded-full h-12 w-12"></div>
          <div className="flex flex-col gap-2">
            <div className="skeleton h-4 w-24"></div> {/* Name */}
            <div className="skeleton h-3 w-16"></div> {/* Status */}
          </div>
        </div>

        {/* Divider */}
        <div className="border-b border-gray-900"></div>

        {/* Menu/Chat Item Skeletons */}
        <div className="flex flex-col gap-4 ">
          <div className="skeleton h-10 w-full mb-3 rounded-full"></div>
          <div className="skeleton h-10 w-full mb-3 rounded-full"></div>
          <div className="skeleton h-10 w-full mb-3 rounded-full"></div>
          <div className="skeleton h-10 w-full mb-3 rounded-full"></div>
          <div className="skeleton h-10 w-full mb-3 rounded-full"></div>
          <div className="skeleton h-10 w-full mb-3 rounded-full"></div>
          <div className="skeleton h-10 w-full mb-3 rounded-full"></div>
        </div>
      </div>
    </div>
  );
};

export default SideBarSkeleton;
