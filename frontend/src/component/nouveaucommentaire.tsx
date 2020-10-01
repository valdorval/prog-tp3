import { Api } from 'api';
import React from 'react';
import { CommentaireModel, UtilisateurModel } from '../../../common';

interface Props { }
interface State {
     commentaire?: CommentaireModel[];
     utilisateur?: UtilisateurModel;
     message: string;
     name?: string;
     courriel?: string;
     utilisateurId?: number;
     messageId?: number;
}


export class NouveauCommentaire extends React.Component<Props, State> {
     private api = new Api;

     constructor(props: Props) {
          super(props);
          this.state = { message: '' };
     }

     public render() {

          return <>
               <form onSubmit={this.newCommentaire} className='center'>
                    <div><input type='text' placeholder='Votre nom' value={this.state.name ?? ''} onChange={e => this.setState({ name: e.target.value })} /></div>
                    <div><input type='email' placeholder='Votre adresse courriel' value={this.state.courriel ?? ''} onChange={e => this.setState({ courriel: e.target.value })} /></div>
                    <div><textarea maxLength={500} placeholder='Votre commentaire' required={true} value={this.state.message ?? ''} onChange={e => this.setState({ message: e.target.value })} /></div>
                    <button>Nouveau commentaire</button>
               </form>
          </>;
     }

     private newCommentaire = async (e: React.FormEvent) => {
          e.preventDefault();
          let userId = 6;
          const commentaire = { message: this.state.message, date: Date.now(), utilisateurId: userId };
          const createCommentaire = await this.api.postGetJson('/commentaire', commentaire);
          const messageId = (await this.api.getJson('/commentaire') as any[]).map(CommentaireModel.fromJSON);
          const auteur = { name: this.state.name, courriel: this.state.courriel, utilisateurId: ++userId, messageId: messageId.map(msg => msg.commentaireId) }
          const createAuteur = await this.api.postGetJson('/utilisateur', auteur);
          this.state.commentaire!.push(createCommentaire);
          this.state.commentaire!.push(createAuteur);
          this.setState({ commentaire: this.state.commentaire, name: '', courriel: '', message: '' })
     }

}
