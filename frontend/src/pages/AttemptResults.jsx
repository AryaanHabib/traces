import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AttemptResults = () => {
  const { state } = useLocation();
  const { coordinates, steps, timeTaken } = state || {};

  const navigate = useNavigate();

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold", // Bold all text
        backgroundColor: "#f9f9f9", // Light background
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h1
        style={{
          fontSize: "2.5rem",
          marginBottom: "20px",
          color: "#0b1a79", // Navy Blue
          fontWeight: "bold"
        }}
      >
        Attempt Results
      </h1>
      <p
        style={{
          fontSize: "1.2rem",
          margin: "10px 0",
          color: "#546aef", // Primary Blue
        }}
      >
        Total Steps: <span style={{ color: "#0b1a79" }}>{steps}</span>
      </p>
      <p
        style={{
          fontSize: "1.2rem",
          margin: "10px 0",
          color: "#546aef", // Primary Blue
        }}
      >
        Time Taken: <span style={{ color: "#0b1a79" }}>{timeTaken}s</span>
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          borderRadius: "8px",
          backgroundColor: "#a0aef4", // Light Blue
          color: "#0b1a79", // Navy Blue text
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)", // Add depth
          textAlign: "center",
          fontWeight: "bold",
        }}
      >
        <h2
          style={{
            fontSize: "1.8rem",
            marginBottom: "15px",
            fontWeight: "bold",
          }}
        >
          Route Trace
        </h2>
        <pre
          style={{
            textAlign: "left",
            backgroundColor: "#546aef", // Primary Blue for trace background
            color: "#fff", // White text for contrast
            padding: "10px",
            borderRadius: "8px",
            overflowX: "auto",
            fontSize: "1rem",
          }}
        >
          {JSON.stringify(coordinates, null, 2)}
        </pre>
      </div>

      <button
        onClick={() => navigate("/challenges")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#546aef", // Primary Blue
          color: "#fff", // White text
          border: "none",
          borderRadius: "5px",
          fontSize: "1.2rem",
          marginTop: "20px",
          cursor: "pointer",
          fontWeight: "bold",
        }}
      >
        Back to Challenges
      </button>
    </div>
  );
};

export default AttemptResults;
