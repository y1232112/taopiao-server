import {RECEIVE_SCHEDULES} from "../constants/actionTypes";

const initState={
    schedules:[]
}
const schedules=(state=initState.schedules,action)=>{
    if (action.type===RECEIVE_SCHEDULES){
        return action.schedules
    }else {
        return state
    }
}
export default schedules;