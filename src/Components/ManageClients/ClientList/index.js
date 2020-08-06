import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { Divider, MenuItem, ListItemText } from '@material-ui/core'
import CircularProgress from '@material-ui/core/CircularProgress';
import { AiOutlineUser, AiOutlineDelete } from 'react-icons/ai'
import { makeStyles, Paper, TextField, Button, ListItem, ListItemIcon } from '@material-ui/core'
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import List from '@material-ui/core/List';

const ClientList = (props) => {

  const { listClient, deleteClient } = props





  const displayClient = listClient.length == 0 ?
    <Grid item container justify="center" alignItems="center" style={{ height: '100%',paddingTop: '25%' }}>

      <CircularProgress />
      <Grid item={12} style={{ marginLeft: '20px' }}>

        <Typography variant="body2" color="secondary">
          Loading users ...
      </Typography>
      </Grid>

    </Grid>
    : (
      listClient.map((val, index) => (

        <>
          <ListItem key={index}>
            <ListItemAvatar>
              <Avatar>
                <AiOutlineUser />
              </Avatar>
            </ListItemAvatar>
            <ListItemText
              primary={val.client}
              // secondary={`id : ${val.id}`}
            />
            <ListItemSecondaryAction>
              <IconButton
                edge="end"
                aria-label="delete"
                onClick={() => deleteClient(index,val.id)}
              >
                <AiOutlineDelete />
              </IconButton>
            </ListItemSecondaryAction>
          </ListItem>
















        </>
      ))
    )














  return (
    <Grid item md={6} >

      <Paper elevation={3}>
        <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
          SUPPRIMER CLIETNS
          </Typography>
      </Paper>
      <Grid item md={12}>
        <Paper elevation={3} style={{ height: '300px', overflow: 'auto' }}>


          <List>
            {displayClient}
          </List>


        </Paper>

      </Grid>
    </Grid>
  )
}

export default ClientList
