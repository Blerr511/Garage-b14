import React from 'react';
import { NavLink, Link, BrowserRouter as Router } from 'react-router-dom';

import { routes } from '../../routes/reoutes';

import './Nav.less';
import logo from '../../assets/img/logo_header.png';
const Nav = () => {
  return (
    <nav className="navbar">
      <section>
        <div id="logo">
          <Link to="/">
            <img src={logo} alt="Garage b14" height="80" />
          </Link>
        </div>{' '}
      </section>
      <section>
        <ul>
          {routes.map(el => {
            if (el.navLink) {
              return (
                <li key={el.route}>
                  <NavLink exact to={el.route}>
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

export default Nav;
