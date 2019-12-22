import React, { useMemo } from 'react';
import {
  Switch,
  Route,
  withRouter,
  BrowserRouter as Router,
  NavLink
} from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Nav from './components/Nav/Nav';
import Soclinks from './components/Soclinks/Soclinks';
import Mainpage from './components/Mainpage/Mainpage';
import Container from './components/Mainpage/Container';
import MobileMainPage from './components/Mainpage/MobileMainPage';
import Services from './components/Services/Services';
import Portfolio from './components/Portfolio/Portfolio';
import About from './components/About/About';
import Contactus from './components/Contactus/Contactus';
import Adminpage from './components/Adminpage/Adminpage';
import LoadingScreen from './components/LoadingScreen/LoadingScreen';
import notFound from './components/404';
import './App.less';
import AnchorLink from 'react-anchor-link-smooth-scroll';
const App = _ => {
  const [myRoutes, setMyRoutes] = React.useState([]);
  const [mainPageRoutes, setMainPageRoutes] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [dir, setDir] = React.useState('page');
  const [matchemediaState, setMatchmediaState] = React.useState(
    window.innerWidth < 730
  );
  const [anchorActive, setAnchorActive] = React.useState(0);
  const foo = e => {
    // console.log(e.matches);
    setMatchmediaState(window.innerWidth < 730);
    // if (!e.matches) _.history.push('/');
  };
  const boo = _ => {
    const pos = Math.round(window.scrollY / window.innerHeight);
    if (pos !== anchorActive) setAnchorActive(pos);
  };
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
    window.mMatchMedia = window.matchMedia('(max-width: 724px)');
    window.mMatchMedia.addListener(foo);
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
                  component: () => (
                    <Container
                      matchMedia={matchemediaState}
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
    <div onWheel={boo}>
      {loading ? (
        <LoadingScreen />
      ) : (
        <Switch>
          <Route path="/admin" component={Adminpage}></Route>
          <Route
            render={p => {
              /\/main\/*.*/.test(p.location.pathname) && window.innerWidth > 724
                ? (document.body.style.overflow = 'hidden')
                : (document.body.style.overflow = 'initial');
              return (
                <div>
                  <Nav
                    matchMedia={matchemediaState}
                    p={p}
                    routes={myRoutes.concat(mainPageRoutes)}
                  />
                  <TransitionGroup>
                    <CSSTransition
                      classNames={dir}
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
                  {/^(\/main\/*.*)|(\/)$/.test(p.location.pathname) ? (
                    <div className="verticalBar">
                      <div>
                        {mainPageRoutes.map((el, id) => {
                          const location = p.location;
                          return matchemediaState ? (
                            <span
                              onClick={() =>
                                setTimeout(() => setAnchorActive(id), 250)
                              }
                              key={el.name}
                            >
                              <AnchorLink
                                className={
                                  anchorActive === id ? 'active' : null
                                }
                                href={'#' + el.name}
                              ></AnchorLink>
                            </span>
                          ) : (
                            <NavLink
                              key={el.name}
                              to={el.route}
                              isActive={(match, location) => {
                                if (location.pathname === el.route) {
                                  return true;
                                } else if (
                                  (id === 0 && location.pathname === '/') ||
                                  location.pathname === '/main'
                                ) {
                                  return true;
                                }
                                return false;
                              }}
                            >
                              {/* <span className="dotVerticalBar"></span> */}
                            </NavLink>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}
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
