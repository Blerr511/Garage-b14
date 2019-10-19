import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';

import { routes as _routes } from '../../routes';

import './Adminpage.less';

class Adminpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        username: 'johan',
        role: 'admin'
      }
    };
  }
  render() {
    const { routes, path } = _routes;
    return (
      <div className="adminpage">
        <Router>
          <Sidebar routes={_routes} />

          <Switch>
            {routes.map(el => (
                <Route
                  key={el.route}
                  path={`${path}${el.route}`}
                  component={el.component}
                />
              )
            )}
          </Switch>
        </Router>
      </div>
    );
  }
}

export default Adminpage;
