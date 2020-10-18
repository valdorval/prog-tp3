import bcrypt from 'bcrypt';
import { Permission, UtilisateurModel } from 'common';
import { Router } from 'express';
import passport from 'passport';
import { AuthDAO } from '../dao/authdao';
import { hasPermission, wrap } from '../util';

const authRouter = Router();
const authDAO = new AuthDAO;

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

//-----------------------------------------------------------------
// ------------ manage user permissions and account ---------------
//-----------------------------------------------------------------
authRouter.get('/manage', hasPermission(Permission.manageUsers), wrap(async (req, res) => {
    if (!req.user) { return res.sendStatus(403); }
    const users = await authDAO.getUtilisateurs();
    return res.send(users);
}));

authRouter.get('/manage/current', hasPermission(Permission.manageUsers), wrap(async (req, res) => {
    if (!req.user) { return res.sendStatus(404); }
    return res.send(req.user);
}));

authRouter.post('/manage', hasPermission(Permission.manageUsers), wrap(async (req, res) => {
    const user = req.body;
    user.password = await bcrypt.hash(user.password, 12);
    const createdUserId = await authDAO.createManageUser(user);
    if (createdUserId === null) { return res.sendStatus(400); }
    const createdUser = (await authDAO.getUtilisateurById(createdUserId))!;
    delete createdUser.password;
    return res.send(createdUser);
}));

authRouter.put('/manage/:utilisateurId', hasPermission(Permission.manageUsers), wrap(async (req, res) => {
    const user: UtilisateurModel = req.body;
    user.utilisateurId = parseInt(req.params.utilisateurId);
    if (user.password) {
        user.password = await bcrypt.hash(user.password, 12);
    }

    await authDAO.updateUtilisateur(user);

    const updateUser = (await authDAO.getUtilisateurById(user.utilisateurId))!;
    delete updateUser.password;
    return res.send(updateUser);
}));

//-----------------------------------------------------------------

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
