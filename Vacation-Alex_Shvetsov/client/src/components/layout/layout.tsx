import React, { Component } from 'react';
import './layout.css'
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { Register } from '../register/register';
import { Login } from '../login/login';
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { ActionType } from '../../redux/actionType';
import { Vacations } from '../vacations/vacations';
import { User } from '../../models/user';
import { VacationsAdmin } from '../vacationsAdmin/vacationsAdmin';
import { NewVacation } from '../newVacation/newVacation';
import { Nav } from '../nav/nav';
import { VacationsReports } from '../vacationsReport/vacationsReport';



interface LayoutState {
    isLogged: boolean,
    loggedUser: User;
}


export class Layout extends Component<any, LayoutState> {

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

    componentDidMount(): void {
        // update state if the user is already looged from this computer
        if (JSON.parse(localStorage.getItem('user') as any)) {
            const action = { type: ActionType.login, payload: true };
            store.dispatch(action);
            const user = JSON.parse(localStorage.getItem('user') as any)
            const secondAction = { type: ActionType.LoggedUser, payload: user }
            store.dispatch(secondAction);
        }
    }


    public componentWillUnmount(): void {
        this.unsubscribeStore();
    }

    render(): JSX.Element {
        return (
            <div className="layout">
                <BrowserRouter>
                    <nav>
                        <Nav></Nav>
                    </nav>
                    <main>
                        <Switch>
                            <Route exact path="/vacations/reports" component={VacationsReports} />
                            <Route path="/register" component={Register} exact />
                            <Route path="/login" component={Login} exact />
                            <Route path="/vacationsAdmin" component={VacationsAdmin} exact />
                            <Route path="/vacations/new" component={NewVacation} exact />
                            <Route path="/vacations" component={Vacations} exact />
                            <Redirect from="/" to="/vacations" />
                        </Switch>
                    </main>
                </BrowserRouter>
            </div>
        )
    }
}

