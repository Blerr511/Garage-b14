import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { makeStyles, useTheme } from '@material-ui/core/styles';
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
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
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

import Demo from '../Demo/Demo';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faSave,
  faTrash,
  faPlusSquare
} from '@fortawesome/free-solid-svg-icons';
import { SketchPicker } from 'react-color';

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

const useStyles = makeStyles(theme => ({
  root: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto'
  },
  formControl: {
    margin: '15px 0'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  media: {
    width: '175px',
    height: '175px'
  },
  card: {
    width: '175px',
    height: '175px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer'
  },
  selectInput: {
    minWidth: '100px',
    margin: '15px 0'
  }
}));
const toBase64 = file =>
  new Promise((resolve, reject) => {
    if (file instanceof File) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      console.log(file);
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
const savePage = async _ => {
  const { title, desc, titlePosition, bg, bgtype, template, content } = _;
  const _bg =
    bgtype === 'color'
      ? bg.hex
      : bgtype === 'image'
      ? await toBase64(bg.image)
      : bgtype === 'video'
      ? await toBase64(bg.video)
      : null;
  const _content = content.slice();
  for (let i = 0; i < _content.length; i++) {
    const el = _content[i];

    if (!(el.img instanceof Array)) {
      el.img = await toBase64(el.img);
    } else {
      const temp = [];
      for (let i = 0; i < el.img.length; i++) {
        const elem = el.img[i];
        const temp1 = await toBase64(elem);
        temp.push(temp1);
      }
      el.img = temp;
    }
  }

  const jsonData = {
    title: title,
    titlePosition: titlePosition,
    desc: desc,
    bg: _bg,
    bgtype: bgtype,
    template: template,
    content: _content
  };
  const apiURL = process.env.SERVER;
  fetch(`${apiURL}/api/addpage`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(jsonData)
  })
    .then(_ => _.json())
    .then(data => {
      console.log(data);
    })
    .catch(err => {
      console.log(err);
    });
};
export default function FullWidthTabs(props) {
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

  const tempPortfolio = {
    author: '',
    tags: '',
    comments: '',
    img: null
  };
  const [portfolioDialog, setPortfolioDialog] = React.useState(false);

  const clear = _ => {
    setTitle('');
    setDesc('');

    Object.assign(newContent, {
      title: '',
      desc: '',
      img: null
    });
    Object.assign(tempPortfolio, {
      author: '',
      tags: '',
      comments: '',
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
    setExpanded(false);
  };
  const portfolioItemChangeHundler = _ => {
    Object.assign(tempPortfolio, _);
  };
  const removePortfolioItem = _ => {
    for (let i = 0; i < portfolio.length; i++) {
      if (JSON.stringify(portfolio[i]) === JSON.stringify(_)) {
        const temp = portfolio[i];
        temp.splice(i, 1);
        setPortfolio(temp);
      }
    }
  };
  const addNewPortfolio = _ => {
    setPortfolio(
      portfolio.concat({ ...tempPortfolio, id: tempPortfolio.length })
    );
    Object.assign(tempPortfolio, {
      author: '',
      tags: '',
      comments: '',
      img: null
    });
    setPortfolioDialog(false);
  };

  return (
    <div className={classes.root}>
      <div>
        <AppBar position="static" color="default">
          <Tabs
            value={value}
            onChange={handleChange}
            indicatorColor="primary"
            textColor="primary"
            variant="fullWidth"
            aria-label="full width tabs example"
          >
            {props.pages.map(el => (
              <Tab key={el._id} label={el.title} />
            ))}
            <Tab label="Add page" />
          </Tabs>
        </AppBar>
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
                  onChange={_ => setTitle(_.target.value)}
                  margin="normal"
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
                onChange={_ => setDesc(_.target.value)}
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
                              src={URL.createObjectURL(el.img)}
                              alt={el.title}
                            />
                          </div>
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
                      id="standard-name"
                      label="Title"
                      className={classes.textField}
                      value={content.title}
                      margin="normal"
                      onChange={_ =>
                        contentChangeHundler({ title: _.target.value })
                      }
                    />
                    <TextField
                      onChange={_ =>
                        contentChangeHundler({ desc: _.target.value })
                      }
                      value={content.desc}
                      id="standard-multiline-static"
                      label="Description"
                      multiline
                      rows="4"
                      className={classes.textField}
                      margin="normal"
                    />

                    {'Image:'}
                    <input
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
                      const cards = [];
                      for (const k in el.img) {
                        if (!isNaN(parseInt(k))) {
                          cards.push(el.img[k]);
                        }
                      }

                      return (
                        <div key={Math.random()}>
                          {cards.map(el => {
                            return (
                              <Card key={el} className={classes.card}>
                                <CardMedia
                                  className={classes.media}
                                  image={URL.createObjectURL(el)}
                                />
                              </Card>
                            );
                          })}
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
                        portfolioItemChangeHundler({ author: _.target.value })
                      }
                    />{' '}
                    <TextField
                      margin="dense"
                      label="Tags"
                      type="text"
                      onChange={_ =>
                        portfolioItemChangeHundler({ tags: _.target.value })
                      }
                    />
                    <TextField
                      margin="dense"
                      id="name"
                      label="Comments"
                      type="text"
                      onChange={_ =>
                        portfolioItemChangeHundler({ comments: _.target.value })
                      }
                    />
                    <input
                      type="file"
                      onChange={_ =>
                        portfolioItemChangeHundler({
                          img: FileListToArray(_.target.files)
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
        <Demo />
      </div>
    </div>
  );
}
