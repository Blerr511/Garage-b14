import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import { styles as useStyles } from '../../../styles/main';
import { Editor } from '@tinymce/tinymce-react';
import FormLabel from '@material-ui/core/FormLabel';
import LinearProgress from '@material-ui/core/LinearProgress';
import Message from '../Message/Message';
import Demo from '../Demo/Demo';
import ReactHtmlParser from 'react-html-parser';
import Button from '@material-ui/core/Button';
import {
  Card,
  CardActions,
  CardActionArea,
  CardHeader,
  CardContent,
  TextField,
  IconButton
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp, faArrowDown } from '@fortawesome/free-solid-svg-icons';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      <Box p={3}>{children}</Box>
    </Typography>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired
};

function a11yProps(index) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`
  };
}

export default function MainPage() {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const [loading, setLoading] = useState(false);
  const [editable, setEditable] = useState(false);
  const [reset, setReset] = useState(false);
  const editorRef = useRef();
  const logoRef = useRef();
  const bgRef = useRef();
  const newGoToRef = useRef();
  const editEditorRef = useRef();
  const editLogoRef = useRef();
  const editBgRef = useRef();
  const goToRef = useRef();
  const removePageHundler = async _id => {
    const formData = new FormData();
    formData.append('_id', _id);
    try {
      setLoading(true);
      let data = await fetch(`${process.env.SERVER}/api/mainItems/rm`, {
        method: 'POST',
        body: formData
      });

      data = await data.json();
      data = data.data;
      getItems();
      setLoading(false);
      setMessage({ type: 'success', text: 'Page removed', open: true });
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      else var text = 'Somthing  goes wrong .';
      setMessage({ type: 'error', text: text, open: true });
      setLoading(false);
    }
  };

  const editPageHundler = async (desc, inputLogoRef, inputBgRef, _id, goTo) => {
    try {
      const formData = new FormData();
      formData.append('_id', _id);
      formData.append('desc', desc);
      if (inputLogoRef.current.files[0])
        formData.append('logo', inputLogoRef.current.files[0]);
      if (inputBgRef.current.files[0])
        formData.append('bg', inputBgRef.current.files[0]);
      if (goTo.current) formData.append('goTo', goTo.current.value);
      let data = await fetch(`${process.env.SERVER}/api/mainItems/edit`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();
      setLoading(false);
      getItems();
      setEditable(false);
      setReset(!reset);
      setMessage({ type: 'success', text: 'Changes saved', open: true });
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      else var text = 'Somthing  goes wrong .';
      setMessage({ type: 'error', text: text, open: true });
      setLoading(false);
    }
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  const [items, setItems] = React.useState([]);
  const [message, setMessage] = React.useState({
    type: 'success',
    message: '',
    open: false
  });
  const closeMessage = () => setMessage({ ...message, open: false });

  const clear = () => {
    editorRef.current.editor.setContent('');
    logoRef.current.value = '';
    bgRef.current.value = '';
  };

  const getItems = async () => {
    try {
      setLoading(true);
      let data = await fetch(`${process.env.SERVER}/api/mainItems`);

      data = await data.json();
      data = data.data;
      setItems(data);
      setLoading(false);
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      else var text = 'Somthing  goes wrong .';
      setMessage({ type: 'error', text: text, open: true });
      setLoading(false);
    }
  };
  useEffect(() => {
    getItems();
  }, []);

  const saveNewItem = async (desc, bg, logo, goTo) => {
    const formData = new FormData();
    formData.append('desc', desc);
    formData.append('bg', bg);
    formData.append('goTo', goTo);
    if (logo) formData.append('logo', logo);
    try {
      let data = await fetch(`${process.env.SERVER}/api/mainItems/add`, {
        method: 'POST',
        body: formData
      });

      data = await data.json();
      clear();
      getItems();

      setMessage({ type: 'success', text: data.message, open: true });
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      else var text = 'Somthing  goes wrong .';
      getItems();
      setMessage({ type: 'error', text: text, open: true });
    }
  };

  const hundleSave = () => {
    const desc = editorRef.current.editor.getContent();
    if (bgRef.current.value === '') {
      setMessage({
        type: 'error',
        text: 'Background image recuired!',
        open: true
      });
      return false;
    }
    const bg = bgRef.current.files[0];
    const logo = logoRef.current.value === '' ? null : logoRef.current.files[0];
    const goTo = newGoToRef.current.value;
    saveNewItem(desc, bg, logo, goTo);
  };

  const changePositionHandler = async (_id, position) => {
    const formData = new FormData();
    formData.append('_id', _id);
    formData.append('position', position);
    try {
      await fetch(`${process.env.SERVER}/api/mainItems/position`, {
        method: 'POST',
        body: formData
      });

      await getItems();
      handleChange(null, position);
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      else var text = 'Somthing  goes wrong .';
      getItems();
      setMessage({ type: 'error', text: text, open: true });
    }
  };
  return (
    <div className={classes.addPages}>
      <div className={classes.verticalTabs}>
        <div
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100%',
            height: '10px'
          }}
        >
          {' '}
          {loading && <LinearProgress color="secondary" variant="query" />}
        </div>
        <Message
          open={message.open}
          type={message.type}
          handleclose={closeMessage}
          timer={3000}
          message={message.text}
        />

        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          aria-label="MainPage"
          className={classes.tabs}
        >
          {items.map((el, id) => (
            <Tab
              key={el._id}
              label={
                <div style={{ display: 'flex' }}>
                  <IconButton
                    style={{ margin: '0 5px' }}
                    disabled={id === 0}
                    color="primary"
                    size="small"
                    onClick={_ => {
                      if (id !== 0) changePositionHandler(el._id, id - 1);
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </IconButton>
                  {el.goTo ? el.goTo.slice(0, 5) + '...' : '...'}
                  <IconButton
                    style={{ margin: '0 5px' }}
                    disabled={id === items.length - 1}
                    color="secondary"
                    size="small"
                    onClick={_ => {
                      if (id !== items.length - 1)
                        changePositionHandler(el._id, id + 1);
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </IconButton>
                </div>
              }
              {...a11yProps(id)}
            />
          ))}
          <Tab label="Add new page" {...a11yProps(items.length)} />
        </Tabs>
        {items.map((el, id) => {
          return (
            <TabPanel
              style={{ width: '100%', height: '100%' }}
              key={el._id}
              value={value}
              index={id}
            >
              {editable === el._id ? (
                <div className={classes.flexColumn}>
                  <TextField
                    inputRef={goToRef}
                    defaultValue={el.goTo}
                    label="Services name"
                    style={{ marginBottom: '15px' }}
                  ></TextField>
                  <FormLabel component="legend">Description</FormLabel>
                  <Editor
                    ref={editEditorRef}
                    initialValue={el.desc}
                    apiKey={process.env.TINYAPIKEY}
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
                  <table style={{ marginTop: '30px', maxWidth: '700px' }}>
                    <tbody>
                      <tr>
                        <td>
                          {' '}
                          <FormLabel component="legend">Logo</FormLabel>
                        </td>
                        <td>
                          <input
                            ref={editLogoRef}
                            accept=".png, .jpeg,.jpg"
                            type="file"
                          />
                        </td>
                        <td>
                          {el.logo && (
                            <img
                              style={{ marginRight: '25px' }}
                              height="100"
                              src={el.logo}
                              alt="logo"
                              style={{ background: 'gray' }}
                            />
                          )}
                        </td>
                      </tr>
                      <tr>
                        <td>
                          <FormLabel component="legend">
                            Background image/video
                          </FormLabel>
                        </td>
                        <td>
                          {' '}
                          <input
                            ref={editBgRef}
                            accept={'.png, .jpeg,.jpg, .mp4,.webm,.ogg'}
                            type="file"
                            style={{ minHeight: '46px' }}
                          />
                        </td>
                        <td>
                          {el.bgType === 'image' && (
                            <img
                              style={{ marginRight: '25px' }}
                              height="100"
                              src={el.bg}
                              alt="logo"
                              style={{ background: 'gray' }}
                            />
                          )}
                          {el.bgType === 'video' && (
                            <video
                              autoPlay
                              muted
                              style={{
                                height: '100px',
                                objectFit: 'cover'
                              }}
                              loop
                            >
                              <source src={el.bg} type="video/mp4" />
                            </video>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                  <div>
                    <Button
                      color="primary"
                      variant="contained"
                      className={classes.horizontalMargin}
                      onClick={_ =>
                        editPageHundler(
                          editEditorRef.current.editor.getContent(),
                          editLogoRef,
                          editBgRef,
                          el._id,
                          goToRef
                        )
                      }
                    >
                      Save
                    </Button>
                    <Button
                      color="secondary"
                      variant="contained"
                      className={classes.horizontalMargin}
                      onClick={_ => setEditable(false)}
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div>
                  <div className={classes.fullWidthColumn}>
                    {el.bgType === 'image' && (
                      <img
                        src={el.bg}
                        alt={el.bg}
                        className={classes.miniVideoBg}
                      />
                    )}
                    {el.bgType === 'video' && (
                      <video
                        className={classes.miniVideoBg}
                        autoPlay
                        muted
                        loop
                      >
                        <source src={el.bg} type="video/mp4" />
                      </video>
                    )}
                    <div className={classes.flexCenter}>
                      {el.logo && (
                        <img
                          style={{ marginRight: '25px' }}
                          height="150"
                          src={el.logo}
                          alt="logo"
                        />
                      )}
                      <div> {ReactHtmlParser(el.desc)}</div>
                    </div>
                  </div>
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={_ => setEditable(el._id)}
                  >
                    Edit
                  </Button>
                  <Button
                    color="secondary"
                    variant="contained"
                    className={classes.horizontalMargin}
                    onClick={() => {
                      removePageHundler(el._id);
                    }}
                  >
                    Remove
                  </Button>
                </div>
              )}
            </TabPanel>
          );
        })}
        <TabPanel value={value} index={items.length}>
          <div className={classes.flexColumn}>
            <TextField
              style={{ marginBottom: '15px' }}
              inputRef={newGoToRef}
              label="Service title"
            />
            <FormLabel component="legend">Description</FormLabel>
            <Editor
              ref={editorRef}
              apiKey={process.env.TINYAPIKEY}
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
            <table style={{ marginTop: '30px', maxWidth: '700px' }}>
              <tbody>
                <tr>
                  <td>
                    {' '}
                    <FormLabel component="legend">Logo</FormLabel>
                  </td>
                  <td>
                    <input
                      ref={logoRef}
                      accept=".png, .jpeg,.jpg"
                      type="file"
                    />
                  </td>
                </tr>
                <tr>
                  <td>
                    <FormLabel component="legend">
                      Background image/video
                    </FormLabel>
                  </td>
                  <td>
                    {' '}
                    <input
                      ref={bgRef}
                      accept={'.png, .jpeg,.jpg, .mp4,.webm,.ogg'}
                      type="file"
                      style={{ minHeight: '46px' }}
                    />
                  </td>
                </tr>
              </tbody>
            </table>
            <div>
              <Button
                color="primary"
                variant="contained"
                className={classes.horizontalMargin}
                onClick={hundleSave}
              >
                Save
              </Button>
              <Button
                color="secondary"
                variant="contained"
                className={classes.horizontalMargin}
                onClick={clear}
              >
                Clear
              </Button>
            </div>
          </div>
        </TabPanel>
      </div>
      <Demo
        reset={reset}
        route={'main/' + (items[value] ? items[value]._id : '/')}
      ></Demo>
    </div>
  );
}
