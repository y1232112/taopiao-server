import {STATUS_QUERY_MOVIE_CREW} from "../constants/actionTypes";

const initState={
    queryStatusMovieCrew:0
}
const queryStatusMovieCrew=(state=initState.queryStatusMovieCrew,action)=>{
    if (action.type===STATUS_QUERY_MOVIE_CREW){
        return action.queryStatusMovieCrew
    }else return state
}
export default queryStatusMovieCrew;