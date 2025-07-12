import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import ContactPage from "./pages/ContactPage";
import AboutUsPage from "./pages/AboutUsPage";
import JoinUsPage from "./pages/JoinUsPage";
import MembershipForm from "./pages/MembershipForm";
import DonatePage from "./pages/DonatePage";
import ThankYouPage from "./pages/ThankYouPage";
import Login from "./pages/Login";               // ✅ New
import Register from "./pages/Register";         // ✅ New
import DonorDashboard from "./pages/DonorDashboard"; // ✅ New

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/about-us" element={<AboutUsPage />} />
        <Route path="/contact-us" element={<ContactPage />} />
        <Route path="/join-us" element={<JoinUsPage />} />
        <Route path="/membership" element={<MembershipForm />} />
        <Route path="/donate" element={<DonatePage />} />
        <Route path="/thank-you" element={<ThankYouPage />} />
        <Route path="/login" element={<Login />} />             {/* ✅ Added */}
        <Route path="/register" element={<Register />} />       {/* ✅ Added */}
        <Route path="/dashboard" element={<DonorDashboard />} />{/* ✅ Added */}
      </Routes>
    </Router>
  );
}

export default App;
