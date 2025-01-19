import React from 'react';
import { Link } from 'react-router-dom';

function BottomNav() {
  console.log('Rendering BottomNav'); // Debug to verify rendering
  return (
    <div style={styles.nav}>
      {/* Home */}
      <Link to="/" style={styles.link}>
        <div style={styles.iconContainer}>
          <img
            src="/assets/icons/home.png"
            alt="Home"
            style={styles.iconImage}
          />
        </div>
        <div style={styles.text}>Home</div>
      </Link>

      {/* Challenges */}
      <Link to="/challenges" style={styles.link}>
        <div style={styles.iconContainer}>
          <img
            src="/assets/icons/challenges.png"
            alt="Challenges"
            style={styles.iconImage}
          />
        </div>
        <div style={styles.text}>Challenges</div>
      </Link>

      {/* Leaderboard */}
      <Link to="/leaderboard" style={styles.link}>
        <div style={styles.iconContainer}>
          <img
            src="/assets/icons/trophy.png"
            alt="Leaderboard"
            style={styles.iconImage}
          />
        </div>
        <div style={styles.text}>Leaderboard</div>
      </Link>
    </div>
  );
}

const styles = {
  nav: {
    height: '70px',
    backgroundColor: '#546aef',
    display: 'flex',
    justifyContent: 'space-between', // Evenly distribute the links
    alignItems: 'center',
    position: 'fixed',
    bottom: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
    boxShadow: '0 -1px 5px rgba(0, 0, 0, 0.1)',
    color: '#fff',
    fontFamily: 'Roboto, sans-serif'
  },
  link: {
    textDecoration: 'none',
    color: '#fff',
    textAlign: 'center',
    fontSize: '12px',
    fontWeight: 'bold',
    flex: 1, // Each link will occupy equal space
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none', // Removes the default focus outline
  },
  iconContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: '4px',
  },
  iconImage: {
    width: '28px', // Adjust the size of the icon
    height: '28px',
    objectFit: 'contain', // Ensures the image scales proportionally
  },
  text: {
    fontSize: '12px',
  },
};

export default BottomNav;
