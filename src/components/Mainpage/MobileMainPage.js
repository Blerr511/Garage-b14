import React from 'react';

import { Route, withRouter } from 'react-router-dom';
import ReactHtmlParser from 'react-html-parser';
import { styles } from '../../styles/main';
import './Mainpage.less';

const MobileMainPage = _ => {
  const [params] = React.useState(_.params);
  const classes = styles();
  const routes = params.map(el => /main/ + el._id);
  const pushHistory = _.history.push;
  const goToServices = _ => {
    pushHistory('/services#' + _);
  };
  return (
    <Route
      path={routes.concat('/main', '/')}
      component={() => (
        <div className="mainPage">
          {params.map((el, id) => {
            return (
              <section
                style={el.bgType === 'color' ? { background: el.bg } : null}
                className="mainPageSection"
                key={el._id}
                id={el._id}
                onClick={_ => goToServices(el.goTo)}
              >
                {el.bgType === 'video' && (
                  <video
                    className={classes.bgVideoPlayer}
                    style={{ position: 'absolute' }}
                    autoPlay
                    muted
                    loop
                  >
                    <source src={el.bg} type="video/mp4" />
                  </video>
                )}
                {el.bgType === 'image' && (
                  <img
                    style={{ position: 'absolute' }}
                    className={classes.bgVideoPlayer}
                    draggable={false}
                    src={el.bg}
                    alt="Background"
                  />
                )}
                <div style={{ zIndex: 10 }}>
                  <div>
                    <img height="200" src={el.img} alt={el.title} />{' '}
                  </div>
                  <div className="changeableFlex">
                    {' '}
                    {el.logo && (
                      <img height="200" src={el.logo} alt="logo" />
                    )}{' '}
                    <div> {ReactHtmlParser(el.desc)}</div>
                  </div>
                </div>
              </section>
            );
          })}
        </div>
      )}
    />
  );
};

export default withRouter(MobileMainPage);
