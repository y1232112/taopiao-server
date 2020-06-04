import {RECEIVE_CINEMA_SEATS} from "../constants/actionTypes";

const initState={
    cinemaSeats:[]
}
const cinemaSeats=(state=initState.cinemaSeats,action)=>{
    if (action.type===RECEIVE_CINEMA_SEATS){
        return action.cinemaSeats;
    }else {
        return state
    }
}
export default cinemaSeats;