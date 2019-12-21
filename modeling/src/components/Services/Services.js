import React from 'react';

import ReactHtmlParser from 'react-html-parser';
import { styles } from '../../styles/main';
import './Services.less';

const Services = props => {
  const { desc, content, style } = props.params;
  const classes = styles();
  return (
    <div
      className="services"
      style={{
        background: style.bg.type === 'color' ? style.bg.val : 'black'
      }}
    >
      {style.bg.type === 'video' && (
        <video className={classes.bgVideoPlayer} autoPlay muted loop>
          <source src={style.bg.val} type="video/mp4" />
        </video>
      )}
      {style.bg.type === 'image' && (
        <img
          className={classes.bgVideoPlayer}
          draggable={false}
          src={style.bg.val}
          alt="Background"
        />
      )}
      <div style={{ zIndex: 10, position: 'relative' }}>
        {/* <h2>our services</h2> */}
        <div>{ReactHtmlParser(desc)} </div>
        {content.map(el => {
          return (
            <div className="tableBlock" key={el._id}>
              <div>
                <h2>{el.title}</h2> <p>{el.desc}</p>{' '}
              </div>
              <div>
                {' '}
                <img src={el.img} alt={el.title} />
              </div>
            </div>
          );
        })}
        <div style={{ position: 'relative', left: '0' }}></div>
      </div>
    </div>
  );
};

export default Services;
