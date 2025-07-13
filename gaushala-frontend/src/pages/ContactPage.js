import React, { useState, useEffect } from "react";
import "./ContactPage.css";
import logo from "../assets/images/logo.png";
import { Link } from "react-router-dom";
import { postData } from "../utils/auth";


const ContactPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    mobile: "",
    subject: "",
    message: "",
  });

  const [status, setStatus] = useState("");

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("Sending...");

    try {
      const result = await postData("/api/contact", formData);
      setStatus(result.message);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        mobile: "",
        subject: "",
        message: "",
      });
    } catch (err) {
      console.error(err);
      setStatus("Error sending message. Please try again later.");
    }
  };

  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const handleScroll = () => {
      if (window.scrollY > 50) navbar.classList.add("shrink");
      else navbar.classList.remove("shrink");
    };
    window.addEventListener("scroll", handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const footerSections = document.querySelectorAll(".footer-container > div");
    footerSections.forEach((section) => observer.observe(section));

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      {/* ✅ Your existing JSX remains unchanged below */}
      {/* Keep your entire original HTML structure, form, footer, etc. as-is */}
      {/* Only the fetch logic was updated above */}

      
<header>
        <nav className="navbar">
          <div className="logo">
            <a href="/"><img width="170" src={logo} alt="Logo" /></a>
          </div>
          <ul className="nav-links">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/about-us">About Us</Link></li>
            <li><Link to="#">Gallery</Link></li>
            <li><Link to="/contact-us">Contact Us</Link></li>
            <li><Link to="/donate">Donate</Link></li>
            <li><Link to="/join-us">Join Us</Link></li>
          </ul>
        </nav>
      </header>
      <div style={{ marginTop: "50px", padding: "20px" }}>
        {/* ... your login/register form content here ... */}
      </div>

      <div className="container">
        <h1>Contact Us</h1>
        <hr className="section-line" />
        <div className="contact-info">
          <p><strong>Shri Shyam Sunder Gaushala</strong> belongs to all cow-loving people. If you want to be part of this noble cause in any form, please do contact us.</p>
          <p>Kindly fill the following form to contact us; we will get back to you on your number.</p>
          <p>You may also write a mail to us at <strong>bhoorishringa@gmail.com</strong>.</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-row">
            <div>
              <label htmlFor="firstName">First Name <span className="required">*</span></label>
              <input type="text" id="firstName" name="firstName" value={formData.firstName} onChange={handleChange} required />
            </div>
            <div>
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" name="lastName" value={formData.lastName} onChange={handleChange} />
            </div>
          </div>
          <div>
            <label htmlFor="email">Email <span className="required">*</span></label>
            <input type="email" id="email" name="email" value={formData.email} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="mobile">Mobile Number <span className="required">*</span></label>
            <input type="tel" id="mobile" name="mobile" value={formData.mobile} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="subject">Subject <span className="required">*</span></label>
            <input type="text" id="subject" name="subject" value={formData.subject} onChange={handleChange} required />
          </div>
          <div>
            <label htmlFor="message">Your Message <span className="required">*</span></label>
            <textarea id="message" name="message" value={formData.message} onChange={handleChange} required></textarea>
          </div>
          <div className="submit-button">
            <button type="submit">Submit</button>
          </div>
          {status && <p className="form-status">{status}</p>}
        </form>
      </div>
       <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-left">
            <img src={logo} alt="Shyam Sundar Goshala Logo" className="footer-logo" />
            <p className="footer-quote">"O Uddhava, I can be worshiped within the cows..." (SB.11.11.43)</p>
            <div className="social-icons">
              <a href="https://www.facebook.com/people/Shyamsundergaushala/100067849740840/#"><i className="fab fa-facebook-f" /></a>
              <a href="#"><i className="fab fa-twitter" /></a>
              <a href="#"><i className="fab fa-pinterest-p" /></a>
              <a href="https://www.instagram.com/shyamsundergaushala/"><i className="fab fa-instagram" /></a>
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
              <li><i className="fas fa-envelope" /> <a href="mailto:bhoorishringa@gmail.com">bhoorishringa@gmail.com</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-dark-golden">
          <div className="footer-content">
            <p>Copyright © 2017.
              All rights reserved by <a href="https://shyamsundergoshala.com" target="_blank" rel="noreferrer">shyamsundergoshala.com</a>
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
    </>
  );
};

export default ContactPage;