import React, { useState } from "react";
import "./DonatePage.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { postData } from "../utils/auth";


const DonatePage = () => {
  const [form, setForm] = useState({
    name: "",
    email: "",
    mobile: "",
    amount: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const loadRazorpay = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement("script");
      script.src = src;
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleDonate = async (e) => {
    e.preventDefault();

    const res = await loadRazorpay("https://checkout.razorpay.com/v1/checkout.js");
    if (!res) {
      alert("Failed to load Razorpay SDK");
      return;
    }

    const data = await postData("/api/donate/create-order", { amount: form.amount });

    if (!data.success || !data.order) {
      alert("❌ Failed to create Razorpay order");
      return;
    }

    const { order } = data;

    const options = {
      key: "rzp_test_8HAgEFQfBxnAe4", // ✅ replace with production key if needed
      amount: order.amount,
      currency: "INR",
      name: "Shyamsunder Gaushala",
      description: form.message || "Donation",
      order_id: order.id,
      handler: async function (response) {
        try {
          const verifyData = await postData("/api/donate/verify-payment", {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            name: form.name,
            email: form.email,
            mobile: form.mobile,
            amount: form.amount,
            message: form.message,
          });

          if (verifyData.success) {
            window.location.href = "/thank-you";
          } else {
            alert("❌ Payment verified, but failed to save donation.");
          }
        } catch (error) {
          console.error("❌ Error verifying payment:", error);
          alert("❌ Something went wrong while verifying payment.");
        }
      },
      prefill: {
        name: form.name,
        email: form.email,
        contact: form.mobile,
      },
      theme: { color: "#8BC34A" },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  return (
    <>
           <Navbar />
      <div style={{ marginTop: "50px", padding: "20px" }}>
  {/* ... your login/register form content here ... */}
</div>

      {/* 🎥 Background Video */}
      <video autoPlay loop muted className="donation-video-bg">
        <source src="/videos/cow-running.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* 🔊 Optional Audio */}
      <audio autoPlay loop hidden>
        <source src="/audio/cow-bells.mp3" type="audio/mp3" />
      </audio>

      <div className="donation-form-overlay">
        <div className="donation-form-card">
          <h1>Support Our Gaushala 🙏</h1>
          <p>Your donation helps care for our cows and maintain the shelter.</p>

          <form onSubmit={handleDonate}>
            <input name="name" placeholder="Full Name" value={form.name} onChange={handleChange} required />
            <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required />
            <input name="mobile" placeholder="Mobile Number" value={form.mobile} onChange={handleChange} required />
            <input name="amount" type="number" placeholder="Amount (₹)" value={form.amount} onChange={handleChange} required />
            <textarea name="message" placeholder="Message (optional)" value={form.message} onChange={handleChange}></textarea>
            <button type="submit" className="donate-btn">Donate Now</button>
          </form>
        </div>
      </div>

      <Footer /> 
    </>
  );
};

export default DonatePage;
