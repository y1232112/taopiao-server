
import films from "./films";
import cinemas from "./cinemas";
import {combineReducers} from "redux";
import loginprivate from "./loginprivite";
export default combineReducers(
   {
       films,
    cinemas,
   loginprivate
   }
)