import bcrypt from 'bcrypt';
import { Router } from 'express';
import passport from 'passport';
import { AuthDAO } from '../dao/authdao';
import { wrap } from '../util';

const authRouter = Router();
const authDAO = new AuthDAO;

// probs here
authRouter.post('/login', passport.authenticate('local', { session: true }), (req, res) => {
    if (req.user) {
        res.send(req.user);
    } else {
        res.sendStatus(401);
    }
});

authRouter.post('/logout', wrap(async (req, res) => {
    if (!req.session) { return res.send(); }
    req.session.destroy(err => {
        if (err !== undefined) {
            console.error(`Error destroying session, ${err}`);
        }
    });
    return res.send();
}));

authRouter.get('/user', wrap(async (req, res) => {
    if (!req.user) { return res.sendStatus(404); }
    return res.send(req.user);
}));

const loginHandler = async (username: string, password: string, done: (error: any, user?: any) => void) => {
    const utilisateur = await authDAO.getUtilisateur(username);

    if (utilisateur === undefined) {
        return done(null, false);
    }
    // hash manuel pour test
    // console.log(await bcrypt.hash('123456', 10));
    if (await bcrypt.compare(password, utilisateur.password!)) {
        delete utilisateur.password;
        return done(null, utilisateur);
    }
    return done(null, false);
};

export { authRouter, loginHandler };
