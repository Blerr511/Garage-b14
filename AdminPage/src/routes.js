import React from 'react';
import { faImages } from '@fortawesome/free-solid-svg-icons';

import Pages from './components/Adminpage/Pages/Pages';

export const routes = {
  path: '/admin',
  routes: [
    {
      name: 'Pages',
      route: '/pages',
      component: () => <Pages />,
      icon: faImages,
      nav: true
    },
    {
      name: 'Pages',
      route: '/pe',
      component: Pages,
      icon: faImages,
      nav: true
    },
    {
      name: 'Pages',
      route: '/pes',
      component: Pages,
      icon: faImages,
      nav: true
    }
  ]
};
