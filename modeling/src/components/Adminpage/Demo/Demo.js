import React, { Component } from 'react';

import './Demo.less';

const Demo = props => {
  return (
    <iframe
      style={{ width: '100%', height: '100vh' }}
      src={`${process.env.HOST}/${props.route}`}
      frameBorder="0"
    ></iframe>
  );
};

export default Demo;
