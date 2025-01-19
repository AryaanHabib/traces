import React, { useState } from 'react';
import Offcanvas from 'react-bootstrap/Offcanvas';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap styles are imported
import { useNavigate } from "react-router-dom";



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


const Home = ({ onLogout }) => {
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

  const [currentInsights, setCurrentInsights] = useState(userInsights.daily);

  const [showSidebar, setShowSidebar] = useState(false);
  const [hoveredItem, setHoveredItem] = useState(null);

  const handleSidebarClose = () => setShowSidebar(false);
  const handleSidebarShow = () => setShowSidebar(true);

  const menuItems = ['About', 'Profile', 'Settings', 'Help', 'Logout'];

  const navigate = useNavigate();

  const handleLogout = () => {
    onLogout(); // Trigger logout callback
    navigate("/auth"); // Navigate to the Auth page
  };

  const handleNavigateToAbout = () => {
    navigate("/"); // Navigate to the About Page
  };

  return (
    <div
      style={{
        fontFamily: 'Arial, sans-serif',
        margin: '20px',
        padding: '20px',
        backgroundColor: '#f9f9f9',
      }}
    >
      {/* Heading Row with Image */}
      <div
        style={{
          marginBottom: '20px',
        }}
      >
        {/* Heading and Paragraph Container */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}
        >
          {/* Left-aligned Heading */}
          <h1
            style={{
              fontSize: '2.5rem',
              color: '#333',
              margin: '0',
              textAlign: 'left',
            }}
          >
            Hi John Doe!
          </h1>

          {/* Right-aligned Image */}
          <img
            src="/assets/icons/user-color.png" // Replace with your image URL
            alt="Profile"
            onClick={handleSidebarShow}
            style={{
              width: '64px',
              height: '64px',
              cursor: 'pointer',
              marginLeft: 'auto'
            }}
          />
        </div>

        {/* Paragraph aligned with heading */}
        <p
          style={{
            textAlign: 'left',
            margin: '5px 0 0 0', // Ensure no extra margin
            color: '#555', // Optional: Slightly lighter color for text
          }}
        >
          Leave your mark on the world
        </p>

        
      </div>

      {/* Sidebar (Offcanvas) */}
      <Offcanvas
        show={showSidebar}
        onHide={handleSidebarClose}
        placement="end"
        style={{ width: "250px" }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>User Menu</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {menuItems.map((item, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                {item === "Logout" ? (
                  <button
                    onClick={handleLogout}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      color: hoveredItem === index ? "#fff" : "#007bff",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor:
                        hoveredItem === index ? "#007bff" : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item}
                  </button>
                ) : item === "About" ? (
                  <button
                    onClick={handleNavigateToAbout}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      color: hoveredItem === index ? "#fff" : "#007bff",
                      padding: "10px",
                      borderRadius: "5px",
                      backgroundColor:
                        hoveredItem === index ? "#007bff" : "transparent",
                      cursor: "pointer",
                      textAlign: "left",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item}
                  </button>
                ) : (
                  <span
                    style={{
                      textDecoration: "none",
                      color: hoveredItem === index ? "#fff" : "#007bff",
                      padding: "10px",
                      display: "block",
                      borderRadius: "5px",
                      backgroundColor:
                        hoveredItem === index ? "#007bff" : "transparent",
                      transition: "background-color 0.3s ease, color 0.3s ease",
                      cursor: "pointer",
                    }}
                    onMouseEnter={() => setHoveredItem(index)}
                    onMouseLeave={() => setHoveredItem(null)}
                  >
                    {item}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Main Content Container */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center', // Center all other content
        }}
      >
        {/* Circular Progress Bars */}
        <div
          style={{
            display: 'flex',
            gap: '20px',
            justifyContent: 'center',
            flexWrap: 'wrap',
          }}
        >
          <CircularProgress
            value={1200}
            max={5000}
            color="#007bff"
            label="Steps"
          />
          <CircularProgress
            value={30}
            max={120}
            color="#ffc107"
            label="Time"
          />
          <CircularProgress
            value={0.8}
            max={5}
            color="#17a2b8"
            label="Distance"
          />
        </div>

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
    </div>
  );
}

export default Home;
