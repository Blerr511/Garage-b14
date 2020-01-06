import { makeStyles } from '@material-ui/core/styles';
import { amber, green } from '@material-ui/core/colors';
export const styles = makeStyles(theme => ({
  verticalTabs: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    height: '100%',
    width: '100%'
  },
  miniVideoBg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
    position: 'absolute'
  },
  twixGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto'
  },
  solid: {
    display: 'grid',
    gridTemplateColumns: '1fr',
    gridTemplateRows: 'auto',
    minHeight: '100vh'
  },
  errorText: {
    padding: '10px 20px',
    marginBottom: '20px',
    border: '2px solid #f00',
    fontWeight: '100 !important',
    fontSize: '18px !important',
    background: '#000'
  },
  successText: {
    padding: '10px 20px',
    marginBottom: '20px',
    border: '2px solid #0f0',
    fontWeight: '100 !important',
    fontSize: '18px !important',
    background: '#000'
  },
  flexBetween: {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-end'
  },
  flexCenter: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    height: '100%',
    zIndex: 10
  },
  fullWidthColumn: {
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    minHeight: '400px',
    position: 'relative'
  },
  paper: {
    backgroundColor: theme.palette.background.paper,

    padding: theme.spacing(3),

    overflowX: 'auto'
  },
  bgVideoPlayer: {
    width: '100vw',
    height: '100vh',
    objectFit: 'cover',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: 0,
    userSelect: 'none'
  },
  pageDesc: {
    display: 'flex',
    alignItems: 'flex-end',
    marginBottom: '10px'
  },
  horizontalMargin: {
    margin: theme.spacing(2)
  },
  pageHead: {
    display: 'flex',
    justifyContent: 'space-between'
  },

  flexWrap: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center'
  },
  tabePanel: {},
  tabs: {
    borderRight: `1px solid ${theme.palette.divider}`,
    minWidth: '160px'
  },
  addPages: {
    backgroundColor: theme.palette.background.paper,
    width: '100%',
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gridTemplateRows: 'auto'
  },
  formControl: {
    margin: '30px 0'
  },
  flexColumn: {
    display: 'flex',
    flexDirection: 'column'
  },
  pageContainer: { marginTop: '30px' },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular
  },
  media: {
    width: '175px',
    height: '175px'
  },
  card: {
    position: 'relative',
    width: '175px',
    height: '175px',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    margin: '3px'
  },
  cardStandard: {
    position: 'relative',
    width: '200px',
    height: '200px',
    margin: '3px'
  },

  selectInput: {
    minWidth: '100px',
    margin: '15px 0'
  },
  hidden: {
    opacity: 0
  },
  shown: {
    opacity: 1
  },
  absTR: {
    position: 'absolute',
    top: '5px',
    right: '5px'
  },
  success: {
    backgroundColor: green[600]
  },
  error: {
    backgroundColor: theme.palette.error.dark
  },
  info: {
    backgroundColor: theme.palette.primary.main
  },
  warning: {
    backgroundColor: amber[700]
  },
  icon: {
    fontSize: 20
  },
  iconVariant: {
    opacity: 0.9,
    marginRight: theme.spacing(1)
  },
  message: {
    display: 'flex',
    alignItems: 'center'
  },
  fab: {
    color: theme.palette.common.white,
    backgroundColor: green[500],
    color: '#fff',
    '&:hover': {
      backgroundColor: green[600]
    },
    marginRight: '20px'
  },
  buttonProgress: {
    color: green[500],
    position: 'absolute',
    top: '50%',
    left: '50%',
    marginTop: -30,
    marginLeft: -30
  }
}));
