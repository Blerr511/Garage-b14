import React from 'react';
import './index.less';
import coffee from '../../assets/img/coffee.gif';
const LoadingScreen = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        padding: '0',
        margin: '0'
      }}
    >
      <img src={coffee} alt="loading" />
    </div>
  );
};

export default LoadingScreen;
