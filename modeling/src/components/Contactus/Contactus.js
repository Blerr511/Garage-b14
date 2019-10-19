import React, { useState, useEffect } from 'react';

import Soclinks from '../Soclinks/Soclinks';

import { test } from '../../test';

import './Contactus.less';

const getYear = year => {
  return new Date().getFullYear() > year
    ? year + ' - ' + new Date().getFullYear()
    : year;
};

const Contactus = () => {
  const [state, setState] = useState({
    bg: '',
    title: '',
    desc: '',
    contacts: [],
    address: []
  });
  useEffect(() => {
    setState(test.contactus);
  });
  return (
    <div style={{ backgroundImage: `url(${state.bg})` }} className="contactus">
      <div>
        <div>
          <div>
            <h2>{state.title}</h2> <p>{state.desc}</p>
          </div>
          <div>
            <input type="text" placeholder="Email" />
            <textarea
              placeholder="Text"
              name="Text"
              id="textarea"
              cols="30"
              rows="10"
            ></textarea>
            <button>Send</button>
          </div>
        </div>
        <div>
          <div>
            {state.contacts.map(el => (
              <span key={el}>{el}</span>
            ))}
          </div>
          <div>
            {state.address.map(el => (
              <span className="address" key={el}>
                {el}
              </span>
            ))}
          </div>
        </div>

        <footer>
          <Soclinks style={{ position: 'relative', left: 0, bottom: 0 }} />

          <span> Garage B14 studios {getYear(2019)}, All rights reserved</span>
        </footer>
      </div>
    </div>
  );
};

export default Contactus;
