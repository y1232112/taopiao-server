import {RECEIVE_FILMS} from "../constants/actionTypes";

const initState={
    films:[],
}
const films=(state=initState.films, action)=>{
    switch (action.type) {
        case RECEIVE_FILMS:
            return action.films;
        default:
            return state
    }
}
export default films;