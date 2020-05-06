import React, { useState } from 'react';
import { NavLink, withRouter } from 'react-router-dom';
import { faSignOutAlt } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogActions from '@material-ui/core/DialogActions';
import Button from '@material-ui/core/Button';
import './Sidebar.less';

const Sidebar = _ => {
  const { routes, path } = _.routes;
  const handleLogout = _ => {
    _.preventDefault();
    setDialog(true);
  };
  const handleLogoutRequest = async event => {
    try {
      let data = await fetch(`${process.env.SERVER}/logout`, {
        method: 'POST',
        credentials: 'include'
      });
      data = await data.json();
      _.setAdminState({ logged: false });
    } catch (err) {
      console.error(err);
    }
  };
  const [dialog, setDialog] = useState(false);
  return (
    <div className="sidebar">
      <Dialog open={dialog} onClose={_ => setDialog(false)}>
        <div
          style={{
            padding: '15px 30px',
            wordBreak: 'break-all',
            minWidth: '250px',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center'
          }}
        >
          <DialogTitle>Log out ?</DialogTitle>
          <DialogActions>
            <Button
              variant="contained"
              onClick={_ => setDialog(false)}
              color="primary"
            >
              No
            </Button>
            <Button
              onClick={handleLogoutRequest}
              variant="outlined"
              color="secondary"
            >
              Yes
            </Button>
          </DialogActions>
        </div>
      </Dialog>
      <section className="logo">
        <a href={window.location.origin} target="_blank" className={'logoLink'}>
          {' '}
          <img
            src={require('../../../assets/img/logo_header.png')}
            alt="Logo"
            height="100"
          />
          <span>Garage b14</span>
        </a>
      </section>
      <section className="items">
        <ul>
          {routes.map(el => (
            <li key={el.route}>
              <NavLink to={path + el.route}>
                {' '}
                <FontAwesomeIcon icon={el.icon} />
                <span> {el.name}</span>
              </NavLink>
            </li>
          ))}
          <li>
            {' '}
            <a style={{ cursor: 'pointer' }} onClick={handleLogout}>
              {' '}
              <FontAwesomeIcon icon={faSignOutAlt} /> <span> Log out</span>{' '}
            </a>{' '}
          </li>
        </ul>
      </section>
    </div>
  );
};

export default withRouter(Sidebar);
