import React, { useContext, useEffect, useState } from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Box from '@material-ui/core/Box';
import Alert from '@material-ui/lab/Alert';
import { FiLock } from 'react-icons/fi'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { FirebaseContext } from './../Firebase'

import { CircularProgress } from '@material-ui/core';

function Copyright() {

  return (
    <Typography variant="body2" color="textSecondary" align="center">
      {'Copyright © '}
      <Link color="inherit" href="https://material-ui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

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
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const data = {
    email: '',
    password: ''
  }
  const [donne, setDonne] = useState(data)
  const [error, setError] = useState('')
  const [showBtn,setShowBtn] = useState(true)
  const [loader,setLoader] = useState(false)
  const handleChange = (e) => {
    setDonne({ ...donne, [e.target.id]: e.target.value })
  }
  const {email,password} = donne
  useEffect(()=>{
    if(email.length !== 0 && password.length >= 6){
      setShowBtn(false)
    }else{
      setShowBtn(true)
    }
  },[showBtn,email,password])
  const handleSubmit = (e) => {
    setLoader(true)
    e.preventDefault()

    firebase.loginUser(email,password)
      .then((authUser => {
        setDonne(data)
        setLoader(false)
        props.history.push('/dashboard')
      }))
      .catch(error => {
        if (error) {
          setError(error)
          setDonne(data)
          setLoader(false)
        }
      })
  }





  const firebase = useContext(FirebaseContext)





  const classes = useStyles();

  return (
    <Container component="main" maxWidth="xs">
      {error && (
        <Alert variant="outlined" severity="error" style={{marginTop:'20px'}}>
        {error.message}
      </Alert>
      )}
      <CssBaseline />
      <div className={classes.paper}>
        <Avatar className={classes.avatar}>
          <FiLock />
        </Avatar>

        <Typography component="h1" variant="h5">
          Sign in
        </Typography>
        <form className={classes.form} noValidate onSubmit={handleSubmit}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="username"
            name="email"
            value={donne.email}
            onChange={handleChange}
            autoFocus
            autoComplete="off"

          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            value={donne.password}
            onChange={handleChange}
            autoComplete="off"


          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          {!loader ? (
            <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            disabled={showBtn}
          >
            Sign In
          </Button>
          ):
          (
            <Grid container justify="center">
            <Grid item md={1}>
            <CircularProgress align="center" />
            </Grid>
          </Grid>
          )
          }
         


        </form>
      </div>

    </Container>
  );
}

export default Login