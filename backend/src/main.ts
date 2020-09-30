import 'source-map-support/register';
import { app } from './app';
import { config } from './config';

start().catch(error => console.error(error));

async function start() {
    app.listen(config.listeningPort, config.listeningDomain, () => {
        console.log('Listening on port ' + config.listeningPort + '.');
        console.log('App is started.');
    });
}
