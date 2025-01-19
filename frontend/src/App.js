import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate } from "react-router-dom";
import Auth from "./pages/Auth"; // Import Auth
import Home from "./pages/Home";
import BottomNav from "./components/BottomNav";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  return (
    <Router>
      <div style={{ paddingBottom: isAuthenticated ? "20px" : "0px" }}>
        <Routes>
          {/* Default route */}
          <Route
            path="/"
            element={
              isAuthenticated ? (
                <Navigate to="/home" />
              ) : (
                <Auth onLogin={() => setIsAuthenticated(true)} />
              )
            }
          />
          {/* Protected route */}
          {isAuthenticated && (
            <Route
              path="/home"
              element={<Home onLogout={() => setIsAuthenticated(false)} />}
            />
          )}
        </Routes>
        {/* Show BottomNav only if authenticated */}
        {isAuthenticated && <BottomNav />}
      </div>
    </Router>
  );
}

export default App;
