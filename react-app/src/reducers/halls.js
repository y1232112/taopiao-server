import {RECEIVE_HALLS} from "../constants/actionTypes";

const initState={
    halls:[]
}
const halls=(state=initState.halls,action)=>{
    if (action.type===RECEIVE_HALLS){
        return action.halls;
    }else {
        return state;
    }
}
export default halls;