import React, { Component } from 'react';
import './vacations.css'
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { Vacation } from '../../models/vacation';
import { VacationFollowed } from '../../models/vacationFollowed';
import { ActionType } from '../../redux/actionType';
import { VacationCard } from '../vacationCard/vacationCard';
import io from 'socket.io-client';

let socket: any;

interface VacationsState {
    isLogged: boolean;
    vacations: Vacation[];
    vacationsFollowed: VacationFollowed[];
    userID: number;
}

export class Vacations extends Component<any, VacationsState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            isLogged: store.getState().isLogged,
            vacations: store.getState().vacations,
            vacationsFollowed: store.getState().vacationsFollowed,
            userID: 0
        };

        this.unsubscribeStore = store.subscribe(() =>
            this.setState({
                isLogged: store.getState().isLogged,
                vacations: store.getState().vacations,
                vacationsFollowed: store.getState().vacationsFollowed
            }))
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore();
        if (socket) {
            socket.disconnect()
        }
    }

    componentDidMount(): void {
        // if user logged connect socket else redirect to login
        if (this.state.isLogged) {
            socket = io.connect("http://localhost:3002");
            socket.on("admin-made-changes", (vacations: Vacation[]): void => {
                const action = { type: ActionType.getAllVacations, payload: vacations };
                store.dispatch(action);
            })
            fetch("http://localhost:3001/api/vacations")
                .then(response => response.json())
                .then(vacations => {
                    const action = { type: ActionType.getAllVacations, payload: vacations };
                    store.dispatch(action);
                })
                .catch(err => alert(err));
            fetch("http://localhost:3001/api/vacationsFollowed")
                .then(response => response.json())
                .then(vacationsFollowed => {
                    const action = { type: ActionType.getAllVacationsFollowed, payload: vacationsFollowed };
                    store.dispatch(action);
                })
                .catch(err => alert(err));
            const userID = JSON.parse(localStorage.getItem('user') as any).id
            this.setState({ userID })

        } else if (JSON.parse(localStorage.getItem('user') as any)) {
            socket = io.connect("http://localhost:3002");
            socket.on("admin-made-changes", (vacations: Vacation[]): void => {
                const action = { type: ActionType.getAllVacations, payload: vacations };
                store.dispatch(action);
            })
            fetch("http://localhost:3001/api/vacations")
                .then(response => response.json())
                .then(vacations => {
                    const action = { type: ActionType.getAllVacations, payload: vacations };
                    store.dispatch(action);
                })
                .catch(err => alert(err));
            fetch("http://localhost:3001/api/vacationsFollowed")
                .then(response => response.json())
                .then(vacationsFollowed => {
                    const action = { type: ActionType.getAllVacationsFollowed, payload: vacationsFollowed };
                    store.dispatch(action);
                })
                .catch(err => alert(err));
            const userID = JSON.parse(localStorage.getItem('user') as any).id
            this.setState({ userID })
        }
        else {
            this.props.history.push('/login')
        }
    }

    //handle toggle button
    public toggleVacationFollow(): void {
        const user = JSON.parse(localStorage.getItem('user') as any)
        let vacationFollowed = new VacationFollowed()
        vacationFollowed.userID = user.id;
        vacationFollowed.vacationID = this.props.vacation.id;
        if (!this.props.followed) {
            fetch("http://localhost:3001/api/vacationsFollowed", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                },
                body: JSON.stringify(vacationFollowed)
            })
                .then(response => response.json())
                .then(vacationFollowed => {
                    const action = { type: ActionType.AddVacationFollowed, payload: vacationFollowed };
                    store.dispatch(action);
                })
                .catch(err => alert(err));
        } else {
            const action = { type: ActionType.DeleteVacationFollowed, payload: vacationFollowed };
            store.dispatch(action);
            fetch("http://localhost:3001/api/vacationsFollowed/" + this.props.vacation.id + "/" + user.id, {
                method: 'DELETE',
            })
                .then(res => res.text())
                .then(res => console.log(res))
        }
    }

    render(): JSX.Element {
        return (
            <div className="vacations">
                <h1>Vacations</h1>
                {
                    this.state.vacations.filter(v => {
                        if (this.state.vacationsFollowed.find(vF => vF.vacationID === v.id && vF.userID === this.state.userID)) {
                            return true
                        }
                        return false
                    })
                        .map(v => <VacationCard key={v.id} toggle={this.toggleVacationFollow} vacation={v} followed={true} bgColor={'followed'} />)
                }
                {
                    this.state.vacations.filter(v => {
                        if (!this.state.vacationsFollowed.find(vF => vF.vacationID === v.id && vF.userID === this.state.userID)) {
                            return true
                        }
                        return false
                    })
                        .map(v => <VacationCard key={v.id} toggle={this.toggleVacationFollow} vacation={v} followed={false} bgColor={'none'} />)
                }

            </div>
        )

    }
}