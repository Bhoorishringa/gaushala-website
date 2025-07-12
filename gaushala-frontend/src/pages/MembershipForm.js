import React, { useState } from "react";
import "./MembershipForm.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
const educationOptions = [
  "High School", "Intermediate", "Graduate", "Post Graduate", "PhD", "Other"
];

const professionOptions = [
  "Student", "Teacher", "Doctor", "Engineer", "Lawyer", "Businessman", "Politician", "Farmer", "Other"
];

const genders = ["Male", "Female", "Other"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const MembershipForm = () => {
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    fatherName: "",
    motherName: "",
    dob: "",
    gender: "",
    maritalStatus: "",
    mobile: "",
    mobileOTP: "",
    email: "",
    emailOTP: "",
    bloodGroup: "",
    education: "",
    profession: "",
    corrAddress: {
      flat: "", line2: "", city: "", country: "", state: "", district: "", pin: ""
    },
    permAddress: {
      flat: "", line2: "", city: "", country: "", state: "", district: "", pin: ""
    },
    ideology: "",
    otherAffiliation: "",
    contribution: "",
    photo: null
  });

  const [otpState, setOtpState] = useState({
    mobileSent: false, mobileVerified: false,
    emailSent: false, emailVerified: false
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (type, e) => {
    const { name, value } = e.target;
    setForm(prev => ({
      ...prev,
      [type]: { ...prev[type], [name]: value }
    }));
  };

const sendOTP = async (type) => {
  const endpoint = type === "email"
    ? "http://localhost:5000/api/members/send-email-otp"
    : "http://localhost:5000/api/members/send-mobile-otp";

  const payload = type === "email" ? { email: form.email } : { mobile: form.mobile };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      alert(`${type === "email" ? "Email" : "Mobile"} OTP Sent`);
      setOtpState(prev => ({ ...prev, [`${type}Sent`]: true }));
    } else {
      alert("Failed to send OTP");
    }
  } catch (err) {
    console.error("OTP Send Error:", err);
    alert("Server error while sending OTP");
  }
};


const verifyOTP = async (type) => {
  const endpoint = type === "email"
    ? "http://localhost:5000/api/members/verify-email-otp"
    : "http://localhost:5000/api/members/verify-mobile-otp";

  const payload = type === "email"
    ? { email: form.email, otp: form.emailOTP }
    : { mobile: form.mobile, otp: form.mobileOTP };

  try {
    const res = await fetch(endpoint, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await res.json();
    if (data.success) {
      alert(`${type === "email" ? "Email" : "Mobile"} Verified`);
      setOtpState(prev => ({ ...prev, [`${type}Verified`]: true }));
    } else {
      alert("Invalid OTP");
    }
  } catch (err) {
    console.error("OTP Verify Error:", err);
    alert("Server error while verifying OTP");
  }
};


  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!otpState.mobileVerified || !otpState.emailVerified) {
      alert("Please verify both Email and Mobile OTPs");
      return;
    }

    try {
      const formData = new FormData();

      // Simple fields
      Object.entries(form).forEach(([key, value]) => {
        if (key === "corrAddress" || key === "permAddress") {
          Object.entries(value).forEach(([subKey, subVal]) => {
            formData.append(`${key}[${subKey}]`, subVal);
          });
        } else if (key === "photo") {
          if (value) formData.append("photo", value);
        } else {
          formData.append(key, value);
        }
      });

      const res = await fetch("http://localhost:5000/api/members/submit", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Form submitted successfully!");
      } else {
        console.error(data);
        alert("❌ Submission failed");
      }
    } catch (error) {
      console.error("Submit error:", error);
      alert("❌ Server error");
    }
  };


  return (
    <>
      <Navbar />
      <div className="membership-container">
        <h2>Membership Form</h2>
        <form onSubmit={handleSubmit} className="membership-form">
          <div className="form-grid">
            <label>First Name</label>
            <input name="firstName" value={form.firstName} onChange={handleChange} required />

            <label>Last Name</label>
            <input name="lastName" value={form.lastName} onChange={handleChange} required />

            <label>Father's Name</label>
            <input name="fatherName" value={form.fatherName} onChange={handleChange} required />

            <label>Mother's Name</label>
            <input name="motherName" value={form.motherName} onChange={handleChange} required />

            <label>Date of Birth</label>
            <input type="date" name="dob" value={form.dob} onChange={handleChange} required />

            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select</option>
              {genders.map(g => <option key={g} value={g}>{g}</option>)}
            </select>

            <label>Marital Status</label>
            <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} required>
              <option value="">Select</option>
              {maritalStatusOptions.map(m => <option key={m} value={m}>{m}</option>)}
            </select>

            <label>Mobile Number</label>
            <div className="otp-row">
              <input name="mobile" value={form.mobile} onChange={handleChange} required disabled={otpState.mobileVerified} />
              <button type="button" onClick={() => sendOTP('mobile')} disabled={otpState.mobileSent || otpState.mobileVerified}>Send OTP</button>
            </div>
            {otpState.mobileSent && !otpState.mobileVerified && (
              <div className="otp-row">
                <input name="mobileOTP" placeholder="Enter OTP" value={form.mobileOTP} onChange={handleChange} />
                <button type="button" onClick={() => verifyOTP('mobile')}>Verify</button>
              </div>
            )}

            <label>Email</label>
            <div className="otp-row">
              <input name="email" type="email" value={form.email} onChange={handleChange} required disabled={otpState.emailVerified} />
              <button type="button" onClick={() => sendOTP('email')} disabled={otpState.emailSent || otpState.emailVerified}>Send OTP</button>
            </div>
            {otpState.emailSent && !otpState.emailVerified && (
              <div className="otp-row">
                <input name="emailOTP" placeholder="Enter OTP" value={form.emailOTP} onChange={handleChange} />
                <button type="button" onClick={() => verifyOTP('email')}>Verify</button>
              </div>
            )}

            <label>Blood Group</label>
            <select name="bloodGroup" value={form.bloodGroup} onChange={handleChange}>
              <option value="">Select</option>
              {bloodGroups.map(bg => <option key={bg} value={bg}>{bg}</option>)}
            </select>

            <label>Education</label>
            <select name="education" value={form.education} onChange={handleChange}>
              <option value="">Select</option>
              {educationOptions.map(e => <option key={e} value={e}>{e}</option>)}
            </select>

            <label>Profession</label>
            <select name="profession" value={form.profession} onChange={handleChange}>
              <option value="">Select</option>
              {professionOptions.map(p => <option key={p} value={p}>{p}</option>)}
            </select>
          </div>

          <h3>Correspondence Address</h3>
          <div className="form-grid">
            {["flat", "line2", "city", "country", "state", "district", "pin"].map(field => (
              <React.Fragment key={field}>
                <label>{field.replace(/^\w/, c => c.toUpperCase()).replace("line2", "Address Line 2")}</label>
                <input name={field} value={form.corrAddress[field]} onChange={(e) => handleAddressChange('corrAddress', e)} />
              </React.Fragment>
            ))}
          </div>

          <h3>Permanent Address</h3>
          <div className="form-grid">
            {["flat", "line2", "city", "country", "state", "district", "pin"].map(field => (
              <React.Fragment key={field}>
                <label>{field.replace(/^\w/, c => c.toUpperCase()).replace("line2", "Address Line 2")}</label>
                <input name={field} value={form.permAddress[field]} onChange={(e) => handleAddressChange('permAddress', e)} />
              </React.Fragment>
            ))}
          </div>
          <h3 className="section-title">Other Details</h3>

          <label>Political Inclination and Ideology</label>
          <textarea name="ideology" value={form.ideology} onChange={handleChange} />

          <label>If member of any org, provide details</label>
          <textarea name="otherAffiliation" value={form.otherAffiliation} onChange={handleChange} />

          <label>How would you like to contribute?</label>
          <textarea name="contribution" value={form.contribution} onChange={handleChange} />
          <h3 className="section-title">Select Your Photo</h3>

          <label>Upload Photo</label>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button type="submit" className="btn join-btn">Submit</button>
        </form>
      </div>
      <Footer />

    </>
  );
};

export default MembershipForm;
