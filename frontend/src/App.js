import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import About from "./pages/About";
import Auth from "./pages/Auth";
import Home from "./pages/Home";
import FindChallenge from "./pages/FindChallenge";
import Leaderboard from "./pages/Leaderboard";
import StartChallenge from "./pages/challenges/StartChallenge";
import MapTracking from "./pages/MapTracking";
import AttemptResults from "./pages/AttemptResults";
import BottomNav from "./components/BottomNav";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Track login state

  return (
    <Router>
      <div style={{ paddingBottom: isAuthenticated ? "20px" : "0px" }}>
        <Routes>
          {/* Default route: About Page */}
          <Route
            path="/"
            element={
              isAuthenticated ? <Navigate to="/home" /> : <About />
            }
          />
          {/* Login/Signup Page */}
          <Route
            path="/auth"
            element={<Auth onLogin={() => setIsAuthenticated(true)} />}
          />
          {/* Protected routes */}
          {isAuthenticated && (
            <>
              <Route path="/home" element={<Home onLogout={() => setIsAuthenticated(false)} />} />

              <Route path="/challenges" element={<FindChallenge />} />
              <Route path="/leaderboard" element={<Leaderboard />} />
              <Route path="/challenge-details" element={<StartChallenge />} />
              <Route path="/map" element={<MapTracking />} />
              <Route path="/attempt-results" element={<AttemptResults />} />
            </>
          )}
        </Routes>
        {/* Show BottomNav only when authenticated */}
        {isAuthenticated && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
