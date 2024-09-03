import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForms.scss";

const Reset = () => {
  const [email, setEmail] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(
      "http://127.0.0.1:8000/accounts/reset-password/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
        }),
      }
    );

    const data = await response.json();

    if (response.ok) {
      alert("Password reset link sent to your email.");
      navigate("/login");
    } else {
      console.error(data.error || "Password reset failed");
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Reset Password</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          Send Reset Link
        </button>
        <p className="auth-switch">
          Remembered your password? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Reset;
