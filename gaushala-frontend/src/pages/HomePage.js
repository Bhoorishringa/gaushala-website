import React, { useEffect } from "react";
import "./HomePage.css"; // move all relevant styles here
import logo from '../assets/images/logo.png';
import Navbar from "../components/Navbar";
import { Link } from "react-router-dom";


const HomePage = () => {
  useEffect(() => {
    const navbar = document.querySelector(".navbar");
    const handleScroll = () => {
      if (window.scrollY > 50) navbar.classList.add("shrink");
      else navbar.classList.remove("shrink");
    };

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
    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "50px", padding: "20px" }}>
  {/* ... your login/register form content here ... */}
</div>

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Shyamsunder Gaushala</h1>
          <p>Dedicated to the welfare of cows and preserving our culture</p>
          <a href="/donate" className="btn">Donate Now</a>
        </div>
      </section>

      <section className="how-we-started" style={{ padding: "40px 0", backgroundColor: "#fafafa", textAlign: "center" }}>
        <h2 style={{ marginBottom: "40px", fontSize: "28px", fontWeight: "bold", color: "#333" }}>How We Started</h2>
        <div className="video-wrapper">
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/NrfDAzfWq58" title="Video 1" allowFullScreen />
          </div>
          <div className="video-container">
            <iframe src="https://www.youtube.com/embed/LEkjfQ5RRz0" title="Video 2" allowFullScreen />
          </div>
        </div>
      </section>

      <div className="text-1">
        <span>We are sharing our story with you in this video... Please watch it fully to know the genesis of Shri Shyam Sunder Gaushala.</span>
        <span>We request you to see this 3 minute video fully to know the genesis of shri shyam sunder Gaushala.</span>
      </div>

      <section className="donate-appeal">
        <div className="donate-text">
          <h2>Support the Cause</h2>
          <p>
            Monetarily or otherwise, every contribution is extremely important.<br />
            Be a part of the noble cause and help us preserve our cows and in turn our heritage.<br />
            <strong>Be part of the movement.</strong>
          </p>
          <a href="/donate" className="btn donate-btn">Donate Now</a>
        </div>
      </section>

      <section className="gallery-section">
        <h1 className="beauty">BEAUTIFUL COW OF OUR GAUSHALA</h1>
        <div className="gallery">
          {[102, 103, 104, 105, 106, 107, 108].map((num, index) => (
            <img
              key={index}
              src={require(`../assets/images/${num}.jpg`)}
              alt={`Cow ${index + 1}`}
            />
          ))}
        </div>
      </section>

      <section className="inspiration-section">
        <h2 className="inspiration-title">Our Source Of Inspirations</h2>
        <p className="inspiration-subtitle">We have got blessings of these great souls in this selfless noble program</p>
        <div className="inspiration-grid">
          {[
            { img: "Ramesh-Babaji-Maharaj-final.jpg", title: "His Holiness Ramesh Babaji Maharaj", desc: "Founder of Mataji Gaushala Barsana" },
            { img: "Radha_Govinda_Maharaj-2.jpg", title: "His Holiness Radha Govind Maharaj", desc: "Our Guru Maharaj from ISKCON" },
            { img: "sri-rajendradas-ji-maharaj-final.jpg", title: "His Holiness Rajendra Das Ji Maharaj", desc: "Founder and care taker" },
            { img: "Kurma-rupa-prabhuji-2.jpg", title: "His Grace Kurma Rupa Prabhu", desc: "Founder of Care For Cow Vrindavan" }
          ].map((item, i) => (
            <div key={i} className="inspiration-card">
              <img src={`../assets/images/${item.img}`} alt={item.title} />
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer className="site-footer">
        <div className="footer-container">
          <div className="footer-left">
            <img src="../assets/images/logo.png" alt="Shyam Sundar Goshala Logo" className="footer-logo" />
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

export default HomePage;
