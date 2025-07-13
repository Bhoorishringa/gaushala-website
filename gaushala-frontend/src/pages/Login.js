// gaushala-frontend/src/pages/Login.js

import React, { useState } from "react";
import "./Auth.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import { postData } from "../utils/auth";


const Login = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await postData("/api/auth/login", form); // 🔥 using helper
      if (data.success) {
        alert("✅ Login successful!");
        navigate("/dashboard");
      } else {
        alert("❌ " + data.message);
      }
    } catch (err) {
      console.error(err);
      alert("❌ Server error");
    }
  };

  return (
    <>
      <Navbar />
      <div style={{ marginTop: "100px", padding: "20px" }}>
        {/* ... your login/register form content here ... */}
      </div>
      <div className="auth-container">
        <form className="auth-form" onSubmit={handleSubmit}>
          <h2>Donor Login</h2>
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={form.password}
            onChange={handleChange}
            required
          />
          <button type="submit" className="auth-btn">Login</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default Login;
