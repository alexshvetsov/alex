import React, { Component } from 'react';
import './vacationCard.css';
import { Vacation } from '../../models/vacation';


interface VacationCardProps {
    vacation: Vacation;
    followed: boolean;
    toggle: Function;
    bgColor: string;
}

export class VacationCard extends Component<VacationCardProps>{

    render(): JSX.Element {
        return (

            <div className="vacation">
                <div className="box gallery">
                    <div className="card">
                        <div className="background">
                            <img src={'assets/images/' + this.props.vacation.image} alt="backgroundImage" />
                        </div>
                        <span className="overlay"></span>
                        <div className="info">
                            <i onClick={this.props.toggle.bind(this)} className={this.props.bgColor + " " + this.props.vacation.id + " far fa-thumbs-up"}></i>
                            <h2>
                                <span>{this.props.vacation.destination}</span>
                            </h2>
                            <br />

                            <span className="date-time">from {this.props.vacation.beginning} </span>
                            <br />

                            <span className="date-time">to {this.props.vacation.ending}</span>
                            <div className="foot">
                                <i className="line"></i>
                                <span className="date">
                                    {this.props.vacation.description}
                                    <br /><br/>

                                    <span >from {this.props.vacation.beginning} </span>
                                    <br />

                                    <span >to {this.props.vacation.ending}</span>
                                    <br /><br/>
                                    {this.props.vacation.price}$
                                </span>

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )

    }
}