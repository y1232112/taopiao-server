import {STATUS_QUERY_CINEMA} from "../constants/actionTypes";

const initState={
    queryStatusCinema:0
}
const queryStatusCinema=(state=initState.queryStatusCinema,action)=>{
    if (action.type===STATUS_QUERY_CINEMA){
        return action.queryStatusCinema
    }else return state
}
export default queryStatusCinema;