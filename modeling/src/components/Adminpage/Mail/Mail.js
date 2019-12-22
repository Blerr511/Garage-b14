import React, { useState, useEffect } from 'react';

import Message from '../Message/Message';
import LinearProgress from '@material-ui/core/LinearProgress';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Dialog from '@material-ui/core/Dialog';
import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faEnvelopeOpen,
  faTrashAlt,
  faEnvelope,
  faTrash,
  faRedo
} from '@fortawesome/free-solid-svg-icons';
import { styles } from '../../../styles/main';

const Mail = () => {
  const classes = styles();
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: 'success',
    message: '',
    open: false
  });
  const [mails, setMails] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [selected, setSelected] = useState([]);
  const [queryParams, setQueryParams] = useState({
    page: 0,
    limit: 25,
    newOnly: false
  });

  const [dialog, setDialog] = useState({
    open: false,
    title: '',
    text: '',
    _id: ''
  });

  const closeMessage = _ => setMessage({ ...message, open: false });

  useEffect(() => {
    getMails();
    let interval = setInterval(() => getMails(), 30000);
    return () => {
      clearInterval(interval);
    };
  }, []);

  useEffect(() => {
    getMails();
  }, [queryParams]);
  const getMails = async () => {
    const { page, limit, newOnly } = queryParams;
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('page', page);
      formData.append('limit', limit);
      formData.append('newOnyl', newOnly);
      let data = await fetch(
        `${process.env.SERVER}/api/mails?page=${page}&limit=${limit}${
          newOnly ? 'newOnyl' : ''
        }`
      );
      data = await data.json();
      if (data.status !== 200) {
        throw data.message;
      }
      setMails(data.data);
      setTotalCount(data.count);
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
      setMessage({ type: 'error', text: text, open: true });
    }
  };
  const handleChangePage = (_, page) => {
    setQueryParams({ ...queryParams, page: page });
  };
  const handleChangeRowsPerPage = _ => {
    setQueryParams({
      ...queryParams,
      limit: _.target.value,
      page: 0
    });
  };
  const hundleSelectChange = _id => {
    if (selected.indexOf(_id) == -1) {
      setSelected([...selected, _id]);
    } else {
      let temp = selected.slice();
      temp.splice(selected.indexOf(_id), 1);
      setSelected(temp);
    }
  };
  const hundleSelecteAll = _ => {
    if (_.target.checked) {
      setSelected(mails.map(_ => _._id));
    } else {
      setSelected([]);
    }
  };

  const handleDeleteMails = async ids => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (typeof ids === 'string') {
        formData.append('_id', ids);
      } else {
        ids.map(el => {
          formData.append('_id', el);
        });
      }

      let data = await fetch(`${process.env.SERVER}/api/mails/rm`, {
        method: 'POST',
        body: formData
      });

      data = await data.json();
      getMails();

      if (data.status !== 200) {
        throw data.message;
      }
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
      setMessage({ type: 'error', text: text, open: true });
    }
  };
  const handleReadMails = async ids => {
    try {
      setLoading(true);
      const formData = new FormData();
      if (typeof ids === 'string') {
        formData.append('_id', ids);
      } else {
        ids.map(el => {
          formData.append('_id', el);
        });
      }

      let data = await fetch(`${process.env.SERVER}/api/mails/read`, {
        method: 'POST',
        body: formData
      });

      data = await data.json();
      getMails();

      if (data.status !== 200) {
        throw data.message;
      }
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
      setMessage({ type: 'error', text: text, open: true });
    }
  };

  const handleCloseDIalog = _ => setDialog({ ...dialog, open: false });

  const openDialog = _ => {
    if (!_.readed) handleReadMails(_._id);
    setDialog({
      open: true,
      text: _.text,
      title: _.email,
      _id: _._id
    });
  };

  return (
    <div className={classes.paper}>
      <Message
        open={message.open}
        type={message.type}
        handleclose={closeMessage}
        timer={3000}
        message={message.text}
      />
      {loading && (
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '10px'
          }}
        >
          <LinearProgress color="secondary" variant="query" />
        </div>
      )}
      {
        <Dialog scroll="paper" onClose={handleCloseDIalog} open={dialog.open}>
          <div
            style={{
              padding: '30px',
              wordBreak: 'break-all',
              minWidth: '400px'
            }}
          >
            <DialogTitle>{dialog.title}</DialogTitle>
            <DialogContent dividers={true}>{dialog.text}</DialogContent>
            <DialogActions>
              <IconButton
                color="secondary"
                onClick={_ => {
                  handleDeleteMails(dialog._id);
                  handleCloseDIalog();
                }}
              >
                <FontAwesomeIcon icon={faTrash} />
              </IconButton>
            </DialogActions>
          </div>
        </Dialog>
      }

      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <IconButton onClick={getMails}>
          <FontAwesomeIcon icon={faRedo} />
        </IconButton>
      </div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell style={{ width: '50px' }}>
              <Checkbox onChange={hundleSelecteAll} />
            </TableCell>
            <TableCell style={{ width: '50px' }}>
              <IconButton
                onClick={_ => handleDeleteMails(selected)}
                variant="extended"
                color="secondary"
                disabled={selected.length === 0}
              >
                <FontAwesomeIcon
                  icon={faTrashAlt}
                  style={{ fontSize: '24px' }}
                />
              </IconButton>
            </TableCell>
            <TableCell style={{ width: '50px' }}>
              <IconButton
                onClick={_ => handleReadMails(selected)}
                variant="extended"
                color="primary"
                disabled={selected.length === 0}
              >
                <FontAwesomeIcon
                  icon={faEnvelopeOpen}
                  style={{ fontSize: '24px' }}
                />
              </IconButton>
            </TableCell>
            <TableCell>Email</TableCell>
            <TableCell>Message</TableCell>
            <TableCell>Date</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {mails.map(el => (
            <TableRow
              style={{ cursor: 'pointer' }}
              hover
              selected={el.readed}
              key={el._id}
            >
              <TableCell style={{ width: '50px' }}>
                {' '}
                <Checkbox
                  checked={selected.includes(el._id)}
                  onChange={_ => hundleSelectChange(el._id)}
                />
              </TableCell>
              <TableCell style={{ width: '50px' }}>
                {' '}
                <IconButton
                  color="secondary"
                  onClick={_ => handleDeleteMails(el._id)}
                >
                  <FontAwesomeIcon
                    icon={faTrashAlt}
                    style={{ fontSize: '24px' }}
                  />
                </IconButton>
              </TableCell>
              <TableCell style={{ width: '50px' }}>
                <FontAwesomeIcon
                  icon={el.readed ? faEnvelopeOpen : faEnvelope}
                  style={{ fontSize: '24px', color: 'gray', padding: '12px' }}
                />
              </TableCell>
              <TableCell
                onClick={_ => {
                  openDialog(el);
                }}
              >
                {el.email}
              </TableCell>
              <TableCell
                onClick={_ => {
                  openDialog(el);
                }}
              >
                {el.text.length > 30 ? el.text.slice(0, 30) + '...' : el.text}
              </TableCell>
              <TableCell
                onClick={_ => {
                  openDialog(el);
                }}
              >
                {new Date(el.date).toLocaleString()}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <TablePagination
        rowsPerPageOptions={[10, 25, 50]}
        component="div"
        count={totalCount}
        rowsPerPage={queryParams.limit}
        page={queryParams.page}
        onChangePage={handleChangePage}
        onChangeRowsPerPage={handleChangeRowsPerPage}
      />
    </div>
  );
};

export default Mail;
