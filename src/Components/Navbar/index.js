import React,{useContext,useState,useEffect} from 'react'
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { Button } from '@material-ui/core'
import { AiOutlineLogout } from 'react-icons/ai'
import { Grid } from '@material-ui/core'
import {FirebaseContext} from './../Firebase'

const Navbar = (props) => {
 
  const [showBtnLogOut,setShowBtnLogOut] = useState(true)
  const [session, setSession] = useState({})
  const [emailUserAuth, setEmailUserAuth] = useState(null)
  const firebase = useContext(FirebaseContext)

  useEffect( ()=>{
    firebase.auth.onAuthStateChanged( user=>{
      setEmailUserAuth(user && user.email )
      setSession(user && true)
    })
  })
  const logOut = ()=>{
    firebase.signOutUser()
    setSession(null)
    emailUserAuth(null)
    props.history.push('/')
console.log('deconnecté')

    
  }

  const btn = session && (
    <Button color="white" style={{ float: 'right' }} onClick={logOut}>
    <Typography style={{color: '#fff',padding: '0 10px'}}>
            {emailUserAuth && emailUserAuth}   
          </Typography> 
    <AiOutlineLogout color="#fff" size="30px" />
  </Button>
  )

  return (

    <AppBar position="static" >
      <Toolbar>
        <Grid container>
          <Grid item md={5}>
            <Typography variant="h4" >
              Casa Mofo
            </Typography>
          </Grid>
          <Grid item md={5} />
          <Grid item md={2}>
           
         {btn}

          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>

  )
}

export default Navbar
