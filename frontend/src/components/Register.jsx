import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../styles/AuthForms.scss";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== passwordConfirm) {
      console.error("Password do not match");
      return;
    }

    const response = await fetch(`http://127.0.0.1:8000/accounts/register/`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
        password_confirm: passwordConfirm,
      }),
    });
    const data = await response.json();

    if (response.ok) {
      navigate("/login");
    } else {
      console.error(data.error || "registration failed");
    }
  };

  return (
    <div className="auth-form-container">
      <form className="auth-form" onSubmit={handleSubmit}>
        <h2>Register</h2>
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
        <input
          type="password"
          placeholder="Confirm password"
          value={passwordConfirm}
          onChange={(e) => setPasswordConfirm(e.target.value)}
          className="auth-input"
        />
        <button type="submit" className="auth-button">
          Register
        </button>
        <p className="auth-switch">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
