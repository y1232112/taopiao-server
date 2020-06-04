import {RECEIVE_SEAT_INFO} from "../constants/actionTypes";

const initState={
    seatInfo:{
        rows:0,
        columns:0,
        path:[],
        seat:[]
    }
}
const seatInfo=(state=initState,action)=>{
   if(action.type===RECEIVE_SEAT_INFO){
       return action.seatInfo
   }else {
       return state
   }
}
export default seatInfo;