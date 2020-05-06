import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import clsx from 'clsx';
import IconButton from '@material-ui/core/IconButton';
import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faCheckCircle,
  faWarehouse,
  faInfo,
  faCameraRetro,
  faExclamationCircle,
  faTimes
} from '@fortawesome/free-solid-svg-icons';
import { styles } from '../../../styles/main';

const variantIcon = {
  success: faCheckCircle,
  warning: faWarehouse,
  error: faExclamationCircle,
  info: faInfo
};

function MySnackbarContentWrapper(props) {
  const classes = styles();
  const { className, message, onClose, variant, ...other } = props;
  const Icon = _ => <FontAwesomeIcon {..._} icon={variantIcon[variant]} />;
  return (
    <SnackbarContent
      className={clsx(classes[variant], className)}
      aria-describedby="client-snackbar"
      message={
        <span id="client-snackbar" className={classes.message}>
          <Icon className={clsx(classes.icon, classes.iconVariant)} />
          {message}
        </span>
      }
      action={[
        <IconButton
          key="close"
          aria-label="close"
          color="inherit"
          onClick={onClose}
        >
          <FontAwesomeIcon
            className={classes.icon}
            icon={faTimes}
          ></FontAwesomeIcon>
        </IconButton>
      ]}
      {...other}
    />
  );
}

MySnackbarContentWrapper.propTypes = {
  className: PropTypes.string,
  message: PropTypes.string,
  onClose: PropTypes.func,
  variant: PropTypes.oneOf(['error', 'info', 'success', 'warning', ''])
    .isRequired
};

export default function Message(props) {
  const { type, message, open, handleclose, timer } = props;
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    handleclose();
  };

  useEffect(() => {
    let timeout = null;

    if (timer) {
      timeout = setTimeout(handleClose, timer ? timer : 3000);
    }
    return () => {
      clearTimeout(timeout);
    };
  });

  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
        open={open}
        autoHideDuration={6000}
        onClose={handleClose}
      >
        <MySnackbarContentWrapper
          onClose={handleClose}
          variant={type}
          message={message}
        />
      </Snackbar>
    </div>
  );
}

Message.propTypes = {
  type: PropTypes.oneOf(['error', 'info', 'success', 'warning', '']).isRequired,
  message: PropTypes.string,
  open: PropTypes.bool.isRequired,
  handleclose: PropTypes.func.isRequired
};
