import {QUERY_CINEMA_ADMIN} from "../constants/actionTypes";

const initState={
    queryCinemaAdminList:[]
}
const queryCinemaAdminList=(state=initState,action)=>{
    if (action.type===QUERY_CINEMA_ADMIN){
        return action.queryCinemaAdminList
    }else return state
}
export default queryCinemaAdminList;