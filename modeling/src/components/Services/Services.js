import React from 'react';

import Soclinks from '../Soclinks/Soclinks';

import { test } from '../../test';

import './Services.less';

const Services = () => {
  return (
    <div className="services">
      <div>
        <h2>our services</h2>
        {test.mainPage.map(el => {
          return (
            <div className="tableBlock" key={el.id}>
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
        <div style={{ position: 'relative', left: '0' }}>
          <Soclinks style={{ left: '0' }} />
        </div>
      </div>
    </div>
  );
};

export default Services;
