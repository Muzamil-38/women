import React, { useState, useEffect, useCallback, forwardRef } from "react";
import womenLogo from "../../src/Assets/Images/2.png";
import { RiChatNewLine } from "react-icons/ri";
import { BsFillTrashFill } from "react-icons/bs";
import { auth, db } from "../Firebase/firebaseConfig";
import { CiLogout } from "react-icons/ci";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  serverTimestamp,
  orderBy,
  query,
  onSnapshot,
  limit,
} from "firebase/firestore";
import { Link } from "react-router-dom";
import { useCollection } from "react-firebase-hooks/firestore";
import { useLocation } from "react-router-dom";
import { UserAuth } from "../Context/AuthContext";

const Sidebar = forwardRef(({ isOpen, closeSidebar }, ref) => {
  console.log("isOpen:", isOpen);
  console.log("closeSidebar:", closeSidebar);
  const currentUser = auth?.currentUser;
  const { logOut } = UserAuth();
  const [chatTitles, setChatTitles] = useState({});
  const location = useLocation();
  const currentPathname = location.pathname;
  const [activeChat, setActiveChat] = useState(null);
  const [unsubscribeFunctions, setUnsubscribeFunctions] = useState({});

  const handleOutsideClick = useCallback(
    (e) => {
      if (isOpen && ref.current && !ref.current.contains(e.target)) {
        closeSidebar();
      }
    },
    [isOpen, closeSidebar, ref]
  );

  useEffect(() => {
    const handleMouseDown = (e) => handleOutsideClick(e);
    document.addEventListener("mousedown", handleMouseDown);

    return () => {
      document.removeEventListener("mousedown", handleMouseDown);
    };
  }, [handleOutsideClick, isOpen, closeSidebar, ref]);

  const [chats] = useCollection(
    currentUser &&
      query(
        collection(db, "users", currentUser?.email, "chats"),
        orderBy("createdAt", "desc")
      )
  );

  useEffect(() => {
    const fetchChatTitles = async () => {
      const titles = {};

      for (const chat of chats?.docs) {
        const chatId = chat.id;
        const messagesQuery = query(
          collection(
            db,
            "users",
            currentUser?.email,
            "chats",
            chatId,
            "messages"
          ),
          orderBy("createdAt", "asc"),
          limit(1)
        );

        const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
          const messageData = snapshot.docs.map((doc) => doc.data());
          const title =
            messageData.length > 0
              ? messageData[0].text
                  .split(" ") // Split the message into words
                  .slice(0, 3) // Take the first three words
                  .join(" ") // Join them back into a string
              : "No messages";
          titles[chatId] = title;
          setChatTitles({ ...titles });
        });

        // Store the unsubscribe function to clean up the listener later
        setUnsubscribeFunctions((prevUnsubFunctions) => ({
          ...prevUnsubFunctions,
          [chatId]: unsubscribe,
        }));
      }
    };

    if (chats) {
      fetchChatTitles();
    }
  }, [chats, currentUser]);

  useEffect(() => {
    if (!currentPathname || !chats) return;

    const activeChatId = currentPathname.split("/").pop();
    setActiveChat(activeChatId);
  }, [currentPathname, chats]);

  // Function to Create Chat
  const handleCreateNewChat = async () => {
    try {
      await addDoc(collection(db, "users", auth?.currentUser?.email, "chats"), {
        userId: auth?.currentUser?.email,
        createdAt: serverTimestamp(),
      });
    } catch (err) {
      console.error("Error creating chat:", err);
    }
  };

  // Function to Handle Chat deletion
  const handleDeleteChat = async (chatId) => {
    try {
      const chatDocRef = doc(
        db,
        "users",
        auth?.currentUser?.email,
        "chats",
        chatId
      );

      await deleteDoc(chatDocRef);
    } catch (error) {
      console.error("Error deleting chat:", error);
    }
  };

  // Cleanup listeners when the component unmounts
  useEffect(() => {
    return () => {
      for (const chatId in unsubscribeFunctions) {
        unsubscribeFunctions[chatId]();
      }
    };
  }, [unsubscribeFunctions]);

  const handleSignOut = async () => {
    try {
      await logOut();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      {isOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
          onClick={closeSidebar}
        ></div>
      )}
      <div
        className={`fixed top-0 left-0 h-screen w-[70%] bg-gray-800 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform ease-in-out duration-300 
      bg-sideBarBackgroundColor-light dark:bg-sideBarBackgroundColor-dark md:w-80  flex flex-col text-textColor-light
      `}
      >
        {/* New Chat Section  */}
        <div
          className="m-4 flex items-center hover:bg-hoverColor-light p-2 rounded cursor-pointer 
        dark:hover:dark:bg-hoverColor-dark dark:text-textColor-dark"
          onClick={handleCreateNewChat}
        >
          <img
            src={womenLogo}
            alt={womenLogo}
            className="rounded-full h-8 w-8 object-cover"
          />
          <span className="ml-2 ">New chat</span>
          <RiChatNewLine className="h-5 w-5 ml-auto " />
        </div>

        {/* Chat Section */}
        <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-webkit ">
          {chats?.docs.map((chat) => (
            <Link
              to={`/chat/${chat.id}`}
              className={`${
                activeChat === chat.id &&
                "bg-hoverColor-light dark:bg-hoverColor-dark"
              } m-4 flex items-center group p-2 rounded cursor-pointer hover:border-2 hover:bg-hoverColor-light dark:hover:bg-hoverColor-dark`}
              key={chat.id}
              id={chat.id}
            >
              <span className="ml-2 dark:text-textColor-dark">
                {chatTitles[chat.id]}
              </span>
              <BsFillTrashFill
                onClick={() => handleDeleteChat(chat.id)}
                className="dark:hover:text-red-900 hover:text-red-900 dark:text-textColor-dark h-5 w-5 ml-auto opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-opacity ease-in-out duration-300"
              />
            </Link>
          ))}
        </div>

        {/* Profile Section */}
        <div
          className="flex items-center justify-between m-2 p-2 hover:bg-hoverColor-light rounded cursor-pointer dark:hover:bg-hoverColor-dark "
          onClick={handleSignOut}
        >
          <img
            src={auth?.currentUser?.photoURL}
            alt={auth?.currentUser?.photoURL}
            className="rounded-full h-8 w-8 object-cover"
          />
          <span className="text-xs font-bold dark:text-textColor-dark">
            {auth?.currentUser?.displayName}
          </span>
          <CiLogout className="h-5 w-5 dark:text-textColor-dark" />
        </div>
      </div>
    </>
  );
});

export default Sidebar;
