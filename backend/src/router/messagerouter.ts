import { MessageModel, Permission } from 'common';
import { Router } from 'express';
import { MessageDAO } from '../dao/messagedao';
import { wrap } from '../util';
import { hasPermission } from './commentairerouter';

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
messageRouter.put('/:messageId', hasPermission(Permission.modifierMessage), wrap(async (req, res) => {
    if (!req.user?.hasPermission(Permission.modifierMessage)) {
        return res.sendStatus(403);
    }
    const updated = MessageModel.fromJSON(req.body);
    updated.messageId = req.message.messageId;
    await messageDAO.updateMessage(updated);
    return res.send(await messageDAO.getMessage(req.message.messageId));
}));

export { messageRouter };
