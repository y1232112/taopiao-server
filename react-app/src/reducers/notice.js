import {RECEIVE_NOTICE} from "../constants/actionTypes";

const initState={
    notice:""
}
const notice=(state=initState.notice,action)=>{
    if (action.type===RECEIVE_NOTICE){
        return action.notice
    }else {
        return state;
    }
}
export default notice;