import { Api } from 'api';
import React from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { CommentaireModel, UtilisateurModel } from '../../../common/dist';

interface Props extends RouteComponentProps<{ commentaireId: string; }> { }
interface State {
     commentaire?: CommentaireModel;
     utilisateur?: UtilisateurModel[];
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
          const utilisateur = (await this.api.getJson('/utilisateur') as any[]).map(UtilisateurModel.fromJSON);
          this.setState({ commentaire, utilisateur });
     }

     public render() {
          const { commentaire, utilisateur } = this.state;
          if (!commentaire || !utilisateur) { return 'Chargement...'; }
          const user = utilisateur.find(u => commentaire.utilisateurId === u.utilisateurId);

          return <>
               <div>
                    <p>Nom: {user?.name ? user.name : 'Anonyme'}</p>
                    <p>Date: {this.state.commentaire?.date.toLocaleDateString('fr-Ca', { year: 'numeric', month: 'long', day: 'numeric' })}</p>
                    <p>Commentaire: {this.state.commentaire?.message}</p>
               </div>
               <Link to='/avis'><div className='center'><button className='btn'>Retour à la page des avis</button></div></Link>
          </>;
     }

}
