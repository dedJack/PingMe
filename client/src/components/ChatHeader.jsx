import { ChevronLeft } from "lucide-react";
import { useChatStore } from "../store/useChatStore";

const ChatHeader = () => {
  const { selectedUser, setSelectedUser } = useChatStore();

  return (
    <div className="p-2 border-b border-gray-700 flex items-center">
      <button className="mr-2" onClick={() => setSelectedUser(null)}>
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
  );
};

export default ChatHeader;
