import React, { useRef, useMemo } from 'react';
import { withRouter } from 'react-router-dom';
import './Demo.less';

const Demo = props => {
  const ref = useRef();
  useMemo(() => {
    if (ref.current) ref.current.src = ref.current.src;
  }, [props.reset]);
  return (
    <div style={{ width: '100%', height: '100vh' }}>
      <iframe
        ref={ref}
        style={{ width: '100%', height: '100vh' }}
        src={`${window.location.origin}/${props.route}`}
        frameBorder="0"
      ></iframe>
    </div>
  );
};

export default withRouter(Demo);
