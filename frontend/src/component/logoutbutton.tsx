import { Api } from 'api';
import { UserContext } from 'context/usercontext';
import React from 'react';


interface Props { }
interface State { }

export class LogoutButton extends React.Component<Props, State> {
    public static contextType = UserContext;
    public context: UserContext;
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        return <button onClick={this.logout}>Déconnexion</button>;
    }

    private logout = async () => {
        await this.api.post('auth/logout');
        this.context.setUser(null);
    };


}
