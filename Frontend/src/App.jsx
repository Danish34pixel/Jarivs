import { Routes, Route, Navigate } from "react-router-dom";
import React, { useContext } from "react";
import SignUp from "./Components/SignUp";
import LogIn from "./Components/LogIn";
import Customization from "./Components/Customization";
import Home from "./Components/Home";
import { UserDataContext } from "./Context/UserContext.jsx";
import Costumize2 from "./Components/Costumize2.jsx";
import SIfra from "./Components/SIfra.jsx";

export const App = () => {
  const { userData: UserData } = useContext(UserDataContext);

  const isUserReady = UserData !== undefined; // Add a check for undefined
  const isUserComplete =
    UserData && UserData.assistantImage && UserData.assistantName;

  return (
    <Routes>
      {/* Root route — only redirect once UserData is ready */}

      <Route path="/" element={<Home />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/custom" element={<Customization />} />
      <Route path="/cos" element={<Costumize2 />} />
      <Route path="/sifre" element={<SIfra />} />
    </Routes>
  );
};

export default App;
