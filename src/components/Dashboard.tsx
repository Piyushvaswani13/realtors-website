// Dashboard.tsx
import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./Dashboard.css";
import PropertySearch from "./PropertySearch.tsx";

const Dashboard: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/login"); // Redirect to login if no token is found
    }
  }, [navigate]);

  return (
    <div className="dashboard">
      {/* Header Section */}
      <header className="dashboard-header">
        <div className="logo">
          <img src="/realtors.png" alt="Logo" />
        </div>
        <nav className="dashboard-nav">
          <Link to="/property-list" className="nav-link">Property List</Link>
          <Link to="/add-property" className="nav-link">Add Property</Link>
          <Link to="/about-us" className="nav-link">About</Link>
          <Link to="/contact" className="nav-link">Contact</Link>
        </nav>
      </header>

      {/* Main Content Section */}
      <main className="dashboard-content">
        <PropertySearch />
      </main>
    </div>
  );
};

export default Dashboard;
