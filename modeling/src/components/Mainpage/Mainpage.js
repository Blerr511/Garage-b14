import React from 'react';

import { Route, NavLink, withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { styles } from '../../styles/main';
import './Mainpage.less';

const Mainpage = _ => {
  const [params] = React.useState(_.params);
  const pushHistory = _.history.push;
  const hundleScroll = e => {
    console.log(_.location.pathname);
    if (event.deltaY < 0) {
      params.map((el, id) => {
        if (
          /main/ + el._id == _.location.pathname ||
          (id === 0 &&
            (_.location.pathname === '/' || _.location.pathname === '/main/'))
        ) {
          if (params[id - 1]) {
            pushHistory(/main/ + params[id - 1]._id);
          } else {
            pushHistory(/main/ + params[params.length - 1]._id);
          }
        }
      });
    } else if (event.deltaY > 0) {
      params.map((el, id) => {
        if (
          /main/ + el._id == _.location.pathname ||
          (id === 0 &&
            (_.location.pathname === '/' || _.location.pathname === '/main/'))
        ) {
          if (params[id + 1]) {
            pushHistory(/main/ + params[id + 1]._id);
          } else {
            pushHistory(/main/ + params[0]._id);
          }
        }
      });
    }
    return false;
  };
  const classes = styles();
  return (
    <div className="mainPage" onWheel={hundleScroll}>
      {params.map((el, id) => {
        return (
          <Route
            key={el._id}
            path={
              id === 0 ? `/(|main|${el._id}|main/${el._id})` : /main/ + el._id
            }
            exact
            component={() => (
              <section
                style={
                  el.bgType === 'image'
                    ? { backgroundImage: `url(${el.bg})` }
                    : null
                }
                className="mainPageSection"
                id={el.id}
              >
                {el.bgType === 'video' && (
                  <video className={classes.bgVideoPlayer} autoPlay muted loop>
                    <source src={el.bg} type="video/mp4" />
                  </video>
                )}
                <div style={{ zIndex: 10 }}>
                  <div>
                    <img height="200" src={el.img} alt={el.title} />{' '}
                  </div>
                  <div
                    style={{
                      display: 'flex',
                      justifyContent: 'center',
                      alignItems: 'center'
                    }}
                  >
                    {' '}
                    {el.logo && (
                      <img height="200" src={el.logo} alt="logo" />
                    )}{' '}
                    <div> {ReactHtmlParser(el.desc)}</div>
                  </div>
                </div>
              </section>
            )}
          />
        );
      })}

      <div className="verticalBar">
        <div>
          {params.map((el, id) => {
            return (
              <NavLink
                key={el._id}
                to={'/main/' + el._id}
                isActive={(match, location) => {
                  if (location.pathname === '/main/' + el._id) {
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
                <span className="dotVerticalBar"></span>
              </NavLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default withRouter(Mainpage);
