import React from 'react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  return (
    <div>
      <h1>Welcome to Floodz Training</h1>
      <p>Take your basketball skills to the next level with Floodz Training!</p>
      <p>Explore our training programs, watch exclusive videos, and join our community of basketball enthusiasts.</p>
      <Link to="/plans">View Training Plans</Link>
    </div>
  );
};

export default HomePage;
