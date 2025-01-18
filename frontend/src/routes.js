import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Challenges from './pages/Challenges';
import Leaderboard from './pages/Leaderboard';
import ChallengeDetails from './pages/ChallengeDetails';
import AttemptResults from './pages/AttemptResults';
import About from './pages/About';
import Scoring from './pages/Scoring';
import LoginSignup from './pages/LoginSignup';

function AppRoutes() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/challenges" element={<Challenges />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/challenge/:id" element={<ChallengeDetails />} />
        <Route path="/attempt-results/:id" element={<AttemptResults />} />
        <Route path="/about" element={<About />} />
        <Route path="/scoring" element={<Scoring />} />
        <Route path="/login" element={<LoginSignup />} />
      </Routes>
    </Router>
  );
}

export default AppRoutes;