import { makeStyles } from '@material-ui/core/styles';
import { deepPurple } from '@material-ui/core/colors';

export default makeStyles((theme) => ({
  appBar: {
    cursor: "e-resize",
    borderRadius: 15,
    margin: '5px 0',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    padding: '5px 5px',
    width: '400px'
  },
  heading: {
    color: 'rgba(0,183,255, 1)',
    textDecoration: 'none !important',
  },
  image: {
    marginLeft: '15px',
  },
  logout: {
    fontSize: '1rem',
    textTransform: 'capitalize',
    float: 'right !important'
  },
  toolbar: {
    display: 'flex',
    flexDirection: 'coloumn',
    justifyContent: 'flex-end',
    width: '400px',
  },
  profile: {
    display: 'flex',
    justifyContent: 'space-between',
  },
  userName: {
    textTransform: 'capitalize',
    display: 'flex',
    alignItems: 'center',
    fontSize: '1rem',
  },
  brandContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  purple: {
    color: theme.palette.getContrastText(deepPurple[500]),
    backgroundColor: deepPurple[500],
  },
  [theme.breakpoints.down('sm')]: {
    button: {
      fontSize: '0.4rem',
    },
    heading:{
        marginLeft: '-30px',
    },
    image:{
      marginLeft: '6px'
    },
    profile: {
      marginLeft: '-40px'
    }
  }
}));