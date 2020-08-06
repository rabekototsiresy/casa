import React from 'react'
import Navbar from './Components/Navbar';
import Login from './Components/Login'
import Add from './Components/Add'
import Dashboard from './Components/Dashboard';
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import Manage from './Components/Manage';
import { Container } from '@material-ui/core'
import Grid from '@material-ui/core/Grid'
import Welcome from './Components/Welcome';
import ManageClients from './Components/ManageClients'



const App = () => {

  return (
    <div>
      <BrowserRouter>
      <Route component={Navbar} />
        <Switch>
         
          <Route exact path="/" component={Login} />
          <Container>
            <Grid container style={{paddingTop: '20px'}} >
              <Route path="/dashboard" component={Dashboard} />
              <Route exact path="/dashboard" component={Welcome} />
              
              <Route path="/dashboard/gerer-les-membres" component={Manage} />
              <Route path="/dashboard/ajouter" component={Add} />
              <Route path="/dashboard/gestion-clients" component={ManageClients} />
              
             

            </Grid>
          </Container>
        </Switch>
      </BrowserRouter>
    </div>
  )
}

export default App
