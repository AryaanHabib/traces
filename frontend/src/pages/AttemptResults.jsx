import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AttemptResults = () => {
  const { state } = useLocation();
  const { challengeId, coordinates, steps, timeTaken } = state || {}; // Extract all values
  const navigate = useNavigate();

  const handleSaveAttempt = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/attempts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          coordinates,
          steps,
          time_taken: timeTaken,
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to save the attempt");
      }
      alert("Attempt saved successfully!");
    } catch (error) {
      console.error("Error saving attempt:", error);
    }
  };

  return (
    <div
      style={{
        padding: "20px",
        textAlign: "center",
        fontFamily: "Arial, sans-serif",
        fontWeight: "bold",
        backgroundColor: "#f9f9f9",
        height: "100vh",
        overflowY: "auto",
      }}
    >
      <h1 style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#0b1a79" }}>
        Attempt Results
      </h1>
      <p style={{ fontSize: "1.2rem", margin: "10px 0", color: "#546aef" }}>
        Total Steps: <span style={{ color: "#0b1a79" }}>{steps}</span>
      </p>
      <p style={{ fontSize: "1.2rem", margin: "10px 0", color: "#546aef" }}>
        Time Taken: <span style={{ color: "#0b1a79" }}>{timeTaken}s</span>
      </p>

      <div
        style={{
          marginTop: "20px",
          padding: "15px",
          borderRadius: "8px",
          backgroundColor: "#a0aef4",
          color: "#0b1a79",
          boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
          textAlign: "center",
        }}
      >
        <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>Route Trace</h2>
        <pre
          style={{
            textAlign: "left",
            backgroundColor: "#546aef",
            color: "#fff",
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
        onClick={handleSaveAttempt}
        style={{
          padding: "10px 20px",
          backgroundColor: "#546aef",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "1.2rem",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Save Attempt
      </button>
      <button
        onClick={() => navigate("/challenges")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#546aef",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "1.2rem",
          marginTop: "10px",
          cursor: "pointer",
        }}
      >
        Back to Challenges
      </button>
    </div>
  );
};

export default AttemptResults;
