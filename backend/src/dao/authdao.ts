import { UtilisateurModel } from 'common';
import { DBProvider } from '../dbprovider';

export class AuthDAO {
    private knex = DBProvider.getKnexConnection();

    public async getUtilisateur(username: string) {
        const utilisateur: UtilisateurModel | undefined = await this.knex('utilisateur').first('utilisateurId', 'username', 'password').where({ username });
        return utilisateur;
    }

    public async getUtilisateurById(utilisateurId: number) {
        const utilisateur: UtilisateurModel | undefined = await this.knex('utilisateur').first('utilisateurId', 'username', 'password').where({ utilisateurId });
        return utilisateur;
    }

}
