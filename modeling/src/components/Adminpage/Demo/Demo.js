import React from 'react';
import { withRouter } from 'react-router-dom';
import Fab from '@material-ui/core/Fab';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMinus } from '@fortawesome/free-solid-svg-icons';
import './Demo.less';

const Demo = props => {
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        style={{ width: '100%', height: '100vh' }}
        src={`${window.location.origin}/${props.route}`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default withRouter(Demo);
