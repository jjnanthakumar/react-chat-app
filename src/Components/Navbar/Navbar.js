import { AppBar, Typography, Toolbar, Avatar, Button } from '@material-ui/core';
import useStyles from './styles';
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import './styles.css';

import React, { useState } from 'react'
import Draggable from 'react-draggable';
function Navbar({ avatar, first_name, initialstate, setUser }) {
    const classes = useStyles();
    const [state, setState] = useState({
        activeDrags: 0,
        deltaPosition: {
            x: 0, y: 0
        },
        controlledPosition: {
            x: -400, y: 200
        }
    })
    const handleDrag = (e, ui) => {
        const { x, y } = state.deltaPosition;
        setState({
            deltaPosition: {
                x: x + ui.deltaX,
                y: y + ui.deltaY,
            }
        });
    };
    const onStart = () => {
        setState({ activeDrags: ++state.activeDrags });
    };

    const onStop = () => {
        setState({ activeDrags: --state.activeDrags });
    };
    const logoutHandler = () => {
        localStorage.removeItem('username')
        localStorage.removeItem('password')
        setUser(initialstate)
    }
    const dragHandlers = { onStart: onStart, onStop: onStop };
    return (
        <Draggable axis="x" {...dragHandlers}>
            <AppBar className={classes.appBar} position="fixed" color="inherit" id="navbar">
                <Button><Avatar className={classes.purple} alt={first_name} src={avatar}>{first_name?.charAt(0)}</Avatar></Button>
                <Typography className={classes.userName} variant="h6">{first_name}</Typography>
                <Button variant="contained" size="small" color="secondary" onClick={logoutHandler}><ExitToAppOutlinedIcon fontSize="small" />Logout</Button>
            </AppBar>
        </Draggable>
    )
}

export default Navbar
