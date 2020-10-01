import React from 'react';
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
          </>;
     }

}
