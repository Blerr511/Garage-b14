import React from 'react';

import Mainpage from '../components/Mainpage/Mainpage';
import Services from '../components/Services/Services';
import Team from '../components/Team/Team';
import Portfolio from '../components/Portfolio/Portfolio';
import About from '../components/About/About';
import Contactus from '../components/Contactus/Contactus';
import Partners from '../components/Partners/Partners';
export const routes = [
  {
    route: '/',
    name: 'Home page',
    navLink: false,
    component: Mainpage
  },
  {
    route: '/aboutus',
    name: 'about us',
    navLink: true,
    component: About
  },
  {
    route: '/services',
    name: 'services',
    navLink: true,
    component: Services
  },
  {
    route: '/portfolio',
    name: 'portfolio',
    navLink: true,
    component: Portfolio
  },
  {
    route: '/partners',
    name: 'partners',
    navLink: true,
    component: Partners
  },
  {
    route: '/team',
    name: 'team',
    navLink: true,
    component: Team
  },
  {
    route: '/contactus',
    name: 'contact us',
    navLink: true,
    component: Contactus
  }
];
