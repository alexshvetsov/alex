import React, { Component } from 'react';
import './newVacation.css'
import { Vacation } from '../../models/vacation';
import { ActionType } from '../../redux/actionType';
import { store } from '../../redux/store';
import io from "socket.io-client";
import { apiRequestWithImg, apiRequest } from '../../utils/Helper';
let socket: any;

interface NewVacationProps {
    vacationID: number;
    sentSocket: Function;
}

interface NewVacationState {
    vacation: Vacation | any;
    deleteCount: number

}

export class NewVacation extends Component<NewVacationProps, NewVacationState>{

    public constructor(props: any) {
        super(props);
        this.state = {
            vacation: new Vacation(),
            deleteCount: 0
        }
    }

    componentDidMount(): void {
        // if called by vacationsAdmin update state else open socket
        if (this.props.vacationID > 0) {
            fetch("http://localhost:3001/api/vacations/" + this.props.vacationID)
                .then(response => response.json())
                // .then(products => this.setState({ products })) // Without Redux
                .then(vacation => this.setState({ vacation }))
                .catch(err => alert(err));
        } else {
            socket = io.connect("http://localhost:3002");
        }
    }

    // handle image input
    public setImage = (e: any): void => {
        const image = e.target.files[0];
        let vacation = { ...this.state.vacation };
        vacation.image = image;
        this.setState({ vacation });
    }

//handle form inputs
    public setVacationValue = (e: any): void => {
        const description = e.target.value;
        let vacation = { ...this.state.vacation };
        vacation[e.target.name] = description;
        this.setState({ vacation });
    }

    //check if form is legal and make submit button available
    public isFormLegal = (): boolean => {
        return this.state.vacation.description !== '' &&
            this.state.vacation.destination !== '' &&
            this.state.vacation.beginning !== '' &&
            this.state.vacation.ending !== '' &&
            this.state.vacation.image !== ''
    }

//handle submit button 
    public submitVacation = async () => {
        // if the component recived vacationID Props patch a vacation else post new vacation
        if (this.props.vacationID) {
            if (this.state.vacation.image) {
                const vacation = { ...this.state.vacation };
                const img = this.state.vacation.image;
                const data = new FormData();
                data.append("vacationImage", img);
                data.append("vacation", JSON.stringify(vacation));
                alert("The vacation has been edited")
                await apiRequestWithImg("http://localhost:3001/api/vacations", "POST", data);
                this.props.sentSocket();
            } else {
                alert("The vacation has been edited")
                await apiRequest("http://localhost:3001/api/vacations", "POST", this.state.vacation)
                this.props.sentSocket();
            }
        } else {
            const vacation = { ...this.state.vacation };
            const img = this.state.vacation.image;
            const data = new FormData();
            data.append("vacationImage", img);
            data.append("vacation", JSON.stringify(vacation));
            alert("New vacation added")
            await apiRequestWithImg("http://localhost:3001/api/vacations", "POST", data);
            socket.emit('admin-made-changes')
        };
    }

    //handle delete vacation (delete all the followers ant then the vacation)
    public deleteVacation = (): void => {
        if (this.state.deleteCount === 0) {
            this.setState({ deleteCount: this.state.deleteCount + 1 })
            alert('next click will delete it forever')
        } else {
            fetch("http://localhost:3001/api/vacationsFollowed/" + this.props.vacationID, {
                method: 'DELETE'
            })
                .then(async (res) => await res.text())
                .then(res => console.log(res))


            fetch("http://localhost:3001/api/vacations/" + this.props.vacationID, {
                method: 'DELETE'
            })
                .then(async (res) => await res.text())
                .then(async (res) => await console.log(res))
            setTimeout(async () => {
              await   fetch("http://localhost:3001/api/vacations")
                    .then(response => response.json())
                    .then((vacations) => {
                        const action = { type: ActionType.getAllVacations, payload: vacations };
                        store.dispatch(action);

                    })
                    .catch(err => alert(err));
                    this.props.sentSocket();
            }, 100)
        }
    }

    render(): JSX.Element {
        return (
            <div className="newVacation">
                {this.props.vacationID ? <h1>Edit mode</h1> : <h1>Add new vacation</h1>}

                <input type="text" placeholder="description" name="description"
                    onChange={this.setVacationValue} value={this.state.vacation.description} />
                <br />

                <input type="text" placeholder="destination" name="destination"
                    onChange={this.setVacationValue} value={this.state.vacation.destination} />
                <br />

                <input type="text" placeholder="beginning dd/mm/yy hh/mm" name="beginning"
                    onChange={this.setVacationValue} value={this.state.vacation.beginning} />
                <br />

                <input type="text" placeholder="ending dd/mm/yy hh/mm" name="ending"
                    onChange={this.setVacationValue} value={this.state.vacation.ending} />
                <br />

                <input type="text" placeholder="price" name="price"
                    onChange={this.setVacationValue} value={this.state.vacation.price} />
                <br />

                <input type="file" accept="image/*" name="vacationImage" placeholder="image..."
                    onChange={this.setImage} />
                <br />

                <button className="add-button" disabled={!this.isFormLegal()} type="button" onClick={this.submitVacation}>Submit Vacation</button>
                {this.props.vacationID > 0 ? <button className="delete-button" type="button" onClick={this.deleteVacation}>Delete</button> : ''}

            </div>
        )
    }
}

