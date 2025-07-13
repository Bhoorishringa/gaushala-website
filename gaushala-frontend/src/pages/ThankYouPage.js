import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ThankYouPage.css";

const ThankYouPage = () => {
  return (
    <>
      <Navbar />
      <div className="thankyou-container">
        <h1>🙏 Thank You!</h1>
        <p>Your support means the world to us — and to our cows. 🐄</p>
        <p>We deeply appreciate your generosity and kindness.</p>
      </div>
      <Footer />
    </>
  );
};

export default ThankYouPage;
