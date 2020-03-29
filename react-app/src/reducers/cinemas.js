import {RECEIVE_CINEMA} from "../constants/actionTypes";


const initState={
    cinemas:[]
}
const cinemas=(state=initState.cinemas,action)=>{
    if (action.type === RECEIVE_CINEMA) {
        return action.cinemas;
    } else {
        return state
    }
}
export default cinemas;