// components/Navbar.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png";
import "./Navbar.css";

const Navbar = () => {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const handleScroll = () => {
      if (window.scrollY > 50) navbar.classList.add("shrink");
      else navbar.classList.remove("shrink");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header>
      <nav className="navbar">
        <div className="logo">
          <a href="/"><img width="170" src={logo} alt="Logo" /></a>
        </div>
        
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about-us">About Us</Link></li>
          <li><Link to="/gallery">Gallery</Link></li>
          <li><Link to="/contact-us">Contact Us</Link></li>
          <li><Link to="/donate">Donate</Link></li>
          <li><Link to="/join-us">Join Us</Link></li>
        </ul>

        <div className="auth-buttons">
          <Link to="/login" className="login-btn">Login</Link>
          <Link to="/register" className="register-btn">Register</Link>
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
