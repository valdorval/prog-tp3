import { Role } from './role';

export enum Permission {
    createCommentaire = 'createCommentaire',
    deleteCommentaire = 'deleteCommentaire',
    cacherCommentaire = 'cacherCommentaire',
    modifierMessage = 'modifierMessage',
    manageUsers = 'manageUsers'
}

export const rolePermissions = {
    [Role.admin]: [
        Permission.deleteCommentaire,
        Permission.cacherCommentaire,
        Permission.manageUsers
    ],
    [Role.receptionist]: [
        Permission.modifierMessage
    ]

};
