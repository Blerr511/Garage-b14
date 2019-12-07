import React from 'react';
import {
  Switch,
  Route,
  withRouter,
  BrowserRouter as Router
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Nav from './components/Nav/Nav';
import Soclinks from './components/Soclinks/Soclinks';
import Mainpage from './components/Mainpage/Mainpage';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Contactus from './components/Contactus/Contactus';
import Adminpage from './components/Adminpage/Adminpage';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import notFound from './components/404';
import './App.less';
const App = _ => {
  const [myRoutes, setMyRoutes] = React.useState([]);
  const [mainPageRoutes, setMainPageRoutes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  React.useEffect(() => {
    if (
      !(
        document.cookie &&
        document.cookie.split('uniqueId=') &&
        document.cookie.split('uniqueId=')[0]
      )
    ) {
      document.cookie = 'uniqueId=' + Date.now();
    }
    fetch(`${process.env.SERVER}/api/mainItems`)
      .then(_ => _.json())
      .then(mainItems => {
        setMainPageRoutes(
          mainItems.data.map(el => ({
            name: el._id,
            route: '/main/' + el._id,
            navLink: false
          }))
        );
        fetch(`${process.env.SERVER}/api/get?page=0&limit=20`)
          .then(_ => _.json())
          .then(data => {
            setMyRoutes(
              [
                {
                  route: '/(|main)',
                  name: 'Home page',
                  navLink: false,
                  component: () => <Mainpage p={_} params={mainItems.data} />
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
                      obj.component = () => <Portfolio params={el} />;
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
            setLoading(false);
          });
      });
  }, []);

  return (
    <div>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Switch>
          <Route path="/admin" component={Adminpage}></Route>
          <Route
            render={p => {
              return (
                <div>
                  <Nav p={p} routes={myRoutes.concat(mainPageRoutes)} />
                  <TransitionGroup>
                    <CSSTransition
                      classNames="page"
                      key={p.location.pathname}
                      timeout={700}
                    >
                      <section className="containerSection">
                        <Switch location={p.location}>
                          {myRoutes.map(el => {
                            return (
                              <Route
                                path={el.route}
                                component={() => <div>{el.component()}</div>}
                                key={el.route}
                              />
                            );
                          })}
                          <Route component={notFound} />
                        </Switch>
                      </section>
                    </CSSTransition>
                  </TransitionGroup>
                  <Soclinks />
                </div>
              );
            }}
          />
        </Switch>
      )}
    </div>
  );
};

export default withRouter(App);
