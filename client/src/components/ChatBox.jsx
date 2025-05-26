import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { MessageCircleMore } from "lucide-react";

function ChatBox({ onBack }) {
  const { selectedUser, getSingleUserMessage, message, isMessageLoading } = useChatStore();

  //useEffect to load the messages
  useEffect(() => {
    getSingleUserMessage(selectedUser?._id);
  }, [selectedUser?._id, getSingleUserMessage]);


  if (isMessageLoading) return <MessageSkeleton />;
  return (
    <div className="h-full flex flex-col">
      {selectedUser ? (
        <>
          <ChatHeader />
          <div className="flex-1 overflow-y-auto">
            {/* You can place <ChatMessage /> here */}
          </div>
          <ChatInput />
        </>
      ) : (
        <div className="flex flex-col h-full justify-center items-center">
          <MessageCircleMore className="size-1/4 text-gray-500" />
          <div className="mt-2 text-gray-500">
            Your chats with your friends appear here
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
