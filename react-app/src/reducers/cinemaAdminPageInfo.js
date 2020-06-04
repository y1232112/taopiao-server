import {CINEMA_ADMIN_PAGE_INFO} from "../constants/actionTypes";

const initState={
    cinemaAdminPageInfo:[]
}
const cinemaAdminPageInfo=(state=initState,action)=>{
    if (action.type===CINEMA_ADMIN_PAGE_INFO){
        return action.cinemaAdminPageInfo
    }else return state
}
export default cinemaAdminPageInfo;