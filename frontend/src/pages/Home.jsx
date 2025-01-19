import React, { useState } from 'react';

function HomePage() {
  // Simulated data for different insights
  const userInsights = {
    daily: {
      totalSteps: 1200,
      totalTime: '30m',
      totalDistance: '0.8 km',
      totalScore: 50,
    },
    weekly: {
      totalSteps: 8500,
      totalTime: '4h 20m',
      totalDistance: '5.5 km',
      totalScore: 300,
    },
    yearly: {
      totalSteps: 450000,
      totalTime: '320h',
      totalDistance: '380 km',
      totalScore: 12500,
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
      <div
        style={{
          display: 'flex',
          gap: '10px',
          marginBottom: '20px',
        }}
      >
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

      {/* Grouped Container for Steps, Time, and Distance */}
      <div
        style={{
          border: '1px solid #ddd',
          borderRadius: '8px',
          padding: '15px',
          backgroundColor: '#fff',
          boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          width: '100%',
          maxWidth: '800px',
          marginBottom: '20px',
        }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)', // Three columns for stats
            gap: '20px',
          }}
        >
          <div style={{ textAlign: 'center' }}>
            <h3>Total Steps</h3>
            <p style={{ fontSize: '1.2rem', color: '#007bff' }}>{currentInsights.totalSteps}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3>Total Time</h3>
            <p style={{ fontSize: '1.2rem', color: '#ffc107' }}>{currentInsights.totalTime}</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <h3>Total Distance</h3>
            <p style={{ fontSize: '1.2rem', color: '#17a2b8' }}>{currentInsights.totalDistance}</p>
          </div>
        </div>
      </div>

      {/* Total Score Section */}
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
          marginBottom: '20px',
        }}
      >
        <h3>Total Score</h3>
        <p style={{ fontSize: '1.2rem', color: '#28a745' }}>{currentInsights.totalScore}</p>
      </div>

      {/* Friends and Parties Section */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr)',
          gap: '20px',
          width: '100%',
          maxWidth: '800px',
          marginBottom: '20px',
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
