import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../css/Payment.css";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Data coming from Courses page
  const data = location.state;

  // Safety check (important)
  if (!data) {
    return (
      <div className="payment-container">
        <h2>No course selected</h2>
        <button onClick={() => navigate("/courses")}>
          Go back to Courses
        </button>
      </div>
    );
  }

  const { className, stream, subject, price } = data;

  return (
    <div className="payment-container">
      <div className="payment-card">
        <h2>Confirm Enrollment</h2>

        <p><strong>Class:</strong> {className}</p>
        {stream && <p><strong>Stream:</strong> {stream}</p>}
        <p><strong>Subject:</strong> {subject}</p>
        <p><strong>Fee:</strong> ₹{price}</p>

        <button className="pay-btn">
          Pay & Enroll
        </button>
      </div>
    </div>
  );
};

export default Payment;
