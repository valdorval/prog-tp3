import React from 'react';
import { Link } from 'react-router-dom';
import { MessageModel } from '../../../common/dist';

interface Props { }
interface State { message?: MessageModel[] }

export class Accueil extends React.Component<Props, State> {

     constructor(props: Props) {
          super(props);
          this.state = { message: [] };
     }

     public render() {
          return <section className='accueil'>
               <h1>Bar Temptation</h1>
               <div className='container'>
                    <div className='center'><img src='img/chat.png' alt='background animal crossing' /></div>
                    <h2>Le tout nouveau concept pour le chat heureux!</h2>
                    <p>Bar Temptation est une entreprise qui se spécialise dans la restauration pour chat depuis déjà plusieurs années. Au fil du temps, l’entreprise Bar Temptation a perfectionné ses petits plats pour minou et est devenu l’un des restaurants le plus connu pour ses tartares de haute gastronomie. Ils offrent également une grande sélection de cocktails au lait et des endroits douillet où minet peut se reposer avec une ambiance tamisé.</p>
                    <p><strong>Message du jour: </strong></p>
                    <h4>{this.state.message}</h4>
                    <form className='center'>
                         <div><textarea placeholder='Modifier le message' required={true} /></div>

                    </form>
                    <Link to='/avis'><div className='center'><button className='btn'>Voir les avis</button></div></Link>
               </div>

          </section >;
     }

}
