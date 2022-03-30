import { combineReducers } from "redux";
import { Appointment } from "./appointment";
import { Auth } from './auth'
import { Category } from "./category";
import { Coupans } from "./coupans";
import { Dashboard } from "./dashboard";
import { Employee } from "./employee";
import { Services } from "./services";

export const rootReducer = combineReducers({
    Auth,
    Employee,
    Services,
    Dashboard,
    Appointment,
    Coupans,
    Category
})