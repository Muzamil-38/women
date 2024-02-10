// src/App.js
import React from "react";
import { Route, Routes } from "react-router-dom";
import WelcomePage from "./Pages/WelcomePage";
import ChatPage from "./Pages/ChatPage";
import { AuthContextProvider } from "./Context/AuthContext";
import Protected from "./Components/Protected";

const App = () => {
  return (
    <AuthContextProvider>
      <Routes>
        <Route path="/" exact element={<WelcomePage />} />
        <Route
          path="/chat/:chatId"
          exact
          element={
            <Protected>
              <ChatPage />
            </Protected>
          }
        />
      </Routes>
    </AuthContextProvider>
  );
};

export default App;
