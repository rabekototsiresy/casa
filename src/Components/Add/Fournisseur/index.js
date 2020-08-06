import React,{Fragment,useEffect,useContext,useState} from 'react'
import {Paper,Typography,Divider,TextField,Button} from '@material-ui/core'
import {FirebaseContext} from '../../Firebase'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'

toast.configure()

const Fournisseur = () => {

  const [fournisseur, setFournisseur] = useState('')
  const firebase = useContext(FirebaseContext)
  const getFournisseur = e =>{
    setFournisseur(e.target.value)
   
  }

  const handleSubmit = e =>{
    e.preventDefault()
    toast.success(' Fournisseur added succeful! :-)', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });
    firebase.addFournisseur(fournisseur)
    //console.log(fournisseur)
  }

  const btnValid = fournisseur !== '' ? (<Button
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
          FOURNISSEUR
            </Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="overline" gutterBottom>
          NB : Formulaire pour ajouter à la base de nouveaux
          </Typography>
        <Divider style={{ margin: '10px 0' }} />
        <form  noValidate autoComplete="off"  onSubmit={handleSubmit} >
        <TextField 
          id="fournisseur" 
          label="Fournisseur" 
          variant="outlined" 
          value={fournisseur}
          onChange={getFournisseur}
          />
          <br />
          {btnValid}
        </form>
        
      </Paper>
    </Fragment>
  )
}

export default Fournisseur
