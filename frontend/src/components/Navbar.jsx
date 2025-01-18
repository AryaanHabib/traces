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
    height: '60px',
    backgroundColor: '#282c34',
    color: 'white',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '24px',
  },
  title: {
    fontWeight: 'bold',
  },
};

export default Navbar;
