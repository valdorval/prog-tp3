import bodyParser from 'body-parser';
import { UtilisateurModel } from 'common';
import errorHandler from 'errorhandler';
import express from 'express';
import MySQLStore from 'express-mysql-session';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { configSession } from './config';
import { AuthDAO } from './dao/authdao';
import { allusersRouter } from './router/allusersrouter';
import { authRouter, loginHandler } from './router/authRouter';
import { commentaireRouter } from './router/commentairerouter';
import { messageRouter } from './router/messagerouter';

const authDAO = new AuthDAO;

const sessionStore = new (MySQLStore(session as any))({
    host: configSession.database.url,
    user: configSession.database.username,
    password: configSession.database.password,
    database: configSession.database.database
});

const app = express();

app.set('trust proxy', 'loopback');

app.use(session({
    name: 'archetype_session',
    secret: '9b74c9897bac770ffc029102a200c5de',
    store: sessionStore,
    resave: false,
    saveUninitialized: false
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(errorHandler({ log: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((_req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

passport.serializeUser((utilisateur: UtilisateurModel, done) => {
    done(null, utilisateur.utilisateurId);
});

passport.deserializeUser(async (utilisateurId: number, done) => {
    const utilisateur = await authDAO.getUtilisateurById(utilisateurId);
    delete utilisateur!.password;
    done(null, utilisateur ? UtilisateurModel.fromJSON(utilisateur) : undefined);
});

passport.use(new Strategy(loginHandler));

app.use('/commentaire', commentaireRouter);
app.use('/utilisateur', allusersRouter);
app.use('/message', messageRouter);
app.use('/auth', authRouter);

export { app };
