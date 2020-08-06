import React, { useState, useEffect, useContext } from 'react'
import { FirebaseContext } from './../Firebase'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import { makeStyles, Paper, Divider, TextField, MenuItem, Button, Select } from '@material-ui/core'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';
import ProduitF from './ProduitF';
import Fournisseur from './Fournisseur';
import Unite from './Unite';


toast.configure()
const useStyles = makeStyles(theme => ({
  main: {
    padding: '20px 30px',
    border: '2px solid #dddd',
    borderRadius: '0 10px 10px 10px 0',
   
  }
}))
const Add = () => {
  const uniteTab = [
    'Brick',
    'Kg',
    'Pcs',
    'Sachet(s)',
    'Verre'
  ]
  const [uniteInit, setUniteInit] = useState(uniteTab)
  const [matiereP, setMatiereP] = useState("")
  const [unite, setUnite] = useState("")
  const firebase = useContext(FirebaseContext)



  const getMatiere = e => {
    setMatiereP(e.target.value)

  }

  const getUnite = e => {
    setUnite(e.target.value)

  }

  const handleSubmit = e => {
    e.preventDefault()
    toast.success(' Base material added succeful! :-)', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    console.log("ajout en cour")
    firebase.addBaseMaterial(matiereP, unite)
    setMatiereP('')
    setUnite('')
      .then(success => {
        console.log('added succeful')
        
      })
      .catch(err => {
        console.log('error')
      })
    // console.log(matiereP)
    // console.log(unite)


  }


  const btnValid = matiereP !== '' && unite !== '' ? (<Button
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


  const displayUnite = uniteInit.map((val, index) => (
    <MenuItem key={index} value={val}>
      {val}
    </MenuItem>
  ))
  const classes = useStyles()
  return (

    <Grid item md={9} className={classes.main}>

      <Grid item container spacing={3} md={12}>
      <Grid item md={12}>
          <Paper elevation={3}>
            <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
              AJOUTS DES BESOINS
          </Typography>
          </Paper>
        </Grid>
        <Grid item md={6} >
          <Paper elevation={3}>
            <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
              MATIERES PREMIERES
        </Typography>
          </Paper>
          <Paper elevation={3} style={{ padding: '10px' }}>
            <Typography variant="overline" gutterBottom>
              NB : Formulaire pour ajouter à la base de nouveaux matières premières.
          </Typography>
            <Divider style={{ margin: '10px 0' }} />
            <form noValidate autoComplete="off" onSubmit={handleSubmit}>
              <TextField
                id="matierePremiere"
                label="Matière première"
                variant="outlined"
                value={matiereP}
                onChange={getMatiere}
                required


              />
              <TextField
                id="unite"
                select
                label="Unité"
                value={unite}
                onChange={getUnite}
                variant="outlined"
                style={{ width: "130px", marginLeft: '15px' }}
              >
                {displayUnite}
              </TextField>
              {btnValid}
            </form>
          </Paper>
        </Grid>
        <Grid item md={6} >


          <ProduitF uniteTab={uniteTab} />


        </Grid>
        <Grid item md={6} >


          <Fournisseur />


        </Grid>
        <Grid item md={6} >


        <Unite />


        </Grid>
      </Grid>
    </Grid>
  )
}

export default Add
