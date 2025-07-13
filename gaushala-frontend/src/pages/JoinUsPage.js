import React, { useEffect } from "react";
import "./JoinUsPage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import logo from "../assets/images/logo.png"; // ✅ Adjust path as needed


const JoinUsPage = () => {
  useEffect(() => {
    const handleScroll = () => {
      const navbar = document.querySelector(".navbar");
      if (window.scrollY > 50) navbar?.classList.add("shrink");
      else navbar?.classList.remove("shrink");
    };

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          entry.target.classList.toggle("in-view", entry.isIntersecting);
        });
      },
      { threshold: 0.2 }
    );

    const sections = document.querySelectorAll(".footer-container > div");
    sections.forEach((section) => observer.observe(section));

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
            <header>
                <nav className="navbar">
                    <div className="logo">
                        <Link to="/"><img width="170" src={logo} alt="Logo" /></Link>
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

            <div className="container">
                <h1>Join us now</h1>
                <h3>"Serve mother cow & save the world!"</h3>

                <h2>Gau Seva</h2>
                <p>There are many ways to please Lord Gopal but we at Bhoorishringa Foundation are most inspired by these two statements: "O Uddhava, I can be worshiped within the cows by offerings of grass and other suitable grains and paraphernalia for their pleasure and health" [SB.11.11.43]:</p>
                <p>and</p>
                <p>"Worship of the cow is accomplished by gently scratching, by the offering of green grass, and by circumambulating.</p>
                <p>By pleasing the cow, Sri Gopal is pleased." [Gautamiya Tantra] Our hope is to render selfless service to the cows with the hope that Sri Gopal will be pleased, for if He is, there is nothing left to be achieved. We are welcoming Gau bhaktas from around the globe to join hands in this noble endeavor to make this small effort into a big movement.</p>

                <h2>Volunteer :</h2>
                <p>There are countless ways to join the effort in saving Gau Mata as per the talent one possesses. It requires expertise in all fields to present correct picture of Gaumata. In addition to those who love physically serving mother cows and her progeny, experts are required in field of educating, managing, event coordinating, designing, cooking, and so on. If you're interested in donating a little time to help out, or gradually wish to make this your full time career, please contact us! Tell us about yourself. Together we can make big difference for protection and care of mother cows and her progeny.</p>

                <h2>Donation :</h2>
                <p>If you don’t have any spare time but would like to offer something, each and every donation, big or small is greatly appreciated. Donations are used for food, medicine, the proper functioning of gaushalas and educating society on our beloved Gau Mata!</p>
                <p><strong>We would like to give eternal thanks and blessings to ALL gau bhaktas! Jai Gau Mata!</strong></p>
                <div className="cta">
                    <p>Please fill the membership form by clicking on the following button:</p>
                    <Link to="/membership"><i className="fa-solid fa-file-signature"></i> Membership Form</Link>
                </div>
            </div>

            <footer className="site-footer">
                <div className="footer-container">
                    <div className="footer-left">
                        <img src={logo} alt="Logo" className="footer-logo" />
                        <p className="footer-quote">"O Uddhava, I can be worshiped within the cows..."</p>
                        <div className="social-icons">
                            <a href="#"><i className="fab fa-facebook-f"></i></a>
                            <a href="#"><i className="fab fa-twitter"></i></a>
                            <a href="#"><i className="fab fa-pinterest-p"></i></a>
                            <a href="#"><i className="fab fa-instagram"></i></a>
                            <a href="#"><i className="fab fa-linkedin-in"></i></a>
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
                            <li><i className="fas fa-map-marker-alt"></i> SHF-1, 6/166, Rajender Nagar, Ghaziabad, 201005</li>
                            <li><i className="fas fa-phone-alt"></i> +91-9650129944</li>
                            <li><i className="fas fa-envelope"></i> <a href="mailto:bhoorishringa@gmail.com">bhoorishringa@gmail.com</a></li>
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

export default JoinUsPage;
