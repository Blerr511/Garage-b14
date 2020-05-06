import React from 'react';

import ReactHtmlParser from 'react-html-parser';
import { styles } from '../../styles/main';
import './About.less';
const About = props => {
  const { title, style, desc } = props.params;
  const classes = styles();
  return (
    <div
      style={{
        background: style.bg.type === 'color' ? style.bg.val : 'black'
      }}
      className="aboutus"
    >
      {' '}
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
      <div>{ReactHtmlParser(desc)}</div>
    </div>
  );
};

export default About;
