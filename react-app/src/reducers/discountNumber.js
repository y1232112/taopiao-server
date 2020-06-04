import {RECEIVE_DISCOUNT_NUMBER} from "../constants/actionTypes";

const initState={
    discountNumber:10
}
const discountNumber=(state=initState.discountNumber,action)=>{
    if (action.type===RECEIVE_DISCOUNT_NUMBER){
        return action.discountNumber
    }else {
        return state;
    }
}
export default discountNumber;