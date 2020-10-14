import { Api } from 'api';
import { UtilisateurModel } from 'common';
import React from 'react';


export interface UserContext {
    user?: UtilisateurModel | null;
    reloadUser(): Promise<UtilisateurModel | null>;
    setUser(user: UtilisateurModel | null): void;
}

export const UserContext: React.Context<UserContext> = React.createContext({
    reloadUser: async () => null,
    setUser: () => { }
} as UserContext);

export class UserContextComponent extends React.Component<{}, UserContext> {
    public api = new Api;

    constructor(props: {}) {
        super(props);
        this.state = {
            reloadUser: this.reloadUser,
            setUser: this.setUser
        };
    }

    public setUser = (user: UtilisateurModel | null) => {
        this.setState({ user });
    };

    public reloadUser = async () => {
        try {
            const user = UtilisateurModel.fromJSON(await this.api.getJson('/auth/manage/current'));
            this.setState({ user });
            return user;
        } catch {
            console.log(`Error obtaining user, logging out.`);
            this.setState({ user: null });
            return null;
        }
    };

    public async componentDidMount() {
        await this.reloadUser();
    }

    public render() {
        if (this.state.user === undefined) { return null; }
        return (
            <UserContext.Provider value={this.state}>
                {this.props.children}
            </UserContext.Provider>
        );
    }
}
