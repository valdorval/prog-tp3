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
}

export class NouveauCommentaire extends React.Component<Props, State> {

     private api = new Api;

     constructor(props: Props) {
          super(props);
          this.state = { message: '' };
     }

     // public async componentDidMount() {
     //      const messages = (await this.api.getJson('/commentaire') as any[]).map(CommentaireModel.fromJSON);
     //      const utilisateurs = (await this.api.getJson('/utilisateur') as any[]).map(UtilisateurModel.fromJSON);
     //      this.setState({ messages, utilisateurs });
     // }

     public render() {
          // const { messages, utilisateurs } = this.state;
          // if (!messages || !utilisateurs) { return 'Chargement...'; }

          return <>
               <form onSubmit={this.newCommentaire}>
                    <div><input type='text' placeholder='Votre nom' value={this.state.name ?? ''} onChange={e => this.setState({ name: e.target.value })} /></div>
                    <div><input type='email' placeholder='Votre adresse courriel' value={this.state.courriel ?? ''} onChange={e => this.setState({ courriel: e.target.value })} /></div>
                    <div><textarea placeholder='Votre commentaire' required={true} value={this.state.message ?? ''} onChange={e => this.setState({ message: e.target.value })} /></div>
                    <button>Nouveau commentaire</button>
               </form>
          </>;
     }

     private newCommentaire = async (e: React.FormEvent) => {
          e.preventDefault();
          const commentaire = { message: this.state.message, name: this.state.name, courriel: this.state.courriel, date: Date.now() };
          const createCommentaire = await this.api.postGetJson('/commentaire', commentaire);
          this.state.commentaire!.push(createCommentaire);
          this.setState({ commentaire: this.state.commentaire, name: '', courriel: '' })
     }



}
