import React from 'react';
import AnchorLink from 'react-anchor-link-smooth-scroll';

import Soclinks from '../Soclinks/Soclinks';

import { test } from '../../test';

import './Mainpage.less';
import dot from '../../assets/img/dot.png';
const Mainpage = () => {
  return (
    <div className="mainPage">
      {test.mainPage.map(el => {
        return (
          <section
            style={{ backgroundImage: `url(${el.bg})` }}
            className="mainPageSection"
            key={el.id}
            id={el.id}
          >
            <div>
              <div>
                <img height="200" src={el.img} alt={el.title} />{' '}
              </div>
              <div>
                <h3>{el.title}</h3>
              </div>
            </div>
         <Soclinks/>
          </section>
        );
      })}
      <div className="verticalBar">
        <div>
          {test.mainPage.map(el => {
            return (
              <AnchorLink key={el.id} href={`#${el.id}`}>
                <img src={dot} alt={el.title} height="30" />{' '}
              </AnchorLink>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default Mainpage;
