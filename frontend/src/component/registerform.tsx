import { Api } from 'api';
import { UtilisateurModel } from 'common';
import { UserContext } from 'context/usercontext';
import React from 'react';


interface Props { }
interface State { username?: string; password?: string; name?: string; courriel?: string; }

export class RegisterForm extends React.Component<Props, State> {
    public static contextType = UserContext;
    public context: UserContext;
    private api = new Api;

    constructor(props: Props) {
        super(props);
        this.state = {};
    }

    public render() {
        if (this.context.user === undefined) { return null; }
        return <div>
            <form onSubmit={this.register} >
                <h3>Inscription</h3>
                <label>Username:</label>
                <input type='text' required={true} value={this.state.username ?? ''} onChange={e => {
                    this.setState({ username: e.target.value });
                }} /><br />
                <label>Password:</label>
                <input type='password' required={true} value={this.state.password ?? ''} onChange={e => {
                    this.setState({ password: e.target.value });
                }} /><br />
                <label>Votre nom:</label>
                <input type='text' required={true} value={this.state.name ?? ''} onChange={e => {
                    this.setState({ name: e.target.value });
                }} /><br />
                <label>Courriel:</label>
                <input type='email' required={true} value={this.state.courriel ?? ''} onChange={e => {
                    this.setState({ courriel: e.target.value });
                }} />
                <input type='submit' value="S'enregistrer" />
            </form>
        </div>;
    }

    private register = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const user = UtilisateurModel.fromJSON(await this.api.postGetJson('/auth/user', { username: this.state.username, password: this.state.password }));
            this.context.setUser(user);
            this.setState({ username: '', password: '', name: '', courriel: '' });
        } catch {
            alert('Nom d\'utilisateur déjà pris');
        }
    };

}
