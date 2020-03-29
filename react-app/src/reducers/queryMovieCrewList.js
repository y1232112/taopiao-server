import {QUERY_MOVIE_CREW} from "../constants/actionTypes";

const initState={
    queryMovieCrewList:[]
}
const queryMovieCrewList=(state=initState.queryMovieCrewList,action)=>{
    if (action.type===QUERY_MOVIE_CREW){
        return action.queryMovieCrewList
    }else return state
}
export default queryMovieCrewList;