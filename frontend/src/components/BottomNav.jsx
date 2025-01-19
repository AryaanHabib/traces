import React from 'react';
import { Link } from 'react-router-dom';

function BottomNav() {
  console.log('Rendering BottomNav'); // Debug to verify rendering
  return (
    <div style={styles.nav}>
      <Link to="/" style={styles.link}>
        <div style={styles.icon}>🏠</div>
        <div style={styles.text}>Home</div>
      </Link>
      <Link to="/challenges" style={styles.link}>
        <div style={styles.icon}>🎯</div>
        <div style={styles.text}>Challenges</div>
      </Link>
      <Link to="/leaderboard" style={styles.link}>
        <div style={styles.icon}>🏆</div>
        <div style={styles.text}>Leaderboard</div>
      </Link>
    </div>
  );
}

const styles = {
  nav: {
    height: '70px',
    backgroundColor: '#282c34',
    display: 'flex',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
    color: '#fff',
  },
  link: {
    textDecoration: 'none',
    color: '#61dafb',
    textAlign: 'center',
    fontSize: '12px',
  },
  icon: {
    fontSize: '36px', // Adjusted size for emojis/icons
  },
  text: {
    fontSize: '12px',
    marginTop: '2px',
  },
};

export default BottomNav;
