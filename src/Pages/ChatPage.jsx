import React, { useState, useRef, useEffect } from "react";
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

  const [viewportHeight, setViewportHeight] = useState(window.innerHeight);

  useEffect(() => {
    const handleResize = () => {
      setViewportHeight(window.innerHeight);
    };

    // Add event listener for window resize
    window.addEventListener("resize", handleResize);

    // Remove event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="bg-backgroundColor-light dark:bg-backgroundColor-dark min-h-screen w-screen">
      <div className="flex" style={{ height: `${viewportHeight}px` }}>
        {/* Sidebar component */}
        <Sidebar
          isOpen={isSidebarOpen}
          closeSidebar={closeSidebar}
          ref={sidebarRef}
        />

        {/* Main content */}
        <div className="w-screen h-screen flex flex-col overflow-hidden">
          <MainHeader toggleSidebar={toggleSidebar} />
          <MainChat />
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
