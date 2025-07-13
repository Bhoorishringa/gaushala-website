import React, { useState } from "react";
import "./MembershipForm.css";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";
import { postData } from "../utils/auth";
import { BASE_URL } from "../utils/auth"; // ✅ Adjust path if needed



const educationOptions = ["High School", "Intermediate", "Graduate", "Post Graduate", "PhD", "Other"];
const professionOptions = ["Student", "Teacher", "Doctor", "Engineer", "Lawyer", "Businessman", "Politician", "Farmer", "Other"];
const genders = ["Male", "Female", "Other"];
const maritalStatusOptions = ["Single", "Married", "Divorced", "Widowed"];
const bloodGroups = ["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"];

const MembershipForm = () => {
  const [form, setForm] = useState({
    firstName: "", lastName: "", fatherName: "", motherName: "", dob: "", gender: "", maritalStatus: "",
    mobile: "", mobileOTP: "", email: "", emailOTP: "", bloodGroup: "", education: "", profession: "",
    corrAddress: { flat: "", line2: "", city: "", country: "", state: "", district: "", pin: "" },
    permAddress: { flat: "", line2: "", city: "", country: "", state: "", district: "", pin: "" },
    ideology: "", otherAffiliation: "", contribution: "", photo: null
  });

  const [otpState, setOtpState] = useState({
    mobileSent: false, mobileVerified: false,
    emailSent: false, emailVerified: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleAddressChange = (type, e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [type]: { ...prev[type], [name]: value }
    }));
  };

  const handleFileChange = (e) => {
    setForm({ ...form, photo: e.target.files[0] });
  };

  const sendOTP = async (type) => {
    const endpoint = `${BASE_URL}/api/members/send-${type}-otp`;
    const payload = type === "email" ? { email: form.email } : { mobile: form.mobile };

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (data.success) {
        alert(`${type.toUpperCase()} OTP Sent`);
        setOtpState((prev) => ({ ...prev, [`${type}Sent`]: true }));
      } else {
        alert(data.message || "Failed to send OTP");
      }
    } catch (err) {
      console.error("OTP Send Error:", err);
      alert("Server error while sending OTP");
    }
  };

  const verifyOTP = async (type) => {
    const endpoint = `${BASE_URL}/api/members/verify-${type}-otp`;
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
        alert(`${type.toUpperCase()} Verified`);
        setOtpState((prev) => ({ ...prev, [`${type}Verified`]: true }));
      } else {
        alert(data.message || "Invalid OTP");
      }
    } catch (err) {
      console.error("OTP Verify Error:", err);
      alert("Server error while verifying OTP");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpState.mobileVerified || !otpState.emailVerified) {
      alert("Please verify both Email and Mobile OTPs");
      return;
    }

    try {
      const formData = new FormData();

      Object.entries(form).forEach(([key, value]) => {
        if (key === "corrAddress" || key === "permAddress") {
          Object.entries(value).forEach(([k, v]) => {
            formData.append(`${key}[${k}]`, v);
          });
        } else if (key === "photo" && value) {
          formData.append("photo", value);
        } else {
          formData.append(key, value);
        }
      });

      const res = await fetch(`${BASE_URL}/api/members/submit`, {
        method: "POST",
        body: formData,
      });

      const data = await res.json();
      if (data.success) {
        alert("✅ Form submitted successfully!");
        window.location.href = "/thank-you";
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
            {[
              { label: "First Name", name: "firstName" },
              { label: "Last Name", name: "lastName" },
              { label: "Father's Name", name: "fatherName" },
              { label: "Mother's Name", name: "motherName" },
              { label: "Date of Birth", name: "dob", type: "date" },
            ].map(({ label, name, type }) => (
              <React.Fragment key={name}>
                <label>{label}</label>
                <input type={type || "text"} name={name} value={form[name]} onChange={handleChange} required />
              </React.Fragment>
            ))}

            <label>Gender</label>
            <select name="gender" value={form.gender} onChange={handleChange} required>
              <option value="">Select</option>
              {genders.map((g) => <option key={g} value={g}>{g}</option>)}
            </select>

            <label>Marital Status</label>
            <select name="maritalStatus" value={form.maritalStatus} onChange={handleChange} required>
              <option value="">Select</option>
              {maritalStatusOptions.map((m) => <option key={m} value={m}>{m}</option>)}
            </select>

            {/* MOBILE + OTP */}
            <label>Mobile Number</label>
            <div className="otp-row">
              <input name="mobile" value={form.mobile} onChange={handleChange} required disabled={otpState.mobileVerified} />
              <button type="button" onClick={() => sendOTP("mobile")} disabled={otpState.mobileSent || otpState.mobileVerified}>Send OTP</button>
            </div>
            {otpState.mobileSent && !otpState.mobileVerified && (
              <div className="otp-row">
                <input name="mobileOTP" placeholder="Enter OTP" value={form.mobileOTP} onChange={handleChange} />
                <button type="button" onClick={() => verifyOTP("mobile")}>Verify</button>
              </div>
            )}

            {/* EMAIL + OTP */}
            <label>Email</label>
            <div className="otp-row">
              <input type="email" name="email" value={form.email} onChange={handleChange} required disabled={otpState.emailVerified} />
              <button type="button" onClick={() => sendOTP("email")} disabled={otpState.emailSent || otpState.emailVerified}>Send OTP</button>
            </div>
            {otpState.emailSent && !otpState.emailVerified && (
              <div className="otp-row">
                <input name="emailOTP" placeholder="Enter OTP" value={form.emailOTP} onChange={handleChange} />
                <button type="button" onClick={() => verifyOTP("email")}>Verify</button>
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

          {/* Address Fields */}
          {["corrAddress", "permAddress"].map((addrKey) => (
            <React.Fragment key={addrKey}>
              <h3>{addrKey === "corrAddress" ? "Correspondence Address" : "Permanent Address"}</h3>
              <div className="form-grid">
                {["flat", "line2", "city", "country", "state", "district", "pin"].map((field) => (
                  <React.Fragment key={field}>
                    <label>{field === "line2" ? "Address Line 2" : field.charAt(0).toUpperCase() + field.slice(1)}</label>
                    <input name={field} value={form[addrKey][field]} onChange={(e) => handleAddressChange(addrKey, e)} />
                  </React.Fragment>
                ))}
              </div>
            </React.Fragment>
          ))}

          {/* Other Textareas */}
          <label>Political Inclination and Ideology</label>
          <textarea name="ideology" value={form.ideology} onChange={handleChange} />

          <label>If member of any org, provide details</label>
          <textarea name="otherAffiliation" value={form.otherAffiliation} onChange={handleChange} />

          <label>How would you like to contribute?</label>
          <textarea name="contribution" value={form.contribution} onChange={handleChange} />

          {/* Photo Upload */}
          <h3>Upload Your Photo</h3>
          <input type="file" accept="image/*" onChange={handleFileChange} />

          <button type="submit" className="btn join-btn">Submit</button>
        </form>
      </div>
      <Footer />
    </>
  );
};

export default MembershipForm;
