import { Api } from 'api';
import React from 'react';
import { CommentaireModel } from '../../../common/dist';

interface Props { addCommentaire(commentaireModel: CommentaireModel): void; }
interface State {
     message: string;
     name?: string;
}

export class NouveauCommentaire extends React.Component<Props, State> {
     private api = new Api;

     constructor(props: Props) {
          super(props);
          this.state = { message: '' };
     }

     public render() {
          return <>
               <h2 style={{ textAlign: 'center' }}>Dites-nous ce que vous en pensez</h2>
               <form onSubmit={this.newCommentaire} className='center'>
                    <div><input type='text' placeholder='Votre nom' value={this.state.name ?? ''} onChange={e => this.setState({ name: e.target.value })} /></div>
                    <div><textarea maxLength={500} placeholder='Votre commentaire' required={true} value={this.state.message ?? ''} onChange={e => this.setState({ message: e.target.value })} /></div>
                    <button>Nouveau commentaire</button>
               </form>
          </>;
     }

     private newCommentaire = async (e: React.FormEvent) => {
          e.preventDefault();
          const date = new Date();
          date.toLocaleString();
          const commentaire = { name: this.state?.name, message: this.state.message, date: date };
          const createCommentaire = CommentaireModel.fromJSON(await this.api.postGetJson('/commentaire', commentaire));
          this.props.addCommentaire(createCommentaire);
          this.setState({ name: '', message: '' });
     };
}
