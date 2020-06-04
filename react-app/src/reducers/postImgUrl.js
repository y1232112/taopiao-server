import {RECEIVE_POST_IMG_URL} from "../constants/actionTypes";

const initState={
    postImgUrl:""
}
const postImgUrl=(state=initState.postImgUrl,action)=>{
    if (action.type===RECEIVE_POST_IMG_URL){
        return action.postImgUrl;
    }else {
        return state;
    }
}
export default postImgUrl;