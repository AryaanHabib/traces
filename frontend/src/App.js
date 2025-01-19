import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import BottomNav from './components/BottomNav'; // Import BottomNav
import Home from './pages/Home';
import FindChallenge from './pages/FindChallenge';
import Leaderboard from './pages/Leaderboard';
import StartChallenge from '../src/pages/challenges/StartChallenge';
import MapTracking from './pages/MapTracking';
import AttemptResults from "./pages/AttemptResults";


function App() {
  console.log('BottomNav added to App.jsx'); // Correct placement of console.log

  return (
    <Router>
      {/* <Navbar /> */}
      <div style={{ paddingBottom: '20px' }}> {/* Reserve space for BottomNav */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/challenges" element={<FindChallenge />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/challenge-details" element={<StartChallenge />} />
          <Route path="/map" element={<MapTracking />} />
          <Route path="/attempt-results" element={<AttemptResults />} />

        </Routes>
      </div>
      <BottomNav />
    </Router>
  );
}

export default App;
