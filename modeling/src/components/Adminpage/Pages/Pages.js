import React, { useEffect, useState } from 'react';

import LinearProgress from '@material-ui/core/LinearProgress';
import Message from '../Message/Message';
import ReactHtmlParser from 'react-html-parser';

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

import CircularProgress from '@material-ui/core/CircularProgress';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Fab from '@material-ui/core/Fab';
import Demo from '../Demo/Demo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { SketchPicker } from 'react-color';

import { Editor } from '@tinymce/tinymce-react';
import {
  faSave,
  faTrash,
  faPlusSquare,
  faPen,
  faTimes,
  faMinus,
  faEye,
  faArrowUp,
  faArrowDown
} from '@fortawesome/free-solid-svg-icons';

import { createUrl, placeholderTestUrl } from '../../../methods/createUrl';

import './Pages.less';
import { useRef } from 'react';
import PortfolioContent from './PortfolioContent';
import { IconButton } from '@material-ui/core';

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
    props.setRoute(pages[newValue].title.replace(/\ /g, '_'));
  };
  const [editable, setEditable] = useState(false);
  const [contentEditable, setContentEditable] = useState(false);
  const contentEditTitle = useRef();
  const contentEditDesc = useRef();
  const contentEditLogo = useRef();
  const portoflioThumbRef = useRef();
  const portfolioModelRef = useRef();
  const [saveLoading, setSaveLoading] = useState(false);
  const [expanded, setExpanded] = useState(false);
  const [colorChange, setColorChange] = useState(false);
  const [newBg, setNewBg] = useState(null);
  const [bg, setBg] = useState(null);
  const contentTitleRef = useRef();
  const contentDescRef = useRef();
  const contentFileRef = useRef();
  const wrapperRef = useRef(null);
  const [showPortfolioItems, setShowPortfolioItems] = useState(false);
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

  const tempPages = pages;

  const hundelPageInputEdit = (_, _id) => {
    tempPages.map(el => {
      if (el._id === _id) {
        Object.assign(el, _);
      }
      return el;
    });
  };

  const addPortfolioHundler = pageId => {
    const title = contentTitleRef.current.value,
      desc = contentDescRef.current.value;
    const files = {
      thumbnail: portoflioThumbRef.current.files[0],
      model: portfolioModelRef.current.files
    };
    console.log(files);
    const closeDialog = () => setPortfolioDialog(false);
    props.addContentHundler(pageId, title, desc, files, closeDialog);
    if (contentTitleRef.current) contentTitleRef.current.value = '';
    if (contentDescRef.current) contentDescRef.current.value = '';
    if (contentFileRef.current) contentFileRef.current.value = '';
    props.setRoute('/');
    for (let i = 0; i < tempPages.length; i++) {
      if (tempPages[i]._id === pageId) {
        props.setRoute(tempPages[i].title.replace(/\ /g, '_'));
      }
    }
    setExpanded(false);
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
    props.setRoute('/');
    for (let i = 0; i < tempPages.length; i++) {
      if (tempPages[i]._id === pageId) {
        props.setRoute(tempPages[i].title.replace(/\ /g, '_'));
      }
    }
    setExpanded(false);
  };
  const editPageHundler = _id => {
    for (let i = 0; i < tempPages.length; i++) {
      if (_id === tempPages[i]._id) {
        setSaveLoading(true);
        props
          .editPageHundler(
            _id,
            tempPages[i],
            tempPages[i].style.bg.type !== 'color'
              ? bgChangeInputFileRef.current.files[0]
              : bg
          )
          .then(_ => {
            setSaveLoading(false);
            props.setRoute('/');
            props.setRoute(tempPages[i].title.replace(/\ /g, '_'));
          })
          .catch(_ => setSaveLoading(false));

        break;
      }
    }
  };
  const contentEditHandler = _id => {
    props.contentEditHandler(
      _id,
      contentEditTitle.current.value,
      contentEditDesc.current.editor.getContent(),
      contentEditLogo.current.files[0]
    );
    setContentEditable(false);
  };

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
              label={
                <div style={{ display: 'flex' }}>
                  <IconButton
                    color="primary"
                    style={{ margin: '0 5px' }}
                    size={'small'}
                    disabled={id === 0}
                    onClick={_ => {
                      if (id !== 0) {
                        props.changePositionHandler(el._id, id - 1);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowUp} />
                  </IconButton>
                  {el.title ? el.title : '[no title]'}
                  <IconButton
                    color="secondary"
                    style={{ margin: '0 5px' }}
                    size={'small'}
                    disabled={id === pages.length - 1}
                    onClick={_ => {
                      if (id !== pages.length - 1) {
                        props.changePositionHandler(el._id, id + 1);
                      }
                    }}
                  >
                    <FontAwesomeIcon icon={faArrowDown} />
                  </IconButton>
                </div>
              }
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
              <Editor
                apiKey={process.env.TINYAPIKEY}
                initialValue={el.desc}
                cloudChannel="5-stable"
                disabled={!editable}
                id={el._id}
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
                              bg: e.hex,
                              type: 'color'
                            },
                            p._id
                          );
                          setBg(e.hex);
                        }}
                      />
                    </div>
                  ) : null}
                </div>
              ) : (
                <div style={{ display: 'flex', alignItems: 'flex-end' }}>
                  <Card className={classes.card}>
                    {el.style.bg.type === 'image' ? (
                      <CardMedia
                        className={classes.media}
                        image={newBg || el.style.bg.val || placeholderTestUrl}
                      />
                    ) : (
                      <video
                        className={classes.miniVideoBg}
                        autoPlay
                        muted
                        loop
                      >
                        <source src={el.style.bg.val} type="video/mp4" />
                      </video>
                    )}
                  </Card>
                  {editable === el._id && (
                    <input
                      type="file"
                      ref={bgChangeInputFileRef}
                      onChange={_ => {}}
                    />
                  )}
                </div>
              )}
            </div>
            <div>
              {el.style.template === 'template3' ? (
                <div>
                  {
                    <PortfolioContent
                      removeContentHundler={props.removeContentHundler}
                      pageId={el._id}
                      open={showPortfolioItems == el._id}
                      onClose={() => setShowPortfolioItems(false)}
                    />
                  }
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
                        <table>
                          <tbody>
                            <tr>
                              <td>
                                <Typography>Thumbnail:</Typography>
                              </td>
                              <td>
                                <input
                                  accept=".jpg , .jpeg, .png"
                                  type="file"
                                  ref={portoflioThumbRef}
                                />
                              </td>
                            </tr>
                            <tr>
                              <td>
                                <Typography>Model:</Typography>
                              </td>
                              <td>
                                {' '}
                                <input
                                  accept=".jpg , .jpeg , .png , .zip"
                                  type="file"
                                  multiple
                                  ref={portfolioModelRef}
                                />
                              </td>
                            </tr>
                          </tbody>
                        </table>
                      </DialogContent>
                      <DialogActions>
                        <Button
                          onClick={_ => setPortfolioDialog(false)}
                          color="primary"
                        >
                          Cancel
                        </Button>
                        <Button
                          onClick={_ => addPortfolioHundler(p._id)}
                          color="primary"
                        >
                          Add
                        </Button>
                      </DialogActions>
                    </Dialog>
                  ) : null}
                  <div style={{ display: 'flex' }}>
                    <Card
                      onClick={() => setShowPortfolioItems(el._id)}
                      className={classes.card}
                    >
                      <CardContent>
                        <FontAwesomeIcon
                          icon={faEye}
                          style={{ fontSize: '40px' }}
                        />
                      </CardContent>
                    </Card>
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
                            label="Title"
                            defaultValue={el.title}
                            className={classes.textField}
                            inputRef={contentEditTitle}
                            margin="normal"
                            disabled={contentEditable !== el._id}
                            InputProps={{
                              readOnly: contentEditable !== el._id
                            }}
                          />
                          {/* <TextField
                            label="Description"
                            defaultValue={el.desc}
                            className={classes.textField}
                            margin="normal"
                            fullWidth
                            disabled={contentEditable !== el._id}
                            InputProps={{
                              readOnly: contentEditable !== el._id
                            }}
                          /> */}
                          {contentEditable === el._id ? (
                            <Editor
                              apiKey={process.env.TINYAPIKEY}
                              initialValue={el.desc}
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
                              ref={contentEditDesc}
                            />
                          ) : (
                            ReactHtmlParser(el.desc)
                          )}
                          {el.img ? (
                            <img height={100} src={el.img} alt={el.title} />
                          ) : null}
                          {'Logo: '}
                          {contentEditable === el._id && (
                            <input
                              accept="image/png, image/jpeg"
                              type="file"
                              ref={contentEditLogo}
                            />
                          )}
                        </div>
                        <div
                          style={{
                            display: 'flex',
                            justifyContent: 'space-around',
                            marginTop: '15px'
                          }}
                        >
                          <Button
                            variant="contained"
                            color={
                              contentEditable === el._id ? 'primary' : 'default'
                            }
                            onClick={_ => {
                              if (contentEditable === el._id) {
                                return contentEditHandler(el._id);
                              }
                              setContentEditable(el._id);
                            }}
                          >
                            {contentEditable === el._id ? 'Save' : 'Edit'}
                          </Button>

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
                        </div>
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
                    setEditable(editable ? false : el._id);
                  }}
                  style={{ marginRight: '15px' }}
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
                  onClick={_ => {
                    props
                      .removePage(p._id)
                      .then(_ => value > 0 && setValue(value - 1));
                  }}
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
  const [demo, setDemo] = useState(window.innerWidth > 724);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState({
    type: 'success',
    message: '',
    open: false
  });
  const closeMessage = () => {
    setMessage({ ...message, open: false });
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
      if (!route) setRoute(data.data[0].title);
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
    console.log(file);
    const formData = new FormData();
    formData.append('title', title);
    formData.append('desc', desc);
    if (file instanceof Object) {
      for (const k in file) {
        if (file[k] instanceof FileList)
          for (let i = 0; i < file[k].length; i++) {
            const f = file[k][i];
            console.log(f);
            formData.append(k, f);
          }
        else if (file[k] instanceof File) {
          formData.append(k, file[k]);
        }
      }
    }
    formData.append('pageId', pageId);
    setLoading(true);
    closeDialog();
    console.log(formData);
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
  const removeContentHundler = async (pageId, contentId) => {
    try {
      const body = new FormData();
      body.append('pageId', pageId);
      body.append('contentId', contentId);
      setLoading(true);

      let data = await fetch(`${process.env.SERVER}/api/removeContent`, {
        method: 'POST',
        body: body
      });
      data = await data.json();
      setLoading(false);
      setRoute('/');
      for (let i = 0; i < pages.data.length; i++) {
        if (data.data._id === pages.data[i]._id) {
          const temp = pages.data;
          temp[i] = data.data;
          setPages({ count: pages.count, data: temp });
          setMessage({ type: 'success', text: data.message, open: true });
          break;
        }
      }
      return true;
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      setMessage({ type: 'error', text: text, open: true });
      setLoading(false);
      return false;
    }
  };
  const removePage = async pageId => {
    try {
      const formData = new FormData();
      formData.append('pageId', pageId);
      setLoading(true);
      let data = await fetch(`${process.env.SERVER}/api/removePage`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();

      setLoading(false);
      setMessage({ type: 'success', text: data.message, open: true });
      getPages();
      return true;
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      setMessage({ type: 'error', text: text, open: true });
      setLoading(false);
      return false;
    }
  };
  const editPageHundler = async (pageId, payload, bg) => {
    console.log(bg);
    const formData = new FormData();
    formData.append('pageId', pageId);
    if (payload.title) formData.append('title', payload.title);

    formData.append('desc', window.tinyMCE.get(pageId).getContent());
    if (bg) {
      formData.append('bg', bg);
      if (bg instanceof File) formData.append('bgType', 'file');
      if (typeof bg === 'string') formData.append('bgType', 'color');
    }
    try {
      let data = await fetch(`${process.env.SERVER}/api/editPage`, {
        method: 'POST',
        body: formData
      });

      data = await data.json();
      setMessage({ type: 'success', text: data.message, open: true });
      getPages();
      setLoading(false);
    } catch (err) {
      if (err)
        var text =
          typeof err === 'string'
            ? err
            : typeof err.message === 'string'
            ? err.message
            : 'Somthing goes wrong .';
      setMessage({ type: 'error', text: text, open: true });
      setLoading(false);
    }
  };

  const contentEditHandler = async (_id, title, desc, logo) => {
    try {
      const formData = new FormData();
      formData.append('contentId', _id);
      if (desc) formData.append('desc', desc);
      if (title) formData.append('title', title);
      if (logo) formData.append('logo', logo);

      let data = await fetch(`${process.env.SERVER}/api/editContent`, {
        method: 'POST',
        body: formData
      });
      data = await data.json();

      getPages();
      const TRoute = route;
      setRoute(() => '/');
      console.log(TRoute);
      setRoute(() => TRoute);
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
  const changePositionHandler = async (_id, position) => {
    try {
      const formData = new FormData();
      formData.append('_id', _id);
      formData.append('position', position);

      let data = await fetch(`${process.env.SERVER}/api/changePosition`, {
        method: 'POST',
        body: formData
      });
      getPages();
    } catch (err) {
      getPages();
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
      <div className={demo ? classes.twixGrid : classes.solid}>
        <VerticalTabs
          addContentHundler={addContentHundler}
          removeContentHundler={removeContentHundler}
          contentEditHandler={contentEditHandler}
          changePositionHandler={changePositionHandler}
          removePage={removePage}
          editPageHundler={editPageHundler}
          pages={pages.data}
          setRoute={setRoute}
          count={pages.count}
        />
        <Fab
          color={demo ? 'secondary' : 'primary'}
          style={{ position: 'absolute', top: '5px', right: '5px' }}
          onClick={_ => setDemo(!demo)}
        >
          {' '}
          <FontAwesomeIcon
            icon={demo ? faTimes : faMinus}
            style={{ color: 'white' }}
          />
        </Fab>
        {demo && <Demo route={route}></Demo>}
      </div>
    </div>
  );
};

export default Pages;
