import React, { useState, useEffect } from "react";
import Offcanvas from "react-bootstrap/Offcanvas";
import "bootstrap/dist/css/bootstrap.min.css";
import { useNavigate, useLocation } from "react-router-dom";
import { useUser } from "../UserContext";

function CircularProgress({ value, max, color, label, displayValueBelow }) {
  const radius = 40;
  const strokeWidth = 8;
  const circumference = 2 * Math.PI * radius;
  const progress = (value / max) * circumference;

  return (
    <div style={{ textAlign: "center", margin: "10px" }}>
      <svg width="100" height="100" style={{ transform: "rotate(0deg)" }}>
        <circle
          cx="50"
          cy="50"
          r={radius}
          stroke="#ddd"
          strokeWidth={strokeWidth}
          fill="none"
        />
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
        <text
          x="50"
          y="50"
          textAnchor="middle"
          dominantBaseline="central"
          style={{
            fill: color,
            fontSize: "16px",
            fontWeight: "bold",
          }}
        >
          {label}
        </text>
      </svg>
      <div
        style={{
          fontSize: "14px",
          fontWeight: "bold",
          marginTop: displayValueBelow ? "10px" : "-10px",
          color: "#333",
        }}
      >
        {value}/{max}
      </div>
    </div>
  );
}

const Home = ({ onLogout }) => {
  const { state } = useLocation();
  const userId = state?.userId; // Access the passed user ID
  const { user, setUser } = useUser(); // Access user context
  const [showSidebar, setShowSidebar] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      // Fetch user data from API
      fetch(`http://127.0.0.1:5000/api/get_user/${userId}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch user data");
          }
          return response.json();
        })
        .then((data) => {
          setUser(data); // Store user data in context
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [userId, setUser]);

  const handleLogout = () => {
    onLogout();
    navigate("/auth");
  };

  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        margin: "20px",
        padding: "20px",
        backgroundColor: "#f9f9f9",
        fontWeight: "bold",
        overflowY: "auto",
      }}
    >
      {/* Heading Section */}
      <div style={{ marginBottom: "20px" }}>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1
            style={{
              fontSize: "2.5rem",
              color: "#0b1a79",
              margin: "0",
              textAlign: "left",
              fontWeight: "bold",
            }}
          >
            Hi {user?.name || "Guest"}!
          </h1>
          <img
            src="/assets/icons/user-color.png"
            alt="Profile"
            onClick={() => setShowSidebar(true)}
            style={{
              width: "64px",
              height: "64px",
              cursor: "pointer",
            }}
          />
        </div>
        <p
          style={{
            textAlign: "left",
            margin: "5px 0 0 0",
            color: "#546aef",
          }}
        >
          Leave your mark on the world
        </p>
      </div>

      {/* Sidebar (Offcanvas) */}
      <Offcanvas show={showSidebar} onHide={() => setShowSidebar(false)} placement="end">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title style={{ color: "#546aef", fontWeight: "bold" }}>
            User Menu
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {["About", "Profile", "Settings", "Help", "Logout"].map((item, index) => (
              <li key={index} style={{ marginBottom: "10px" }}>
                <button
                  onClick={item === "Logout" ? handleLogout : null}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    color: "#0b1a79",
                    padding: "10px",
                    borderRadius: "5px",
                    cursor: "pointer",
                    textAlign: "left",
                  }}
                >
                  {item}
                </button>
              </li>
            ))}
          </ul>
        </Offcanvas.Body>
      </Offcanvas>

      {/* Circular Progress Section */}
      <div
        style={{
          display: "flex",
          gap: "20px",
          justifyContent: "center",
          flexWrap: "wrap",
        }}
      >
        <CircularProgress
          value={user?.dailySteps || 0}
          max={user?.maxSteps || 5000}
          color="#546aef"
          label="Steps"
        />
        <CircularProgress
          value={user?.dailyTime || 0}
          max={user?.maxTime || 120}
          color="#0b1a79"
          label="Time"
        />
        <CircularProgress
          value={user?.dailyDistance || 0}
          max={user?.maxDistance || 5}
          color="#a0aef4"
          label="Distance"
        />
      </div>

      {/* Total Points Section */}
      <div
        style={{
          borderRadius: "8px",
          padding: "15px",
          backgroundColor: "#546aef",
          color: "#fff",
          textAlign: "center",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ fontWeight: "bold" }}>Total Points</h3>
        <p style={{ fontSize: "1.5rem" }}>{user?.totalPoints || 0}</p>
      </div>

      {/* Friends and Parties */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "20px",
        }}
      >
        <div
          style={{
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#a0aef4",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>Friends</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {user?.friends?.map((friend, index) => (
              <li key={index}>{friend}</li>
            )) || <li>No friends yet</li>}
          </ul>
        </div>
        <div
          style={{
            borderRadius: "8px",
            padding: "15px",
            backgroundColor: "#a0aef4",
            color: "#fff",
            textAlign: "center",
          }}
        >
          <h3 style={{ fontWeight: "bold" }}>Parties</h3>
          <ul style={{ listStyle: "none", padding: 0 }}>
            {user?.parties?.map((party, index) => (
              <li key={index}>{party}</li>
            )) || <li>No parties yet</li>}
          </ul>
        </div>
      </div>

      {/* Attempts Section */}
      <div
        style={{
          borderRadius: "8px",
          padding: "15px",
          backgroundColor: "#546aef",
          color: "#fff",
          textAlign: "center",
          marginTop: "20px",
          fontWeight: "bold",
        }}
      >
        <h3 style={{ fontSize: "1.8rem", fontWeight: "bold" }}>Attempts</h3>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "15px",
            alignItems: "center",
          }}
        >
          {user?.attempts?.map((attempt) => (
            <div
              key={attempt.id}
              style={{
                backgroundColor: "#a0aef4",
                borderRadius: "8px",
                padding: "10px",
                width: "90%",
                maxWidth: "600px",
                boxShadow: "0 2px 4px rgba(0, 0, 0, 0.1)",
              }}
            >
              <img
                src={attempt.simplifiedRouteImage}
                alt={attempt.description}
                style={{
                  width: "100%",
                  height: "auto",
                  borderRadius: "8px",
                  marginBottom: "10px",
                }}
              />
              <p style={{ color: "#0b1a79", fontWeight: "bold" }}>{attempt.description}</p>
            </div>
          )) || <p>No attempts yet</p>}
        </div>
      </div>
    </div>
  );
};

export default Home;
