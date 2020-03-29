import {RECEIVE_FILMS} from "../constants/actionTypes";

const initState={
    films:[],
}
const films=(state=initState.films, action)=>{
    if (action.type === RECEIVE_FILMS) {
        return action.films;
    } else {
        return state
    }
}
export default films;