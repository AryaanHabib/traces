import React from 'react';

function Home() {
  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Welcome to Traces</h2>
      <div style={styles.metricCard}>
        <h3>Steps Today</h3>
        <p>5,432</p>
      </div>
      <div style={styles.metricCard}>
        <h3>Weekly Progress</h3>
        <p>65%</p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    padding: '20px',
    textAlign: 'center',
  },
  title: {
    fontSize: '24px',
    marginBottom: '20px',
  },
  metricCard: {
    padding: '15px',
    margin: '10px auto',
    backgroundColor: '#f1f1f1',
    borderRadius: '10px',
    maxWidth: '300px',
    textAlign: 'center',
  },
};

export default Home;
