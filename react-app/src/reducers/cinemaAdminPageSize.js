import {CINEMA_ADMIN_PAGE_SIZE} from "../constants/actionTypes";
import {DEFAULT_PAGE_SIZE} from "../constants/const";

const initState={
    cinemaAdminPageSize:DEFAULT_PAGE_SIZE
}
const cinemaAdminPageSize=(state=initState,action)=>{
    if (action.type===CINEMA_ADMIN_PAGE_SIZE){
        return action.cinemaAdminPageSize
    }else return state
}
export default cinemaAdminPageSize;