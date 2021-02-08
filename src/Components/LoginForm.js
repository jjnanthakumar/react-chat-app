import { useState } from 'react';
import axios from 'axios';
import { Button, TextField } from '@material-ui/core';
import { toast } from 'react-toastify';
import { makeStyles } from '@material-ui/core/styles';
import { Grid, InputAdornment, IconButton, FormHelperText } from '@material-ui/core'
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(2),
        },
    },
}));
const projectID = 'fb71f969-9166-46ab-818b-b732ac4c977d';

const Modal = () => {
    const classes = useStyles();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const handleSubmit = async (e) => {
        e.preventDefault();

        const authObject = { 'Project-ID': projectID, 'User-Name': username, 'User-Secret': password };
        try {
            await axios.get('https://api.chatengine.io/chats', { headers: authObject });

            localStorage.setItem('username', username);
            localStorage.setItem('password', password);

            window.location.reload();
        } catch (err) {
            toast.error('Oops, incorrect credentials.')
            setUsername('')
            setPassword('')
        }
    };
    const [showPass, setShowPass] = useState(false);
    const handleShowpassword = () => {
        setShowPass(!showPass);
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h1 className="title">Chat Application</h1>
                <form onSubmit={handleSubmit} className="loginform">
                    <div className={classes.root}>
                        <TextField className="login" label="Username" variant="outlined" type="text" value={username} onChange={(e) => setUsername(e.target.value)} required />
                        <TextField name="password" type={!showPass ? "password" : "text"} className="login" label="Password" variant="outlined" value={password} InputProps={
                            {
                                endAdornment: (
                                    <InputAdornment position="end">
                                        <IconButton onClick={handleShowpassword}>
                                            {showPass ? <Visibility /> : <VisibilityOff />}
                                        </IconButton>
                                    </InputAdornment >
                                ),
                            }}
                            onChange={(e) => setPassword(e.target.value)} required />
                        <div align="center">
                            <Button type="submit" color="secondary" variant="contained">
                                <span>Start chatting</span>
                            </Button>
                        </div>
                    </div>
                </form>
            </div>
        </div>

    );
};

export default Modal;