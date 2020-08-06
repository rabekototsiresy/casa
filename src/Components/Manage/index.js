import React, { useState, useEffect, useContext } from 'react'
import { v4 as uuidv4 } from 'uuid';
import Firebase, { FirebaseContext } from './../Firebase/'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles, Paper, TextField, Button, ListItem, ListItemIcon } from '@material-ui/core'
import { InputLabel, FormControl, MenuItem, Select, ListItemText, Divider } from '@material-ui/core'
import { AiOutlineUser, AiOutlineDelete } from 'react-icons/ai'
import { toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

toast.configure()
const useStyles = makeStyles(theme => ({
  main: {
    padding: '0 30px',
    border: '2px solid #dddd',
    borderRadius: '0 10px 10px 10px 0',

  },
  username: {},
  password: {},
  confirmPassword: {},
  category: {},
}))
const Manage = () => {
  const classes = useStyles()
  const catList = ['Patron', 'Superiviseur', 'Caissier', 'Magasinier', 'Vendeur', 'Traiteur']
  const [listUser, setListUser] = useState([])
  const [category, setCategory] = useState(catList)
  const [username, setUsername] = useState('')
  const [password, setPassowrd] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [getCateg, setGetCateg] = useState('')
  let [lastId, setLastId] = useState(0)
  const firebase = useContext(FirebaseContext)



  const handleUsername = (e) => {
    setUsername(e.target.value)

  }
  const handlePassword = (e) => {
    setPassowrd(e.target.value)
  }
  const handleConfirmP = (e) => {
    setConfirmPassword(e.target.value)
  }
  const handleCategory = (e) => {
    setGetCateg(e.target.value)
  }
  useEffect(() => {
    lastId = setLastId(listUser.length)
    //console.log('GET DATA IN USEEFFECT')
    firebase.getUser()
      .get()
      .then(collection => {
        if (collection) {
          let tabTemp = []
          collection.docs.map(doc => tabTemp.push(doc.data()))
          setListUser(tabTemp)
          console.log(listUser)
        }
      })
      .catch(err => {
        console.log('une erreur est survenue')
      })

  }, [listUser])
  const handleSubmit = (e) => {
    e.preventDefault()
    setListUser([...listUser, { id: lastId + 1, email: username }])
    toast.success(' add user succeful! :-)', {
      position: "top-center",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: false,
      progress: undefined,
    });

    firebase.signUpUser(username, password)
      .then(user => {
        firebase.user(user.user.uid, username, getCateg)
        setUsername('')
        setPassowrd('')
        setConfirmPassword('')
        setGetCateg('')
        // console.log('succefullly')

      })

      .catch(error => {
        console.log('une erreur est survenue lors de la creation de l\'utilisateur')
      })


  }
  const deleteUser = (id, idUser) => {
    const [...copyUser] = listUser
    copyUser.splice(id - 1, 1)
    setListUser(copyUser)
    firebase.deleteUserDb(idUser)
      .then((d) => {
        console.log('supression avec succes')
      })
      .catch(err => {
        console.log('supression non validé')
      })
  }
  const listUserDisplay = listUser.length == 0 ?
    <Grid item container justify="center" alignItems="center" style={{ height: '100%' }}>
      
        <CircularProgress />
        <Grid item={12} style={{marginLeft: '20px'}}>
        
        <Typography variant="body2" color="secondary">
          Loading users ...
        </Typography>
        </Grid>
     
    </Grid>
    : (
      listUser.map((val, index) => (

        <>
          <ListItem style={{ margin: '10px 0' }} button  >
            <ListItemIcon>
              <AiOutlineUser />
            </ListItemIcon>
            <ListItemText primary={val.email} />

          </ListItem>
          <Paper style={{ display: 'block', padding: '10px' }}>
            <Button
              variant="contained"
              color="primary"
              size="small"
              style={{ marginRight: '10px' }}
            >
              {index + 1}
            </Button>
            <Button
              variant="contained"
              color="secondary"
              className={classes.button}
              onClick={() => deleteUser(index + 1, val.id)}
              startIcon={<AiOutlineDelete />}
            >
              Delete
          </Button>
          </Paper>


        </>
      ))
    )
  const btnDisabled = username !== '' && password !== '' && confirmPassword === password && category !== '' ? (<Button
    variant="contained"
    color="primary"
    size="medium"
    style={{ width: '100%', marginTop: '20px' }}
    type='submit'
  >
    Ajouter
  </Button>)
    :
    (<Button
      variant="contained"
      color="primary"
      size="medium"
      style={{ width: '100%', marginTop: '20px' }}
      type='submit'
      disabled
    >
      Ajouter
    </Button>)

  const listCat = catList.map(cat => (<MenuItem value={cat}>{cat}</MenuItem>))
  return (

    <Grid item md={9} className={classes.main}>
      <Grid item md={12}>
          <Paper elevation={3}>
            <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
              GESTION DES EMPLOYES
          </Typography>
          </Paper>
        </Grid>

      <Grid item container spacing={3} md={12} style={{marginTop :'20px'}}>

        <Grid item md={6} >
          <Paper elevation={3}>
            <Typography variant="h5" component="h5" square style={{ padding: '10px', color: "white", backgroundColor: '#3f51b5' }}>
              AJOUTER
          </Typography>
          </Paper>
          <Paper elevation={3} style={{ padding: '10px' }}>
            <form
              noValidate autoComplete="off"
              spacing={3}
              direction="column"
              container
              onSubmit={handleSubmit}
            >

              <TextField

                label="Username"
                variant="outlined"
                style={{ width: '100%', marginTop: '20px' }}
                className={classes.username}
                value={username}
                onChange={handleUsername}
              />
              <TextField

                type="password"
                label="Password"
                variant="outlined"
                style={{ width: '100%', marginTop: '20px' }}
                value={password}
                onChange={handlePassword}
              />
              <TextField

                type="password"
                label="Confirm Password"
                variant="outlined"
                style={{ width: '100%', marginTop: '20px' }}
                value={confirmPassword}
                onChange={handleConfirmP}
              />
              <FormControl variant="outlined" className={classes.formControl} style={{ width: '100%', marginTop: '20px' }} >
                <InputLabel id="demo-simple-select-outlined-label"

                >
                  Catégorie
                </InputLabel>
                <Select
                  labelId="demo-simple-select-outlined-label"
                  id="demo-simple-select-outlined"
                  value={getCateg}
                  onChange={handleCategory}

                  label="Catégorie"
                >
                  {listCat}
                </Select>
              </FormControl>
              <Typography variant="h6">(*) Champ obligatoire</Typography>
              {btnDisabled}
            </form>
          </Paper>
        </Grid>
        <Grid item md={6}>
          <Paper elevation={3} style={{ height: '430px', overflow: 'auto' }}>


            {listUserDisplay}


          </Paper>
        </Grid>
      </Grid>
    </Grid>
  )
}

export default Manage
