import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Nav from './components/Nav/Nav';

import { routes } from './routes/reoutes';

import './App.less';
const App = () => {
  console.log(process.env.new);
  return (
    <div>
      <Router>
        <Nav />

        <Switch>
          {routes.map(el => {
            return (
              <Route
                path={el.route}
                component={el.component}
                exact
                key={el.route}
              />
            );
          })}
        </Switch>
      </Router>
    </div>
  );
};

export default App;
