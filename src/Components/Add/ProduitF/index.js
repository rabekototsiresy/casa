import React, { Fragment, useState,useContext } from 'react'
import { Paper,Grid, Typography, Divider,MenuItem,TextField,Button } from '@material-ui/core'
import { FirebaseContext } from '../../Firebase/'
import {toast} from 'react-toastify'
import 'react-toastify/dist/ReactToastify.min.css'


toast.configure()
const custom = {
  fieldStyled: {
    width: '43%',
    marginLeft: '15px'
  }
}

const ProduitF = (props) => {

const listUnite = props.uniteTab
  const listCategory = [
    'VIENNOISERIE',
    'BOULANGERIE',
    'PATISSERIE',
    'SALEE',
    'BAR'
  ]
  
  const [productName, setproductName] = useState('')
  const [price, setPrice] = useState('')
  const [unite, setUnite] = useState('')
  const [category, setCategory] = useState('')
  const firebase = useContext(FirebaseContext)

  const getProductName = e =>{
    setproductName(e.target.value)
  }

  const getPrice = e=>{
    setPrice(e.target.value)
  }
  const getUnite = (e) => {
    setUnite(e.target.value)
  }

  const getCategory = (e)=>{
    setCategory(e.target.value)
  }

  const handleChange = e=>
  {
    console.log(e.target.id)
  }
  const displayCategory = listCategory.map((val, index) => (
    <MenuItem key={index} value={val}>
      {val}
    </MenuItem>
  ))

  const displayUnite = listUnite.map((val, index) => (
    <MenuItem key={index} value={val}>
      {val}
    </MenuItem>
  ))

  const handleSubmit = e=>{
    e.preventDefault()

    toast.success(' Final product added succeful! :-)', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    firebase.addFinalProduct(productName,price,unite,category)
    setproductName('')
    setPrice('')
    setUnite('')
    setCategory('')
  }


  const btnValid = productName !== '' && price !== '' && unite !== '' && category !== '' ? (<Button
    variant="contained"
    color="primary" size="medium"
    style={{ "marginTop": "15px" }}
    type="submit"
    style={{marginLeft: '15px',marginTop: '15px'}}

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
        style={{marginLeft: '15px',marginTop: '15px'}}
      >
        Valider
  </Button>
    )

  return (
    <Fragment>
      <Paper elevation={3}>
        <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
          PRODUITS FINIS
            </Typography>
      </Paper>
      <Paper elevation={3} style={{ padding: '10px' }}>
        <Typography variant="overline" gutterBottom>
          NB : Formulaire pour ajouter à la base de nouveaux produits.
          </Typography>
        <Divider style={{ margin: '10px 0' }} />
        <form  noValidate autoComplete="off" onSubmit={handleSubmit} >
          <Grid >
          <TextField 
          id="producttName" 
          label="Nom produit" 
          variant="outlined" 
          value={productName}
          style={custom.fieldStyled}
          onChange={getProductName}
          />
          <TextField
          id="productPrice" 
          label="Prix produit" 
          variant="outlined"
          value={price}
          style={custom.fieldStyled}
          onChange={getPrice}
          />
          </Grid >
          <Grid style={{marginTop: '15px'}} >
          <TextField
            id="unite"
            select
            label="Unité"
            value={unite}
            onChange={getUnite}
            variant="outlined"
            style={custom.fieldStyled}
            onChange={getUnite}
          >
            { displayUnite }
          </TextField>

          <TextField
            id="category"
            select
            label="Catégorie"
            value={category}
            onChange={getCategory}
            variant="outlined"
            style={custom.fieldStyled}
            onChange={getCategory}
          >
            {displayCategory}
          </TextField>
          {btnValid}
          </Grid>
          
        </form>
      </Paper>
    </Fragment>
  )
}

export default ProduitF
