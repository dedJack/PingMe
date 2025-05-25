import React, { useEffect } from "react";
import { useChatStore } from "../store/useChatStore";
import SideBarSkeleton from "../skeletons/SideBarSkeleton";

function SideBar({ onSelectChat }) {
  const { selectedUser, users, isUserLoading, setSelectedUser, getUser } =
    useChatStore();

  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isUserLoading) return <SideBarSkeleton />;
  return (
    <div className="h-full">
      <div className="mb-4">
        <h2 className="text-xl font-bold text-accent mx-2">
          Chats ({users.length})
        </h2>
        <div className="border-b-2 border-b-gray-700 my-3 mx-0 "></div>
      </div>
      {users.map((user) => (
        <div
          key={user._id}
          className={`
              flex items-center w-full p-3 rounded-lg cursor-pointer
              transition-all duration-200 mb-1  hover:text-gray-600
              ${
                selectedUser?._id === user._id
                  ? "bg-blue-100 shadow-md text-gray-600"
                  : "hover:bg-gray-50"
              }`}
          onClick={() => {
            onSelectChat();
            setSelectedUser(user);
          }}
        >
          <div className="flex items-center">
            {/* Profile Image */}
            <img
              className="rounded-full w-[30px] h-[30px]"
              src={user.profilePic ? user.profilePic : "./avatar.jpg"}
              alt="Profile"
            />

            {/* Name and Status */}
            <div className="ml-4">
              <div className="text-lg font-semibold">{user.fullName}</div>
              <div className="hidden lg:block text-sm text-gray-500">
                offline
              </div>
            </div>
          </div>
          {/* Show if the user is online or offline */}
        </div>
      ))}
    </div>
  );
}

export default SideBar;
