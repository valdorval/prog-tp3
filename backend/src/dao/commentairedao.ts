
import { CommentaireModel } from 'common';
import { DBProvider } from '../dbprovider';

export class CommentaireDAO {
    private knex = DBProvider.getKnexConnection();

    // Crée un commentaire
    public async createCommentaire(commentaire: CommentaireModel) {
        const { message, date, utilisateurId } = commentaire;
        const [commentaireId] = await this.knex('commentaire').insert({
            message, date, utilisateurId
        });
        return commentaireId;
    }

    // Obtenir le commentaire selon son identifiant
    public async getCommentaire(commentaireId: number | string) {
        const commentaire = await this.knex('commentaire').first('*').where({ commentaireId });
        if (!commentaire) { return null; }
        return CommentaireModel.fromJSON(commentaire);
    }

    // Obtenir tout les commentaires
    public async getCommentaires() {
        const commentaires = await this.knex('commentaire').select('*');
        return commentaires.map(CommentaireModel.fromJSON);
    }

    // Modifie un commentaire
    public async updateCommentaire(commentaire: CommentaireModel) {
        const { commentaireId, message, date } = commentaire;
        await this.knex('commentaire').update({ message, date }).where({ commentaireId });
    }

    // Supprime un commentaire
    public async deleteCommentaire(commentaireId: number) {
        await this.knex('commentaire').delete().where({ commentaireId });
    }

}
