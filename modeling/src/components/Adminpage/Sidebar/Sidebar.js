import React from 'react';
import { Link, NavLink, BrowserRouter as Router } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import './Sidebar.less';

import logo from '../../../assets/img/logo_header.png';
const Sidebar = _ => {
  const { routes, path } = _.routes;
  return (
    <div className="sidebar">
      <section className="logo">
        <a href={window.location.origin} target="_blank" className={'logoLink'}>
          {' '}
          <img src={logo} alt="Logo" height="100" />
          <span>Garage b14</span>
        </a>
      </section>
      <section className="items">
        <ul>
          {routes.map(el => (
            <li key={el.route}>
              <NavLink to={path + el.route}>
                {' '}
                <FontAwesomeIcon icon={el.icon} />
                <span> {el.name}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default Sidebar;
