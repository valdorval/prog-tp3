import { Api } from 'api';
import { Permission, roleList, UtilisateurModel } from 'common';
import { UserContext } from 'context/usercontext';
import React from 'react';
import { Redirect } from 'react-router-dom';


interface Props { }
interface State { users: UtilisateurModel[]; user: UtilisateurModel; }

export class ManageUsers extends React.Component<Props, State> {
    public static contextType = UserContext;
    public context: UserContext;
    private api = new Api;

    constructor(props: Props) {
        super(props);
        this.state = { users: [], user: new UtilisateurModel };
    }

    public async componentDidMount() {
        const users = (await this.api.getJson('/auth/manage') as any[]).map(UtilisateurModel.fromJSON);
        this.setState({ users });
    }

    public render() {
        const { users, user } = this.state;
        if (!this.context.user?.hasPermission(Permission.manageUsers)) {
            return <Redirect to='/' exact={true} />;
        }
        return <div className='container'>
            <h2>Administration</h2>
            <div>
                <select onChange={(e => {
                    const userToEdit = users.find(u => u.utilisateurId === parseInt(e.currentTarget.value));
                    this.setState({ user: userToEdit ?? new UtilisateurModel });
                })}>
                    <option>Nouveau</option>
                    {users.map(u => <option value={u.utilisateurId} key={u.utilisateurId}>{u.username}</option>)}
                </select>
            </div>

            <div>
                <form onSubmit={this.saveOrCreate}>
                    <div>
                        <input type='text' placeholder='username' value={user?.username ?? ''} onChange={e => {
                            user.username = e.currentTarget.value;
                            this.setState({ user });
                        }} />
                        <input type='password' placeholder='password' value={user?.password ?? ''} onChange={e => {
                            user.password = e.currentTarget.value;
                            this.setState({ user });
                        }} />
                    </div>

                    <div className='flex'>
                        {roleList.map(role => <label className='label-roles' key={role}>{role}
                            <input type='checkbox' checked={user.roles.includes(role)} onChange={() => {
                                if (user.roles.includes(role)) {
                                    user.roles = user.roles.filter(currentRole => currentRole !== role);
                                } else {
                                    user.roles.push(role);
                                }
                                this.setState({ user });
                            }} /></label>)}
                    </div>
                    <button type='submit'>{user.utilisateurId ? 'Enregistrer' : 'Créer'} </button>
                </form>
            </div>
        </div>;
    }

    private saveOrCreate = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = this.state.user;
        let newUser: UtilisateurModel | undefined = undefined;

        if (user.utilisateurId) {
            newUser = UtilisateurModel.fromJSON(await this.api.putGetJson('/auth/manage', user.utilisateurId, user));
            alert('Utilisateur modifié');
        } else {
            newUser = UtilisateurModel.fromJSON(await this.api.postGetJson('/auth/manage', user));
            alert('Utilisateur créé');
        }

        const users = (await this.api.getJson('/auth/manage')).map(UtilisateurModel.fromJSON);
        this.setState({ users, user: newUser });
    };


}
