import React, { useState } from 'react';

function CircularProgress({ value, max, color, label, displayValueBelow }) {
  const radius = 40; // Circle radius
  const strokeWidth = 8; // Stroke width
  const circumference = 2 * Math.PI * radius; // Circle circumference
  const progress = (value / max) * circumference; // Progress based on value and max

  return (
    <div style={{ textAlign: 'center', margin: '10px' }}>
      <svg width="100" height="100" style={{ transform: 'rotate(0deg)' }}>
        {/* Background Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#ddd"
          strokeWidth={strokeWidth}
          fill="none"
        />
        {/* Progress Circle */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke={color}
          strokeWidth={strokeWidth}
          fill="none"
          strokeDasharray={circumference}
          strokeDashoffset={circumference - progress}
          strokeLinecap="round"
        />
        {/* Label Inside Circle */}
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fill: color,
            fontSize: '12px',
            fontWeight: 'bold',
          }}
        >
          {label}
        </text>
      </svg>
      {/* Value Below or Above */}
      <div
        style={{
          fontSize: '14px',
          fontWeight: 'bold',
          marginTop: displayValueBelow ? '10px' : '-10px',
          color: '#333',
        }}
      >
        {value}/{max}
      </div>
    </div>
  );
}


const HomePage = () => {
  // Simulated data for different insights
  const userInsights = {
    daily: {
      totalSteps: 1200,
      maxSteps: 5000,
      totalTime: 30, // in minutes
      maxTime: 120, // in minutes
      totalDistance: 0.8, // in km
      maxDistance: 5, // in km
      totalPoints: 50, // Total points earned
    },
    weekly: {
      totalSteps: 8500,
      maxSteps: 35000,
      totalTime: 260, // in minutes
      maxTime: 840, // in minutes
      totalDistance: 5.5, // in km
      maxDistance: 35, // in km
      totalPoints: 300,
    },
    yearly: {
      totalSteps: 450000,
      maxSteps: 1000000,
      totalTime: 19200, // in minutes
      maxTime: 43800, // in minutes
      totalDistance: 380, // in km
      maxDistance: 1000, // in km
      totalPoints: 12500,
    },
  };

  const [currentInsights, setCurrentInsights] = useState(userInsights.daily);

  // Static data for Friends, Parties, and Attempts
  const userData = {
    friends: ['User123', 'User456', 'User789'],
    parties: ['Party001', 'Party002', 'Party003'],
    attempts: [
      {
        id: 1,
        simplifiedRouteImage: 'https://via.placeholder.com/150',
        description: 'Attempt 1',
      },
      {
        id: 2,
        simplifiedRouteImage: 'https://via.placeholder.com/150',
        description: 'Attempt 2',
      },
      {
        id: 3,
        simplifiedRouteImage: 'https://via.placeholder.com/150',
        description: 'Attempt 3',
      },
    ],
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        margin: '20px',
        padding: '20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Button Group for Switching Insights */}
      <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: currentInsights === userInsights.daily ? '#007bff' : '#ddd',
            color: currentInsights === userInsights.daily ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: currentInsights === userInsights.daily ? 'bold' : 'normal',
          }}
          onClick={() => setCurrentInsights(userInsights.daily)}
        >
          Daily
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: currentInsights === userInsights.weekly ? '#007bff' : '#ddd',
            color: currentInsights === userInsights.weekly ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: currentInsights === userInsights.weekly ? 'bold' : 'normal',
          }}
          onClick={() => setCurrentInsights(userInsights.weekly)}
        >
          Weekly
        </button>
        <button
          style={{
            padding: '10px 20px',
            backgroundColor: currentInsights === userInsights.yearly ? '#007bff' : '#ddd',
            color: currentInsights === userInsights.yearly ? '#fff' : '#000',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer',
            fontWeight: currentInsights === userInsights.yearly ? 'bold' : 'normal',
          }}
          onClick={() => setCurrentInsights(userInsights.yearly)}
        >
          Yearly
        </button>
      </div>

      {/* User Name */}
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px', color: '#333' }}>John Doe</h1>

      {/* Circular Progress Bars for Steps, Time, and Distance */}
      <div
        style={{
          display: 'flex',
          gap: '20px',
          justifyContent: 'center',
          flexWrap: 'wrap',
        }}
      >
        <CircularProgress
          value={currentInsights.totalSteps}
          max={currentInsights.maxSteps}
          color="#007bff"
          label="Steps"
        />
        <CircularProgress
          value={currentInsights.totalTime}
          max={currentInsights.maxTime}
          color="#ffc107"
          label="Time"
        />
        <CircularProgress
          value={currentInsights.totalDistance}
          max={currentInsights.maxDistance}
          color="#17a2b8"
          label="Distance"
        />
      </div>

      {/* Total Points Section */}
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '800px',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <h3>Total Points</h3>
        <p style={{ fontSize: '1.5rem', color: '#28a745' }}>{currentInsights.totalPoints}</p>
      </div>

      {/* Friends and Parties Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          width: '100%',
          maxWidth: '800px',
          marginTop: '20px',
        }}
      >
        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h3>Friends</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {userData.friends.map((friend, index) => (
              <li key={index} style={{ fontSize: '1rem', marginBottom: '5px' }}>
                {friend}
              </li>
            ))}
          </ul>
        </div>

        <div
          style={{
            border: '1px solid #ddd',
            borderRadius: '8px',
            padding: '15px',
            backgroundColor: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h3>Parties</h3>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
            {userData.parties.map((party, index) => (
              <li key={index} style={{ fontSize: '1rem', marginBottom: '5px' }}>
                {party}
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Attempts Section */}
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '800px',
          textAlign: 'center',
          marginTop: '20px',
        }}
      >
        <h3>Attempts</h3>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '15px',
            alignItems: 'center',
          }}
        >
          {userData.attempts.map((attempt) => (
            <div key={attempt.id}>
              <img
                src={attempt.simplifiedRouteImage}
                alt={attempt.description}
                style={{
                  width: '90%',
                  maxWidth: '600px',
                  height: 'auto',
                  borderRadius: '8px',
                  boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                }}
              />
              <p>{attempt.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default HomePage;
