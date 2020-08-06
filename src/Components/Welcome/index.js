import React, { useState, useEffect, useContext } from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Paper, Divider, TextField, MenuItem, Button, Select } from '@material-ui/core'
import {ReactComponent as ImgWelcome} from './../../img/svg/revenue-graph-colour.svg'




const useStyles = makeStyles(theme => ({
  main: {
    padding: '20px 30px',
    border: '2px solid #dddd',
    borderRadius: '0 10px 10px 10px 0',
  }
}))
const Welcome = () => {
 
  const classes = useStyles()
  return (

    <Grid item container md={9} className={classes.main}>
        <Grid item md={6}>
         <ImgWelcome />
        </Grid>
        <Grid item container md={6} justify="center" alignItems="center">
            <Grid style={{marginLeft: '20px',textAlign:'center'}}>
              <h1>CASA MOFO</h1>
              <p>www.zedd.com - Copyright © CASA MOFO 2020</p>
            </Grid>
        </Grid>
    </Grid>
  )
}

export default Welcome
