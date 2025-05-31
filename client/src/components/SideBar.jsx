import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import SideBarSkeleton from "../skeletons/SideBarSkeleton";
import { useAuthStore } from "../store/useAuthStore";

function SideBar({ onSelectChat }) {
  const { selectedUser, users, isUserLoading, setSelectedUser, getUser } =
    useChatStore();

  const { onlineUsers } = useAuthStore();
  const [searchUser, setSearchUser] = useState("");
  const [availableOnlineUser, setAvailableOnlineUser] = useState(false);

  //function to serach user by name
  const filteredUser = users.filter((users) => {
    return users.fullName
      .toLocaleLowerCase()
      .includes(searchUser.toLocaleLowerCase());
  });

  //function to show only online user
  const filterOnlineUsers = availableOnlineUser
    ? filteredUser.filter((user) => onlineUsers.includes(user._id))
    : filteredUser;

  //fetch users on every render
  useEffect(() => {
    getUser();
  }, [getUser]);

  if (isUserLoading) return <SideBarSkeleton />;
  return (
    <div className="h-full ">
      <div className="mb-3">
        <h2 className="text-xl font-bold text-accent mx-2">
          Chats ({users.length})
        </h2>
        <div className="flex items-center my-1">
          <input
            type="checkbox"
            checked={availableOnlineUser}
            onChange={(e) => setAvailableOnlineUser(e.target.checked)}
            className=" mx-2 checkbox checkbox-xs"
          />
          <span className="text-sm  text-gray-400">
            show online users ({onlineUsers.length - 1})
          </span>
        </div>
        <div className="border-b-2 border-b-gray-700 my-3 mx-0 "></div>
        <input
          type="text"
          name="text"
          value={searchUser}
          onChange={(e) => setSearchUser(e.target.value)}
          autoComplete="off"
          className="w-full rounded outline-none p-2 bg-gray-700"
        />
      </div>
      {filterOnlineUsers.map((user) => (
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
            {/* Profile Image with status indicator */}
            <div className="relative">
              <img
                className="rounded-full w-[30px] h-[30px]"
                src={user.profilePic ? user.profilePic : "./avatar.jpg"}
                alt="Profile"
              />
              <div
                className={`absolute top-0 left-6 w-[10px] h-[10px] rounded-full  ${
                  onlineUsers.includes(user._id)
                    ? "bg-red-600 border border-zinc-100"
                    : ""
                }`}
              ></div>
            </div>

            {/* Name and Status */}
            <div className="ml-4">
              <div className="text-lg font-semibold">{user.fullName}</div>
              <div
                className={`hidden lg:block text-sm text-${
                  onlineUsers.includes(user._id) ? "green" : "gray"
                }-500`}
              >
                {onlineUsers.includes(user._id) ? "online" : "offline"}
              </div>
            </div>
          </div>
        </div>
      ))}
      {filterOnlineUsers.length === 0 && (
        <div className="ml-4">
          <div className="text-lg font-semibold text-center text-accent">No users are online</div>
          
        </div>
      )}
    </div>
  );
}

export default SideBar;
