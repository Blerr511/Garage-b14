import React from 'react';

import { Route, withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { styles } from '../../styles/main';
import './Mainpage.less';

const Mainpage = _ => {
  const [params] = React.useState(_.params);
  const pushHistory = _.history.push;
  const classes = styles();

  const hundleScroll = event => {
    if (event.deltaY < 0) {
      _.setDir('page1');
      setTimeout(() => {
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
      }, 1);
    } else if (event.deltaY > 0) {
      _.setDir('page');
      setTimeout(() => {
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
      }, 1);
    }
    return false;
  };
  const goToServices = _ => {
    pushHistory('/services#' + _);
  };

  return (
    <div
      className="mainPage"
      onTouchMove={e =>
        hundleScroll({
          deltaY: e.touches[0].clientY - e.touches[e.touches.length - 1].clientY
        })
      }
      onWheel={hundleScroll}
    >
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
                style={el.bgType === 'color' ? { background: el.bg } : null}
                className="mainPageSection"
                id={el.id}
                onClick={_ => goToServices(el.goTo)}
              >
                {el.bgType === 'video' && (
                  <video className={classes.bgVideoPlayer} autoPlay muted loop>
                    <source src={el.bg} type="video/mp4" />
                  </video>
                )}
                {el.bgType === 'image' && (
                  <img
                    className={classes.bgVideoPlayer}
                    draggable={false}
                    src={el.bg}
                    alt="Background"
                  />
                )}
                <div style={{ zIndex: 10 }}>
                  <div className="changeableFlex" style={{ cursor: 'pointer' }}>
                    {el.logo && <img height="210" src={el.logo} alt="logo" />}
                    <div> {ReactHtmlParser(el.desc)}</div>
                  </div>
                </div>
              </section>
            )}
          />
        );
      })}
    </div>
  );
};

export default withRouter(Mainpage);
