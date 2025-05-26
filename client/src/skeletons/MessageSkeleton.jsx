import React from "react";

const MessageSkeleton = () => {
  return (
    <>
      <div className="relative h-full">
        <div className="absolute bottom-0 left-0 right-0 p-4 ">
          <div className="chat chat-start mb-4">
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full bg-neutral animate-pulse" />
            </div>
            <div className="chat-bubble bg-neutral animate-pulse w-48 h-5 rounded" />
            <div className="chat-footer mt-2 opacity-50">
              <div className="h-3 w-16 bg-neutral rounded animate-pulse" />
            </div>
          </div>

          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full bg-neutral animate-pulse" />
            </div>
            <div className="chat-bubble bg-neutral animate-pulse w-48 h-5 rounded" />
            <div className="chat-footer mt-2 opacity-50">
              <div className="h-3 w-16 bg-neutral rounded animate-pulse" />
            </div>
          </div>
          <div className="chat chat-start mb-4">
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full bg-neutral animate-pulse" />
            </div>
            <div className="chat-bubble bg-neutral animate-pulse w-48 h-5 rounded" />
            <div className="chat-footer mt-2 opacity-50">
              <div className="h-3 w-16 bg-neutral rounded animate-pulse" />
            </div>
          </div>

          <div className="chat chat-end">
            <div className="chat-image avatar">
              <div className="w-10 h-10 rounded-full bg-neutral animate-pulse" />
            </div>
            <div className="chat-bubble bg-neutral animate-pulse w-48 h-5 rounded" />
            <div className="chat-footer mt-2 opacity-50">
              <div className="h-3 w-16 bg-neutral rounded animate-pulse" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MessageSkeleton;
