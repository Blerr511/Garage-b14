import React from 'react';
import { Link } from 'react-router-dom';
import './index.css';
const notFound = () => {
  return (
    <div
      className="notFound"
      style={{
        backgroundImage: `url(${require('../../assets/img/2663519.png')})`
      }}
    >
      <Link to="/">Garage B14</Link>
    </div>
  );
};

export default notFound;
