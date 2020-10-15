import { Api } from 'api';
import { UserContext } from 'context/usercontext';
import React from 'react';
import { Link } from 'react-router-dom';
import { MessageModel, Permission } from '../../../common/dist';

interface Props { }
interface State { message?: MessageModel; }

export class Accueil extends React.Component<Props, State> {
     public static contextType = UserContext;
     public context: UserContext;
     private api = new Api;

     constructor(props: Props) {
          super(props);
          this.state = {};
     }

     public async componentDidMount() {
          const message = MessageModel.fromJSON(await this.api.getJson(`/message/1`));
          this.setState({ message });
     }

     public render() {
          const { message } = this.state;
          if (!message) { return 'Chargement...'; }

          const newMessage = this.state.message?.presentation;

          return <>
               <section className='accueil'>
                    <h1>Bar Temptation</h1>
                    <div className='container'>
                         <div className='center'><img src='img/chat.png' alt='background animal crossing' /></div>
                         <h2>Le tout nouveau concept pour le chat heureux!</h2>
                         <p>Bar Temptation est une entreprise qui se spécialise dans la restauration pour chat depuis déjà plusieurs années. Au fil du temps, l’entreprise Bar Temptation a perfectionné ses petits plats pour minou et est devenu l’un des restaurants le plus connu pour ses tartares de haute gastronomie. Ils offrent également une grande sélection de cocktails au lait et des endroits douillet où minet peut se reposer avec une ambiance tamisé.</p>
                         <p style={{ fontSize: '45px' }}><strong>Présentation </strong></p>

                         <h4>{this.state.message?.presentation}</h4>
                         {this.context.user?.hasPermission(Permission.modifierMessage) ?
                              <form className='center' onSubmit={this.editMessage}>
                                   <div><textarea placeholder='Modifier le message' required={true} value={newMessage ?? ''} onChange={e => {
                                        message.presentation = e.target.value;
                                        this.setState({ message });
                                   }} /></div>
                                   <input type='submit' value='envoyer' />
                              </form>
                              : ''
                         }

                         <Link to='/avis'><div className='center' style={{ marginTop: '50px' }}><button className='btn'>Voir les avis</button></div></Link>
                    </div>
               </section >
          </>;
     }

     private editMessage = async (e: React.FormEvent) => {
          e.preventDefault();
          const message = { presentation: this.state.message?.presentation };
          await this.api.putGetJson('/message', 1, message);
     };

}
