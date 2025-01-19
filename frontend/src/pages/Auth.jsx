import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const Auth = ({ onLogin }) => {
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSignup = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user_signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: formData.name,
          user_id: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Signup failed");
      }

      alert("Signup successful!");
      onLogin();
      navigate("/home", { state: { userId: formData.email } });
    } catch (error) {
      console.error("Error during signup:", error);
      alert(error.message);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/api/user_login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          user_id: formData.email,
          password: formData.password,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Login failed");
      }

      alert("Login successful!");
      onLogin();
      navigate("/home", { state: { userId: formData.email } });
    } catch (error) {
      console.error("Error during login:", error);
      alert(error.message);
    }
  };

  return (
    <div
      style={{
        backgroundColor: "#a0aef4",
        color: "#0b1a79",
        padding: "20px",
        maxWidth: "400px",
        margin: "50px auto",
        borderRadius: "10px",
        boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
      }}
    >
      <h1
        style={{
          textAlign: "center",
          color: "#fff",
          marginBottom: "20px",
          fontWeight: "bold",
        }}
      >
        {isSignup ? "Create an Account" : "Welcome Back"}
      </h1>

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
            backgroundColor: isSignup ? "#546aef" : "#0b1a79",
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
            backgroundColor: !isSignup ? "#546aef" : "#0b1a79",
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

      <form onSubmit={isSignup ? handleSignup : handleLogin}>
        {isSignup && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#0b1a79", fontWeight: "bold" }}>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
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

        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#0b1a79", fontWeight: "bold" }}>User ID</label>
          <input
            type="userID"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
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

        <div style={{ marginBottom: "15px" }}>
          <label style={{ color: "#0b1a79", fontWeight: "bold" }}>Password</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
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

        {isSignup && (
          <div style={{ marginBottom: "15px" }}>
            <label style={{ color: "#0b1a79", fontWeight: "bold" }}>
              Confirm Password
            </label>
            <input
              type="password"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleInputChange}
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

        <button
          type="submit"
          style={{
            width: "100%",
            padding: "15px",
            backgroundColor: "#546aef",
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
