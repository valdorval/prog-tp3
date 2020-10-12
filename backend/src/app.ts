import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import { config } from 'process';
import { allusersRouter } from './router/allusersrouter';
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


yarn workspace backend add;

app.set('trust proxy', 'loopback');

app.use(errorHandler({ log: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({ limit: '50mb' }));

app.use((_req, res, next) => {
    res.header('Cache-Control', 'private, no-cache, no-store, must-revalidate');
    res.header('Expires', '-1');
    res.header('Pragma', 'no-cache');
    next();
});

app.use('/commentaire', commentaireRouter);
app.use('/utilisateur', allusersRouter);
app.use('/message', messageRouter);
app.use('/auth', authRouter);

export { app };
