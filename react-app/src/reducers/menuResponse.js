import * as types from "../constants/actionTypes"
const initState={
    menuResponse:1
}
const menuResponse=(state=initState,action)=>{
    if (action.type === types.MENU_CHANGE) {
        return action.menuResponse;
    } else {
        return state
    }
}
export default menuResponse;