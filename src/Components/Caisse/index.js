import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import {makeStyles } from '@material-ui/core'

const useStyles = makeStyles( theme =>({
  main: {
    padding: '0 30px'
  }
}))
const Caisse = () => {
  const classes = useStyles()
  return (
   
       <Grid item md={9}  className={classes.main}>
          <h1>Caisse</h1>
       </Grid>
  )
}

export default Caisse
