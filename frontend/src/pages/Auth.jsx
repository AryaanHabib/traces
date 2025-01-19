import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const navigate = useNavigate(); // Hook for navigation

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login successful!");
    onLogin(); // Trigger the login callback
    navigate("/home"); // Navigate to the Home Page
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup successful!");
    onLogin(); // Trigger the login callback
    navigate("/home"); // Navigate to the Home Page
  };

  return (
    <div
      style={{
        backgroundColor: "#a0aef4", // Light Blue Background
        color: "#0b1a79", // Deep Navy Blue for text
        padding: "20px",
        maxWidth: "400px",
        margin: "50px auto",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Title */}
      <h1
        style={{
          textAlign: "center",
          color: "#fff", // Primary Blue
          marginBottom: "20px",
          fontWeight: "bold"
        }}
      >
        {isSignup ? "Create an Account" : "Welcome Back"}
      </h1>

      {/* Toggle Buttons */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          marginBottom: "20px",
        }}
      >
        <button
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: isSignup ? "#546aef" : "#0b1a79", // Active and Inactive Colors
            color: "white",
            border: "none",
            borderRadius: "5px 0 0 5px",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => setIsSignup(true)}
        >
          Sign Up
        </button>
        <button
          style={{
            flex: 1,
            padding: "10px",
            backgroundColor: !isSignup ? "#546aef" : "#0b1a79", // Active and Inactive Colors
            color: "white",
            border: "none",
            borderRadius: "0 5px 5px 0",
            cursor: "pointer",
            fontWeight: "bold",
            transition: "background-color 0.3s ease",
          }}
          onClick={() => setIsSignup(false)}
        >
          Log In
        </button>
      </div>

      {/* Form */}
      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        {/* Email Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#0b1a79", fontWeight: "bold" }}>User ID</label>
          <input
            type="email"
            name="email"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Password Input */}
        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#0b1a79", fontWeight: "bold" }}>Password</label>
          <input
            type="password"
            name="password"
            required
            style={{
              display: "block",
              width: "100%",
              padding: "10px",
              marginTop: "5px",
              border: "1px solid #ddd",
              borderRadius: "5px",
              fontSize: "1rem",
            }}
          />
        </div>

        {/* Confirm Password (only for Signup) */}
        {isSignup && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#0b1a79", fontWeight: "bold" }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              required
              style={{
                display: "block",
                width: "100%",
                padding: "10px",
                marginTop: "5px",
                border: "1px solid #ddd",
                borderRadius: "5px",
                fontSize: "1rem",
              }}
            />
          </div>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#546aef", // Primary Blue
            color: "white",
            border: "none",
            borderRadius: "5px",
            fontSize: "1.2rem",
            fontWeight: "bold",
            cursor: "pointer",
            marginTop: "10px",
            transition: "background-color 0.3s ease",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0b1a79")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#546aef")}
        >
          {isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
