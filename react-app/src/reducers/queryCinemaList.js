import {QUERY_CINEMA} from "../constants/actionTypes";

const initState={
    queryCinemaList:[]
}
const queryCinemaList=(state=initState.queryCinemaList,action)=>{
    if (action.type===QUERY_CINEMA){
        return action.queryCinemaList
    }else return state
}
export default queryCinemaList;