import {CINEMA_PAGE_SIZE} from "../constants/actionTypes";

const initState={
    cinemaPageSize:5
}
const cinemaPageSize=(state=initState,action)=>{
    if (action.type===CINEMA_PAGE_SIZE){
        return action.cinemaPageSize
    }else return state
}
export default cinemaPageSize;