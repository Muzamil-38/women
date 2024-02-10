import React, { useEffect, useCallback } from "react";
import { motion } from "framer-motion";
import womenLogo from "../../src/Assets/Images/1.png";
import googleLogo from "../../src/Assets/Images/googleLogo.png";
import { UserAuth } from "../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { addDoc, collection, serverTimestamp } from "firebase/firestore";
import { auth, db } from "../Firebase/firebaseConfig";

const WelcomePage = () => {
  const { googleSignIn, user } = UserAuth();
  const navigate = useNavigate();

  const handleGoogleSignIn = useCallback(async () => {
    try {
      await googleSignIn();
    } catch (error) {
      console.error(error);
    }
  }, [googleSignIn]);

  useEffect(() => {
    const createChatAndNavigate = async () => {
      try {
        // Check if the user is authorized
        if (auth && auth.currentUser) {
          // Create a new chat document in the 'chats' collection
          const chatDocRef = await addDoc(
            collection(db, "users", auth.currentUser.email, "chats"),
            {
              userId: auth.currentUser.email,
              createdAt: serverTimestamp(),
            }
          );

          // Get the ID of the newly created chat
          const chatId = chatDocRef.id;

          // Navigate to the newly created chat
          navigate(`/chat/${chatId}`);
        } else {
          console.error("User is not authorized.");
        }
      } catch (err) {
        console.error("Error creating chat:", err);
      }
    };

    // Check if the user is authorized before attempting to create a chat
    if (user != null) {
      createChatAndNavigate();
    }
  }, [user, navigate]);
  
  return (
    <div className="bg-black w-screen h-screen flex overflow-hidden flex-col items-center justify-center text-center p-4 md:flex-row ">
      <div className="w-full md:w-3/5 text-white md:m-20">
        <h1 className="text-2xl md:text-3xl lg:text-4xl font-extrabold">
          Women2Women Chat Haven
        </h1>
        <p className="text-sm md:text-base lg:text-lg">
          Your Exclusive Space for Empowering Conversations! Immerse yourself in
          the ultimate chatbot AI assistant designed exclusively for women.
          Here, you'll find a supportive community that's tailored to provide
          motivation, tips, and tricks to uplift and inspire. Our AI companion
          is your personal guide, offering a wealth of knowledge to help you
          navigate life's challenges and celebrate your victories. Join us on
          this journey of empowerment, connection, and growth. Let the
          conversations begin!
        </p>
        <motion.div
          className="flex items-center justify-center mt-8"
          initial={{ y: 500 }}
          animate={{ y: 0 }}
          transition={{ type: "spring", duration: 2 }}
        >
          <div
            className="bg-white w-48 flex cursor-pointer rounded hover:bg-pink-100"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 2 }}
            onClick={handleGoogleSignIn}
          >
            <img src={googleLogo} alt="Google Logo" className="w-10 h-10 p-2" />
            <button className="text-black ml-2">Sign in with Google</button>
          </div>
        </motion.div>
      </div>

      <motion.img
        src={womenLogo}
        alt="Women Logo"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 2 }}
      />
    </div>
  );
};

export default WelcomePage;
