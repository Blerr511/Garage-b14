import React, { useEffect, useState } from 'react';
import Tabs from '../Tabs/Tabs';
import './Pages';

const Pages = () => {
  const [state, setState] = useState({ pages: [] });
  useEffect(() => {
    fetch(process.env.SERVER + '/api/get')
      .then(_ => _.json())
      .then(data => {
        setState({ pages: data });
      });
  }, []);
  return (
    <div>
      <Tabs pages={state.pages}></Tabs>
    </div>
  );
};

export default Pages;
