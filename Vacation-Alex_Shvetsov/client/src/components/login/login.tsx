import React, { Component } from 'react';
import { User } from '../../models/user';
import './login.css'
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
import { Unsubscribe } from "redux";


interface LoginState {
    users: User[];
    user: User;
}

export class Login extends Component<any, LoginState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            users: store.getState().users,
            user: new User()
        };

        this.unsubscribeStore = store.subscribe(() =>
            this.setState({ users: store.getState().users }));
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    public componentDidMount(): void {
        //get the users from DB to compare the username
        if (store.getState().users.length === 0) {
            fetch("http://localhost:3001/api/users")
                .then(response => response.json())
                .then(users => {
                    const action = { type: ActionType.getAllUsers, payload: users };
                    store.dispatch(action);
                })
                .catch(err => alert(err));
        }
    }

    // username input handler
    public setUsername = (e: any): void => {
        e.target.value.length < 1 ? e.target.classList.add('error') : e.target.classList.remove('error');
        const username = e.target.value;
        const user = { ...this.state.user };
        user.username = username;
        this.setState({ user });
    };
    // password input handler
    public setPassword = (e: any): void => {
        e.target.value.length < 1 ? e.target.classList.add('error') : e.target.classList.remove('error');
        const password = e.target.value;
        const user = { ...this.state.user };
        user.password = password;
        this.setState({ user });
    };

    // submit button handler
    private isFormLegal(): boolean {
        return this.state.user.username !== "" &&
            this.state.user.password !== "";
    }

    private submitLogin = (): void => {
        //send the data to the server and recive user obj if password correct or error
        fetch("http://localhost:3001/api/users/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => response.json())
            .then(response => {
                if (typeof response === 'object') {
                    const action = { type: ActionType.login, payload: true };
                    store.dispatch(action);
                } else {
                    alert('Your username or password is incorrect')
                    return;
                }
                //update local storge and state
                localStorage.setItem('user', JSON.stringify(response));
                const secondAction = { type: ActionType.LoggedUser, payload: response }
                store.dispatch(secondAction);
                this.props.history.push("/vacations");
            })
            .catch(err => alert(err));
    }

    render(): JSX.Element {
        return (
            <div className="login">
                <h1>Login</h1>
                <form>

                    <input type="text" placeholder="Username..."
                        onChange={this.setUsername} value={this.state.user.username} />
                    <br /><br />

                    <input type="password" placeholder="Password..."
                        onChange={this.setPassword} value={this.state.user.password} />
                    <br /><br />

                    <button className="tooltip" disabled={!this.isFormLegal()} type="button" onClick={this.submitLogin}>Login
                   {!this.isFormLegal() ? <span className="tooltiptext">Please fill both fileds</span> : ''}
                    </button>

                </form>
            </div>

        )
    }
}