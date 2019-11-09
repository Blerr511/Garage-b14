import React, { useEffect, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import Message from '../Message/Message';

import PropTypes from 'prop-types';
import { styles as useStyles } from '../../../styles/main';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import IconButton from '@material-ui/core/IconButton';
import Fab from '@material-ui/core/Fab';
import Demo from '../Demo/Demo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SketchPicker } from 'react-color';

import {
  faSave,
  faTrash,
  faPlusSquare,
  faTimesCircle,
  faPen,
  faTimes
} from '@fortawesome/free-solid-svg-icons';

import { createUrl, placeholderTestUrl } from '../../../methods/createUrl';

import './Pages.less';
import { useRef } from 'react';

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const classes = useStyles();

  return (
    <Typography
      className={classes.tabePanel}
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
function VerticalTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);
  const { pages, count } = props;
  const handleChange = (event, newValue) => {
    setValue(newValue);
    props.setRoute(pages[newValue].route);
  };
  const [page, setPage] = useState(0);
  const [editable, setEditable] = useState(false);
  const [saveLoading, setSaveLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [newBg, setNewBg] = useState(null);
  const [bg, setBg] = useState('#000');
  const contentTitleRef = useRef();
  const contentDescRef = useRef();
  const contentFileRef = useRef();
  const wrapperRef = useRef(null);
  const bgChangeInputFileRef = useRef();
  useOutsideAlerter(wrapperRef);

  function useOutsideAlerter(ref) {
    /**
     * Alert if clicked on outside of element
     */
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setColorChange(false);
      }
    }

    useEffect(() => {
      // Bind the event listener
      document.addEventListener('mousedown', handleClickOutside);
      return () => {
        // Unbind the event listener on clean up
        document.removeEventListener('mousedown', handleClickOutside);
      };
    });
  }
  const [portfolioDialog, setPortfolioDialog] = useState(false);

  const editPageInfo = {};
  const tempPages = pages.slice();

  const hundelPageInputEdit = (_, _id) => {
    tempPages.map(el => {
      if (el._id === _id) {
        return Object.assign(el, _);
      }
      return el;
    });
  };
  const addContentHundler = pageId => {
    const title = contentTitleRef.current.value,
      desc = contentDescRef.current.value;
    const file = contentFileRef.current.files[0];
    const closeDialog = () => setPortfolioDialog(false);
    props.addContentHundler(pageId, title, desc, file, closeDialog);
    contentTitleRef.current.value = '';
    contentDescRef.current.value = '';
    contentFileRef.current.value = '';
    setExpanded(false);
  };
  const editPageHundler = _id => {
    for (let i = 0; i < tempPages.length; i++) {
      if (_id === tempPages[i]._id) {
        props.editPageHundler(_id, tempPages[i]);

        break;
      }
    }
  };
  // function hexToRgb(hex) {
  //   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);

  //   return result
  //     ? {
  //         r: parseInt(result[1], 16),
  //         g: parseInt(result[2], 16),
  //         b: parseInt(result[3], 16)
  //       }
  //     : null;
  // }
  function hexToRgb(h) {
    let r = 0,
      g = 0,
      b = 0;

    // 3 digits
    if (h.length == 4) {
      r = h[1] + h[1];
      g = h[2] + h[2];
      b = h[3] + h[3];

      // 6 digits
    } else if (h.length == 7) {
      r = h[1] + h[2];
      g = h[3] + h[4];
      b = h[5] + h[6];
    }
    console.log(r, g, b);
    return {
      r: r,
      g: g,
      b: b
    };
  }
  return (
    <div className={classes.verticalTabs}>
      <Tabs
        orientation="vertical"
        variant="scrollable"
        value={value}
        onChange={handleChange}
        aria-label="Vertical tabs example"
        className={classes.tabs}
      >
        {pages.map((el, id) => {
          return (
            <Tab
              key={el._id}
              index={id}
              label={el.title ? el.title : '[no title]'}
              {...a11yProps(el._id)}
            />
          );
        })}
      </Tabs>
      {pages.map((el, id) => {
        const p = el;
        return (
          <TabPanel
            key={el._id}
            value={value}
            className={classes.pageContainer}
            index={id}
          >
            <div className={classes.pageHead}>
              <TextField
                id="standard-read-only-input"
                label="Title"
                defaultValue={el.title ? el.title : ''}
                className={classes.textField}
                margin="normal"
                onChange={e => {
                  hundelPageInputEdit({ title: e.target.value }, p._id);
                }}
                InputProps={{
                  readOnly: !editable
                }}
              />
              <span>
                <TextField
                  id="standard-read-only-input"
                  label="Template"
                  defaultValue={
                    el.style.template === 'template1'
                      ? 'About'
                      : el.style.template === 'template2'
                      ? 'Services'
                      : el.style.template === 'template3'
                      ? 'Portfolio'
                      : ''
                  }
                  className={classes.textField}
                  margin="normal"
                  InputProps={{
                    readOnly: true
                  }}
                />
              </span>
            </div>
            <div className={classes.pageDesc}>
              <TextField
                id="standard-read-only-input"
                label="Description"
                multiline
                defaultValue={el.desc ? el.desc : ''}
                className={classes.textField}
                margin="normal"
                fullWidth
                onChange={e => {
                  hundelPageInputEdit({ desc: e.target.value }, p._id);
                }}
                InputProps={{
                  readOnly: !editable
                }}
              />
            </div>
            <div>
              {el.style.bg.type === 'color' ? (
                <div
                  style={{
                    textAlign: 'center',
                    maxWidth: '100px',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    border: '3px solid #ccc',
                    backgroundColor: bg || el.style.bg.val,
                    position: 'relative',
                    color:
                      hexToRgb(bg || el.style.bg.val).r +
                        hexToRgb(bg || el.style.bg.val).g +
                        hexToRgb(bg || el.style.bg.val).b <
                      (256 + 256 + 256) / 2
                        ? '#fff'
                        : '#000'
                  }}
                  onClick={_ => {
                    if (editable) setColorChange(true);
                  }}
                >
                  <div>{el.style.bg.val}</div>
                  {colorChange ? (
                    <div
                      style={{
                        width: '250px',
                        position: 'absolute',
                        zIndex: 12
                      }}
                      ref={wrapperRef}
                    >
                      <SketchPicker
                        disableAlpha={false}
                        color={bg ? bg : el.style.bg.val}
                        onChange={e => {
                          hundelPageInputEdit(
                            {
                              bg: e.hex
                            },
                            p._id
                          );
                          setBg(e.hex);
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              ) : el.style.bg.type === 'image' ? (
                <Card className={classes.card}>
                  <input
                    type="file"
                    style={{ display: 'none' }}
                    ref={bgChangeInputFileRef}
                    onChange={_ => {
                      hundelPageInputEdit(
                        {
                          bg: _.target.files[0]
                        },
                        p._id
                      );
                      setNewBg(createUrl(_.target.files[0]));
                    }}
                  />
                  <CardMedia
                    className={classes.media}
                    image={newBg || el.style.bg.val || placeholderTestUrl}
                  />
                  {editable ? (
                    <IconButton
                      className={classes.absTR}
                      onClick={_ => {
                        bgChangeInputFileRef.current.click();
                      }}
                      aria-label="settings"
                    >
                      <FontAwesomeIcon
                        icon={faPen}
                        style={{
                          fontSize: '18px',
                          color: '#fff'
                        }}
                      />
                    </IconButton>
                  ) : null}
                </Card>
              ) : null}
            </div>
            <div>
              {el.style.template === 'template3' ? (
                <div className={classes.flexWrap}>
                  {' '}
                  {el.content.map(el => {
                    const element = el;
                    return (
                      <div key={el._id}>
                        <Card className={classes.card}>
                          <CardMedia
                            className={classes.media}
                            image={el.img || placeholderTestUrl}
                          />
                          <IconButton
                            className={classes.absTR}
                            aria-label="settings"
                            onClick={_ =>
                              props.removeContentHundler(p._id, el._id)
                            }
                          >
                            <FontAwesomeIcon
                              icon={faTimesCircle}
                              style={{
                                fontSize: '20px',
                                color: '#fff'
                              }}
                            />
                          </IconButton>
                        </Card>
                      </div>
                    );
                  })}
                  {portfolioDialog ? (
                    <Dialog
                      open={portfolioDialog}
                      onClose={_ => setPortfolioDialog(false)}
                      aria-labelledby="form-dialog-title"
                    >
                      <DialogTitle id="form-dialog-title">
                        Portfolio
                      </DialogTitle>
                      <DialogContent className={classes.flexColumn}>
                        <DialogContentText>
                          Add items to portfolio
                        </DialogContentText>
                        <TextField
                          autoFocus
                          margin="dense"
                          label="Author"
                          type="text"
                          inputRef={contentTitleRef}
                        />{' '}
                        <TextField
                          margin="dense"
                          label="Tags"
                          type="text"
                          inputRef={contentDescRef}
                        />
                        <input
                          accept="image/png, image/jpeg"
                          type="file"
                          ref={contentFileRef}
                        />
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={_ => setPortfolioDialog(false)}
                          color="primary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={_ => addContentHundler(p._id)}
                          color="primary"
                        >
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>
                  ) : null}
                  <Card
                    onClick={() => setPortfolioDialog(true)}
                    className={classes.card}
                  >
                    <CardContent>
                      <FontAwesomeIcon
                        icon={faPlusSquare}
                        style={{ fontSize: '40px' }}
                      />
                    </CardContent>
                  </Card>
                </div>
              ) : el.style.template === 'template2' ? (
                el.content.map(el => {
                  return (
                    <ExpansionPanel key={el._id}>
                      <ExpansionPanelSummary
                        aria-controls="panel1a-content"
                        id="panel1a-header"
                        expandIcon={<FontAwesomeIcon icon={faPlusSquare} />}
                      >
                        <Typography className={classes.heading}>
                          {el.title}
                        </Typography>
                      </ExpansionPanelSummary>
                      <ExpansionPanelDetails className={classes.flexColumn}>
                        <div>
                          <TextField
                            id="standard-read-only-input"
                            label="Title"
                            defaultValue={el.title}
                            className={classes.textField}
                            margin="normal"
                            InputProps={{
                              readOnly: !editable
                            }}
                          />
                          <TextField
                            id="standard-read-only-input"
                            label="Description"
                            defaultValue={el.desc}
                            className={classes.textField}
                            margin="normal"
                            fullWidth
                            InputProps={{
                              readOnly: !editable
                            }}
                          />
                          {el.img ? (
                            <img height={100} src={el.img} alt={el.title} />
                          ) : null}
                        </div>
                        <Button
                          onClick={_ =>
                            props.removeContentHundler(p._id, el._id)
                          }
                          variant="contained"
                          color="secondary"
                          startIcon={<FontAwesomeIcon icon={faTrash} />}
                        >
                          Delete
                        </Button>
                      </ExpansionPanelDetails>
                    </ExpansionPanel>
                  );
                })
              ) : null}
              {el.style.template === 'template2' ? (
                <ExpansionPanel
                  expanded={expanded}
                  onChange={_ => setExpanded(!expanded)}
                >
                  <ExpansionPanelSummary
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                    expandIcon={<FontAwesomeIcon icon={faPlusSquare} />}
                  >
                    <Typography className={classes.heading}>
                      Add new content
                    </Typography>
                  </ExpansionPanelSummary>
                  <ExpansionPanelDetails className={classes.flexColumn}>
                    <TextField
                      inputRef={contentTitleRef}
                      id="standard-name"
                      label="Title"
                      className={classes.textField}
                      margin="normal"
                      defaultValue=""
                    />
                    <TextField
                      inputRef={contentDescRef}
                      defaultValue=""
                      id="standard-multiline-static"
                      label="Description"
                      multiline
                      rows="4"
                      className={classes.textField}
                      margin="normal"
                    />
                    {'Image:'}
                    <input
                      accept="image/png, image/jpeg"
                      ref={contentFileRef}
                      type="file"
                    />
                    <div style={{ marginTop: '15px' }}>
                      <Button
                        onClick={_ => addContentHundler(p._id)}
                        style={{ marginRight: '15px' }}
                        variant="contained"
                        color="primary"
                        startIcon={<FontAwesomeIcon icon={faSave} />}
                      >
                        Save
                      </Button>
                      <Button
                        onClick={_ => setExpanded(false)}
                        variant="contained"
                        color="secondary"
                        startIcon={<FontAwesomeIcon icon={faTrash} />}
                      >
                        Cancel
                      </Button>
                    </div>
                  </ExpansionPanelDetails>
                </ExpansionPanel>
              ) : null}
              {el.style.template === 'template3' ? (
                <div className={classes.flexWrap}></div>
              ) : null}
              <div
                style={{
                  display: 'flex',
                  marginTop: '20px'
                }}
              >
                <Fab
                  className={classes.fab}
                  aria-label="Edit"
                  onClick={() => {
                    if (editable) {
                      editPageHundler(p._id);
                    }
                    setEditable(!editable);
                  }}
                  color={editable ? 'inherit' : 'primary'}
                >
                  <FontAwesomeIcon icon={editable ? faSave : faPen} />
                  {saveLoading && (
                    <CircularProgress
                      size={60}
                      className={classes.buttonProgress}
                    />
                  )}
                </Fab>
                <Fab
                  aria-label="Delete"
                  color="secondary"
                  onClick={_ => props.removePage(p._id)}
                >
                  <FontAwesomeIcon icon={faTimes} />{' '}
                </Fab>
              </div>
            </div>
          </TabPanel>
        );
      })}
    </div>
  );
}
const Pages = () => {
  const classes = useStyles();
  const [pages, setPages] = useState({ count: 0, data: [] });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: 'success',
    message: '',
    open: false
  });
  const closeMessage = () => {
    setMessage({ type: 'success', message: '', open: false });
  };
  const queryParams = {
    page: 1,
    limit: 10
  };
  const getPages = async () => {
    try {
      const res = await fetch(
        process.env.SERVER +
          `/api/get?page=${queryParams.page - 1}&limit=${queryParams.limit}`
      );

      const data = await res.json();
      return setPages(data);
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
    }
  };
  useEffect(() => {
    setLoading(true);
    getPages()
      .then(_ => setLoading(false))
      .catch(_ => setLoading(false));
  }, []);
  const addContentHundler = (pageId, title, desc, file, closeDialog) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    formData.append('file', file);
    formData.append('pageId', pageId);
    setLoading(true);
    closeDialog();

    fetch(`${process.env.SERVER}/api/addContent`, {
      method: 'POST',
      body: formData
    })
      .then(_ => _.json())
      .then(data => {
        setLoading(false);
        for (let i = 0; i < pages.data.length; i++) {
          if (data.data._id === pages.data[i]._id) {
            const temp = pages.data;
            temp[i] = data.data;
            setPages({ count: pages.count, data: temp });
            setMessage({ type: 'success', text: data.message, open: true });

            break;
          }
        }
      })
      .catch(err => {
        if (err)
          var text =
            typeof err === 'string'
              ? err
              : typeof err.message === 'string'
              ? err.message
              : 'Somthing goes wrong .';
        setMessage({ type: 'error', text: text, open: true });
        setLoading(false);
      });
  };
  const removeContentHundler = (pageId, contentId) => {
    const body = new FormData();
    body.append('pageId', pageId);
    body.append('contentId', contentId);
    setLoading(true);

    fetch(`${process.env.SERVER}/api/removeContent`, {
      method: 'POST',
      body: body
    })
      .then(_ => _.json())
      .then(data => {
        setLoading(false);
        for (let i = 0; i < pages.data.length; i++) {
          if (data.data._id === pages.data[i]._id) {
            console.log(data.data);
            const temp = pages.data;
            temp[i] = data.data;
            setPages({ count: pages.count, data: temp });
            setMessage({ type: 'success', text: data.message, open: true });
            break;
          }
        }
      })
      .catch(err => {
        if (err)
          var text =
            typeof err === 'string'
              ? err
              : typeof err.message === 'string'
              ? err.message
              : 'Somthing goes wrong .';
        setMessage({ type: 'error', text: text, open: true });
        setLoading(false);
      });
  };
  const removePage = pageId => {
    const formData = new FormData();
    formData.append('pageId', pageId);
    setLoading(true);
    fetch(`${process.env.SERVER}/api/removePage`, {
      method: 'POST',
      body: formData
    })
      .then(_ => _.json())
      .then(data => {
        setLoading(false);
        setMessage({ type: 'success', text: data.message, open: true });
        getPages();
      })
      .catch(err => {
        if (err)
          var text =
            typeof err === 'string'
              ? err
              : typeof err.message === 'string'
              ? err.message
              : 'Somthing goes wrong .';
        setMessage({ type: 'error', text: text, open: true });
        setLoading(false);
      });
  };
  const editPageHundler = (pageId, payload) => {
    setLoading(true);
    console.log(payload);
    const formData = new FormData();
    if (payload.title) formData.append('title', payload.title);
    if (payload.title) formData.append('desc', payload.desc);
    if (payload.bg) {
      formData.append('bg', payload.bg);
    }

    fetch(`${process.env.SERVER}/api/editPage`, {
      method: 'POST',
      body: formData
    });
  };
  const [route, setRoute] = React.useState('');
  return (
    <div>
      {loading ? (
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
          <LinearProgress color="secondary" variant="query" />
        </div>
      ) : null}{' '}
      <Message
        open={message.open}
        type={message.type}
        handleclose={closeMessage}
        timer={3000}
        message={message.text}
      />{' '}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gridTemplateRows: '100vh'
        }}
      >
        <VerticalTabs
          addContentHundler={addContentHundler}
          removeContentHundler={removeContentHundler}
          removePage={removePage}
          editPageHundler={editPageHundler}
          pages={pages.data}
          setRoute={setRoute}
          count={pages.count}
        />
        <Demo route={route}></Demo>
      </div>
    </div>
  );
};

export default Pages;
