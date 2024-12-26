import React from "react";
import "./AboutUsPage.css";

const AboutUsPage: React.FC = () => {
  return (
    <div className="about-us-container">
      <h1>About Us</h1>
      <p>
        Welcome to Realtors, your trusted partner in finding your dream property. With years of 
        expertise in real estate, we pride ourselves on connecting people with their perfect homes 
        and investment opportunities.
      </p>
      <p>
        Our mission is to make property buying, selling, and renting a seamless experience. 
        We strive to provide exceptional service, innovative solutions, and a commitment to 
        customer satisfaction.
      </p>
      <p>Thank you for choosing Realtors. Let's build your future together.</p>
      <img src="/realtors.png" alt="logo" className="about-us-image" />
    </div>
  );
};

export default AboutUsPage;
