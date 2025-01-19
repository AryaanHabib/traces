import React from "react";
import { useLocation } from "react-router-dom";

function AttemptResults() {
  const location = useLocation();
  const { coordinates, steps } = location.state || { coordinates: [], steps: 0 };

  return (
    <div>
      <h1>Attempt Results</h1>
      <p>Total Steps: {steps}</p>
      <h2>Route Coordinates:</h2>
      <pre>{JSON.stringify(coordinates, null, 2)}</pre>
    </div>
  );
}

export default AttemptResults;
