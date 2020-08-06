import React,{useState,useContext,useEffect} from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Paper, Divider, TextField } from '@material-ui/core'
import Add from './Add';
import ClientList from './ClientList';
import {FirebaseContext} from '../Firebase'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';


toast.configure()
const useStyles = makeStyles(theme => ({
  main: {
    padding: '20px 30px',
    border: '2px solid #dddd',
    borderRadius: '0 10px 10px 10px 0',
  }
}))
const ManageClients = () => {
  const classes = useStyles()
  const firebase = useContext(FirebaseContext)
  const [client, setClient] = useState('')
  const [listClient, setListClient] = useState([])


  useEffect(() => {
 
    firebase.getClients()
    .get()
    .then( collection=>{
        if(collection){
          let tabTemp = []
            collection.docs.map( (doc)=>{

              tabTemp.push({
                id: doc.id ,
                client: doc.data().client
              })
            })

            setListClient(tabTemp)
            
        }
    })
    .catch( err=>{
      console.log(err)
    })
  })
  const getClients = (e)=>{
    setClient(e.target.value)
   
  }
  const handleSubmit = (e)=>{
    e.preventDefault()
    setListClient([...listClient,client])
    firebase.addClient(client)
    toast.success(' add client succeful! :-)', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    setClient('')
  }



  
const deleteClient = (id,idFirebase)=>{
  const [...copyListClient] = listClient
  copyListClient.splice(id, 1)
  setListClient(copyListClient)
  firebase.deleteClient(idFirebase)
  toast.success(' delete user succeful! :-)', {
    position: "top-center",
    autoClose: 5000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: false,
    draggable: false,
    progress: undefined,
  });
 
}


  return (

    <Grid item md={9} className={classes.main}>
      <Grid item container spacing={3} md={12}>
        <Grid item md={12}>
          <Paper elevation={3}>
            <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
              GESTION DES CLIENTS
          </Typography>
          </Paper>
        </Grid>
       
       <Add 
       client={client}
       getClients={getClients}
       handleSubmit={handleSubmit}
       
       />
      <ClientList
      listClient={listClient}
      deleteClient={deleteClient}
       />

      





        

      </Grid>
    </Grid>
  )
}

export default ManageClients
