import * as types from '../constants/actionTypes';
const initState={
    movieCrew:[]
};
const movieCrew=(state=initState, action)=>{
    switch (action.type) {
        case types.RECEIVE_MOVIE_CREW:
            return action.movieCrew
        case types.UPDATE_MOVIE_CREW:
            return action.movieCrew
        default:
            return state
    }
}
export default movieCrew;