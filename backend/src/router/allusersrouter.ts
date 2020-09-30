import { UtilisateurModel } from '../../../common';
import { Router } from 'express';
import { AllusersDAO } from '../dao/allusersdao';
import { wrap } from '../util';

const allusersRouter = Router();
const allusersDAO = new AllusersDAO;

allusersRouter.use('/:utilisateurId', wrap(async (req, res, next) => {
    const utilisateur = await allusersDAO.getUtilisateur(req.params.utilisateurId);
    if (utilisateur === null) { return res.sendStatus(404); }
    req.utilisateur = utilisateur;

    return next();
}));

// Affiche tout les utilisateurs
allusersRouter.get('/', wrap(async (_req, res) => {
    const utilisateurs = await allusersDAO.getUtilisateurs();
    return res.send(utilisateurs);
}));

// Affiche l'utilisateur selon son identifiant
allusersRouter.get('/:utilisateur', wrap(async (req, res) => {
    const utilisateur = await allusersDAO.getUtilisateur(req.utilisateur.utilisateurId);
    return res.send(utilisateur);
}));

// Crée un nouvel utilisateur
allusersRouter.post('/', wrap(async (req, res) => {
    const utilisateur = UtilisateurModel.fromJSON(req.body);
    const utilisateurId = await allusersDAO.createUtilisateur(utilisateur);
    return res.send(await allusersDAO.getUtilisateur(utilisateurId));
}));

// Modifie un utilisateur
allusersRouter.put('/:utilisateurId', wrap(async (req, res) => {
    const updated = UtilisateurModel.fromJSON(req.body);
    updated.utilisateurId = req.utilisateur.utilisateurId;
    await allusersDAO.updateUtilisateur(updated);
    return res.send(await allusersDAO.getUtilisateur(req.utilisateur.utilisateurId));
}));

// Supprime un utilisateur
allusersRouter.delete('/:utilisateurId', wrap(async (req, res) => {
    await allusersDAO.deleteUtilisateur(req.utilisateur.utilisateurId);
    return res.sendStatus(204);
}));

export { allusersRouter };
