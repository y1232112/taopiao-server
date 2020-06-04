import {CINEMA_PAGE_SIZE} from "../constants/actionTypes";
import {DEFAULT_PAGE_SIZE} from "../constants/const";

const initState={
    cinemaPageSize:DEFAULT_PAGE_SIZE
}
const cinemaPageSize=(state=initState,action)=>{
    if (action.type===CINEMA_PAGE_SIZE){
        return action.cinemaPageSize
    }else return state
}
export default cinemaPageSize;