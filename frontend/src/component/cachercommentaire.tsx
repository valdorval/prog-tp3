import { Api } from 'api';
import React from 'react';
import { CommentaireModel } from '../../../common';

interface Props { commentaire: CommentaireModel; }
interface State { hide?: number; }

export class CacherCommentaire extends React.Component<Props, State> {

     private api = new Api;

     constructor(props: Props) {
          super(props);
          this.state = {};

     public render() {
          return <>
               <form onSubmit={this.retirerCommentaire}>
                    <input type='submit' value='Retirer le message' />
               </form>

          </>;
     }

     private retirerCommentaire = async (e: React.FormEvent) => {
          e.preventDefault();
          const hide = { hide: 1 };
          await this.api.putGetJson(`/commentaire/`, this.props.commentaire.commentaireId, hide);
          // this.setState({ messages: this.state.messages!.filter(message => message !== retirerCommentaire) });
     }


}
