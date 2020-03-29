import {STATUS_QUERY_FILM} from "../constants/actionTypes";

const initState={
    queryStatusFilm:0
}
const queryStatusFilm=(state=initState.queryStatusFilm,action)=>{
    if (action.type===STATUS_QUERY_FILM){
        return action.queryStatusFilm
    }else return state

}
export default queryStatusFilm;