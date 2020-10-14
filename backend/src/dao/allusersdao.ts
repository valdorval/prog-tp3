import { UtilisateurModel } from 'common';
import { DBProvider } from '../dbprovider';

export class AllusersDAO {
    private knex = DBProvider.getKnexConnection();

    // créer un nouvel utilisateur
    public async createUtilisateur(utilisateur: UtilisateurModel) {
        const { name, courriel } = utilisateur;
        const [utilisateurId] = await this.knex('utilisateur').insert({
            name, courriel
        });
        return utilisateurId;
    }

    // Obtenir l'utilisateur selon son identidiant
    public async getUtilisateur(utilisateurId: number | string) {
        const utilisateur = await this.knex('utilisateur').first('utilisateurId', 'name', 'courriel').where({ utilisateurId });
        if (!utilisateur) { return null; }
        return UtilisateurModel.fromJSON(utilisateur);
    }

    // Obtenir tout les utilisateurs
    public async getUtilisateurs() {
        const utilisateurs = await this.knex('utilisateur').select('*');
        return utilisateurs.map(UtilisateurModel.fromJSON);
    }

    // Modifie un utilisateur
    public async updateUtilisateur(utilisateur: UtilisateurModel) {
        const { utilisateurId, name, courriel } = utilisateur;
        await this.knex('utilisateur').update({ name, courriel }).where({ utilisateurId });
    }

    // Supprime un utilisateur
    public async deleteUtilisateur(utilisateurId: number) {
        await this.knex('utilisateur').delete().where({ utilisateurId });
    }
}
