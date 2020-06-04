import {RECEIVE_CINEMA_BY_ADMIN_ID} from "../constants/actionTypes";

const initState={
    cinema:[]
}
const cinema=(state=initState,action)=>{
    if (action.type===RECEIVE_CINEMA_BY_ADMIN_ID){
        return action.cinema
    }else {
        return state
    }
}
export default cinema;