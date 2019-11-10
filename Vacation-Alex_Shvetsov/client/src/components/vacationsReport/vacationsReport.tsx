import React, { Component } from "react";
import "./vacationsReport.css";
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, ResponsiveContainer } from 'recharts'
import { store } from "../../redux/store";
import { Unsubscribe } from "redux";

import { NavLink } from "react-router-dom";



interface VacationsReportsState {
    show: boolean;
    data: [{}];
    isAdmin: number;
}

export class VacationsReports extends Component<any, VacationsReportsState>{

    private unsubscribeStore: Unsubscribe;

    constructor(props: any) {
        super(props);
        this.state = {
            show: false,
            data: [{}],
            isAdmin: store.getState().loggedUser.isAdmin 
        };

        this.unsubscribeStore = store.subscribe(() => {
            this.setState({
                isAdmin: store.getState().loggedUser.isAdmin 
            });
        })
    }

    public handleClose = () => this.setState({ show: false });
    public handleShow = () => this.setState({ show: true });

    componentDidMount(): void {
        fetch("http://localhost:3001/api/report")
            .then(response => response.json())
            .then(data => this.setState({ data,
            isAdmin: store.getState().loggedUser.isAdmin }));
    }

    public reports: any = document.getElementById('reports-modal');

    render(): JSX.Element | any {
        if (this.state.isAdmin) {
            return (
                <div className="vacation-reports-div">
                    <div className="vacation-reports" style={{ width: 800, height: 500 }}>
                        <div className="container" style={{ width: 800, height: 500 }}>
                            <NavLink className="go-back" to="/vacations">Vacations</NavLink>
                            <ResponsiveContainer>
                                <BarChart width={800} height={500} data={this.state.data}>
                                    <XAxis dataKey="name" stroke="#8884d8" />
                                    <YAxis />
                                    <Tooltip />
                                    <CartesianGrid stroke="#ccc" strokeDasharray="5 5" />
                                    <Bar dataKey="follows" fill="#8884d8" barSize={30} />
                                </BarChart>
                            </ResponsiveContainer>
                        </div>
                    </div>
                </div>
            );
        } else {
            this.props.history.push("/vacations");
        }
    }
}