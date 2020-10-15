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

    //create normal user
    public async getUtilisateurs() {
        const users: UtilisateurModel[] = await this.knex('utilisateur').select('utilisateurId', 'username');
        await Promise.all(users.map(this.hydrate));
        return users;
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

    public async createManageUser(user: UtilisateurModel) {
        const { username, password, roles } = user;
        try {
            const utilisateurId: number = await this.knex('utilisateur').insert({ username, password });
            if (roles.length > 0) {
                await this.knex('role').insert(roles.map(role => { return { utilisateurId, role }; }));
            }
            return utilisateurId;
        } catch (e) {
            if (e.code !== 'ER_DUP_ENTRY') {
                console.log('Error trying to create duplicate user.', e);
            }
            return null;
        }
    }

    public async updateUtilisateur(utilisateur: UtilisateurModel) {
        const { username, password, utilisateurId, roles } = utilisateur;
        if (password) {
            await this.knex('utilisateur').update({ username, password }).where({ utilisateurId });
        } else {
            await this.knex('utilisateur').update({ username }).where({ utilisateurId });
        }
        await this.knex('role').delete().where({ utilisateurId });
        if (roles.length) {
            await this.knex('role').insert(roles.map(role => { return { role, utilisateurId }; }));
        }
    }

    private hydrate = async (utilisateur: UtilisateurModel) => {
        const utilisateurId = utilisateur.utilisateurId;
        const roles: Role[] = await this.knex('role').pluck('role').where({ utilisateurId });
        utilisateur.roles = roles;
        return utilisateur;
    };
}
