import React from 'react';
import { useLocation } from 'react-router-dom';

function ChallengeDetailsPage() {
  const { state } = useLocation();
  const { challenge } = state || {};

  if (!challenge) {
    return <h1>No challenge selected!</h1>;
  }

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      <h1 style={{ fontSize: '2.5rem', marginBottom: '20px' }}>
        {challenge.type} Challenge: {challenge.shape}
      </h1>
      <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
        Time: {challenge.time}
      </p>
      <p style={{ fontSize: '1.2rem', marginBottom: '10px' }}>
        Difficulty: {challenge.difficulty}
      </p>
      <p style={{ fontSize: '1.2rem', marginBottom: '20px' }}>
        Description: {challenge.description}
      </p>
      <img
        src={challenge.image}
        alt={challenge.type}
        style={{ width: '200px', borderRadius: '10px' }}
      />
    </div>
  );
}

export default ChallengeDetailsPage;
