import React from 'react';

import Soclinks from '../Soclinks/Soclinks';

import { test } from '../../test';

import './About.less';
const About = () => {
  return (
    <div
      style={{ backgroundImage: `url(${test.about.bg})` }}
      className="aboutus"
    >
      <div>
        <h2>{test.about.title}</h2>
        <p>{test.about.desc}</p>
      </div>
      <span>
        <Soclinks style={{ left: '10%' }} />
      </span>
    </div>
  );
};

export default About;
