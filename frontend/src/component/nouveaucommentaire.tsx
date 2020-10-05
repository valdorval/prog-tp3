import { Api } from 'api';
import React from 'react';

interface Props { }
interface State {
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
          const date = new Date();
          date.toLocaleString();
          const auteur = { name: this.state.name, courriel: this.state.courriel };
          const createAuteur = await this.api.postGetJson('/utilisateur', auteur);
          const commentaire = { message: this.state.message, date: date, utilisateurId: createAuteur.utilisateurId };
          await this.api.postGetJson('/commentaire', commentaire);
          this.setState({ name: '', courriel: '', message: '' });
     };
}
