import {RECEIVE_UPLOAD_IMG_URL} from "../constants/actionTypes";

const initState={
    upUrl:""
}
const upUrl=(state=initState.upUrl,action)=>{
    if (action.type===RECEIVE_UPLOAD_IMG_URL){
        return action.upUrl
    }else {
        return state;
    }
}
export default upUrl;