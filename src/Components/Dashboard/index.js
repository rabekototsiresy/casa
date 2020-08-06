import React, { useState, Fragment ,useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import { BsInboxFill } from 'react-icons/bs';
import { MdDrafts } from 'react-icons/md';
import { Link } from 'react-router-dom'
import Container from '@material-ui/core/Container'
import Grid from '@material-ui/core/Grid'
import { GrGroup } from 'react-icons/gr'
import { AiOutlineAppstoreAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { RiGroup2Line, RiStoreLine } from 'react-icons/ri'
import { GrMoney } from 'react-icons/gr'
import { GiTakeMyMoney, GiBuyCard, GiKitchenKnives } from 'react-icons/gi'
import { MdKitchen, MdStore } from 'react-icons/md'
import { FaWindowRestore } from 'react-icons/fa'
import { FirebaseContext }from './../Firebase'

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  linkCustom: {
    border: '2px solid #dddd',
    borderRadius: '0 10px 10px 10px 0'
  },
  classLink: {
    backgroundColor: '#3f51b5',
    color: "#fff"
  }
}));

function ListItemLink(props) {
  return <ListItem button component="a" {...props} />;
}

const Dashboard = (props) => {
  const classes = useStyles();
  const data =[
    "Gérer les membres",
    'Ajouter',
    'Gestion clients',
    'Caisse',
    "Etat caisse client",
    "Magasin",
    'Demande traiteur',
    "Stock matières premières",
    "Stock Produits finis",
    "Etat de vente",
    "Vente",
    "Service Traiteur"
  ]
const icon = [
  <GrGroup size="23" />,
  <AiOutlineAppstoreAdd size="23"/>,
  <RiGroup2Line size="23"/>,
  <GrMoney size="23"/>,
  <GiTakeMyMoney size="23"/>,
  <AiOutlineShoppingCart size="23"/>,
  <MdKitchen size="23"/>,
  <FaWindowRestore size="23"/>,
  <MdStore size="23"/>,
  <GiBuyCard size="23"/>,
  <RiStoreLine size="23"/>,
  <GiKitchenKnives size="23"  />
]

const [options, setOptions] = useState(data)
const firebase = useContext(FirebaseContext)

useEffect(() => {
  firebase.auth.onAuthStateChanged( user=>{
    if(!user){
      props.history.push('/')
    }
  })
})
const listOptions = options.map((op, index) => {
  let link = op.replace(' ', '-').toLocaleLowerCase()
  link = link.replace(' ', '-')
  link = link.replace('é', 'e')
  link = link.replace('è', 'e')
  let iconForm = icon[index]
  return (
    <Fragment key={index}>
      <Link to={`/dashboard/${link}`} style={{ textDecoration: 'none' }} >
        <ListItem button >
          <ListItemIcon>
            {iconForm}
          </ListItemIcon>
          <ListItemText primary={op} />
        </ListItem>
      </Link>
      <Divider />
    </Fragment>
  )
})
return (
  <Grid item md={3} className={classes.linkCustom}>

    <List>
      {listOptions}
    </List>
  </Grid>
);
}

export default Dashboard