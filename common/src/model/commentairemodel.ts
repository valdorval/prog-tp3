export class CommentaireModel {
    public commentaireId: number;
    public name: string;
    public message: string;
    public date: Date;
    public utilisateurId?: number;
    public hide: number;

    public static fromJSON(jsonCommentaireModel: CommentaireModel) {
        const commentaireModel = new CommentaireModel;
        Object.assign(commentaireModel, jsonCommentaireModel);
        commentaireModel.date = new Date(commentaireModel.date);
        return commentaireModel;
    }
}
