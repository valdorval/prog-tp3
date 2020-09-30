export class UtilisateurModel {
    public utilisateurId: number;
    public name?: string;
    public courriel?: string;
    public is_admin: boolean;


    public static fromJSON(jsonUtilisateurModel: UtilisateurModel) {
        const utilisateurModel = new UtilisateurModel;
        Object.assign(utilisateurModel, jsonUtilisateurModel);
        return utilisateurModel;
    }
}
