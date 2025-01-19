import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

// Simulating data fetched from the backend
const challenges = [
  {
    id: 1,
    shape: 'Square',
    time: '10 minutes',
    type: 'Daily',
    difficulty: 'Easy',
    description: 'Solve this fun square puzzle in record time!',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 2,
    shape: 'Circle',
    time: '20 minutes',
    type: 'Bonus',
    difficulty: 'Medium',
    description: 'Answer trivia questions in a circular pattern!',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 3,
    shape: 'Hexagon',
    time: '30 minutes',
    type: 'Daily',
    difficulty: 'Hard',
    description: 'Test your logical skills with this hexagonal challenge.',
    image: 'https://via.placeholder.com/150',
  },
  {
    id: 4,
    shape: 'Octagon',
    time: '45 minutes',
    type: 'Bonus',
    difficulty: 'Expert',
    description: 'Match octagonal patterns to win the memory game!',
    image: 'https://via.placeholder.com/150',
  },
];

function FindChallenge() {
  const [expanded, setExpanded] = useState(null);
  const expandedBoxRef = useRef(null);
  const navigate = useNavigate();

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  const handleStart = (challenge) => {
    navigate('/map', { state: { challenge } });
  };

  useEffect(() => {
    if (expanded !== null && expandedBoxRef.current) {
      expandedBoxRef.current.scrollIntoView({
        behavior: 'smooth',
        block: 'center',
      });
    }
  }, [expanded]);

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        padding: '20px',
        height: '100vh',
        overflowY: 'auto',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          textAlign: 'center',
          color: '#333',
        }}
      >
        Daily Challenges
      </h1>

      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          maxWidth: '1200px',
          marginBottom: '20px',
        }}
      >
        {challenges.map((challenge) => (
          <div
            key={challenge.id}
            ref={expanded === challenge.id ? expandedBoxRef : null}
            style={{
              border: '1px solid #ddd',
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '15px',
              backgroundColor: '#fff',
              width: '250px',
              textAlign: 'center',
              flexShrink: 0,
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>
              {challenge.shape}
            </h3>
            <p style={{ fontSize: '1rem', margin: '5px 0' }}>Time: {challenge.time}</p>
            <p style={{ fontSize: '1rem', margin: '5px 0' }}>Type: {challenge.type}</p>
            <p style={{ fontSize: '1rem', margin: '5px 0' }}>
              Difficulty: {challenge.difficulty}
            </p>
            <button
              onClick={() => toggleExpand(challenge.id)}
              style={{
                background: 'none',
                border: 'none',
                color: '#007bff',
                cursor: 'pointer',
                fontSize: '1.2rem',
              }}
            >
              {expanded === challenge.id ? '▲' : '▼'}
            </button>
            {expanded === challenge.id && (
              <div
                style={{
                  marginTop: '15px',
                  textAlign: 'center',
                }}
              >
                <p style={{ marginBottom: '10px', fontSize: '1rem' }}>
                  {challenge.description}
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    gap: '10px',
                  }}
                >
                  <img
                    src={challenge.image}
                    alt={`${challenge.type} challenge`}
                    style={{
                      width: '80px',
                      height: '80px',
                      borderRadius: '8px',
                    }}
                  />
                  <button
                    style={{
                      padding: '10px 20px',
                      fontSize: '1rem',
                      backgroundColor: '#007bff',
                      color: '#fff',
                      border: 'none',
                      borderRadius: '5px',
                      cursor: 'pointer',
                    }}
                    onClick={() => handleStart(challenge)}
                  >
                    Start
                  </button>
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default FindChallenge;
