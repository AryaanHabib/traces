import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const challenges = [
  {
    id: 1,
    shape: 'Square',
    description: 'Solve this fun square puzzle in record time!',
    difficulty: 'Easy',
    time: '10 minutes',
    type: 'Daily',
    image: '/assets/shapes/square.png',
  },
  {
    id: 2,
    shape: 'Circle',
    description: 'Answer trivia questions in a circular pattern!',
    difficulty: 'Medium',
    time: '20 minutes',
    type: 'Bonus',
    image: '/assets/shapes/circle.png',
  },
  {
    id: 3,
    shape: 'Hexagon',
    description: 'Test your logical skills with this hexagonal challenge.',
    difficulty: 'Difficult',
    time: '30 minutes',
    type: 'Daily',
    image: '/assets/shapes/hexagon.png',
  },
  {
    id: 4,
    shape: 'Octagon',
    description: 'Match octagonal patterns to win the memory game!',
    difficulty: 'Difficult',
    time: '45 minutes',
    type: 'Bonus',
    image: '/assets/shapes/octagon.png',
  },
];

function FindChallenge() {
  const [expanded, setExpanded] = useState(null);
  const expandedBoxRef = useRef(null);
  const navigate = useNavigate();

  const toggleExpand = (id) => {
    setExpanded(expanded === id ? null : id);
  };

  // // Send challenge data to backend
  // const handleStart = async (challenge) => {
  //   try {
  //     const response = await fetch('http://localhost:5000/api/challenges/start', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(challenge), // Send the challenge details
  //     });

  //     if (response.ok) {
  //       const data = await response.json();
  //       console.log('Challenge started successfully:', data);

  //       // Navigate to the map or next page
  //       navigate('/map', { state: { challenge } });
  //       console.log(9)

  //     } else {
  //       console.error('Failed to start challenge:', await response.text());
  //     }
  //   } catch (error) {
  //     console.error('Error in starting challenge:', error);
  //   }
  // };

  // Pass only the challenge ID to the next page
  const handleStart = (id) => {
    navigate('/map', { state: { challengeId: id } });
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
          color: '#0b1a79',
        }}
      >
        Challenges
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
        {challenges.map((challenge, index) => (
          <div
            key={challenge.id}
            ref={expanded === challenge.id ? expandedBoxRef : null}
            style={{
              borderRadius: '8px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '15px',
              backgroundColor: index % 2 === 0 ? '#546aef' : '#a0aef4',
              color: index % 2 === 0 ? '#fff' : '#0b1a79',
              width: '250px',
              textAlign: 'center',
              flexShrink: 0,
              fontWeight: 'bold',
            }}
          >
            <h3 style={{ fontSize: '1.5rem', marginBottom: '10px' }}>{challenge.shape}</h3>
            <p style={{ fontSize: '1rem', margin: '5px 0' }}>Time: {challenge.time}</p>
            <p style={{ fontSize: '1rem', margin: '5px 0' }}>Type: {challenge.type}</p>
            <p style={{ fontSize: '1rem', margin: '5px 0' }}>Difficulty: {challenge.difficulty}</p>
            <button
              onClick={() => toggleExpand(challenge.id)}
              style={{
                background: 'none',
                border: 'none',
                color: index % 2 === 0 ? '#a0aef4' : '#546aef',
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
                  backgroundColor: '#0b1a79',
                  padding: '10px',
                  borderRadius: '8px',
                  color: '#fff',
                }}
              >
                <p style={{ marginBottom: '10px', fontSize: '1rem' }}>{challenge.description}</p>
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
                      backgroundColor: '#a0aef4',
                      color: '#0b1a79',
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
