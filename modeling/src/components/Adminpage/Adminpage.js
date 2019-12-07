import React, { Component } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import Sidebar from './Sidebar/Sidebar';
import Login from '../Login/Login';
import { routes as _routes } from './routes';
import Message from './Message/Message';
import './Adminpage.less';

class Adminpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loading: false,
      user: {
        username: 'johan',
        role: 'admin'
      },
      message: {
        open: false,
        text: '',
        type: 'success'
      }
    };
    this.setAdminState = this.setAdminState.bind(this);
    this.login = this.login.bind(this);
    this.closeMessage = this.closeMessage.bind(this);
  }
  setAdminState(state) {
    this.setState(state);
  }
  componentDidMount() {
    this.login(null);
  }
  closeMessage() {
    this.setState({
      message: {
        open: false,
        text: '',
        type: this.state.message.type
      }
    });
  }
  login(credentalis) {
    const options = {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json; charset=utf-8'
      }
    };
    if (credentalis) {
      const { password, username, remember } = credentalis;
      options.body = JSON.stringify({
        username: username,
        password: password,
        remember: remember
      });
    }
    fetch(`${process.env.SERVER}/login`, options)
      .then(async _ => {
        const __ = await _.json();
        if (_.status === 200) return __;
        else throw __;
      })
      .then(data => {
        this.setState({
          logged: true,
          user: data
        });
      })
      .catch(err => {
        this.setState({
          message: {
            open: true,
            type: 'error',
            text: err.message ? err.message : 'Login failed !'
          }
        });
      });
  }
  render() {
    const { routes, path } = _routes;
    const { message } = this.state;
    return this.state.logged ? (
      <div className="adminpage">
        <Router>
          <Sidebar routes={_routes} />
          <Switch>
            {routes[0] && (
              <Route path={`${path}`} exact component={routes[0].component} />
            )}
            {routes.map(el => (
              <Route
                key={el.route}
                path={`${path}${el.route}`}
                component={el.component}
              />
            ))}
          </Switch>
        </Router>
      </div>
    ) : (
      <Login
        closeMessage={this.closeMessage}
        message={message}
        login={this.login}
      />
    );
  }
}

export default Adminpage;
