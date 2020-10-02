import { Api } from 'api';
import React from 'react';
import { Link } from 'react-router-dom';
import { CommentaireModel, UtilisateurModel } from '../../../common';
import { NouveauCommentaire } from './nouveaucommentaire';

interface Props { }
interface State {
     messages?: CommentaireModel[];
     utilisateurs?: UtilisateurModel[];
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
                    return <div key={message.commentaireId} className='content'>
                         <div className='content-texte'>
                              <div className={message.show ? 'display-none' : 'texte'}>
                                   <Link to='/avis/commentaire'><h3>Auteur: {utilisateur?.name ? utilisateur.name : 'Anonyme'}</h3></Link>
                                   <p>Date: {message.date.toLocaleDateString('fr-Ca', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                                   <p>Commentaire: {message.message}</p>
                              </div>
                              <div className='delete'>
                                   <div className='hide'>
                                        <img src={message.show ? '/img/show.png' : '/img/hide.png'} alt='poubelle' onClick={() => this.cacherCommentaire(message)} />
                                   </div>
                                   <img src='/img/delete.png' alt='poubelle' onClick={() => this.deleteCommentaire(message)} className={message.show ? 'display-none' : ''} />
                              </div>
                         </div>
                    </div>
               })}
               <NouveauCommentaire />
          </>;

     }

     private deleteCommentaire = async (commentaireToDelete: CommentaireModel) => {
          await this.api.delete(`/commentaire/`, commentaireToDelete.commentaireId);
          this.setState({ messages: this.state.messages!.filter(message => message !== commentaireToDelete) });
     }

     private cacherCommentaire = (commentaireToHide: CommentaireModel) => {
          commentaireToHide.show = !commentaireToHide.show;
          this.setState({ messages: this.state.messages });
     }

}
