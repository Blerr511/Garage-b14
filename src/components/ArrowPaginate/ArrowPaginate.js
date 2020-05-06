import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faChevronLeft,
  faChevronRight
} from '@fortawesome/free-solid-svg-icons';
const styles = {
  root: {
    position: 'absolute',
    top: '0',
    left: '0',
    zIndex: 12,
    display: 'flex',
    justifyContent: 'space-between'
  },
  arrowContainer: {
    position: 'fixed',
    top: '40%',
    padding: '25px 10px',
    margin: '0!important',
    height: '10%',
    cursor: 'pointer',
    zIndex: 100,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    transition: '0.223s',
    '&:hover': {
      background: '#00000013',
      '& svg': { color: 'black!important' }
    }
  },
  arrowStyle: {
    fontSize: '40px',
    color: '#000000aa'
  }
};

const ArrowPaginate = withStyles(styles)(rest => {
  const {
    count,
    rowsPerPage,
    page,
    onChangePage,
    onChangeRowsPerPage,
    classes,
    marginBorders
  } = rest;
  const handleNextPage = _ => onChangePage(page + 1);
  const handlePrevPage = _ => onChangePage(page - 1);
  return (
    <div className={classes.root}>
      {page !== 0 && (
        <div
          className={classes.arrowContainer}
          onClick={handlePrevPage}
          style={{ left: marginBorders }}
        >
          {' '}
          <FontAwesomeIcon
            className={classes.arrowStyle}
            icon={faChevronLeft}
          />{' '}
        </div>
      )}
      {page !== Math.ceil(count / rowsPerPage) - 1 && (
        <div
          className={classes.arrowContainer}
          onClick={handleNextPage}
          style={{ right: marginBorders }}
        >
          {' '}
          <FontAwesomeIcon
            className={classes.arrowStyle}
            icon={faChevronRight}
          />{' '}
        </div>
      )}
    </div>
  );
});

export default ArrowPaginate;
