import React, { Component } from 'react';
import './vacationsAdmin.css';
import { Vacation } from '../../models/vacation';
import { Unsubscribe } from 'redux';
import { store } from '../../redux/store';
import { NavLink } from 'react-router-dom';
import { NewVacation } from '../newVacation/newVacation';
import { ActionType } from '../../redux/actionType';
import io from "socket.io-client";
let socket: any;

interface VacationsAdminState {
    vacations: Vacation[];
}

export class VacationsAdmin extends Component<any, VacationsAdminState>{

    private unsubscribeStore: Unsubscribe;

    public constructor(props: any) {
        super(props);
        this.state = {
            vacations: store.getState().vacations
        };

        this.unsubscribeStore = store.subscribe(() =>
            this.setState({ vacations: store.getState().vacations }));
    }

    public componentWillUnmount(): void {
        this.unsubscribeStore(); // הפסקת ההאזנה
        socket.disconnect();
    }

    public vacationsEmit(): void {
        socket.emit('admin-made-changes')
    }



    componentDidMount(): void {
        //connect socket and fetch vacations
        socket = io.connect("http://localhost:3002");

        fetch("http://localhost:3001/api/vacations")
            .then(response => response.json())
            .then(vacations => {
                const action = { type: ActionType.getAllVacations, payload: vacations };
                store.dispatch(action);
            })
            .catch(err => alert(err));
    }


    render(): JSX.Element {
        return (
            <div className="vacationsAdmin">
                <h1>vacationsAdmin</h1>
                <NavLink to="/vacations/new">add new Vacation</NavLink>

                <NavLink to="/vacations/reports" className="reports-button btn btn-info" >Reports</NavLink>
                <br />
                    {
                        this.state.vacations.map(v => <NewVacation sentSocket={this.vacationsEmit} key={v.id} vacationID={v.id} />)
                    }
                </div>
           
        )
    }
}