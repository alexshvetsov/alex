import { AppState } from "./appState";
import { AnyAction } from "redux";
import { ActionType } from "./actionType";

export function reducer(oldAppState: AppState | undefined, action: AnyAction): AppState {

   
    if (!oldAppState) {
        return new AppState();
    }

    const newAppState = { ...oldAppState };

    switch (action.type) {

        case ActionType.getAllUsers:
            newAppState.users = action.payload;
            break;

      
        case ActionType.AddUser:
            newAppState.users.push(action.payload);
            break;

        case ActionType.login:
            newAppState.isLogged = action.payload;
            break;

        case ActionType.logout:
            newAppState.isLogged = action.payload;
            break;

        case ActionType.getAllVacations:
            newAppState.vacations = action.payload;
            break;

        case ActionType.getAllVacationsFollowed:
            newAppState.vacationsFollowed = action.payload;
            break;

        case ActionType.AddVacationFollowed:
            newAppState.vacationsFollowed.push(action.payload); 
            break;

        case ActionType.DeleteVacationFollowed:
            const id = newAppState.vacationsFollowed.findIndex(vF => vF.userID === action.payload.userID && vF.vacationID === action.payload.vacationID)
            newAppState.vacationsFollowed.splice(id, 1);
            break;

        case ActionType.LoggedUser:
            newAppState.loggedUser = action.payload;
            break;

    }


    return newAppState;
}