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
    <div className="bg-backgroundColor-light dark:bg-backgroundColor-dark h-screen w-screen">
      <div className="flex">
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          ref={sidebarRef}
        />
        <div className="w-screen h-screen flex flex-col ">
          <MainHeader toggleSidebar={toggleSidebar} />
          <MainChat />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
