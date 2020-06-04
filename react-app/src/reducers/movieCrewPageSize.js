import {MOVIE_CREW_PAGE_SIZE} from "../constants/actionTypes";
import {DEFAULT_PAGE_SIZE} from "../constants/const";

const initState={
    movieCrewPageSize:DEFAULT_PAGE_SIZE
}
const movieCrewPageSize=(state=initState,action)=>{
    if (action.type===MOVIE_CREW_PAGE_SIZE){
        return action.movieCrewPageSize
    }else return state

}
export default movieCrewPageSize;