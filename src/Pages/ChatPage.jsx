import React, { useState, useRef } from "react";
import Sidebar from "../Components/Sidebar";
import MainHeader from "../Components/MainHeader";
import MainChat from "../Components/MainChat";

const ChatPage = () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const sidebarRef = useRef(null);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  const closeSidebar = () => {
    setSidebarOpen(false);
  };

  return (
    <div className="bg-backgroundColor-light dark:bg-backgroundColor-dark h-svh w-svh">
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          ref={sidebarRef}
        />
        <div className="w-full h-screen flex flex-col">
          <MainHeader toggleSidebar={toggleSidebar} />
          <div className="h-screen md:flex-1 flex flex-col items-center">
            <MainChat />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
