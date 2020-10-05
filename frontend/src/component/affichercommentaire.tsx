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

     public render() {
          const { messages, utilisateurs } = this.state;
          if (!messages || !utilisateurs) { return 'Chargement...'; }

          return <>
               {messages.map(message => {
                    const utilisateur = utilisateurs.find(u => message.utilisateurId === u.utilisateurId);
                    return <>
                         {message.hide === 0 ?
                              <div key={message.commentaireId} className='content'>
                                   <div className='content-texte'>
                                        <div className={'texte'}>
                                             <Link to={`/avis/${message.commentaireId}`}><h3>Auteur: {utilisateur?.name ? utilisateur.name : 'Anonyme'}</h3></Link>
                                             <p>Date: {message.date.toLocaleDateString('fr-Ca', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                             <p>Commentaire: {message.message}</p>
                                        </div>
                                        <div className='delete'>
                                             <img src='/img/delete.png' alt='poubelle' onClick={() => this.deleteCommentaire(message)} />
                                        </div>
                                        <form onSubmit={this.retirerCommentaire}>
                                             <input type='submit' value='Retirer le message' />
                                        </form>
                                   </div>
                              </div>
                              : ''}
                    </>
               })}
               <NouveauCommentaire addCommentaire={(message, utilisateur) => {
                    this.state.messages!.push(message);
                    this.state.utilisateurs!.push(utilisateur);
                    this.setState({ messages: this.state.messages, utilisateurs: this.state.utilisateurs });
               }} />
          </>;
     }

     private deleteCommentaire = async (commentaireToDelete: CommentaireModel) => {
          await this.api.delete(`/commentaire/`, commentaireToDelete.commentaireId);
          this.setState({ messages: this.state.messages!.filter(message => message !== commentaireToDelete) });
     }

     private retirerCommentaire = async (e: React.FormEvent) => {
          e.preventDefault();
          const hide = { hide: 1 };
          await this.api.putGetJson(`/commentaire/`, message.commentaireId, hide);
          this.setState({ hide: 1 });
     }

}
