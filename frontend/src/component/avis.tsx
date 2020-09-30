import React from 'react';
import { Link } from 'react-router-dom';
import { AfficherCommentaire } from './affichercommentaire';

interface Props { }
interface State {
}

export class Avis extends React.Component<Props, State> {

     constructor(props: Props) {
          super(props);

          this.state = {};
     }

     public render() {

          return <>
               <h1>Avis clients</h1>
               <AfficherCommentaire />
               <Link to='/avis/commentaire'><div className='center'><button className='btn'>Voir le commentaire</button></div></Link>
          </>;
     }

}
