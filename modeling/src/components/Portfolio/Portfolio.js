import React from 'react';
import Gallery from 'react-grid-gallery';

import Soclinks from '../Soclinks/Soclinks';

import { test } from '../../test';

import './Portfolio.less';

const Portfolio = () => {
  return (
    <div
      className="portfolio"
      style={{ backgroundImage: `url(${test.portfolio.bg})` }}
    >
      <div>
        <div>
          {[0, 1, 2, 3].map(el => (
            <section key={`reactGridGalarey${el}`}>
              <Gallery
                id={`reactGridGalarey${el}`}
                enableImageSelection={false}
                backdropClosesModal={true}
                images={test.portfolio.photos}
              />
            </section>
          ))}
        </div>
        <div>
          <Soclinks style={{ left: '0' }} />
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
