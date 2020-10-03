import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { Accueil } from './accueil';
import { Avis } from './avis';
import { Commentaire } from './commentaire';

export class Router extends React.Component<{}> {
     public render() {
          return < BrowserRouter>
               <Route path='/avis/:commentaireId' exact={true} component={Commentaire} />
               <Route path='/avis' exact={true}> <Avis /> </Route>
               <Route path='/' exact={true}> <Accueil /> </Route>

          </ BrowserRouter>;
     }
}
