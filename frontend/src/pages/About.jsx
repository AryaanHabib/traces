import React from "react";
import { useNavigate } from "react-router-dom";

const About = () => {
  const navigate = useNavigate();

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        borderRadius: "8px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
        maxWidth: "800px",
        marginLeft: "auto",
        marginRight: "auto",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", color: "#333", textAlign: "center" }}>
        About Us
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          lineHeight: "1.6",
          color: "#555",
          textAlign: "justify",
        }}
      >
        Welcome to our platform! Learn more about what we do and how we can help
        you achieve your goals.
      </p>
      <div style={{ marginTop: "30px", textAlign: "center" }}>
        <button
          onClick={() => navigate("/auth")}
          style={{
            padding: "10px 20px",
            backgroundColor: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          Go to Login/Signup
        </button>
      </div>
    </div>
  );
};

export default About;
