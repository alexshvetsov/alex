import React, { Component } from 'react';
import './register.css';
import { store } from "../../redux/store";
import { ActionType } from "../../redux/actionType";
import { User } from '../../models/user';
import io from "socket.io-client";
import { NavLink } from 'react-router-dom';

let socket: any;

interface RegisterState {
    user: User;
    errors: {
        firstNameError: string;
        usernameError: string;
        passwordError: string;
        lastNameError: string;
    };
}

export class Register extends Component<any, RegisterState> {

    public constructor(props: any) {
        super(props);
        this.state = {
            user: new User(),
            errors: {
                firstNameError: "*",
                usernameError: "*",
                passwordError: "*",
                lastNameError: '*'
            }
        };
    }

    // handle first name handler
    public setFirstName = (e: any): void => {
        const span = document.getElementById("first-name-error")
        e.target.value.length < 1 ? e.target.classList.add('error') : e.target.classList.remove('error');
        if (span) {
            e.target.value.length >= 1 ? span.classList.add('green-font') : span.classList.remove('green-font');
        }
        const firstName = e.target.value;
        let errorMessage = "";
        const user = { ...this.state.user };
        const errors = { ...this.state.errors };
        user.firstName = firstName;
        errors.firstNameError = errorMessage;
        this.setState({ user, errors });
    };

    // handle last name handler
    public setLastName = (e: any): void => {
        const lastName = e.target.value;
        const span = document.getElementById("last-name-error")
        e.target.value.length < 1 ? e.target.classList.add('error') : e.target.classList.remove('error');
        if (span) {
            e.target.value.length >= 1 ? span.classList.add('green-font') : span.classList.remove('green-font');
        }
        let errorMessage = "";
        if (lastName === "") {
            errorMessage = "Missing name.";
        }
        else if (lastName.length > 20) {
            errorMessage = "Name too long."
        }
        const user = { ...this.state.user };
        const errors = { ...this.state.errors };
        user.lastName = lastName;
        errors.lastNameError = errorMessage;
        this.setState({ user, errors });
    };

    // handle username handler
    public setUsername = (e: any): void => {
        const span = document.getElementById("username-error")
        e.target.value.length < 1 ? e.target.classList.add('error') : e.target.classList.remove('error');
        const username = e.target.value;
        let errorMessage = "";
        if (username.length < 4) {
            errorMessage = "Username must be at least 4 characters";
            if (span) {
                e.target.value.length >= 1 ? span.classList.add('green-font') : span.classList.remove('green-font');
            }
        }
        else if (username.length > 20) {
            errorMessage = "Name too long."
        }
        if (username.length > 3) {
            socket.emit("user-availability-check", username);
        }
        const user = { ...this.state.user };
        const errors = { ...this.state.errors };
        user.username = username;
        errors.usernameError = errorMessage;
        this.setState({ user, errors });
    };


    // handle password handler
    public setPassword = (e: any): void => {
        const span = document.getElementById("password-error")
        e.target.value.length < 1 ? e.target.classList.add('error') : e.target.classList.remove('error');
        if (span) {
            e.target.value.length >= 1 ? span.classList.add('green-font') : span.classList.remove('green-font');
        }
        const password = e.target.value;
        let errorMessage = "";
        if (password === "") {
            errorMessage = "Missing name.";
        }
        else if (password.length > 20) {
            errorMessage = "Name too long."
        }
        const user = { ...this.state.user };
        const errors = { ...this.state.errors };
        user.password = password;
        errors.passwordError = errorMessage;
        this.setState({ user, errors });
    };

    // check if form is legal
    private isFormLegal(): boolean {
        return this.state.errors.firstNameError === "" &&
            this.state.errors.lastNameError === "" &&
            this.state.errors.passwordError === "" &&
            this.state.errors.usernameError === "the user name is avialble";
    }



    componentDidMount() {
        //connect socket
        socket = io.connect("http://localhost:3002");
        socket.on("user-availability-check", (isAvilable: any): void => {
            if (isAvilable) {
                const errors = { ...this.state.errors };
                errors.usernameError = `the user name is Unavialble`;
                this.setState({ errors });
            } else {
                const errors = { ...this.state.errors };
                errors.usernameError = 'the user name is avialble';
                this.setState({ errors })
            }
        })
    }

    render(): JSX.Element {
        return (
            <div className="register">
                <h1>Register</h1>

                <form>
                    <div className="input-div">
                        <input required type="text" placeholder="First name..." autoFocus
                            onChange={this.setFirstName} value={this.state.user.firstName} />
                        <span id="first-name-error">*</span>
                    </div>

                    <div className="input-div">
                        <input required type="text" placeholder="Last name..."
                            onChange={this.setLastName} value={this.state.user.lastName} />
                        <span id="last-name-error">*</span>
                    </div>

                    <div className="input-div">
                        <input required type="text" placeholder="Username..."
                            onChange={this.setUsername} value={this.state.user.username} />
                        <span id="username-error" className="error-span">*</span>
                        <br />
                        <span id="username-error">{this.state.errors.usernameError !== '*' ? this.state.errors.usernameError : ''}</span>
                    </div>

                    <div className="input-div">
                        <input required type="password" placeholder="password..."
                            onChange={this.setPassword} value={this.state.user.password} />
                        <span id="password-error" className="error-span">*</span>
                    </div>

                    <button className="tooltip" disabled={!this.isFormLegal()} type="button" onClick={this.addUser}>Add User
                    {!this.isFormLegal() ? <span className="tooltiptext">Please fill all fileds properly</span> : ''}
                    </button>

                </form>
                <br />
                <NavLink to="/login" exact>Already have an account</NavLink>
            </div>

        )
    }

    //handle submit button
    private addUser = (): void => {
        // Send to server for adding:
        fetch("http://localhost:3001/api/users", {
            method: "POST",
            headers: {
                "Content-Type": "application/json", 
                "Accept": "application/json" 
            },
            body: JSON.stringify(this.state.user)
        })
            .then(response => response.json())
            .then(user => {
                localStorage.setItem('user', JSON.stringify(user));
                alert("New user has been added. ID: " + user.id);
                const action = { type: ActionType.AddUser, payload: user };
                store.dispatch(action);
                const secondAction = { type: ActionType.LoggedUser, payload: user }
                store.dispatch(secondAction);
                const thirdAction = { type: ActionType.login, payload: true }
                store.dispatch(thirdAction);
                this.props.history.push("/vacations");
            })
            .catch(err => alert(err));
    };

}