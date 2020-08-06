import React,{Fragment,useEffect,useContext,useState} from 'react'
import {Paper,Typography,Divider,Button,TextField} from '@material-ui/core'
import {FirebaseContext} from '../../Firebase'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

toast.configure()
const Unite = () => {


  
  const [unite, setUnite] = useState('')
  const firebase = useContext(FirebaseContext)
  const getUnite = e =>{
    setUnite(e.target.value)
    console.log(unite)
  }

  const handleSubmit = e =>{
    e.preventDefault()
    toast.success('  Unity  added succeful! :-)', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    firebase.addUnity(unite)
    console.log(unite)
  }
  const btnValid = unite !== '' ? (<Button
    variant="contained"
    color="primary" size="medium"
    style={{ "marginTop": "15px" }}
    type="submit"
   

  >
    Valider
</Button>)
    :
    (
      <Button
        variant="contained"
        color="primary" size="medium"
        style={{ "marginTop": "15px" }}
        type="submit"
        disabled
       
      >
        Valider
  </Button>
    )


  return (
    <Fragment>
      <Paper elevation={3}>
        <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
          UNITE
            </Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="overline" gutterBottom>
          NB : Formulaire pour ajouter à la base de nouveaux unités.
          </Typography>
        <Divider style={{ margin: '10px 0' }} />
        <form  noValidate autoComplete="off" onSubmit={handleSubmit}>
        <TextField 
          id="unite" 
          label="Unité" 
          variant="outlined" 
          value={unite}
          onChange={getUnite}
          />
          <br />
          {btnValid}
        </form>
        
      </Paper>
    </Fragment>
  )
}

export default Unite
