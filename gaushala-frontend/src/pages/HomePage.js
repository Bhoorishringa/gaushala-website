import React, { useEffect } from "react";
import "./HomePage.css";
import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import logo from "../assets/images/logo.png";

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

      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Shyamsunder Gaushala</h1>
          <p>Dedicated to the welfare of cows and preserving our culture</p>
          <Link to="/donate" className="btn">Donate Now</Link>
        </div>
      </section>

      <section className="how-we-started">
        <h2>How We Started</h2>
        <div className="video-wrapper">
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/NrfDAzfWq58"
              title="Our Story Video 1"
              allowFullScreen
            />
          </div>
          <div className="video-container">
            <iframe
              src="https://www.youtube.com/embed/LEkjfQ5RRz0"
              title="Our Story Video 2"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <div className="text-1">
        <p>
          We are sharing our story with you in this video... Please watch it fully to know the genesis of Shri Shyam Sunder Gaushala.
        </p>
        <p>
          We request you to see this 3-minute video fully to understand the mission and journey of our Gaushala.
        </p>
      </div>

      <section className="donate-appeal">
        <div className="donate-text">
          <h2>Support the Cause</h2>
          <p>
            Monetarily or otherwise, every contribution is extremely important.
            Be a part of this noble cause and help us preserve our cows and culture.
          </p>
          <Link to="/donate" className="btn donate-btn">Donate Now</Link>
        </div>
      </section>

      <section className="gallery-section">
        <h2 className="beauty">Beautiful Cows of Our Gaushala</h2>
        <div className="gallery">
          {[102, 103, 104, 105, 106, 107, 108].map((num) => (
            <img
              key={num}
              src={require(`../assets/images/${num}.jpg`)}
              alt={`Cow ${num}`}
              loading="lazy"
            />
          ))}
        </div>
      </section>

      <section className="inspiration-section">
        <h2>Our Source of Inspirations</h2>
        <p>We are blessed by the following great souls in this selfless program:</p>
        <div className="inspiration-grid">
          {[
            {
              img: "Ramesh-Babaji-Maharaj-final.jpg",
              title: "HH Ramesh Babaji Maharaj",
              desc: "Founder of Mataji Gaushala, Barsana",
            },
            {
              img: "Radha_Govinda_Maharaj-2.jpg",
              title: "HH Radha Govind Maharaj",
              desc: "Our Guru Maharaj from ISKCON",
            },
            {
              img: "sri-rajendradas-ji-maharaj-final.jpg",
              title: "HH Rajendra Das Ji Maharaj",
              desc: "Founder and Caretaker",
            },
            {
              img: "Kurma-rupa-prabhuji-2.jpg",
              title: "HG Kurma Rupa Prabhu",
              desc: "Founder of Care For Cow, Vrindavan",
            },
          ].map((person, i) => (
            <div key={i} className="inspiration-card">
              <img src={require(`../assets/images/${person.img}`)} alt={person.title} />
              <h3>{person.title}</h3>
              <p>{person.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <Footer />
    </>
  );
};

export default HomePage;
