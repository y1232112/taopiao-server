import {RECEIVE_ORIGIN_PRICE} from "../constants/actionTypes";

const initState={
    originPrice:0
}
const originPrice=(state=initState.originPrice,action)=>{
    if (action.type===RECEIVE_ORIGIN_PRICE){
        return action.originPrice
    }else {
        return state;
    }
}
export default originPrice;