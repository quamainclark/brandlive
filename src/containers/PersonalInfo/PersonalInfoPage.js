import React, { useRef, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
    padding: 10,
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

export default function PersonalInfoPage() {
  const classes = useStyles();
  const name = useRef('');
  const history = useHistory();
  const [error, setError] = useState(false);

  const gotoChatRoom = () => {
    if (!name.current.value) {
      setError(true);
      return;
    }
    localStorage.setItem('name', name.current.value);
    history.push('./chatRoom');
  }

  return (
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Join into your Chat Room
        </Typography>
        <Paper className={classes.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            error={error}
            fullWidth
            name="name"
            label="Name"
            id="name"
            inputRef={name}
            autoComplete="name"
          />
          <Button
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={gotoChatRoom}
          >
            Join
          </Button>
        </Paper>
      </div>
    </Container>
  );
}
