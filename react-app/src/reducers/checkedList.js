import * as types from "../constants/actionTypes";
const initState={
    checkedList:[]
}
const checkedList=(state=initState.checkedList,action)=>{
    if (action.type === types.CHECKED_LIST) {
        return action.checkedList
    } else {
        return state
    }
}
export default checkedList;