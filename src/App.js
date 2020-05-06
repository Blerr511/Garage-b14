import React, { useState, useEffect } from 'react';
import { Switch, Route, withRouter, NavLink } from 'react-router-dom';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import Nav from './components/Nav/Nav';
import Soclinks from './components/Soclinks/Soclinks';
import Adminpage from './components/Adminpage/Adminpage';
import notFound from './components/404';
import './App.less';
import AnchorLink from 'react-anchor-link-smooth-scroll';
const App = _ => {
  const { myRoutes, mainPageRoutes, dir } = _;
  const [matchemediaState, setMatchmediaState] = useState(
    window.innerWidth < 730
  );
  const [anchorActive, setAnchorActive] = useState(0);
  const foo = e => {
    setMatchmediaState(e.matches);
    // if (!e.matches) _.history.push('/');
  };

  const boo = e => {
    const pos = Math.round(window.scrollY / window.innerHeight);
    if (
      pos !== anchorActive &&
      matchemediaState &&
      /^(\/main\/*.*)|(\/)$/.test(_.location.pathname)
    )
      setAnchorActive(pos);
  };
  useEffect(() => {
    window.mMatchMedia = window.matchMedia('(max-width: 724px)');
    window.mMatchMedia.addListener(foo);
  }, []);
  return (
    <div onWheel={boo}>
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
                              component={() => (
                                <div>{el.component(matchemediaState)}</div>
                              )}
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
                              className={anchorActive === id ? 'active' : null}
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
      }
    </div>
  );
};

export default withRouter(App);
