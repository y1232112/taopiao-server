import {RECEIVE_ASSIGN_CINEMA_IDS} from "../constants/actionTypes";

const initState={
    assignCinemaIds:[]
}
const assignCinemaIds=(state=initState,action)=>{
    if(action.type===RECEIVE_ASSIGN_CINEMA_IDS){
        return action.assignCinemaIds
    }else return state
}
export default assignCinemaIds;