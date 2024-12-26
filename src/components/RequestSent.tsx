// RequestSent.tsx
import React from "react";
import { useNavigate } from "react-router-dom";
import './RequestSent.css';

const RequestSent: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="request-sent">
      <h2>Request Sent</h2>
      <p>Your registration as a builder has been sent for approval. Please wait for admin approval.</p>
      <button onClick={() => navigate("/login")}>Go to Login</button>
    </div>
  );
};

export default RequestSent;
