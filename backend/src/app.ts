import bodyParser from 'body-parser';
import errorHandler from 'errorhandler';
import express from 'express';
import { allusersRouter } from './router/allusersrouter';
import { commentaireRouter } from './router/commentairerouter';
const app = express();

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

export { app };
