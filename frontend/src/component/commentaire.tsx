import React from 'react';
import { Link } from 'react-router-dom';

interface Props { }
interface State {
}

export class Commentaire extends React.Component<Props, State> {

     constructor(props: Props) {
          super(props);

          this.state = {};
     }

     public async componentDidMount() {
     }

     public render() {

          return <>
               <h1>Commentaire unique</h1>

               <Link to='/avis'><div className='center'><button className='btn'>Retour à la page des avis</button></div></Link>
          </>;
     }

}
