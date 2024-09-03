import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForms.scss";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://127.0.0.1:8000/accounts/login/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      localStorage.setItem("isAuthenticated", "true");
      navigate("/");
    } else {
      console.error(data.error || "Login failed");
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Login</h2>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="auth-input"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="auth-input"
        />
        <p className="reset">
          <Link to="">Forgot your passowrd?</Link>
        </p>

        <button type="submit" className="auth-button">
          Login
        </button>
        <p className="auth-switch">
          Don't have an Account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
