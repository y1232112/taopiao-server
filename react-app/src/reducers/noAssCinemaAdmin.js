import {RECEIVE_NO_ASS_CINEMA_ADMIN} from "../constants/actionTypes";

const initState={
    noAssCinemaAdmin:[]
}
const noAssCinemaAdmin=(state=initState,action)=>{
    if (action.type===RECEIVE_NO_ASS_CINEMA_ADMIN){
        return action.noAssCinemaAdmin
    }else return state
}
export default noAssCinemaAdmin;