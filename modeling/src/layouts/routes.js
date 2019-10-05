import React from 'react';

import Dashboard from '@material-ui/icons/Dashboard';
import Person from '@material-ui/icons/Person';
import LibraryBooks from '@material-ui/icons/LibraryBooks';
import BubbleChart from '@material-ui/icons/BubbleChart';
import LocationOn from '@material-ui/icons/LocationOn';
import Notifications from '@material-ui/icons/Notifications';


export const routes = [
  {
    path: '/dashboard',
    name: 'Dashboard',
    rtlName: 'لوحة القيادة',
    icon: Dashboard,
    component: () => <div>DashboardPage'</div>,
    layout: '/admin'
  },
  {
    path: '/user',
    name: 'User Profile',
    rtlName: 'ملف تعريفي للمستخدم',
    icon: Person,
    component: 'UserProfile',
    layout: '/admin'
  },
  {
    path: '/table',
    name: 'Table List',
    rtlName: 'قائمة الجدول',
    icon: LibraryBooks,
    component: 'TableList',
    layout: '/admin'
  },
  {
    path: '/icons',
    name: 'Icons',
    rtlName: 'الرموز',
    icon: BubbleChart,
    component: 'Icons',
    layout: '/admin'
  },
  {
    path: '/maps',
    name: 'Maps',
    rtlName: 'خرائط',
    icon: LocationOn,
    component: 'Maps',
    layout: '/admin'
  },
  {
    path: '/notifications',
    name: 'Notifications',
    rtlName: 'إخطارات',
    icon: Notifications,
    component: 'NotificationsPage',
    layout: '/admin'
  }
];
