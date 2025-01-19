import React from 'react';

function Leaderboard() {
  // Example user data
  const users = [
    {
      userID: 'user123',
      name: 'John Doe',
      totalSteps: 12000,
      totalScore: 1500,
      profilePic: 'https://via.placeholder.com/100', // Example profile picture
    },
    {
      userID: 'user456',
      name: 'Jane Smith',
      totalSteps: 10500,
      totalScore: 1400,
      profilePic: 'https://via.placeholder.com/100',
    },
    {
      userID: 'user789',
      name: 'Bob Johnson',
      totalSteps: 9800,
      totalScore: 1200,
      profilePic: 'https://via.placeholder.com/100',
    },
    {
      userID: 'user101',
      name: 'Alice Brown',
      totalSteps: 8500,
      totalScore: 1100,
      profilePic: 'https://via.placeholder.com/100',
    },
  ];

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
      {/* Page Header */}
      <h1 style={{ fontSize: '2rem', marginBottom: '20px', color: '#333' }}>
        Leaderboard
      </h1>

      {/* Leaderboard Cards */}
      <div
        style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '20px',
          justifyContent: 'center',
          width: '100%',
          maxWidth: '1200px',
        }}
      >
        {users.map((user, index) => (
          <div
            key={user.userID}
            style={{
              border: '1px solid #ddd',
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
              padding: '20px',
              backgroundColor: '#fff',
              width: '250px',
              textAlign: 'center',
              position: 'relative',
            }}
          >
            {/* Ranking Badge */}
            <div
              style={{
                position: 'absolute',
                top: '-10px',
                left: '10px',
                backgroundColor: index === 0 ? '#ffd700' : index === 1 ? '#c0c0c0' : '#cd7f32',
                color: '#fff',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold',
                fontSize: '16px',
                boxShadow: '0 2px 4px rgba(0, 0, 0, 0.2)',
              }}
            >
              #{index + 1}
            </div>

            {/* Profile Picture */}
            <img
              src={user.profilePic}
              alt={`${user.name}'s profile`}
              style={{
                width: '80px',
                height: '80px',
                borderRadius: '50%',
                objectFit: 'cover',
                marginBottom: '15px',
              }}
            />

            {/* User Details */}
            <h2
              style={{
                fontSize: '1.2rem',
                color: '#007bff',
                marginBottom: '10px',
              }}
            >
              {user.name}
            </h2>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
              UserID: <span style={{ color: '#555' }}>{user.userID}</span>
            </p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
              Total Steps: <span style={{ color: '#555' }}>{user.totalSteps}</span>
            </p>
            <p style={{ margin: '5px 0', fontWeight: 'bold' }}>
              Total Score: <span style={{ color: '#555' }}>{user.totalScore}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
