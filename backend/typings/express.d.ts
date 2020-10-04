import { MessageChannel } from "worker_threads";
import { CommentaireModel, MessageModel, UtilisateurModel } from "../../common";

declare global {
    module Express {
        interface Request {
            commentaire: CommentaireModel;
            utilisateur: UtilisateurModel;
            message: MessageModel;
        }
    }
}
