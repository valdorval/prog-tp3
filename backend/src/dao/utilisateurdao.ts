import { UtilisateurModel } from '../../../common';
import { DBProvider } from '../dbprovider';

export class UtilisateurDAO {
    private knex = DBProvider.getKnexConnection();

    public async createUtilisateur(utilisateur: UtilisateurModel) {
        const { name, courriel } = utilisateur;
        const [utilisateurId] = await this.knex('utilisateur').insert({
            name, courriel
        });
        return utilisateurId;
    }

    // On veut l'utilisateur où le commentaireId
    // pour obtenir l'utilisateur du commentaire
    public async getUtilisateur(utilisateurId: number | string, commentaireId: number) {
        const utilisateur = await this.knex('utilisateur').first('utilisateurId', 'name').where({ commentaireId, utilisateurId });
        if (!utilisateur) { return null; }
        return UtilisateurModel.fromJSON(utilisateur);
    }

    // public async updateUtilisateur(utilisateur: UtilisateurModel) {
    //     const { utilisateurId, name, courriel } = utilisateur;
    //     await this.knex('utilisateur').update({ name, courriel }).where({ utilisateurId });
    // }

    // public async deleteUtilisateur(utilisateurId: number) {
    //     await this.knex('utilisateur').delete().where({ utilisateurId });
    // }


    // Obtenir l'identifiant de l'utilisateur du commentaire
    public async getUtilisateurs(commentaireId: number) {
        const utilisateurs = await this.knex('utilisateur').select('utilisateurId', 'name').where({ commentaireId });
        return utilisateurs.map(UtilisateurModel.fromJSON);
    }
}
