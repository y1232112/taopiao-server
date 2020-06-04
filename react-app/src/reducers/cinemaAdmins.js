import {RECEIVE_CINEMA_ADMINS} from "../constants/actionTypes";

const initState={
    cinemaAdmins:[]
}
const cinemaAdmins=(state=initState,action)=>{
    if (action.type===RECEIVE_CINEMA_ADMINS){
        return action.cinemaAdmins
    }else return state
}
export default cinemaAdmins;