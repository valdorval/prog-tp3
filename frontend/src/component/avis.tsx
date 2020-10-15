import React from 'react';
import { Link } from 'react-router-dom';
import { ShowCommentaire } from './showcommentaire';

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
               <div className='avis'>
                    <Link to='/'><div className='center'><button className='btn'>Retour page d'accueil</button></div></Link>
                    <h1 className='center'>Avis clients</h1>
                    <ShowCommentaire />
               </div>
          </>;
     }

}
