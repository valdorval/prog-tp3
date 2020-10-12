import { Router } from 'express';
import { UtilisateurDAO } from '../dao/utilisateurdao';
import { wrap } from '../util';

const utilisateurRouter = Router();
const utilisateurDAO = new UtilisateurDAO;

utilisateurRouter.use('/:utilisateurId', wrap(async (req, res, next) => {
    const utilisateur = await utilisateurDAO.getUtilisateur(req.params.utilisateurId, req.commentaire.commentaireId);
    if (utilisateur === null) { return res.sendStatus(404); }
    req.utilisateur = utilisateur;

    return next();
}));

utilisateurRouter.get('/', wrap(async (req, res) => {
    const utilisateurs = await utilisateurDAO.getUtilisateurs(req.commentaire.commentaireId);
    return res.send(utilisateurs);
}));

utilisateurRouter.get('/', wrap(async (req, res) => {
    const utilisateurs = await utilisateurDAO.getUtilisateurs(req.commentaire.commentaireId);
    return res.send(utilisateurs);
}));

export { utilisateurRouter };
