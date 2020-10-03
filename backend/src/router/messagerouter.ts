import { MessageModel } from 'common';
import { Router } from 'express';
import { MessageDAO } from '../dao/messagedao';
import { wrap } from '../util';

const messageRouter = Router();
const messageDAO = new MessageDAO;

messageRouter.use('/:messageId', wrap(async (req, res, next) => {
    const message = await messageDAO.getMessage(req.params.messageId);
    if (message === null) { return res.sendStatus(404); }
    req.message = message;

    return next();
}));

messageRouter.get('/', wrap(async (_req, res) => {
    const messages = await messageDAO.getMessages();
    return res.send(messages);
}));

messageRouter.get('/:messageId', wrap(async (req, res) => {
    const message = await messageDAO.getMessage(req.message.messageId);
    return res.send(message);
}));

// Modifie un commentaire
messageRouter.put('/:messageId', wrap(async (req, res) => {
    const updated = MessageModel.fromJSON(req.body);
    updated.messageId = req.message.messageId;
    await messageDAO.updateMessage(updated);
    return res.send(await messageDAO.getMessage(req.message.messageId));
}));

export { messageRouter };
