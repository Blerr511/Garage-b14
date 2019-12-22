import React, { useState, useEffect, useMemo } from 'react';
import TablePagionation from '@material-ui/core/TablePagination';
import {
  Card,
  CardActions,
  CardContent,
  LinearProgress,
  Dialog,
  DialogActions,
  DialogContent,
  IconButton,
  CardHeader,
  TablePagination,
  DialogTitle,
  Typography
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';
import clsx from 'clsx';
import { styles } from '../../../styles/main';

const PortfolioContent = _ => {
  const classes = styles();
  const pageId = _.pageId;

  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [limit, setLimit] = useState(50);
  const [page, setPage] = useState(0);
  const [error, setError] = useState('');
  useEffect(() => {
    fetchContent(pageId, page, limit);
  }, []);
  useEffect(() => {
    fetchContent(pageId, page, limit);
  }, [page]);
  const fetchContent = async (pageId, page, limit) => {
    try {
      setError('');
      setLoading(true);
      let data = await fetch(
        `${process.env.SERVER}/api/getSingle?contentLimit=${limit}&contentPage=${page}&pageId=${pageId}`
      );
      data = await data.json();

      setData({ ...data.data, count: data.count });
      setLoading(false);
    } catch (err) {
      setLoading(false);
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      else var text = 'Somthing  goes wrong .';
      setError(text);
    }
  };
  const c = useMemo(() => (_.open ? fetchContent(pageId, page, limit) : null), [
    _.open
  ]);

  const removeContentHundler = _.removeContentHundler;
  return (
    <Dialog
      maxWidth={'xl'}
      open={_.open}
      scroll="paper"
      onClose={_.onClose}
      fullWidth={true}
    >
      {loading && <LinearProgress color="secondary" variant="query" />}
      <DialogTitle>{data && data.title}</DialogTitle>

      <DialogContent
        style={{
          minWidth: '512px',
          minHeight: '364px',
          justifyContent: 'flex-start'
        }}
        className={clsx([classes.paper, classes.flexWrap])}
      >
        {error && <div style={{ color: '#f00', padding: '15px' }}>{error}</div>}
        {data &&
          data.content &&
          data.content.map(el => {
            return (
              <Card key={el._id} className={classes.cardStandard}>
                <CardHeader
                  title={el.title || '_'}
                  style={{ padding: '9px 16px 0' }}
                  action={
                    <IconButton
                      onClick={_ => {
                        setLoading(true);
                        removeContentHundler(pageId, el._id).then(_ =>
                          fetchContent(pageId, page, limit)
                        );
                      }}
                    >
                      <FontAwesomeIcon
                        icon={faTimes}
                        style={{ width: '20px', height: '20px' }}
                      />
                    </IconButton>
                  }
                ></CardHeader>

                <CardContent style={{ padding: '0' }}>
                  <img
                    src={el.img}
                    style={{
                      width: '200px',
                      height: '175px',
                      objectFit: 'cover'
                    }}
                    alt={el.img}
                  />
                </CardContent>
              </Card>
            );
          })}
      </DialogContent>
      <DialogActions>
        <TablePagination
          rowsPerPageOptions={[25, 50, 100]}
          component="div"
          count={data ? data.count : 0}
          rowsPerPage={limit}
          page={page}
          onChangePage={(_, page) => setPage(page)}
          onChangeRowsPerPage={_ => {
            setLimit(_.target.value);
            setPage(0);
          }}
        />{' '}
      </DialogActions>
    </Dialog>
  );
};

export default PortfolioContent;
