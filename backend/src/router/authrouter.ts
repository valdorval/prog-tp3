import { bcrypt } from 'bcrypt';
import { Router } from 'express';
import { DBProvider } from '../dbprovider';
import { wrap } from '../util';

const authRouter = Router();
const knex = DBProvider.getKnexConnection();

authRouter.get('/login', passport.authenticate('local', {
    session: true
}), (req, res) => {
    if (req.user) {
        res.send();
    } else {
        res.sendStatus(401);
    }
});


const loginHandler = async (username: string, password: string, done: any) => {
    const user = await knex('utilisateur').first('utilisateurId', 'username', 'password').where({ username });

    if (user === undefined) {
        return done(null, false);
    }

    if (await bcrypt.compare(password, user.password)) {

    }

};




authRouter.get('/login', wrap(async (req, res) => {
    const username = req.query.username;
    const password = req.query.password;
    const hash = await bcrypt.hash(password, saltRounds);
    console.log(`${username}, ${password}`);
    return res.send();
}));


export { authRouter };
