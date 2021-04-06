import React, { useEffect, useState, useRef } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import TextField from '@material-ui/core/TextField';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import SendIcon from '@material-ui/icons/Send';
const moment = require('moment');
const socket = require('socket.io-client');

const useStyles = makeStyles({
    root: {
        width: '100%',
        height: '100vh',
    },
    headBG: {
        backgroundColor: '#e0e0e0'
    },
    borderRight500: {
        borderRight: '1px solid #e0e0e0'
    },
    messageArea: {
        height: 'calc(100vh - 115px)',
        overflowY: 'auto'
    }
});

export default function ChatRoomPage() {
    const classes = useStyles();
    const [currentUser, setCurrentUser] = useState('');
    const [msgHistory, setMsgHistory] = useState([]);
    const msg = useRef('');
    const connection = socket.connect('wss://codechallenge.brand.live');
    const channel = 'code-test';

    useEffect(() => {
        setCurrentUser(localStorage.getItem('name'));

        const oldMsgs = getWithExpiry();
        setMsgHistory(() => oldMsgs);

        connection.on('connect', () => {
            connection.emit('join-channel', channel);
        });
        
        connection.on('error', (e) => { 
            console.error(e);
        });

        connection.on('message', handleReceiveMsg);
        window.addEventListener('beforeunload', setWithExpiry);
        
        return () => {
            window.removeEventListener('beforeunload', setWithExpiry);
            connection.off('error');
            connection.off('message');
        }
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    const setWithExpiry = () => {
        localStorage.setItem('lastVisit', moment().format('YYYY-MM-DD HH:mm:ss'));
    }

    const getWithExpiry = () => {
        const lastVisit = localStorage.getItem('lastVisit');
        if (!lastVisit) {
            return [];
        }
        
        if (isExpired(lastVisit)) {
            localStorage.removeItem('lastVisit');
            return [];
        }
        
        const oldMsgs = localStorage.getItem('msg');
        if (oldMsgs) {
            return JSON.parse(oldMsgs);
        }
        
        return [];
    }

    const isExpired = (lastVisit) => {
        if (moment().diff(moment(lastVisit), 'minutes') > 60) {
            return true;
        }
        return false;
    }

    const handleReceiveMsg = (res) => {
        const data = JSON.parse(res);
        setMsgHistory((msgHistory) => {
            const newMsgs = [...msgHistory, {
                msg: data.message,
                sender: data.sender,
                time: moment().format('h:mma'),
            }];
            localStorage.setItem('msg', JSON.stringify(newMsgs));
            return newMsgs;
        });
        scrollToBottom();
    }

    const scrollToBottom = () => {
        const e = document.getElementById('message-area');
        e.scrollTop = e.scrollHeight - e.getBoundingClientRect().height;
    }

    const getNameAbb = (name) => {
        if (!name) {
            return '';
        }
        const names = name.split(' ');
        return names.length > 1 ? names[0][0] + names[1][0] : names[0][0];
    }

    const sendMsg = () => {
        if (msg.current.value) {
            connection.emit('message', JSON.stringify({ message: msg.current.value, sender: currentUser }), channel);
            msg.current.value = '';
        }
    }

    return (
        <Grid container component={Paper} className={classes.root}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="currentUser">
                        <ListItemIcon>
                        <Avatar alt={getNameAbb(currentUser)} src="/" />
                        </ListItemIcon>
                        <ListItemText primary={currentUser}></ListItemText>
                    </ListItem>
                </List>
                <Divider />
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea} id="message-area">
                    {msgHistory && msgHistory.length > 0 && msgHistory.map((history, index) => (
                        <ListItem key={index}>
                            <Grid container>
                                <Grid item xs={12}>
                                    <ListItemText align={history.sender === currentUser ? 'right' : 'left'} primary={history.msg}></ListItemText>
                                </Grid>
                                <Grid item xs={12}>
                                    <ListItemText align={history.sender === currentUser ? 'right' : 'left'} secondary={`${history.sender} ${history.time}`}></ListItemText>
                                </Grid>
                            </Grid>
                        </ListItem>
                    ))}
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" inputRef={msg} label="Type Something" fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon onClick={sendMsg} /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
