import React from 'react';
import { Link } from 'react-router-dom';
import './HomePage.css';

const HomePage: React.FC = () => {
  return (
    <div className="home-page">
      <div className="logo">
        <img src="/realtors.png" alt="Logo" />
      </div>
      <div className="buttons">
        <Link to="/register" className="btn signup-btn">
          Sign Up
        </Link>
        <Link to="/login" className="btn login-btn">
          Log In
        </Link>
      </div>
    </div>
  );
};

export default HomePage;
