import { User } from "../models/user";
import { Vacation } from "../models/vacation";
import { VacationFollowed } from "../models/vacationFollowed";

export class AppState {
    public users: User[] = [];
    public vacations: Vacation[] = [];
    public isLogged: boolean = false;
    public vacationsFollowed: VacationFollowed[]=[];
    public loggedUser:  User=new User();
}
