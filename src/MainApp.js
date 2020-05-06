import React, { useEffect, useState } from 'react';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
const MainApp = props => {
  const [Component, setComponent] = useState(() => LoadingScreen);
  const [myRoutes, setMyRoutes] = useState([]);
  const [mainPageRoutes, setMainPageRoutes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [dir, setDir] = useState('page');
  const fetchAll = async () => {
    try {
      if (
        !(
          document.cookie &&
          document.cookie.split('uniqueId=') &&
          document.cookie.split('uniqueId=')[0]
        )
      ) {
        document.cookie = 'uniqueId=' + Date.now();
      }

      let mainItems = await fetch(`${process.env.SERVER}/api/mainItems`);
      mainItems = await mainItems.json();
      setMainPageRoutes(
        mainItems.data.map(el => ({
          name: el._id,
          route: '/main/' + el._id,
          navLink: false
        }))
      );
      let data = await fetch(`${process.env.SERVER}/api/get?page=0&limit=20`);
      data = await data.json();
      const Container = require('./components/Mainpage/Container').default;
      const About = require('./components/About/About').default;
      const Services = require('./components/Services/Services').default;
      const Portfolio = require('./components/Portfolio/Portfolio').default;
      const Contactus = require('./components/Contactus/Contactus').default;
      setMyRoutes(
        [
          {
            route: '/(|main)',
            name: 'Home page',
            navLink: false,
            component: _ => (
              <Container
                matchMedia={_}
                setDir={setDir}
                p={_}
                params={mainItems.data}
              />
            )
          }
        ]
          .concat(
            data.data.map(el => {
              const obj = {};

              obj.route = '/' + el.title.replace(/\ /g, '_');
              if (el.style.template === 'template1') {
                obj.component = () => <About params={el} />;
              } else if (el.style.template === 'template2') {
                obj.component = () => <Services params={el} />;
              } else if (el.style.template === 'template3') {
                obj.component = _ => <Portfolio matchMedia={_} params={el} />;
              }
              obj.navLink = true;
              obj.name = el.title;
              return obj;
            })
          )
          .concat({
            route: '/contactus',
            name: 'contact us',
            navLink: true,
            component: Contactus
          })
      );
      const App = require('./App').default;
      setComponent(() => App);

      return true;
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    fetchAll().catch(err => console.error(err));
  }, []);
  return (
    <div>
      <Component {...{ myRoutes, mainPageRoutes, loading, dir }} />
    </div>
  );
};

export default MainApp;
