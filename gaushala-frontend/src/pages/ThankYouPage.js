import React from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import "./ThankYouPage.css";


const ThankYouPage = () => {
  return (
    <>
      <Navbar />
      <div style={{ textAlign: "center", padding: "60px" }}>
        <h2>🙏 Thank You for Your Donation!</h2>
        <p>Your support means a lot to us and our cows.</p>
      </div>
      <Footer />
    </>
  );
};

export default ThankYouPage;
