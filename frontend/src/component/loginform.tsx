import { Api } from 'api';
import { UtilisateurModel } from 'common';
import { UserContext } from 'context/usercontext';
import React from 'react';


interface Props { }
interface State { username?: string; password?: string; erreur?: string; }

export class LoginForm extends React.Component<Props, State> {
    public static contextType = UserContext;
    public context: UserContext;
    private api = new Api;

    constructor(props: Props) {
        super(props);

        this.state = {};
    }

    public render() {
        if (this.context.user === undefined) { return null; }
        return <div className='container-form'>
            <form onSubmit={this.login} className='form-login' >
                <h2>Se connecter</h2>
                <input type='text' placeholder='Username' required={true} value={this.state.username ?? ''} onChange={e => {
                    this.setState({ username: e.target.value });
                }} />
                <input type='password' placeholder='Password' required={true} value={this.state.password ?? ''} onChange={e => {
                    this.setState({ password: e.target.value });
                }} />
                <input type='submit' value='Se connecter' />
            </form>
        </div>;
    }

    private login = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = UtilisateurModel.fromJSON(await this.api.postGetJson('/auth/login', { username: this.state.username, password: this.state.password }));
            this.context.setUser(user);
            this.setState({ username: '', password: '' });

        } catch {
            alert('Vous avez entrez un mauvais username ou mot de passe');
        }
    };

}
