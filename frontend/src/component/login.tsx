import { Api } from 'api';
import { UserContext } from 'contexte/usercontext';
import React from 'react';
import { Redirect } from 'react-router-dom';
import { toast } from 'react-toastify';

interface Props { }
interface State { username: string; password: string; }

export class Login extends React.Component<Props, State> {
     public static contextType = UserContext;
     public context: UserContext;
     private api = new Api;

     constructor(props: Props) {
          super(props);
          this.state = { username: '', password: '' };
     }


     public render() {
          if (this.context.user === undefined) { return 'Chargement...'; }
          if (this.context.user) {
               return <Redirect to='/' />;
          }
          return <>
               <form onSubmit={this.login}>
                    <div>
                         <label>Identifiant
                              <br /><input type='text' required={true} value={this.state.username} onChange={e => {
                                   this.setState({ username: e.target.value });
                              }} />
                         </label>
                    </div>
                    <div>
                         <label>Mot de passe
                              <br /><input type='password' required={true} value={this.state.password} onChange={e => {
                                   this.setState({ password: e.target.value });
                              }} />
                         </label>
                    </div>
                    <input type='submit' value='Envoyer' />
               </form>

          </>;
     }

     private login = async (e: React.FormEvent) => {
          e.preventDefault();
          try {
               const utilisateur = await this.api.postGetJson('/auth/login', { username: this.state.username, password: this.state.password });
               console.log(utilisateur);
          } catch {
               toast.error('Nom d\'utilisateur ou mot de passe incorrect');
          }

     }

}
