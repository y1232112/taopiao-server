import {QUERY_FILM} from "../constants/actionTypes";

const initState={
    queryFilmList:[]
}
const queryFilmList=(state=initState.queryFilmList,action)=>{
    if (action.type===QUERY_FILM){
        return action.queryFilmList

    }else return state
}
export default queryFilmList;