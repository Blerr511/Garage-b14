import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@material-ui/core/styles';
import RootRef from '@material-ui/core/RootRef';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import TextField from '@material-ui/core/TextField';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import Select from '@material-ui/core/Select';
import LinearProgress from '@material-ui/core/LinearProgress';
import IconButton from '@material-ui/core/IconButton';

import Message from '../Message/Message';
import Demo from '../Demo/Demo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faTrash,
  faPlusSquare,
  faTimesCircle
} from '@fortawesome/free-solid-svg-icons';
import { SketchPicker } from 'react-color';
import { styles } from '../../../styles/main';

import { createUrl, placeholderTestUrl } from '../../../methods/createUrl';
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <Typography
      component="div"
      role="tabpanel"
      hidden={value !== index}
      id={`full-width-tabpanel-${index}`}
      aria-labelledby={`full-width-tab-${index}`}
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
    id: `full-width-tab-${index}`,
    'aria-controls': `full-width-tabpanel-${index}`
  };
}

const useStyles = styles;
const toBase64 = file =>
  new Promise((resolve, reject) => {
    if (file instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = error => reject(error);
    } else {
      reject(false);
    }
  });
const FileListToArray = fl => {
  const arr = [];
  for (const k in fl) {
    if (!isNaN(parseInt(k))) {
      arr.push(fl[k]);
    }
  }
  return arr;
};

export default function FullWidthTabs(props) {
  const contentFileRef = useRef();
  const contentTitleRef = useRef();
  const contentDescRef = useRef();
  const titleRef = useRef();
  const descRef = useRef();

  const classes = useStyles();
  const theme = useTheme();
  const [value, setValue] = React.useState(0);
  const [title, setTitle] = React.useState('');
  const [desc, setDesc] = React.useState('');
  const newContent = {
    title: '',
    desc: '',
    img: null
  };
  const [bgtype, setbgtype] = React.useState('color');
  const [bg, setBg] = React.useState({
    hex: '#000000',
    rgb: {
      r: 0,
      g: 0,
      b: 0
    }
  });
  const [titlePosition, setTitlePosition] = React.useState('left');
  const [colorChange, setColorChange] = React.useState(false);
  const [template, setTemplate] = React.useState('template1');
  const [expanded, setExpanded] = React.useState(false);
  const [content, setContent] = React.useState([]);
  const [portfolio, setPortfolio] = React.useState([]);
  const [demoUrl, setDemoUrl] = React.useState('');
  const [message, setMessage] = React.useState({
    type: 'success',
    message: '',
    open: false
  });
  const tempPortfolio = {
    author: '',
    tags: '',
    img: null
  };
  const [loading, setLoading] = React.useState(false);
  const [portfolioDialog, setPortfolioDialog] = React.useState(false);

  const savePage = async _ => {
    if (!loading) {
      const { title, desc, titlePosition, bg, bgtype, template, content } = _;

      setLoading(true);
      const _bg =
        bgtype === 'color'
          ? bg.hex
          : bgtype === 'image'
          ? bg.image
          : bgtype === 'video'
          ? bg.video
          : null;

      const jsonData = {
        title: title,
        titlePosition: titlePosition,
        desc: desc,
        bg: _bg,
        bgtype: bgtype,
        template: template,
        content: content
      };
      Object.defineProperties(jsonData, {
        content: {
          enumerable: false
        }
      });
      const formData = new FormData();
      for (const k in jsonData) {
        if (jsonData.hasOwnProperty(k)) {
          const val = jsonData[k];
          formData.append(k, val);
        }
      }
      content.map(el => {
        console.log(el);
        if (el.title !== undefined) formData.append('contentTitle', el.title);
        if (el.desc !== undefined) formData.append('contentDesc', el.desc);
        if (el.img !== undefined) formData.append('contentFile', el.img);
      });
      const apiURL = process.env.SERVER;
      fetch(`${apiURL}/api/addpage`, {
        method: 'POST',
        body: formData
      })
        .then(_ => _.json())
        .then(data => {
          setLoading(false);

          if (+data.status !== 200) throw data;

          setMessage({ type: 'success', text: data.message, open: true });
          clear();
          setDemoUrl(data.route);
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
    }
  };
  const clear = _ => {
    setTitle('');
    setDesc('');
    setDemoUrl('');
    titleRef.current.value = '';
    descRef.current.value = '';
    Object.assign(newContent, {
      title: '',
      desc: '',
      img: null
    });
    Object.assign(tempPortfolio, {
      author: '',
      tags: '',
      img: null
    });
    setbgtype('color');
    setBg({
      hex: '#000000',
      rgb: {
        r: 0,
        g: 0,
        b: 0
      }
    });
    setTitlePosition('left');
    setTemplate('template1');
    setContent([]);
    setPortfolio([]);
  };
  const wrapperRef = useRef(null);

  useOutsideAlerter(wrapperRef);
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
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
  const handleChangeIndex = index => {
    setValue(index);
  };
  const hundlebgtypechange = (e, t) => setbgtype(t);
  const contentChangeHundler = _ => {
    Object.assign(newContent, _);
  };
  const addContentHundler = _ => {
    setContent(
      content.concat({
        id: content.length,
        title: newContent.title,
        desc: newContent.desc,
        img: newContent.img
      })
    );

    Object.assign(newContent, {
      title: '',
      desc: '',
      img: null
    });
    contentDescRef.current.value = '';
    contentTitleRef.current.value = '';
    contentFileRef.current.value = '';
    setExpanded(false);
  };
  const portfolioItemChangeHundler = _ => {
    Object.assign(tempPortfolio, _);
  };
  const closeMessage = () => {
    setMessage({ type: 'success', message: '', open: false });
  };
  const removeContentItem = _ => {
    for (let i = 0; i < content.length; i++) {
      const e = content[i];
      if (e.id === _) {
        const temp = content.slice();
        temp.splice(i, 1);
        setContent(temp);
        break;
      }
    }
  };
  const removePortfolioItem = _ => {
    for (let i = 0; i < portfolio.length; i++) {
      const e = portfolio[i];
      if (e.id === _) {
        const temp = portfolio.slice();
        temp.splice(i, 1);
        console.log(temp);
        setPortfolio(temp);
        break;
      }
    }
  };
  const addNewPortfolio = _ => {
    setPortfolio(portfolio.concat({ ...tempPortfolio, id: portfolio.length }));
    Object.assign(tempPortfolio, {
      author: '',
      tags: '',
      img: null
    });
    setPortfolioDialog(false);
  };

  return (
    <div className={classes.addPages}>
      <div>
        <Message
          open={message.open}
          type={message.type}
          handleclose={closeMessage}
          timer={3000}
          message={message.text}
        />
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            <Tab label="Add page" />
          </Tabs>
        </AppBar>
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
        <SwipeableViews
          axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
          index={value}
          onChangeIndex={handleChangeIndex}
        >
          <TabPanel value={value} index={0} dir={theme.direction}>
            <div
              className="inputContainer"
              style={{ display: 'flex', flexDirection: 'column' }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <TextField
                  id="standard-name"
                  label="Title"
                  className={classes.textField}
                  onBlur={_ => setTitle(_.target.value)}
                  margin="normal"
                  inputRef={titleRef}
                />
                <FormControl className={classes.selectInput}>
                  <InputLabel htmlFor="age-simple">Title position</InputLabel>
                  <Select
                    value={titlePosition}
                    onChange={e => setTitlePosition(e.target.value)}
                  >
                    <MenuItem value="left">left</MenuItem>
                    <MenuItem value="center">center</MenuItem>
                    <MenuItem value="right">right</MenuItem>
                  </Select>
                </FormControl>
              </div>
              <TextField
                id="standard-multiline-static"
                label="Description"
                multiline
                rows="4"
                inputRef={descRef}
                onBlur={_ => setDesc(_.target.value)}
                className={classes.textField}
                margin="normal"
              />
              <div>
                <FormControl
                  component="fieldset"
                  className={classes.formControl}
                >
                  <FormLabel component="legend">Background type</FormLabel>
                  <RadioGroup
                    aria-label="position"
                    name="position"
                    value={bgtype}
                    onChange={hundlebgtypechange}
                    row
                  >
                    <FormControlLabel
                      value="color"
                      control={<Radio color="primary" />}
                      label="Color"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="image"
                      control={<Radio color="primary" />}
                      label="Image"
                      labelPlacement="top"
                    />
                    <FormControlLabel
                      value="video"
                      control={<Radio color="primary" />}
                      label="Video"
                      labelPlacement="top"
                    />
                  </RadioGroup>
                </FormControl>
              </div>
              {bgtype === 'color' ? (
                <div
                  style={{
                    textAlign: 'center',
                    maxWidth: '100px',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    border: '3px solid #ccc',
                    backgroundColor: bg.hex,
                    position: 'relative',
                    color:
                      bg.rgb.r + bg.rgb.g + bg.rgb.b < (256 + 256 + 256) / 2
                        ? '#fff'
                        : '#000'
                  }}
                  onClick={_ => setColorChange(true)}
                >
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
                        color={bg}
                        onChange={e => {
                          setBg({ ...bg, ...e });
                        }}
                      />
                    </div>
                  ) : null}
                  {bg.hex}
                </div>
              ) : bgtype === 'image' ? (
                <input
                  accept="image/png, image/jpeg"
                  type="file"
                  onChange={e => setBg({ ...bg, image: e.target.files[0] })}
                  style={{ minHeight: '46px' }}
                />
              ) : bgtype === 'video' ? (
                <input
                  type="file"
                  onChange={e => setBg({ ...bg, video: e.target.files[0] })}
                  style={{ minHeight: '46px' }}
                />
              ) : null}
              <FormControl component="fieldset" className={classes.formControl}>
                <FormLabel component="legend">Template</FormLabel>
                <RadioGroup
                  aria-label="position"
                  name="position"
                  value={template}
                  onChange={_ => setTemplate(_.target.value)}
                  column="true"
                >
                  <FormControlLabel
                    value="template1"
                    control={<Radio color="primary" />}
                    label="About"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="template2"
                    control={<Radio color="primary" />}
                    label="Services"
                    labelPlacement="end"
                  />
                  <FormControlLabel
                    value="template3"
                    control={<Radio color="primary" />}
                    label="Portfolio"
                    labelPlacement="end"
                  />{' '}
                </RadioGroup>
              </FormControl>
              {template === 'template2'
                ? content.map(el => {
                    return (
                      <ExpansionPanel key={el.id}>
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
                            <Typography>{el.title}</Typography>
                            <Typography>{el.desc}</Typography>
                            <img
                              height={100}
                              src={createUrl(el.img)}
                              alt={el.title}
                            />
                          </div>
                          <Button
                            onClick={_ => removeContentItem(el.id)}
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
                : null}
              {template === 'template2' ? (
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
                      onChange={_ =>
                        contentChangeHundler({ title: _.target.value })
                      }
                    />
                    <TextField
                      inputRef={contentDescRef}
                      onChange={_ =>
                        contentChangeHundler({ desc: _.target.value })
                      }
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
                      onChange={_ => {
                        contentChangeHundler({
                          img: _.target.files[0]
                        });
                      }}
                    />
                    <div style={{ marginTop: '15px' }}>
                      <Button
                        onClick={addContentHundler}
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
              ) : null}{' '}
              <div style={{ display: 'flex', flexWrap: 'wrap' }}>
                {template === 'template3'
                  ? portfolio.map(el => {
                      const element = el;
                      return (
                        <div key={Math.random()}>
                          <Card key={el.img} className={classes.card}>
                            <CardMedia
                              className={classes.media}
                              image={createUrl(el.img)}
                            />{' '}
                            <IconButton
                              className={classes.absTR}
                              aria-label="settings"
                              onClick={_ => removePortfolioItem(element.id)}
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
                          );
                        </div>
                      );
                    })
                  : null}
                {template === 'template3' ? (
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
                ) : null}
              </div>
              {template === 'template3' && portfolioDialog ? (
                <Dialog
                  open={portfolioDialog}
                  onClose={_ => setPortfolioDialog(false)}
                  aria-labelledby="form-dialog-title"
                >
                  <DialogTitle id="form-dialog-title">Portfolio</DialogTitle>
                  <DialogContent className={classes.flexColumn}>
                    <DialogContentText>
                      Add items to portfolio
                    </DialogContentText>
                    <TextField
                      autoFocus
                      margin="dense"
                      label="Author"
                      type="text"
                      onChange={_ =>
                        portfolioItemChangeHundler({ title: _.target.value })
                      }
                    />{' '}
                    <TextField
                      margin="dense"
                      label="Tags"
                      type="text"
                      onChange={_ =>
                        portfolioItemChangeHundler({ desc: _.target.value })
                      }
                    />
                    <input
                      accept="image/png, image/jpeg"
                      type="file"
                      onChange={_ =>
                        portfolioItemChangeHundler({
                          img: _.target.files[0]
                        })
                      }
                    />
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={clear} color="primary">
                      Cancel
                    </Button>
                    <Button onClick={_ => addNewPortfolio()} color="primary">
                      Add
                    </Button>
                  </DialogActions>
                </Dialog>
              ) : null}
              <div style={{ display: 'flex', marginTop: '15px' }}>
                <Button
                  onClick={() =>
                    savePage({
                      title: title,
                      desc: desc,
                      bg: bg,
                      titlePosition: titlePosition,
                      template: template,
                      bgtype: bgtype,
                      content:
                        template === 'template1'
                          ? []
                          : template === 'template3'
                          ? portfolio
                          : content
                    })
                  }
                  style={{ marginRight: '15px' }}
                  variant="contained"
                  color="primary"
                >
                  Save
                </Button>
                <Button onClick={clear} variant="contained" color="secondary">
                  Clear
                </Button>
              </div>
            </div>
          </TabPanel>
        </SwipeableViews>
      </div>
      <div>
        <Demo route={demoUrl} />
      </div>
    </div>
  );
}
