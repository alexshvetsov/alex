import React, { Component } from 'react';
import './nav.css'
import { User } from '../../models/user';
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/actionType';
import { NavLink } from 'react-router-dom';

interface NavState {
    isLogged: boolean,
    loggedUser: User;
}


export class Nav extends Component<any, NavState>{


    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            isLogged: store.getState().isLogged,
            loggedUser: store.getState().loggedUser
        };

        this.unsubscribeStore = store.subscribe(() =>
            this.setState({ isLogged: store.getState().isLogged, loggedUser: store.getState().loggedUser }));
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    //handle logout, delete from local sotrge and state
    public logout = (): void => {
        localStorage.removeItem('user');
        const action = { type: ActionType.logout, payload: false };
        store.dispatch(action);
        const secondAction = { type: ActionType.LoggedUser, payload: new User() }
        store.dispatch(secondAction);

    }

    render(): JSX.Element {
        return (
            <div className="nav">
                <NavLink activeClassName="active" to="/vacations">vacations</NavLink>
                {this.state.loggedUser.isAdmin ? <NavLink to="/vacationsAdmin">vacations for Admin</NavLink> : ''}
                {this.state.isLogged ? <NavLink activeClassName="none" onClick={this.logout} to="/login" >Logout</NavLink> : ''}
                {this.state.isLogged ? <span><strong>          hello, {this.state.loggedUser.username}</strong></span> : ''}
                {!this.state.isLogged ? <NavLink activeClassName="active" to="/register">register</NavLink> : ''}
                {!this.state.isLogged ? <NavLink activeClassName="active" to="/login">login</NavLink> : ''}
            </div>
        )
    }
}