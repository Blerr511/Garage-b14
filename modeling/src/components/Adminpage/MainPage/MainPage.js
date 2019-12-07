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
  const editorRef = useRef();
  const logoRef = useRef();
  const bgRef = useRef();
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

  const saveNewItem = async (desc, bg, logo) => {
    const formData = new FormData();
    formData.append('desc', desc);
    formData.append('bg', bg);

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
    saveNewItem(desc, bg, logo);
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
            <Tab key={el._id} label={`Page ${id + 1}`} {...a11yProps(id)} />
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
              <div
                className={classes.fullWidthColumn}
                style={
                  el.bgType === 'image'
                    ? { backgroundImage: `url(${el.bg})` }
                    : null
                }
              >
                {el.bgType === 'video' && (
                  <video className={classes.bgVideoPlayer} autoPlay muted loop>
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
                color="secondary"
                variant="contained"
                className={classes.horizontalMargin}
                onClick={() => {
                  removePageHundler(el._id);
                }}
              >
                Remove
              </Button>
            </TabPanel>
          );
        })}
        <TabPanel value={value} index={items.length}>
          <div className={classes.flexColumn}>
            <FormLabel component="legend">Description</FormLabel>
            <Editor
              ref={editorRef}
              apiKey={process.env.TINYAPIKEY}
              cloudChannel="5-stable"
              init={{
                // selector: 'textarea#full-featured',
                plugins:
                  ' preview powerpaste casechange autolink  directionality advcode visualblocks visualchars fullscreen  link  table charmap hr pagebreak nonbreaking anchor toc insertdatetime advlist lists checklist wordcount tinymcespellchecker a11ychecker  textpattern noneditable  formatpainter permanentpen  charmap mentions  linkchecker emoticons',
                toolbar:
                  'undo redo | bold italic underline strikethrough | fontselect fontsizeselect formatselect | alignleft aligncenter alignright alignjustify | outdent indent |  numlist bullist checklist | forecolor backcolor casechange permanentpen formatpainter removeformat | pagebreak | charmap emoticons  |   pageembed template link anchor codesample | a11ycheck ltr rtl | showcomments addcomment',
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
      <Demo route={'main/' + (items[value] ? items[value]._id : '/')}></Demo>
    </div>
  );
}
