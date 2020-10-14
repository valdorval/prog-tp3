import { UserContext } from 'context/usercontext';
import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Accueil } from './accueil';
import { Avis } from './avis';
import { Commentaire } from './commentaire';
import { LoginForm } from './loginform';
import { LogoutButton } from './logoutbutton';

export class Router extends React.Component<{}> {
     public static contextType = UserContext;
     public context: UserContext;
     public render() {
          return < BrowserRouter>
               {this.context.user && <LogoutButton />}
               <Route path='/avis/:commentaireId' exact={true} component={Commentaire} />
               <Route path='/avis' exact={true}> <Avis /> </Route>
               <Route path='/' exact={true}> <Accueil /> {this.context.user ? '' : <LoginForm />} </Route>
          </ BrowserRouter>;
     }
}
