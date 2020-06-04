import {STATUS_QUERY_CINEMA_ADMIN} from "../constants/actionTypes";

const initState={
    queryStatusCinemaAdmin:0
}
const queryStatusCinemaAdmin=(state=initState,action)=>{
    if (action.type===STATUS_QUERY_CINEMA_ADMIN){
        return action.queryStatusCinemaAdmin
    }else return state
}
export default queryStatusCinemaAdmin;