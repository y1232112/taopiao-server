import {MOVIE_CREW_PAGE_INFO} from "../constants/actionTypes";

const initState={
    movieCrewPageInfo:[]
}
const movieCrewPageInfo=(state=initState,action)=>{
    if (action.type === MOVIE_CREW_PAGE_INFO) {
        return action.movieCrewPageInfo
    } else {
        return state
    }
}
export default movieCrewPageInfo;