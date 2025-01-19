import React from 'react';

function Navbar() {
  return (
    <div style={styles.navbar}>
      <h1 style={styles.title}>Traces</h1>
    </div>
  );
}

const styles = {
  navbar: {
    height: '80px',
    backgroundColor: '#546aef',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
    fontFamily: 'Playwrite+VN, sans-serif'
  },
  title: {
    fontWeight: 'bold',
  },
};

export default Navbar;
