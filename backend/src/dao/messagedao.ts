import { MessageModel } from 'common';
import { DBProvider } from '../dbprovider';

export class MessageDAO {
    private knex = DBProvider.getKnexConnection();

    // Obtenir tout les commentaires
    public async getMessages() {
        const messages = await this.knex('message_accueil').select('*');
        return messages.map(MessageModel.fromJSON);
    }

    // Obtenir le commentaire selon son identifiant
    public async getMessage(messageId: number | string) {
        const message = await this.knex('message_accueil').first('*').where({ messageId });
        if (!message) { return null; }
        return MessageModel.fromJSON(message);
    }

    // Modifie un commentaire
    public async updateMessage(message: MessageModel) {
        const { messageId, presentation } = message;
        await this.knex('message_accueil').update({ presentation }).where({ messageId });
    }

}
