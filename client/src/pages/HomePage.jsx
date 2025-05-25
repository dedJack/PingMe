import React, { useEffect, useState } from "react";
import { useChatStore } from "../store/useChatStore";
import ChatBox from "../components/ChatBox";
import SideBar from "../components/SideBar";

const HomePage = () => {
  const { selectedUser, users, getSingleUserMessage, getUser } = useChatStore();


  const [showSidebar, setShowSidebar] = useState(true); // For mobile view toggle

  return (
    <div className="flex items-center justify-center h-screen">
     <div className="flex w-full max-w-7xl  shadow-lg rounded-lg overflow-hidden
               h-[90vh] ">

        {/* Sidebar */}
        <div
          className={`
            ${showSidebar ? "block" : "hidden"} 
            md:block md:w-1/3 lg:w-1/4
            w-full
            bg-gray-800 text-white p-4
          `}
        >
          <SideBar onSelectChat={() => setShowSidebar(false)} />
        </div>

        {/* ChatBox */}
        <div
          className={`
            ${showSidebar ? "hidden" : "block"} 
            md:block flex-1 bg-gray-900 p-4 overflow-y-auto
          `}
        >
          <ChatBox onBack={() => setShowSidebar(true)} />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
