import { makeStyles } from '@material-ui/core/styles';
import { Alert, AlertTitle } from '@material-ui/lab';
import { Snackbar } from '@material-ui/core';
import { useState } from 'react';

const useStyles = makeStyles((theme) => ({
    root: {
        width: 'auto',
        '& > * + *': {
            marginTop: theme.spacing(1),
        },
    },
}));

export default function ActionAlerts({ message, severity, title }) {
    const classes = useStyles();
    const [open, setOpen] = useState(true)
    return (
        <div className={classes.root}>
            <Snackbar open={open} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert severity={severity} onClose={(e) => { setOpen(false) }} style={{ textAlign: "center", width: '100%' }}>
                    {message}
                </Alert>
            </Snackbar>
        </div>
    );
}