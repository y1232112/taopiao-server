import {QUERY_NO_ASS_ADMIN_LIST} from "../constants/actionTypes";

const initState={
    queryNoAssAdminList:[]
}
const queryNoAssAdminList=(state=initState,action)=>{
    if (action.type===QUERY_NO_ASS_ADMIN_LIST){
        return action.queryNoAssAdminList
    }else return state
}
export default queryNoAssAdminList;