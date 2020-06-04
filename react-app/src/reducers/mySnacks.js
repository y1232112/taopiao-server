import {MY_SNACKS} from "../constants/actionTypes";

const initState={
    mySnacks:[]
}
const mySnacks=(state=initState.mySnacks,action)=>{
    if (action.type===MY_SNACKS){
        return action.mySnacks
    }else {
        return state;
    }
}
export default mySnacks;