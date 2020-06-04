import {SHOW_ITEM} from "../constants/actionTypes";

const initState={
    showItem:1
}
const showItem=(state=initState.showItem,action)=>{
    if (action.type===SHOW_ITEM){
        return action.showItem
    }else {
        return state;
    }
}
export default showItem;