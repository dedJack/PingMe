import React from 'react'

function ChatBox({ onBack }) {
  return (
    <div className="h-full flex  flex-col">
      <div className="md:hidden mb-4">
        <button
          onClick={onBack}
          className="text-blue-600 font-semibold underline"
        >
          ← Back to Chats
        </button>
      </div>
      <div className="flex-1 ">
        <p>This is the chatbox content</p>
      </div>
    </div>
  );
}


export default ChatBox
