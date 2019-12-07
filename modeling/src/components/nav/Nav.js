import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';

import './Nav.less';
import logo from '../../assets/img/logo_header.png';
const Nav = props => {
  const [state] = React.useState(
    props.routes.map(el => el.route).concat(['/', '/main', '/:path'])
  );
  console.log(props.routes);
  return (
    <nav
      className="navbar"
      style={{
        background:
          state.indexOf(props.location.pathname) === -1
            ? 'black'
            : 'transparent'
      }}
    >
      <section>
        <div id="logo">
          <Link to="/">
            <img src={logo} alt="Garage b14" height="80" />
          </Link>
        </div>{' '}
      </section>
      <section>
        <ul>
          {props.routes.map(el => {
            if (el.navLink) {
              return (
                <li key={el.route}>
                  <NavLink
                    exact
                    to={el.route}
                    id={el.name === 'services' ? 'services' : null}
                  >
                    {el.name}
                  </NavLink>
                </li>
              );
            }
          })}
        </ul>
      </section>
    </nav>
  );
};

export default withRouter(Nav);
