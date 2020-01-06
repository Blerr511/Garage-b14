import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import MainApp from './MainApp';
ReactDOM.render(
  <Router>
    <MainApp />
  </Router>,
  document.getElementById('root')
);
