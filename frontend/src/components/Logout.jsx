import React from "react";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    await fetch("http://127.0.0.1:8000/accounts/logout/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
    });

    localStorage.removeItem("isAuthenticated");
    navigate("/home");
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
