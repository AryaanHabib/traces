import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        backgroundColor: "#a0aef4", // Light neutral background for the outer container
        padding: "20px",
        minHeight: "100vh", // Ensure full-page height
      }}
    >
      <div
        style={{
          margin: "20px auto", // Add margins and center the inner card
          padding: "20px",
          backgroundColor: "#546aef", // Light Blue for the card
          borderRadius: "8px",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Enhanced shadow for depth
          maxWidth: "800px", // Limit width
          color: "#fff", // Navy Blue text
          fontWeight: "bold", // Bold all text
        }}
      >
        <h1
          style={{
            fontSize: "2.5rem",
            textAlign: "center",
            marginBottom: "20px",
            color: "#0b1a79",
            fontWeight: "bold"
          }}
        >
          About Us
        </h1>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.6",
            textAlign: "justify",
            marginBottom: "30px",
          }}
        >
          Welcome to our platform! Learn more about what we do and how we can
          help you achieve your goals.
        </p>
        <div style={{ textAlign: "center" }}>
          <button
            onClick={() => navigate("/auth")}
            style={{
              padding: "10px 20px",
              backgroundColor: "#0b1a79", // Primary Blue for the button
              color: "#fff", // White text
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              fontSize: "1rem",
              fontWeight: "bold", // Bold text for the button
            }}
          >
            Go to Login/Signup
          </button>
        </div>
      </div>
    </div>
  );
};

export default About;
