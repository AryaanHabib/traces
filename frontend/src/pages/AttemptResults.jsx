import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const AttemptResults = () => {
  const { state } = useLocation();
  const { coordinates, steps, timeTaken } = state || {};

  const navigate = useNavigate();

  return (
    <div style={{ padding: "20px", textAlign: "center" }}>
      <h1>Attempt Results</h1>
      <p>Total Steps: {steps}</p>
      <p>Time Taken: {timeTaken}s</p>
      <div style={{ marginTop: "20px" }}>
        <h2>Route Trace</h2>
        <pre
          style={{
            textAlign: "left",
            backgroundColor: "#f4f4f4",
            padding: "10px",
            borderRadius: "5px",
            overflowX: "auto",
          }}
        >
          {JSON.stringify(coordinates, null, 2)}
        </pre>
      </div>
      <button
        onClick={() => navigate("/challenges")}
        style={{
          padding: "10px 20px",
          backgroundColor: "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          fontSize: "16px",
          marginTop: "20px",
          cursor: "pointer",
        }}
      >
        Back to Challenges
      </button>
    </div>
  );
};

export default AttemptResults;
