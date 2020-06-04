import {CURRENT_SHOW_HALL} from "../constants/actionTypes";

const initState={
    currentHall:[]
}
const currentHall=(state=initState.currentHall,action)=>{
    if (action.type===CURRENT_SHOW_HALL){
        return action.currentHall;
    }else {
        return state;
    }
}
export default currentHall;