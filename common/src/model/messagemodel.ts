export class MessageModel {
    public messageId: number;
    public presentation: string;

    public static fromJSON(jsonMessageModel: MessageModel) {
        const messageModel = new MessageModel;
        Object.assign(messageModel, jsonMessageModel);
        return messageModel;
    }
}
