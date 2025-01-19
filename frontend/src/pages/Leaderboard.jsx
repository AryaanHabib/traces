import React from 'react';

function Leaderboard() {
  const users = [
    {
      userID: 'user123',
      name: 'John Doe',
      totalSteps: 12000,
      totalScore: 1500,
      profilePic: 'https://via.placeholder.com/100',
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
      <h1
        style={{
          fontSize: '2.5rem',
          fontWeight: 'bold',
          marginBottom: '20px',
          color: '#0b1a79', // Navy Blue
        }}
      >
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
              borderRadius: '12px',
              boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
              padding: '20px',
              backgroundColor: index % 2 === 0 ? '#546aef' : '#a0aef4', // Alternate colors
              color: index % 2 === 0 ? '#fff' : '#0b1a79', // Text contrast
              width: '250px',
              textAlign: 'center',
              position: 'relative',
              fontWeight: 'bold', // All text bold
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
                border: '2px solid #fff', // Border for image
              }}
            />

            {/* User Details */}
            <h2
              style={{
                fontSize: '1.5rem',
                marginBottom: '10px',
                fontWeight: "bold",
              }}
            >
              {user.name}
            </h2>
            <p style={{ margin: '5px 0' }}>
              UserID: <span>{user.userID}</span>
            </p>
            <p style={{ margin: '5px 0' }}>
              Total Steps: <span>{user.totalSteps}</span>
            </p>
            <p style={{ margin: '5px 0' }}>
              Total Score: <span>{user.totalScore}</span>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Leaderboard;
