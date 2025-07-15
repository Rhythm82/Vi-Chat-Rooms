import React from "react";
import "../styles/landpage.css";
import { Link, useNavigate } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa"; // Install react-icons if not yet
import { useState } from "react";


const LandPage = () => {
  const router = useNavigate();
    const [menuOpen, setMenuOpen] = useState(false);

  return (
    <div className="landPageContainer">
      <nav className="navBar glassNav">
        <div className="navLeft">
          <h2 className="logo">Vi-Chat Room</h2>
        </div>
        <div className={`navRight ${menuOpen ? "active" : ""}`}>
          <p
            onClick={() => {
              router("/fast-meeting");
            }}
          >
            Join as Guest
          </p>
          <p
            onClick={() => {
              router("/auth");
            }}
          >
            Register
          </p>
          <div
            onClick={() => {
              router("/auth");
            }}
            role="button"
          >
            <p>Login</p>
          </div>
        </div>
        <div
          className="hamburger"
          onClick={() => setMenuOpen((prev) => !prev)}
        >
          {menuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </nav>

      <div className="landingMain">
        <section className="textSection">
          <h1>
            <span
              className="highlight"
              style={{ color: "#0597f8d8", fontSize: "2.8rem" }}
            >
              Connect
            </span>{" "}
            with Your Network
          </h1>

          <p style={{ fontSize: "1.9rem" }}>
            Cover the Distance with Seamless Conversations — Wherever You Are.
          </p>
          <div role="button">
            <Link to={"/auth"} className="getStartedBtn">
              Get Started
            </Link>
          </div>
        </section>
        <section className="imageSection">
          <img src="/images/mobile.png" alt="" />
        </section >
      </div>
    </div>
  );
};

export default LandPage;
