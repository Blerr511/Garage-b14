import React, { Component } from 'react';
import CONFIG from '../../../config.json';
import './Login.css';
class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      errorMessage: ''
    };
    this.username = '';
    this.password = '';

    this.inputChange = this.inputChange.bind(this);
    this.login = this.login.bind(this);
  }
  inputChange(e, key) {
    this[key] = e.target.value;
  }

  login() {
    const [username, password, remember] = [
      this.refs.username.value,
      this.refs.password.value,
      this.refs.remember.checked
    ];
    this.setState({ errorMessage: '' });
    fetch(`${CONFIG.server.hostname}/login`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Access-Control-Allow-Credentials': true,
        'Content-Type': 'application/json; charset=utf-8'
      },
      body: JSON.stringify({
        username: username,
        password: password,
        remember: remember
      })
    })
      .then(async _ => {
        const __ = await _.json();
        if (_.status === 200) return __;
        else throw __;
      })
      .then(data => {
        this.props.setAdminState({
          logged: true,
          user: data
        });
      })
      .catch(err => {
        this.setState({ errorMessage: err.message });
      });
  }

  render() {
    return (
      <div className="limiter">
        <div className="container-login100">
          <div className="wrap-login100">
            <form
              onSubmit={_ => _.preventDefault()}
              className="login100-form validate-form flex-sb flex-w"
            >
              <span className="login100-form-title p-b-51">Login</span>
              {this.state.errorMessage ? (
                <div
                  className={
                    this.state.errorMessage
                      ? 'errorMessage show'
                      : 'errorMessage'
                  }
                >
                  {this.state.errorMessage}
                </div>
              ) : null}

              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Username is required"
              >
                <input
                  className="input100"
                  type="text"
                  name="username"
                  placeholder="Username"
                  defaultValue=""
                  ref="username"
                />
                <span className="focus-input100" />
              </div>
              <div
                className="wrap-input100 validate-input m-b-16"
                data-validate="Password is required"
              >
                <input
                  ref="password"
                  className="input100"
                  type="password"
                  name="pass"
                  defaultValue=""
                  placeholder="Password"
                />
                <span className="focus-input100" />
              </div>
              <div className="flex-sb-m w-full p-t-3 p-b-24">
                <div className="contact100-form-checkbox">
                  <input
                    className="input-checkbox100"
                    id="ckb1"
                    type="checkbox"
                    name="remember-me"
                    ref="remember"
                  />
                  <label className="label-checkbox100" htmlFor="ckb1">
                    Remember me
                  </label>
                </div>
              </div>
              <div className="container-login100-form-btn m-t-17">
                <button onClick={this.login} className="login100-form-btn">
                  Login
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}

export default Login;
