import bcrypt from 'bcrypt';
import { UtilisateurModel } from 'common';
import { Router } from 'express';
import passport from 'passport';
import { AuthDAO } from '../dao/authdao';
import { wrap } from '../util';


const authRouter = Router();
const authDAO = new AuthDAO;

authRouter.get('/login', passport.authenticate('local', { session: true }), (req, res) => {
    if (req.utilisateur) {
        res.send();
    } else {
        res.sendStatus(401);
    }
});

authRouter.get('/logout', wrap(async (req, res) => {
    if (!req.session) { return res.send(); }
    req.session.destroy(err => {
        if (err != undefined) {
            console.error(`Error destroying session, ${err}`);
        }
    });
    return res.send();
}));

const loginHandler = async (username: string, password: string, done: (error: any, user?: any) => void) => {
    const utilisateur = await authDAO.getUtilisateur(username);

    if (utilisateur === undefined) {
        return done(null, false);
    }
    if (await bcrypt.compare(password, utilisateur!.password!)) {
        delete utilisateur?.password;
        return done(null, utilisateur as UtilisateurModel);
    }
    return done(null, false);
};

export { authRouter, loginHandler };
