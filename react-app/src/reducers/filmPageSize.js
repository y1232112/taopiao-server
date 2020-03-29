import {FILM_PAGE_SIZE} from "../constants/actionTypes";

const initState={
    filmPageSize:5
}
const filmPageSize=(state=initState,action)=>{
    if (action.type===FILM_PAGE_SIZE){
        return action.filmPageSize
    }else return state
}
export default filmPageSize;