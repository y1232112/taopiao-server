import {MOVIE_CREW_PAGE_SIZE} from "../constants/actionTypes";

const initState={
    movieCrewPageSize:5
}
const movieCrewPageSize=(state=initState,action)=>{
    if (action.type===MOVIE_CREW_PAGE_SIZE){
        return action.movieCrewPageSize
    }else return state

}
export default movieCrewPageSize;