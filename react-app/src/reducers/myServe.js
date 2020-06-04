import {RECEIVE_MYSERVE} from "../constants/actionTypes";

const initState={
    myServe:[]
}
const myServe=(state=initState.myServe,action)=>{
    if (action.type===RECEIVE_MYSERVE){
        return action.myServe
    }else return state;
}
export default myServe;