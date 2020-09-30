import { CommentaireModel, UtilisateurModel } from "../../common";

declare global {
    module Express {
        interface Request {
            commentaire: CommentaireModel;
            utilisateur: UtilisateurModel;
        }
    }
}
