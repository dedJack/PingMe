import { ChevronLeft } from "lucide-react";
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";

const ChatHeader = ({ onBack }) => {
  const { selectedUser, setSelectedUser } = useChatStore();
  const { onlineUsers } = useAuthStore();

  return (
    <div className="p-2 border-b border-gray-700 flex flex-col">
      <div className="flex items-center">
        <button
          className="mr-2"
          onClick={() => {
            setSelectedUser(null);
            onBack();
          }}
        >
          <ChevronLeft className="size-6" />
        </button>
        <img
          className="rounded-full w-[30px] h-[30px]"
          src={selectedUser?.profilePic || "./avatar.jpg"}
          alt="Profile"
        />
        <h2 className="text-xl font-bold text-accent ml-2">
          {selectedUser?.fullName}
        </h2>
      </div>
      <div
        className={`hidden ml-16 lg:block text-sm text-${
          onlineUsers.includes(selectedUser._id) ? "green" : "gray"
        }-500`}
      >
        {onlineUsers.includes(selectedUser._id) ? "online" : "offline"}
      </div>
    </div>
  );
};

export default ChatHeader;
