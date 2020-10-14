import { Role, UtilisateurModel } from 'common';
import { DBProvider } from '../dbprovider';

export class AuthDAO {
    private knex = DBProvider.getKnexConnection();

    public async getUtilisateur(username: string) {
        const utilisateur: UtilisateurModel | undefined = await this.knex('utilisateur').first('utilisateurId', 'username', 'password').where({ username });
        if (!utilisateur) { return utilisateur; }
        await this.hydrate(utilisateur);
        return utilisateur;
    }

    public async getUtilisateurById(utilisateurId: number) {
        const utilisateur: UtilisateurModel | undefined = await this.knex('utilisateur').first('utilisateurId', 'username', 'password').where({ utilisateurId });
        if (!utilisateur) { return utilisateur; }
        await this.hydrate(utilisateur);
        return utilisateur;
    }

    public async createUtilisateur(user: UtilisateurModel) {
        const { username, password, name, courriel } = user;
        try {
            const createUtilisateurId: number = await this.knex('utilisateur').insert({ username, password, name, courriel });
            return createUtilisateurId;
        } catch (e) {
            if (e.code !== 'ER_DUP_ENTRY') {
                console.log('Error trying to create duplicate user.', e);
            }
            return null;
        }
    }

    private async hydrate(utilisateur: UtilisateurModel) {
        const utilisateurId = utilisateur.utilisateurId;
        const roles: Role[] = await this.knex('role').pluck('role').where({ utilisateurId });
        utilisateur.roles = roles;
        return utilisateur;
    }
}
