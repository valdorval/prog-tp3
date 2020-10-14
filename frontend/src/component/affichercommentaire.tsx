import { Api } from 'api';
import { UserContext } from 'context/usercontext';
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
     public static contextType = UserContext;
     public context: UserContext;

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
          const { user } = this.context;

          if (!messages || !utilisateurs || user === undefined) { return 'Chargement...'; }
          return <>
               {messages!.map(message => {
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
                                        <div className='container-button'>
                                             <div className='retablir'>
                                                  restorer<img src='/img/hide.png' alt='retablir' onClick={() => this.restoreCommentaire(message)} />
                                             </div>

                                             <div className='delete'>
                                                  <img src='/img/delete.png' alt='poubelle' onClick={() => this.deleteCommentaire(message)} />
                                             </div>
                                             <div className='hide'>
                                                  <img src='/img/hide.png' alt='caché' onClick={() => this.retirerCommentaire(message)} />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                              :
                              <div className='content'>
                                   <div className='content-texte'>
                                        <div className={'texte'}>
                                             <p>Ce commentaire est caché des autres utilisateurs</p>
                                             <Link to={`/avis/${message.commentaireId}`}><h3 className={message.hide === 1 ? 'hide-comment' : ''}>Auteur: {utilisateur?.name || message.name ? message.name || utilisateur?.name : 'Anonyme'} </h3></Link>
                                             <p className={message.hide === 1 ? 'hide-comment' : ''}>Date: {message.date.toLocaleDateString('fr-Ca', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                             <p className={message.hide === 1 ? 'hide-comment' : ''}>Commentaire: {message.message}</p>
                                        </div>
                                        <div className='container-button'>
                                             <div className='retablir'>
                                                  <img src='/img/hide.png' alt='retablir' onClick={() => this.restoreCommentaire(message)} />x
                                             </div>

                                             <div className='delete'>
                                                  <img src='/img/delete.png' alt='poubelle' onClick={() => this.deleteCommentaire(message)} />
                                             </div>

                                             <div className='hide'>
                                                  <img src='/img/hide.png' alt='caché' onClick={() => this.retirerCommentaire(message)} />
                                             </div>
                                        </div>
                                   </div>
                              </div>
                         }
                    </>;
               })}
               <NouveauCommentaire addCommentaire={(message) => {
                    this.state.messages!.push(message);
                    this.setState({ messages: this.state.messages });
               }} />
          </>;
     }

     private deleteCommentaire = async (commentaireToDelete: CommentaireModel) => {
          await this.api.delete(`/commentaire`, commentaireToDelete.commentaireId);
          this.setState({ messages: this.state.messages!.filter(message => message !== commentaireToDelete) });
     };

     private retirerCommentaire = async (commentaireToHide: CommentaireModel) => {
          const hide = { hide: 1 };
          await this.api.putGetJson(`/commentaire`, commentaireToHide.commentaireId, hide);
          // this.setState({ hide: 1 });
          this.setState({ messages: this.state.messages!.filter(message => message !== commentaireToHide) });
     };

     private restoreCommentaire = async (commentaireToRestore: CommentaireModel) => {
          const hide = { hide: 0 };
          await this.api.putGetJson(`/commentaire`, commentaireToRestore.commentaireId, hide);
          // this.setState({ hide: 0 });
          this.setState({ messages: this.state.messages!.filter(message => message !== commentaireToRestore) });
     };
}
