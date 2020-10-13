export class UserModel {
     public userId: number;
     public username: string;
     public password?: string;

     constructor() {
     }

     public static fromJSON(jsonUserModel: UserModel) {
          const userModel = new UserModel;
          Object.assign(userModel, jsonUserModel);
          return userModel;
     }

     public hasPermission(permission: Permission) {
          this.roles.some(role => {
               return rolePermissions[role].includes(permission);
          })
     }
}
