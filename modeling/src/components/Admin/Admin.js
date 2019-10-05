import React, { Component } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
  withRouter
} from 'react-router-dom';

import Admin from '../../layouts/Admin';
import Login from './Login/Login';
import CONFIG from '../../config.json';
class AdminPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logged: false,
      loading: false,
      user: {}
    };
    this.login = this.login.bind(this);
    this.setAdminState = this.setAdminState.bind(this);
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.login();
    this.mounted = true;
  }
  componentWillUnmount() {
    this.mounted = false;
  }
  login() {
    this.setState({
      loading: true
    });
    fetch(`${CONFIG.server.hostname}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json; charset=utf-8'
      }
    })
      .then(async _ => {
        if (this.mounted) this.setState({ loading: false });
        const __ = await _.json();
        if (_.status === 200) return __;
        else throw __;
      })
      .then(data => {
        console.log(data);
        if (this.mounted)
          this.setState({
            logged: true,
            user: data
          });
      })
      .catch(err => {
        if (this.mounted) this.setState({ errorMessage: err.message });
      });
  }
  setAdminState(state) {
    this.setState(state);
  }
  async logout() {
    fetch(`${CONFIG.server.hostname}/logout`, {
      method: 'post',
      credentials: 'include'
    })
      .then(async _ => {
        const __ = await _.json();
        if (_.status === 200) return __;
        else throw __;
      })
      .then(data => {
        if (data.status === 'success') {
          this.setState({ logged: false });
        }
      })
      .catch(err => console.log(err));
  }
  render() {
    console.log(this.state);
    return (
      <Router>
        {this.state.logged !== false ? (
          <Redirect to="/admin" />
        ) : (
          <Redirect to="/admin/login" />
        )}
        <Switch>
          <Route
            path="/admin/login"
            component={_ => <Login setAdminState={this.setAdminState} />}
            exact
          />
          <Route
            component={_ => (
              <Admin user={this.state.user} logout={this.logout} />
            )}
          />
        </Switch>
      </Router>
    );
  }
}

export default withRouter(AdminPage);
