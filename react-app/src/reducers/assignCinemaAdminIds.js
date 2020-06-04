import {RECEIVE_ASSIGN_CINEMA_ADMIN_IDS} from "../constants/actionTypes";

const initState={
    assignCinemaAdminIds:[]
}
const assignCinemaAdminIds=(state=initState,action)=>{
    if (action.type===RECEIVE_ASSIGN_CINEMA_ADMIN_IDS){
        return action.assignCinemaAdminIds
    }else return state
}
export default assignCinemaAdminIds;