import React, { useState, useEffect, useRef } from "react";
import womenLogo from "../../src/Assets/Images/2.png";
import { auth, db } from "../Firebase/firebaseConfig";
import { MdOutlineInsertPhoto } from "react-icons/md";
import {
  addDoc,
  collection,
  onSnapshot,
  query,
  serverTimestamp,
  orderBy,
} from "firebase/firestore";
import { useParams } from "react-router-dom";

const MainChat = () => {
  const { chatId } = useParams();
  const currentUser = auth?.currentUser;
  const [prompt, setPrompt] = useState("");
  const [messages, setMessages] = useState([]);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const chatMessagesQuery = query(
      collection(db, "users", currentUser?.email, "chats", chatId, "messages"),
      orderBy("createdAt", "asc")
    );

    const unsubscribe = onSnapshot(chatMessagesQuery, (snapshot) => {
      const messageData = snapshot.docs.map((doc) => doc.data());
      setMessages(messageData);

      // Scroll to the bottom when new messages are added
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    });

    return () => unsubscribe();
  }, [currentUser, chatId]);

  const sendMessage = async (e) => {
    e.preventDefault();
    if (!prompt) return;

    const input = prompt.trim();

    setPrompt("");

    const userMessage = {
      text: input,
      type: "user",
      createdAt: serverTimestamp(),
    };

    const systemResponse = {
      text: "Hello, I am Robot",
      type: "system",
      createdAt: serverTimestamp(),
    };

    const chatRef = collection(
      db,
      "users",
      currentUser?.email,
      "chats",
      chatId,
      "messages"
    );

    await addDoc(chatRef, userMessage);
    await addDoc(chatRef, systemResponse);
  };

  return (
    <>
      <div
        className="mx-auto w-4/5 flex-1 overflow-y-auto scrollbar-thin scrollbar-webkit dark:text-textColor-dark"
        ref={chatContainerRef}
      >
        <div className="w-[90%] mx-auto">
          {messages.map((message, index) => (
            <div key={index} className="flex flex-wrap items-start m-6">
              {message.type === "user" && (
                <img
                  src={currentUser?.photoURL}
                  alt={womenLogo}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}
              {message.type === "system" && (
                <img
                  src={womenLogo}
                  alt={womenLogo}
                  className="w-8 h-8 rounded-full mr-2"
                />
              )}

              <div className="w-[80%] inline-block break-words">
                {message.text}
              </div>
            </div>
          ))}
        </div>
      </div>

      <form
        onSubmit={sendMessage}
        className="w-4/5 h-14 flex justify-center items-center mx-auto"
      >
        <input
          type="text"
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter Your Message Here"
          className="h-12 w-4/5 rounded-full pl-4 dark:bg-sideBarBackgroundColor-dark dark:text-textColor-dark
                      disabled:cursor-not-allowed"
        />
        <MdOutlineInsertPhoto
          disabled={prompt === ""}
          className=" ml-6 h-8 w-8 dark:text-textColor-dark cursor-pointer 
        dark:hover:bg-hoverColor-dark hover:bg-hoverColor-light rounded-md"
        />
      </form>
    </>
  );
};

export default MainChat;