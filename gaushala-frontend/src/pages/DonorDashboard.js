// pages/DonorDashboard.js
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useNavigate } from "react-router-dom";
import "./DonorDashboard.css";

const DonorDashboard = () => {
  const [donations, setDonations] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    fetch("http://localhost:5000/api/donate/my-donations", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) setDonations(data.donations);
        else alert("Failed to load donations");
      })
      .catch((err) => console.error("Fetch error:", err));
  }, [navigate]);

  return (
    <>
      <Navbar />
      <div className="dashboard-container">
        <h1>My Donations</h1>
        {donations.length === 0 ? (
          <p>No donations yet.</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Receipt</th>
                <th>Name</th>
                <th>Email</th>
                <th>Amount (₹)</th>
                <th>Date</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {donations.map((donation, index) => (
                <tr key={index}>
                  <td>
                    <button className="receipt-btn" onClick={() => alert("Receipt download coming soon")}>
                      Download
                    </button>
                  </td>
                  <td>{donation.name}</td>
                  <td>{donation.email}</td>
                  <td>₹{donation.amount}</td>
                  <td>{new Date(donation.createdAt).toLocaleDateString()}</td>
                  <td>{donation.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
      <Footer />
    </>
  );
};

export default DonorDashboard;
