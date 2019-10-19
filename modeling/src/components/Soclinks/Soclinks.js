import React from 'react';
import PropTypes from 'prop-types';

import { test } from '../../test';

import './Soclinks.less';

const Soclinks = (rest) => {
  return (
    <div {...rest} className="soclinks">
      {test.soclinks.map(el => {
        return (
          <span key={el.link}>
            <a target="_blank" href={el.link}>
              {el.name}
            </a>
            <span>/</span>
          </span>
        );
      })}
    </div>
  );
};

Soclinks.propTypes = {
  style: PropTypes.object
};

export default Soclinks;
