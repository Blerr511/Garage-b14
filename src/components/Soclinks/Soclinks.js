import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './Soclinks.less';

const Soclinks = rest => {
  const [links, setLinks] = useState([]);

  useEffect(() => {
    fetch(`${process.env.SERVER}/api/soclinks`)
      .then(_ => _.json())
      .then(data => {
        setLinks(data.data);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div {...rest} className="soclinks">
      {links.map((el, id) => {
        return (
          <span key={el.url}>
            <a target="_blank" href={el.url}>
              {el.name}
            </a>
            {id !== links.length - 1 && <span>/</span>}
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
