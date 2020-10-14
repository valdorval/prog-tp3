import { CommentaireModel, Permission } from 'common';
import { Router } from 'express';
import { CommentaireDAO } from '../dao/commentairedao';
import { hasPermission, wrap } from '../util';
import { utilisateurRouter } from './utilisateurrouter';

const commentaireRouter = Router();
const commentaireDAO = new CommentaireDAO;

commentaireRouter.use('/:commentaireId', wrap(async (req, res, next) => {
    const commentaire = await commentaireDAO.getCommentaire(req.params.commentaireId);
    if (commentaire === null) { return res.sendStatus(404); }
    req.commentaire = commentaire;

    return next();
}));

// Affiche tout les commentaires
commentaireRouter.get('/', wrap(async (_req, res) => {
    const commentaires = await commentaireDAO.getCommentaires();
    return res.send(commentaires);
}));

// Affiche un commentaire selon son id
commentaireRouter.get('/:commentaireId', wrap(async (req, res) => {
    return res.send(req.commentaire);
}));

// Crée un nouveau commentaire
commentaireRouter.post('/', wrap(async (req, res) => {
    const commentaire = CommentaireModel.fromJSON(req.body);
    const commentaireId = await commentaireDAO.createCommentaire(commentaire);
    return res.send(await commentaireDAO.getCommentaire(commentaireId));
}));

// Modifie un commentaire
commentaireRouter.put('/:commentaireId', hasPermission(Permission.cacherCommentaire), wrap(async (req, res) => {
    const updated = CommentaireModel.fromJSON(req.body);
    updated.commentaireId = req.commentaire.commentaireId;
    await commentaireDAO.updateCommentaire(updated);
    return res.send(await commentaireDAO.getCommentaire(req.commentaire.commentaireId));
}));

// Supprime un commentaire
commentaireRouter.delete('/:commentaireId', hasPermission(Permission.deleteCommentaire), wrap(async (req, res) => {
    await commentaireDAO.deleteCommentaire(req.commentaire.commentaireId);
    return res.sendStatus(204);
}));

commentaireRouter.use('/:commentaireId/utilisateur', utilisateurRouter);

export { commentaireRouter };
