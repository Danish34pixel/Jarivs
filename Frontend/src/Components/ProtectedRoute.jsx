import React, { useContext } from "react";
import { UserDataContext } from "../Context/UserContext";

const ProtectedRoute = () => {
  const { userData, setUserData, ServerUrl } = useContext(UserDataContext);

  console.log(userData, "JH");
  return <div></div>;
};

export default ProtectedRoute;
