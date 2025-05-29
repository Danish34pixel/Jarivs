import React from "react";

const LogoutButton = ({ handleLogout }) => (
  <div className="absolute top-5 right-6 z-30">
    <button
      onClick={handleLogout}
      className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-lg hover:bg-red-700 transition duration-300"
    >
      Logout
    </button>
  </div>
);

export default LogoutButton;
