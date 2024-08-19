import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import MainPage from "./pages/MainPage";
import "./App.css";
import HomePage from "./pages/HomePage";
import Register from "./components/Register";
import Login from "./components/Login";
import Logout from "./components/Logout";
import { useEffect } from "react";

function App() {
  useEffect(() => {
    const checkAuth = async () => {
      const response = await fetch(
        "http://127.0.0.1:8000/accounts/is_logged_in",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.ok) {
        localStorage.setItem("isAuthenticated", "true");
      } else {
        localStorage.removeItem("isAuthenticated");
      }
    };

    checkAuth();
  }, []);

  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

  return (
    <div>
      <Router>
        <Routes>
          <Route
            path="*"
            element={isAuthenticated ? <MainPage /> : <Navigate to="/home" />}
          />
          <Route path="/home" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
