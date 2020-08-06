import React,{useState} from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Paper, Divider, TextField,Button } from '@material-ui/core'
const Add = (props) => {
 
  const {client,getClients,handleSubmit} = props

  const btnAdd = client !=='' && client.length !==0 ? (
    <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{marginTop: '10px'}}
         
            
          >
            Ajouter
          </Button>
  ):
  (
    <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{marginTop: '10px'}}
            disabled
            
          >
            Ajouter
          </Button>
  )
  return (
    <Grid item md={6} >

      <Paper elevation={3}>
        <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
          AJOUTER CLIENTS
    </Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Divider style={{ margin: '10px 0' }} />
        <form noValidate autoComplete="off" onSubmit={handleSubmit}>
          <TextField
            id="client"
            label="Nom  client"
            variant="outlined"
            required
            style={{width: '100%'}}
            onChange={getClients}
          />
          
{btnAdd}

        </form>
      </Paper>
    </Grid>
  )
}

export default Add
