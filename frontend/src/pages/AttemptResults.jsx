import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useUser } from "../UserContext";

const AttemptResults = () => {
  const { state } = useLocation();
  const { challengeId, coordinates, steps, timeTaken } = state || {}; // Extract all values
  const navigate = useNavigate();

  const handleSaveAttempt = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/api/create_attempt", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          challengeId,
          coordinates,
          steps,
          time_taken: timeTaken,
          user_id: user?.user_id,
        }),
      });

      // Construct the query string with the necessary parameters
const queryParams = new URLSearchParams({
  userId: user?.user_id,
  attemptId: attemptId.toString(), // Ensure attemptId is a string
});

// Make the GET request with the query string
const response2 = await fetch(
  `http://127.0.0.1:5000/api/get_attempt?${queryParams.toString()}`,
  {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  }
);

// Check if the response is successful
if (!response2.ok) {
  throw new Error(`HTTP error! Status: ${response2.status}`);
}

// Parse the JSON response
const attemptData = await response2.json();

// Access specific fields from the response data
console.log(attemptData.attempt_id); // Access attempt_id
console.log(attemptData.challenge_id); // Access challenge_id
console.log(attemptData.completion_status); // Access completion_status
console.log(attemptData.steps_earned); // Access steps_earned
console.log(attemptData.score_earned); // Access score_earned
console.log(attemptData.simplified_route_image); // Access simplified_route_image
console.log(attemptData.attempt_date); // Access attempt_date
console.log(attemptData.time_taken); // Access time_taken

// You can now use these fields as needed in your application


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
      <h1
        style={{ fontSize: "2.5rem", marginBottom: "20px", color: "#0b1a79" }}
      >
        <h1>Attempt Results</h1>
      <p style={{ fontSize: '1.2rem', margin: '10px 0', color: '#546aef' }}>
        Attempt ID: <span style={{ color: '#0b1a79' }}>{attemptData.attempt_id}</span>
      </p>
      <p style={{ fontSize: '1.2rem', margin: '10px 0', color: '#546aef' }}>
        Challenge ID: <span style={{ color: '#0b1a79' }}>{attemptData.challenge_id}</span>
      </p>
      <p style={{ fontSize: '1.2rem', margin: '10px 0', color: '#546aef' }}>
        Completion Status: <span style={{ color: '#0b1a79' }}>{attemptData.completion_status}</span>
      </p>
      <p style={{ fontSize: '1.2rem', margin: '10px 0', color: '#546aef' }}>
        Steps Earned: <span style={{ color: '#0b1a79' }}>{attemptData.steps_earned}</span>
      </p>
      <p style={{ fontSize: '1.2rem', margin: '10px 0', color: '#546aef' }}>
        Score Earned: <span style={{ color: '#0b1a79' }}>{attemptData.score_earned}</span>
      </p>
      {attemptData.simplified_route_image && (
        <p style={{ fontSize: '1.2rem', margin: '10px 0', color: '#546aef' }}>
          Simplified Route Image: <span style={{ color: '#0b1a79' }}>{attemptData.simplified_route_image}</span>
        </p>
      )}
      <p style={{ fontSize: '1.2rem', margin: '10px 0', color: '#546aef' }}>
        Attempt Date: <span style={{ color: '#0b1a79' }}>{attemptData.attempt_date}</span>
      </p>
      <p style={{ fontSize: '1.2rem', margin: '10px 0', color: '#546aef' }}>
        Time Taken: <span style={{ color: '#0b1a79' }}>{attemptData.time_taken}s</span>
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
        <h2 style={{ fontSize: "1.8rem", marginBottom: "15px" }}>
          Route Trace
        </h2>
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
