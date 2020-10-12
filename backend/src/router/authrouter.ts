import bcrypt from 'bcrypt';
import { UtilisateurModel } from 'common';
import { Router } from 'express';
import passport from 'passport';
import { DBProvider } from '../dbprovider';

const authRouter = Router();
const knex = DBProvider.getKnexConnection();

authRouter.get('/login', passport.authenticate('local', { session: true }), (req, res) => {
    if (req.user) {
        res.send();
    } else {
        res.sendStatus(401);
    }
});

const loginHandler = async (username: string, password: string, done: (error: any, user?: any) => void) => {
    const user = await knex('user').first('utilisateurId', 'username', 'password').where({ username });

    if (user === undefined) {
        return done(null, false);
    }
    if (await bcrypt.compare(password, user.password)) {
        delete user.password;
        return done(null, user as UtilisateurModel);
    }
    return done(null, false);
};

export { authRouter, loginHandler };
