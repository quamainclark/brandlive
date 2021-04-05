import React from 'react';
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

    return (
        <Grid container component={Paper} className={classes.root}>
            <Grid item xs={3} className={classes.borderRight500}>
                <List>
                    <ListItem button key="currentUser">
                        <ListItemIcon>
                        <Avatar alt="user's avatar" src="/" />
                        </ListItemIcon>
                        <ListItemText primary="test user"></ListItemText>
                    </ListItem>
                </List>
                <Divider />
            </Grid>
            <Grid item xs={9}>
                <List className={classes.messageArea}>
                    <ListItem key="key">
                        <Grid container>
                            <Grid item xs={12}>
                                <ListItemText align="right" primary="Hi, what's up!"></ListItemText>
                            </Grid>
                            <Grid item xs={12}>
                                <ListItemText align="right" secondary="10:23AM"></ListItemText>
                            </Grid>
                        </Grid>
                    </ListItem>
                </List>
                <Divider />
                <Grid container style={{padding: '20px'}}>
                    <Grid item xs={11}>
                        <TextField id="outlined-basic-email" label="Type Something" fullWidth />
                    </Grid>
                    <Grid item xs={1} align="right">
                        <Fab color="primary" aria-label="add"><SendIcon /></Fab>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}
