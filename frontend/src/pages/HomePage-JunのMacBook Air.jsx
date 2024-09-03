import React from "react";
import { Link as RouterLink } from "react-router-dom";
import { Link } from "react-scroll";
import FAQSection from "../components/FAQSection";
import Pricing from "../components/Pricing";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowRightArrowLeft,
  faRightLong,
} from "@fortawesome/free-solid-svg-icons";
import "../styles/HomePage.scss";

const HomePage = () => {
  return (
    <div className="homepage">
      <header className="header">
        <div className="container">
          <h1 className="logo">NoteApp</h1>
          <nav>
            <ul className="nav-list">
              <li>
                <Link to="features" smooth={true} duration={500}>
                  Features
                </Link>
              </li>
              <li>
                <Link to="pricing" smooth={true} duration={500}>
                  Pricing
                </Link>
              </li>
              <li>
                <Link to="faq" smooth={true} duration={500}>
                  FAQ
                </Link>
              </li>
              <button>
                <RouterLink to="/login">Sign In</RouterLink>
                <FontAwesomeIcon icon={faArrowRightArrowLeft}></FontAwesomeIcon>
              </button>
            </ul>
          </nav>
        </div>
      </header>
      <main>
        <section id="hero" className="hero">
          <div className="container">
            <h2>Your Notes, Organized and Accessible</h2>
            <p>
              Keep your notes organized, searchable, and always accessible
              across devices with NoteApp.
            </p>
            <Link to="/register" className="cta-button">
              Get Started
            </Link>
          </div>
        </section>

        <section id="features" className="features">
          <div className="container">
            <div className="features-content">
              <div className="feature-items">
                <h2>Features</h2>
                <div className="feature-item">
                  <h3>Real-Time Sync</h3>
                  <p>Access your notes from any device, anywhere.</p>
                </div>
                <div className="feature-item">
                  <h3>Markdown Support</h3>
                  <p>Write and format your notes with Markdown.</p>
                </div>
                <div className="feature-item">
                  <h3>Organize with Folders</h3>
                  <p>Keep your notes tidy with a folder structure.</p>
                </div>
              </div>
              <div className="demo">
                <img src="img/NoteDemo.jpeg" alt="NoteApp Demo" />
              </div>
            </div>
          </div>
        </section>
        <section id="pricing">
          <Pricing />
        </section>
        <section id="faq">
          <FAQSection />
        </section>
      </main>

      <footer className="footer">
        <div className="container">
          <p>&copy; 2024 NoteApp. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default HomePage;
