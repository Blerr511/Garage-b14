import React from 'react';
import { faImages, faFolderPlus } from '@fortawesome/free-solid-svg-icons';

import Tabs from '../../components/Adminpage/Tabs/Tabs';
import Pages from '../../components/Adminpage/Pages/Pages';

export const routes = {
  path: '/admin',
  routes: [
    {
      name: 'Pages',
      route: '/pages',
      component: Pages,
      icon: faImages,
      nav: true
    },
    {
      name: 'Add Page',
      route: '/addpage',
      component: () => <Tabs />,
      icon: faFolderPlus,
      nav: true
    }
    // {
    //   name: 'Pages',
    //   route: '/pe',
    //   component: 'Pages',
    //   icon: faImages,
    //   nav: true
    // },
    // {
    //   name: 'Pages',
    //   route: '/pes',
    //   component: Pages,
    //   icon: faImages,
    //   nav: true
    // }
  ]
};
