import {NO_ASS_CINEMA_ADMIN_PAGE_INFO} from "../constants/actionTypes";

const iniState={
    noAssCinemaAdminPageInfo:[]
}
const noAssCinemaAdminPageInfo=(state=iniState,action)=>{
    if (action.type===NO_ASS_CINEMA_ADMIN_PAGE_INFO){
        return action.noAssCinemaAdminPageInfo
    }else return state
}
export default noAssCinemaAdminPageInfo;