import { UserContext } from 'contexte/usercontext';
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Accueil } from './accueil';
import { Avis } from './avis';
import { Commentaire } from './commentaire';
import { Login } from './login';
import { Logout } from './logout';




export class Router extends React.Component<{}> {
     public static contextType = UserContext;
     public context = UserContext;

     public render() {
          return < BrowserRouter>
               <ToastContainer />
               {this.context.user && <Logout />}
               <Switch>
                    <Route path='/avis/:commentaireId' exact={true} component={Commentaire} />
                    <Route path='/avis' exact={true}> <Avis /> </Route>
                    <Route path='/' exact={true}> <Accueil /> </Route>
                    <Route path='/login' exact={true}> <Login /> </Route>
               </Switch>

          </ BrowserRouter>;
     }
}
