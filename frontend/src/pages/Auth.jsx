import React, { useState } from "react";

const Auth = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    console.log("Login successful!");
    onLogin(); // Trigger the login callback
  };

  const handleSignup = (e) => {
    e.preventDefault();
    console.log("Signup successful!");
    onLogin(); // Trigger the login callback
  };

  return (
    <div style={{ padding: "20px", maxWidth: "400px", margin: "auto" }}>
      <div style={{ display: "flex", justifyContent: "center", marginBottom: "20px" }}>
        <button
          style={{
            flex: 1,
            padding: "10px",
            background: isSignup ? "#007bff" : "#ddd",
            color: isSignup ? "#fff" : "#333",
            border: "none",
            borderRadius: "5px 0 0 5px",
            cursor: "pointer",
          }}
          onClick={() => setIsSignup(true)}
        >
          Sign Up
        </button>
        <button
          style={{
            flex: 1,
            padding: "10px",
            background: !isSignup ? "#007bff" : "#ddd",
            color: !isSignup ? "#fff" : "#333",
            border: "none",
            borderRadius: "0 5px 5px 0",
            cursor: "pointer",
          }}
          onClick={() => setIsSignup(false)}
        >
          Log In
        </button>
      </div>

      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        <div style={{ marginBottom: "15px" }}>
          <label>Email</label>
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
            }}
          />
        </div>
        <div style={{ marginBottom: "15px" }}>
          <label>Password</label>
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
            }}
          />
        </div>
        {isSignup && (
          <div style={{ marginBottom: "15px" }}>
            <label>Confirm Password</label>
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
              }}
            />
          </div>
        )}
        <button
          type="submit"
          style={{
            width: "100%",
            padding: "10px",
            background: "#007bff",
            color: "#fff",
            border: "none",
            borderRadius: "5px",
            cursor: "pointer",
          }}
        >
          {isSignup ? "Sign Up" : "Log In"}
        </button>
      </form>
    </div>
  );
};

export default Auth;
