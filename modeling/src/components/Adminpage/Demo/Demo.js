import React, { Component } from 'react';

import './Demo.less';

const Demo = props => {
  return (
    <iframe
      style={{ width: '100%', height: '100vh' }}
      src={`http://${process.env.HOST}:${process.env.PORT}/${props.route}`}
      frameBorder="0"
    ></iframe>
  );
};

export default Demo;
