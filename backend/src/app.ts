import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import MySQLStore from 'express-mysql-session';
import session from 'express-session';
import passport from 'passport';
import { Strategy } from 'passport-local';
import { config } from './config';
import { allusersRouter } from './router/allusersrouter';
import { loginHandler } from './router/authRouter';
import { authRouter } from './router/authrouter';
import { commentaireRouter } from './router/commentairerouter';
import { messageRouter } from './router/messagerouter';

const sessionStore = new (MySQLStore(session as any))({
    host: config.database.url,
    user: config.database.username,
    password: config.database.password,
    database: config.database.database + '_session'
});

const app = express();

app.set('trust proxy', 'loopback');

app.use(session({
    name: 'archetype_session',
    secret: 'allo',
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

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

passport.use(new Strategy(loginHandler));

app.use('/commentaire', commentaireRouter);
app.use('/utilisateur', allusersRouter);
app.use('/message', messageRouter);
app.use('/auth', authRouter);

export { app };
