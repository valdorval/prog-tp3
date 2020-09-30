import React from 'react';
import { CommentaireModel } from '../../../common';

interface Props { }
interface State {
     messages?: CommentaireModel[];
}

export class AfficherCommentaire extends React.Component<Props, State> {

     constructor(props: Props) {
          super(props);

          this.state = {};
     }

     public async componentDidMount() {
          const messages = (await (await fetch('/api/commentaire')).json() as any[]).map(CommentaireModel.fromJSON);
          this.setState({ messages });
     }

     public render() {
          // const { messages: CommentaireModel } = this.state;
          // if (!messages) { return 'Chargement...'; }

          return <>
               <h1>Avis clients</h1>
          </>;
     }

}
