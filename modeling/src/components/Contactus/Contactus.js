import React, { useState, useEffect, useReducer, useRef } from 'react';

import { styles } from '../../styles/main';

import ReactHtmlParser from 'react-html-parser';
import './Contactus.less';

const getYear = year => {
  return new Date().getFullYear() > year
    ? year + ' - ' + new Date().getFullYear()
    : year;
};

const Contactus = () => {
  const [state, setState] = useState({
    text: '',
    contacts: [],
    address: []
  });
  const classes = styles();
  useEffect(() => {
    fetch(`${process.env.SERVER}/api/contactPage`)
      .then(_ => _.json())
      .then(data => {
        const myState = {
          text: data.data.text,
          contacts: data.data.address.filter(el => !el.address),
          address: data.data.address.filter(el => el.address)
        };
        setState(myState);
      });
  }, []);

  const messageMailRef = useRef();
  const messageTextRef = useRef();

  const [message, setMessage] = useState({
    show: false,
    text: '',
    emailErr: false,
    messageErr: false,
    type: 'error'
  });

  const sendMail = async (text, email) => {
    try {
      const sender = document.cookie.replace('uniqueId=', '');
      let errno = 0;
      if (!text) {
        setMessage({
          ...message,
          messageErr: true
        });
        errno++;
      }
      if (!(/^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/.test(email) && email)) {
        setMessage({
          ...message,
          show: true,
          text: 'Invalid email address',
          emailErr: true,
          type: 'error'
        });
        errno++;
      }
      if (errno) return false;

      const formData = new FormData();
      formData.append('text', text);
      formData.append('email', email);
      formData.append('sender', sender);

      let data = await fetch(`${process.env.SERVER}/api/mails/new`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();

      if (data.status != 200) {
        throw data;
      }
      setMessage({
        show: true,
        text: data.message,
        emailErr: false,
        messageErr: false,
        type: 'success'
      });
    } catch (err) {
      setMessage({
        show: true,
        text: typeof err === 'string' ? err : err.message,
        emailErr: false,
        messageErr: false,
        type: 'error'
      });
    }
  };

  return (
    <div className="contactus">
      <div>
        <div>
          <div style={{ maxWidth: '60%' }}>
            {state.text && ReactHtmlParser(state.text)}
          </div>
          <div>
            {message.show && (
              <span
                className={
                  message.type === 'error'
                    ? classes.errorText
                    : classes.successText
                }
              >
                {message.text}
              </span>
            )}
            <input
              type="email"
              ref={messageMailRef}
              style={message.emailErr ? { borderColor: 'red' } : {}}
              placeholder="Email"
            />
            <textarea
              ref={messageTextRef}
              placeholder="Text"
              name="Text"
              id="textarea"
              cols="30"
              rows="10"
              style={message.messageErr ? { borderColor: 'red' } : {}}
            ></textarea>
            <button
              onClick={_ =>
                sendMail(
                  messageTextRef.current.value,
                  messageMailRef.current.value
                )
              }
            >
              Send
            </button>
          </div>
        </div>
        <div>
          <div>
            {state.contacts.map(el => (
              <span key={el._id}>{el.text}</span>
            ))}
            <footer>
              <span>
                {' '}
                Garage B14 studios {getYear(2019)}, All rights reserved
              </span>
            </footer>
          </div>
          <div>
            {state.address.map(el => (
              <span className="address" key={el._id}>
                {el.text}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contactus;
