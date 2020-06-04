import {FILM_PAGE_SIZE} from "../constants/actionTypes";
import {DEFAULT_PAGE_SIZE} from "../constants/const";

const initState={
    filmPageSize:DEFAULT_PAGE_SIZE
}
const filmPageSize=(state=initState,action)=>{
    if (action.type===FILM_PAGE_SIZE){
        return action.filmPageSize
    }else return state
}
export default filmPageSize;