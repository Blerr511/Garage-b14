import React from 'react';
import MainPage from './Mainpage';
import MobileMainPage from './MobileMainPage';
const Container = _ => {
  return _.matchMedia ? <MobileMainPage {..._} /> : <MainPage {..._} />;
};
export default Container;
