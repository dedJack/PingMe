import React, { useEffect, useRef } from "react"; // Added useRef for auto-scrolling
import { useChatStore } from "../store/useChatStore";
import { useAuthStore } from "../store/useAuthStore";
import MessageSkeleton from "../skeletons/MessageSkeleton";
import ChatHeader from "./ChatHeader";
import ChatInput from "./ChatInput";
import { MessageCircleMore } from "lucide-react";

function ChatBox({ onBack }) {
  const { selectedUser, getSingleUserMessage, messages, isMessageLoading } =
    useChatStore();
  const { authUser } = useAuthStore();

  const messagesEndRef = useRef(null);

  // useEffect to load the messages when selectedUser changes
  useEffect(() => {
    if (selectedUser?._id) {
      getSingleUserMessage(selectedUser._id);
    }
  }, [selectedUser?._id, getSingleUserMessage]);

  // useEffect to scroll to the bottom of the messages whenever messages change
  useEffect(() => {
    // Scroll to the latest message
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (isMessageLoading) return <MessageSkeleton />;

  return (
    <div className="h-full flex flex-col">
      {selectedUser ? (
        <>
          <ChatHeader onBack={onBack} />
          <div className="flex-1 overflow-y-auto space-y-4 p-4">
            {messages.map((message) => (
              <div
                key={message._id} // Unique key for each message
                className={`chat ${
                  message.senderId === authUser._id ? "chat-end" : "chat-start"
                }`}
              >
                <div className="chat-image avatar">
                  <div className="w-10 rounded-full">
                    <img
                      alt="profile-pic"
                      src={
                        // Display sender's profile picture
                        message.senderId === authUser._id
                          ? authUser.profilePic || "/avatar.jpg"
                          : selectedUser.profilePic || "/avatar.jpg"
                      }
                    />
                  </div>
                </div>

                <div className="chat-bubble flex flex-col">
                  {/* Display image if present */}
                  {message.image && (
                    <img
                      src={message.image}
                      alt="attachment"
                      className="sm:max-w-[200px] rounded-md w-[500px] h-[300px] mb-2"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src = "/placeholder.jpg";
                      }} // Fallback for broken images
                    />
                  )}
                  {/* Display text if present */}
                  {message.text && <p>{message.text}</p>}
                </div>
                <div className="chat-footer ">
                  <time className="text-xs opacity-50">
                    {new Date(message.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </time>
                </div>
              </div>
            ))}
            {/* Empty div to scroll into view, keeping the latest messages visible */}
            <div ref={messagesEndRef} />
          </div>
          <ChatInput />
        </>
      ) : (
        // Placeholder message when no user is selected
        <div className="flex flex-col h-full justify-center items-center">
          <MessageCircleMore className="size-1/4 text-gray-500 animate-bounceY" />
          <div className="mt-2 text-gray-500">
            Your chats with your friends appear here
          </div>
        </div>
      )}
    </div>
  );
}

export default ChatBox;
