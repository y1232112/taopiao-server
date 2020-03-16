import {RECEIVE_CINEMA} from "../constants/actionTypes";


const initState={
    cinemas:[]
}
const cinemas=(state=initState.cinemas,action)=>{
    switch (action.type) {
        case RECEIVE_CINEMA:
            return action.cinemas;
        default:
            return state
    }
}
export default cinemas;