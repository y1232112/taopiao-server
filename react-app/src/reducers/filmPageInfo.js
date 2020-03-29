import {FILM_PAGE_INFO} from "../constants/actionTypes";

const initState={
    filmPageInfo:[]
}
const filmPageInfo=(state=initState,action)=>{
    if (action.type === FILM_PAGE_INFO) {
        return action.filmPageInfo
    } else {
        return state
    }
}
export default filmPageInfo;