import { Api } from 'api';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { CommentaireModel } from '../../../common/dist';

interface Props extends RouteComponentProps<{ commentaireId: string; }> { }
interface State {
     commentaire?: CommentaireModel;
}

export class Commentaire extends React.Component<Props, State> {
     private api = new Api;

     constructor(props: Props) {
          super(props);
          this.state = {};
     }

     public async componentDidMount() {
          const commentaireId = this.props.match.params.commentaireId;
          const commentaire = CommentaireModel.fromJSON(await this.api.getJson(`/commentaire/${commentaireId}`));
          this.setState({ commentaire });
     }

     public render() {
          const { commentaire } = this.state;
          if (!commentaire) { return 'Chargement...'; }

          return <>
               <div>
                    <p>Nom: {commentaire.name ? commentaire.name : 'Anonyme'}</p>
                    <p>Date: {this.state.commentaire?.date.toLocaleDateString('fr-Ca', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>Commentaire: {this.state.commentaire?.message}</p>
               </div>
               <Link to='/avis'><div className='center'><button className='btn'>Retour à la page des avis</button></div></Link>
          </>;
     }

}
