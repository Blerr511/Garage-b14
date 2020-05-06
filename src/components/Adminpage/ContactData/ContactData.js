import React, { useState, useEffect, useRef } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Textfield from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Message from '../Message/Message';
import LinearProgress from '@material-ui/core/LinearProgress';
import { Editor } from '@tinymce/tinymce-react';
import { styles } from '../../../styles/main';

const OtherInfo = _ => {
  const classes = styles();

  const infoData = _.data;

  const [currentEdit, setCurrentEdit] = useState(false);
  const editTextRef = useRef();
  const textRef = useRef();
  const checkRef = useRef();
  return (
    <Paper className={classes.paper} style={{ margin: '30px' }}>
      {'Our contacts'}
      <Table className={classes.table} size="small" aria-label="Contact info">
        <TableHead>
          <TableRow>
            <TableCell>{'Address'}</TableCell>
            <TableCell>{'Text'}</TableCell>
            <TableCell></TableCell>
            <TableCell></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {infoData.map(row => {
            return (
              <TableRow key={row._id}>
                <TableCell>
                  <Checkbox
                    checked={row.address}
                    inputProps={{
                      'aria-label': 'primary checkbox',
                      disabled: true
                    }}
                  />
                </TableCell>
                <TableCell>
                  {currentEdit === row._id ? (
                    <Textfield
                      label="Text"
                      className={classes.textField}
                      margin="normal"
                      defaultValue={row.text}
                      inputRef={editTextRef}
                    />
                  ) : (
                    <div style={{ padding: '26px 0' }}>{row.text}</div>
                  )}
                </TableCell>
                <TableCell align="right">
                  <Button
                    variant={currentEdit === row._id ? 'outlined' : 'contained'}
                    color="primary"
                    onClick={p => {
                      if (currentEdit === row._id) {
                        _.edit(row._id, editTextRef.current.value);
                        setCurrentEdit(false);
                      } else setCurrentEdit(row._id);
                    }}
                  >
                    {currentEdit === row._id ? 'Save' : 'Edit'}
                  </Button>{' '}
                </TableCell>
                <TableCell align="left">
                  <Button
                    variant="contained"
                    color="secondary"
                    onClick={p => _.remove(row._id)}
                  >
                    Remove
                  </Button>{' '}
                </TableCell>
              </TableRow>
            );
          })}
          <TableRow>
            <TableCell>
              <Checkbox inputRef={checkRef}></Checkbox>
            </TableCell>
            <TableCell>
              <Textfield
                label="Text"
                inputRef={textRef}
                className={classes.textField}
                margin="normal"
              />
            </TableCell>
            <TableCell align="right">
              <Button
                onClick={() => {
                  _.add(textRef.current.value, checkRef.current.checked);
                  textRef.current.value = '';
                }}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

const SoclinksTable = _ => {
  const soclinks = _.data;
  const classes = styles();
  const [nameRef, urlRef] = [useRef(), useRef()];
  const [editNameRef, editUrlRef] = [useRef(), useRef()];
  const [currentEdit, setCurrentEdit] = useState(false);

  return (
    <Paper className={classes.paper} style={{ margin: '30px' }}>
      {'Our pages'}
      <Table className={classes.table} size="small" aria-label="Our pages">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
            <TableCell>URL</TableCell>
            <TableCell align="right">&nbsp;</TableCell>
            <TableCell align="right">&nbsp;</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {soclinks.map(row => (
            <TableRow key={row._id}>
              <TableCell component="th" scope="row">
                {currentEdit === row._id ? (
                  <Textfield
                    label="Name"
                    className={classes.textField}
                    margin="normal"
                    defaultValue={row.name}
                    inputRef={editNameRef}
                  />
                ) : (
                  <div style={{ padding: '26px 0' }}>{row.name}</div>
                )}
              </TableCell>
              <TableCell>
                {currentEdit === row._id ? (
                  <Textfield
                    label="Url"
                    className={classes.textField}
                    margin="normal"
                    defaultValue={row.url}
                    inputRef={editUrlRef}
                  />
                ) : (
                  row.url
                )}
              </TableCell>
              <TableCell align="right">
                <Button
                  variant={currentEdit === row._id ? 'outlined' : 'contained'}
                  color="primary"
                  onClick={p => {
                    if (currentEdit === row._id) {
                      _.edit(
                        row._id,
                        editNameRef.current.value,
                        editUrlRef.current.value
                      );
                      setCurrentEdit(false);
                    } else setCurrentEdit(row._id);
                  }}
                >
                  {currentEdit === row._id ? 'Save' : 'Edit'}
                </Button>{' '}
              </TableCell>
              <TableCell align="left">
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={p => _.remove(row._id)}
                >
                  Remove
                </Button>{' '}
              </TableCell>
              {/* <TableCell align="right">{row.carbs}</TableCell>
                <TableCell align="right">{row.protein}</TableCell> */}
            </TableRow>
          ))}
          <TableRow>
            <TableCell>
              <Textfield
                label="Name"
                inputRef={nameRef}
                className={classes.textField}
                margin="normal"
              />
            </TableCell>
            <TableCell>
              <Textfield
                inputRef={urlRef}
                label="URL"
                className={classes.textField}
                margin="normal"
              />
            </TableCell>
            <TableCell align="right">
              <Button
                onClick={() => {
                  _.add(nameRef.current.value, urlRef.current.value);
                  nameRef.current.value = '';
                  urlRef.current.value = '';
                }}
                color="primary"
                variant="contained"
              >
                Add
              </Button>
            </TableCell>
            <TableCell>
              {/* <Button color="secondary" variant="contained">
                Clear
              </Button> */}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Paper>
  );
};

const ContactData = () => {
  const classes = styles();
  const [soclinks, setSoclinks] = useState([]);
  const [contactInfo, setContactInfo] = useState([]);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: 'success',
    message: '',
    open: false
  });
  const [contactPageText, setContactPageText] = useState('');
  const closeMessage = _ => setMessage({ ...message, open: false });

  const getSocItems = () => {
    setLoading(true);

    fetch(`${process.env.SERVER}/api/soclinks`)
      .then(_ => _.json())
      .then(_ => {
        setLoading(false);
        if (_.code !== 200) {
          throw _.message;
        }
        setSoclinks(_.data);
      })
      .catch(err => {
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
      });
  };
  const getContactItem = async () => {
    setLoading(true);

    fetch(`${process.env.SERVER}/api/contactInfo`)
      .then(_ => _.json())
      .then(_ => {
        setLoading(false);
        if (_.code !== 200) {
          throw _.message;
        }
        setContactInfo(_.data);
      })
      .catch(err => {
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
      });
  };
  useEffect(() => {
    getSocItems();
    getContactItem();
    getContactPageText();
  }, []);

  const addItemHundle = async (name, url) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('name', name);
      formData.append('url', url);
      let data = await fetch(`${process.env.SERVER}/api/soclinks/add`, {
        method: 'POST',
        body: formData
      });

      data = await data.json();
      if (data.code !== 200) {
        throw data.message;
      }
      setLoading(false);
      getSocItems();
      setMessage({ type: 'success', text: data.message, open: true });
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

  const editItemHundle = async (_id, name, url) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('_id', _id);
      formData.append('name', name);
      formData.append('url', url);
      let data = await fetch(`${process.env.SERVER}/api/soclinks/edit`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();
      if (data.code !== 200) {
        throw data.message;
      }
      setLoading(false);
      getSocItems();
      setMessage({ type: 'success', text: data.message, open: true });
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

  const removeItemHundle = async _id => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('_id', _id);
      let data = await fetch(`${process.env.SERVER}/api/soclinks/rm`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();
      if (data.code !== 200) {
        throw data.message;
      }
      setLoading(false);
      getSocItems();
      setMessage({ type: 'success', text: data.message, open: true });
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

  const addContactInfo = async (text, isAddress) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('text', text);
      formData.append('address', isAddress);
      let data = await fetch(`${process.env.SERVER}/api/contactInfo/add`, {
        method: 'POST',
        body: formData
      });

      data = await data.json();
      if (data.code !== 200) {
        throw data.message;
      }
      setLoading(false);
      getContactItem();
      setMessage({ type: 'success', text: data.message, open: true });
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

  const editContactInfo = async (_id, text) => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('_id', _id);
      formData.append('text', text);
      let data = await fetch(`${process.env.SERVER}/api/contactInfo/edit`, {
        method: 'POST',
        body: formData
      });

      data = await data.json();
      if (data.code !== 200) {
        throw data.message;
      }
      setLoading(false);
      getContactItem();
      setMessage({ type: 'success', text: data.message, open: true });
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

  const removeContactInfo = async _id => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('_id', _id);
      let data = await fetch(`${process.env.SERVER}/api/contactInfo/rm`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();
      if (data.code !== 200) {
        throw data.message;
      }
      setLoading(false);
      getContactItem();
      setMessage({ type: 'success', text: data.message, open: true });
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
  const contactTextRef = useRef();

  const editContactText = async text => {
    try {
      setLoading(true);
      const formData = new FormData();
      formData.append('text', text);
      let data = await fetch(`${process.env.SERVER}/api/contactPage/edit`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();
      if (data.code !== 200) {
        throw data.message;
      }
      setLoading(false);
      getContactPageText();
      setMessage({ type: 'success', text: data.message, open: true });
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

  const getContactPageText = async _ => {
    try {
      setLoading(true);
      let data = await fetch(`${process.env.SERVER}/api/contactPage`);
      data = await data.json();
      if (data.code !== 200) {
        throw data.message;
      }
      setLoading(false);
      setContactPageText(data.data.text);
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
  const clearContactTextEdit = _ => {
    contactTextRef.current.editor.setContent(contactPageText);
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
      <div className={classes.flexColumn}>
        <div className={classes.flexWrap}>
          <SoclinksTable
            add={addItemHundle}
            edit={editItemHundle}
            remove={removeItemHundle}
            data={soclinks}
          />
          <OtherInfo
            add={addContactInfo}
            edit={editContactInfo}
            remove={removeContactInfo}
            data={contactInfo}
          />
        </div>
        <div className={classes.flexColumn} style={{ alignItems: 'center' }}>
          <Editor
            ref={contactTextRef}
            apiKey={process.env.TINYAPIKEY}
            initialValue={contactPageText}
            cloudChannel="5-stable"
            init={{
              // selector: 'textarea#full-featured',
              plugins:
                ' preview autolink  directionality visualblocks visualchars fullscreen  link  table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists wordcount textpattern noneditable charmap emoticons',
              toolbar:
                'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist | forecolor backcolor removeformat | pagebreak | charmap emoticons  |   pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
              template_cdate_format:
                '[Date Created (CDATE): %m/%d/%Y : %H:%M:%S]',
              template_mdate_format:
                '[Date Modified (MDATE): %m/%d/%Y : %H:%M:%S]',
              height: 250,
              quickbars_selection_toolbar:
                'bold italic | quicklink h2 h3 blockquote quickimage quicktable',
              noneditable_noneditable_class: 'mceNonEditable',
              toolbar_drawer: 'sliding',
              spellchecker_dialog: true,
              spellchecker_whitelist: ['Ephox', 'Moxiecode'],
              tinycomments_mode: 'embedded',
              menubar: false,
              content_style: '.mymention{ color: gray; }',
              contextmenu: 'link',
              mentions_selector: '.mymention'
            }}
            inline={false}
          />
          <div className={classes.flexCenter} style={{ marginTop: '20px' }}>
            <Button
              variant="contained"
              style={{ marginRight: '20px' }}
              color="primary"
              onClick={_ => {
                editContactText(contactTextRef.current.editor.getContent());
              }}
            >
              Save
            </Button>
            <Button
              onClick={clearContactTextEdit}
              variant="contained"
              color="secondary"
            >
              Clear
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactData;
