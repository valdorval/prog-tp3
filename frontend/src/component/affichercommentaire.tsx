import { Api } from 'api';
import React from 'react';
import { Link } from 'react-router-dom';
import { CommentaireModel, UtilisateurModel } from '../../../common';
import { NouveauCommentaire } from './nouveaucommentaire';

interface Props { }
interface State {
     messages?: CommentaireModel[];
     utilisateurs?: UtilisateurModel[];
     hide?: number;
}

export class AfficherCommentaire extends React.Component<Props, State> {

     private api = new Api;

     constructor(props: Props) {
          super(props);
          this.state = {};
     }

     public async componentDidMount() {
          const messages = (await this.api.getJson('/commentaire') as any[]).map(CommentaireModel.fromJSON);
          const utilisateurs = (await this.api.getJson('/utilisateur') as any[]).map(UtilisateurModel.fromJSON);
          this.setState({ messages, utilisateurs });
     }

     // public async componentDidUpdate(prevProps: any, prevState: any) {
     //      if (prevState.messages !== this.state.messages) {
     //           console.log('pokemons state has changed.');
     //      }
     // }

     public render() {
          const { messages, utilisateurs } = this.state;
          if (!messages || !utilisateurs) { return 'Chargement...'; }

          return <>
               {this.state.messages!.map(message => {
                    const utilisateur = utilisateurs.find(u => message.utilisateurId === u.utilisateurId);
                    return <>
                         {message.hide === 0 ?
                              <div key={message.commentaireId} className='content'>
                                   <div className='content-texte'>
                                        <div className={'texte'}>
                                             <Link to={`/avis/${message.commentaireId}`}><h3>Auteur: {utilisateur?.name || message.name ? message.name || utilisateur?.name : 'Anonyme'} </h3></Link>
                                             <p>Date: {message.date.toLocaleDateString('fr-Ca', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                             <p>Commentaire: {message.message}</p>
                                        </div>
                                        <div className='delete'>
                                             <img src='/img/delete.png' alt='poubelle' onClick={() => this.deleteCommentaire(message)} />
                                        </div>
                                        <div className='hide'>
                                             <img src='/img/hide.png' alt='caché' onClick={() => this.retirerCommentaire(message)} />
                                        </div>
                                   </div>
                              </div>
                              :
                              <div className='content'>
                                   <div className='content-texte flex'>
                                        <div className={'texte'} />

                                        <div className='delete'>
                                             <img src='/img/delete.png' alt='poubelle' onClick={() => this.deleteCommentaire(message)} />
                                        </div>

                                        <div className='hide'>
                                             <img src='/img/hide.png' alt='caché' onClick={() => this.retirerCommentaire(message)} />
                                        </div>
                                   </div>
                              </div>
                         }
                    </>;
               })}
               <NouveauCommentaire addCommentaire={(commentaire: CommentaireModel) => {
                    messages.push(commentaire);
                    this.setState({ messages });
               }} />
          </>;
     }

     private deleteCommentaire = async (commentaireToDelete: CommentaireModel) => {
          await this.api.delete(`/commentaire/`, commentaireToDelete.commentaireId);
          this.setState({ messages: this.state.messages!.filter(message => message !== commentaireToDelete) });
     };

     private retirerCommentaire = async (commentaire: CommentaireModel) => {
          const hide = { hide: 1 };
          await this.api.putGetJson(`/commentaire`, commentaire.commentaireId, hide);
          this.setState({ messages: this.state.messages!.filter(message => message !== commentaire) });
          this.setState({ hide: 1 });
     };

}
