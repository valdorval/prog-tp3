import { Role } from './role';

export enum Permission {
    createCommentaire = 'createCommentaire',
    deleteCommentaire = 'deleteCommentaire',
    cacherCommentaire = 'cacherCommentaire',
    modifierMessage = 'modifierMessage'
}

export const rolePermissions = {
    [Role.admin]: [
        Permission.deleteCommentaire,
        Permission.cacherCommentaire,
        Permission.modifierMessage,
        Permission.createCommentaire
    ],
    [Role.user]: [
        Permission.createCommentaire
    ]

};
