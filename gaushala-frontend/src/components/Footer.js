// src/components/Footer.js
import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import "./Footer.css";
import logo from '../assets/images/logo.png';

const Footer = () => {
  // ✅ Trigger animation on load
  useEffect(() => {
    const elements = document.querySelectorAll(".footer-container > div");
    elements.forEach((el) => el.classList.add("in-view"));
  }, []);

  return (
    <footer className="site-footer">
      <div className="footer-container">
        <div className="footer-left">
          <img src="../assets/images/logo.png" alt="Shyam Sundar Goshala Logo" className="footer-logo" />
          <p className="footer-quote">
            "O Uddhava, I can be worshiped within the cows..." (SB.11.11.43)
          </p>
          <div className="social-icons">
            <a href="https://www.facebook.com/people/Shyamsundergaushala/100067849740840/#">
              <i className="fab fa-facebook-f" />
            </a>
            <a href="#"><i className="fab fa-twitter" /></a>
            <a href="#"><i className="fab fa-pinterest-p" /></a>
            <a href="https://www.instagram.com/shyamsundergaushala/">
              <i className="fab fa-instagram" />
            </a>
            <a href="#"><i className="fab fa-linkedin-in" /></a>
          </div>
        </div>

        <div className="footer-links">
          <h3>Quick Links</h3>
          <ul>
            <li><Link to="/causes">Causes</Link></li>
            <li><Link to="/donate">Donate Now</Link></li>
            <li><Link to="/join-us">Join Us</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="/gallery">Gallery</Link></li>
            <li><Link to="/contact-us">Contact</Link></li>
          </ul>
        </div>

        <div className="footer-contact">
          <h3>Contact Us</h3>
          <ul>
            <li><i className="fas fa-map-marker-alt" /> SHF-1, 6/166, Rajender Nagar, Ghaziabad, 201005</li>
            <li><i className="fas fa-phone-alt" /> +91-9650129944</li>
            <li><i className="fas fa-envelope" /> 
              <a href="mailto:bhoorishringa@gmail.com">bhoorishringa@gmail.com</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="footer-dark-golden">
        <div className="footer-content">
          <p>
            Copyright © 2017. All rights reserved by{" "}
            <a href="https://shyamsundergoshala.com" target="_blank" rel="noreferrer">
              shyamsundergoshala.com
            </a>
          </p>
          <nav>
            <Link to="/">Home</Link>
            <Link to="/causes">Causes</Link>
            <Link to="/events">Events</Link>
            <Link to="/about-us">About</Link>
            <Link to="/blog">Blog</Link>
            <Link to="/contact-us">Contact</Link>
          </nav>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
