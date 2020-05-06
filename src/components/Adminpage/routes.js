import React from 'react';
import {
  faImages,
  faFolderPlus,
  faHome,
  faCrow,
  faPaperPlane
} from '@fortawesome/free-solid-svg-icons';

import Tabs from './Tabs/Tabs';
import Pages from './Pages/Pages';
import MainPage from './MainPage/MainPage';
import ContactData from './ContactData/ContactData';
import Mail from './Mail/Mail';

export const routes = {
  path: '/admin',
  routes: [
    {
      name: 'Main page',
      route: '/mainpage',
      component: () => <MainPage />,
      icon: faHome,
      nav: true
    },
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
    },
    {
      name: 'Contact',
      route: '/contact',
      component: () => <ContactData />,
      icon: faCrow,
      nav: true
    },
    {
      name: 'Mails',
      route: '/mails',
      component: () => <Mail />,
      icon: faPaperPlane,
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
