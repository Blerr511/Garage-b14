import React from 'react';
import { NavLink, Link, withRouter } from 'react-router-dom';
import { faBars } from '@fortawesome/free-solid-svg-icons';
import './Nav.less';
import logo from '../../assets/img/logo_header.png';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import DraftsIcon from '@material-ui/icons/Drafts';
import SendIcon from '@material-ui/icons/Send';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useState } from 'react';
import { useEffect } from 'react';

const StyledMenu = withStyles({
  paper: {
    border: '1px solid #d3d4d5',
    width: '100%',
    backgroundColor: 'black',
    fontWeight: '600',
    '& #services': {
      background: '#ffe15f',
      color: 'black'
    },
    '& a': {
      color: 'white'
    }
  }
})(props => (
  <Menu
    elevation={0}
    getContentAnchorEl={null}
    anchorOrigin={{
      vertical: 'bottom',
      horizontal: 'center'
    }}
    transformOrigin={{
      vertical: 'top',
      horizontal: 'center'
    }}
    {...props}
  />
));

const StyledMenuItem = withStyles(theme => ({
  root: {
    '& #service': {
      backgroundColor: 'green',
      '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
        color: theme.palette.common.white
      }
    }
  }
}))(MenuItem);
const VerticalNav = props => {
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div className="mobileHeader">
      <div id="logo">
        <Link to="/">
          <img src={logo} alt="Garage b14" height="80" />
        </Link>
      </div>{' '}
      <Button
        aria-controls="customized-menu"
        aria-haspopup="true"
        variant="text"
        color="inherit"
        onClick={handleClick}
      >
        <FontAwesomeIcon
          style={{ fontSize: '24px', color: '#FFE05F' }}
          icon={faBars}
        />
      </Button>
      <StyledMenu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        {props.routes.map(el => {
          if (el.navLink) {
            return (
              <NavLink
                exact
                key={el.route}
                to={el.route}
                // id={el.name === 'services' ? 'services' : null}
              >
                <StyledMenuItem
                  id={el.name === 'services' ? 'services' : null}
                  onClick={handleClose}
                >
                  <ListItemText color="red" primary={el.name} />
                </StyledMenuItem>
              </NavLink>
            );
          }
        })}
      </StyledMenu>
    </div>
  );
};
// export default VerticalNav;
const Nav = props => {
  const [state] = React.useState(
    props.routes.map(el => el.route).concat(['/', '/main', '/:path'])
  );
  return (
    <nav
      className="navbar"
      style={{
        background:
          state.indexOf(props.location.pathname) === -1
            ? 'black'
            : 'transparent'
      }}
    >
      <section>
        <div id="logo">
          <Link to="/">
            <img src={logo} alt="Garage b14" height="80" />
          </Link>
        </div>{' '}
      </section>
      <section>
        <ul>
          {props.routes.map(el => {
            if (el.navLink) {
              return (
                <li key={el.route}>
                  <NavLink
                    exact
                    to={el.route}
                    // id={el.name === 'services' ? 'services' : null}
                  >
                    {el.name}
                  </NavLink>
                </li>
              );
            }
          })}
        </ul>
      </section>
    </nav>
  );
};

export default withRouter(_ => {
  return !_.matchMedia ? <Nav {..._} /> : <VerticalNav {..._} />;
});
