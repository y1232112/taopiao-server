import {CINEMA_PAGE_INFO} from "../constants/actionTypes";

const initState={
    cinemaPageInfo:[]
}
const cinemaPageInfo=(state=initState,action)=>{
    if (action.type===CINEMA_PAGE_INFO){
        return action.cinemaPageInfo
    }else {
        return state
    }
}
export default cinemaPageInfo;