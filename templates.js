import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {makeStyles } from '@material-ui/core'

const useStyles = makeStyles( theme =>({
  main: {
    padding: '20px 30px',
    border: '2px solid #dddd',
    borderRadius: '0 10px 10px 10px 0',
  }
}))
const ManageClients = () => {
  const classes = useStyles()
  return (
   
       <Grid item md={9}  className={classes.main}>
          <h1>Gestion clients</h1>
       </Grid>
  )
}

export default ManageClients
import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {makeStyles } from '@material-ui/core'

const useStyles = makeStyles( theme =>({
  main: {
    padding: '20px 30px',
    border: '2px solid #dddd',
    borderRadius: '0 10px 10px 10px 0',
  }
}))
const ManageClients = () => {
  const classes = useStyles()
  return (
   
       <Grid item md={9}  className={classes.main}>
          <h1>Gestion clients</h1>
       </Grid>
  )
}

export default ManageClients
