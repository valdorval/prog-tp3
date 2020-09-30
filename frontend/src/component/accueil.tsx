import React from 'react';
import { Link } from 'react-router-dom';

interface Props { }
interface State { }

export class Accueil extends React.Component<Props, State> {

     public render() {
          return <section className='accueil'>
               <h1>Page d'accueil</h1>
               <div className='container'>
                    <div className='center'><img src='img/background.jpg' alt='background animal crossing' /></div>
                    <h2>Bar Temptation</h2>
                    <p>Blablabla</p>
                    <Link to='/avis'><div className='center'><button className='btn'>Voir notre offre</button></div></Link>
               </div>

          </section >;
     }


}
