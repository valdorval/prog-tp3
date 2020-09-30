import Knex from 'knex';
import { config } from './config';

export class DBProvider {
    private static knex: Knex;

    public static getKnexConnection() {
        if (this.knex === undefined) {
            this.createKnexConnection();
        }
        return this.knex;
    }

    private static createKnexConnection() {
        this.knex = Knex({
            client: 'mysql',
            connection: {
                host: config.database.url,
                port: config.database.port,
                user: config.database.username,
                password: config.database.password,
                database: config.database.database,
                typeCast: this.castForDatabase,
                options: { nestTables: true, rowMode: 'array' }
            } as Knex.MySqlConnectionConfig
        });
    }

    private static castForDatabase = (field: { type: string, length: number, string(): string; }, next: () => void) => {
        if (field.type === 'TINY' && field.length === 1) {
            const value = field.string();
            return value ? (value === '1') : null;
        }
        return next();
    };
}
