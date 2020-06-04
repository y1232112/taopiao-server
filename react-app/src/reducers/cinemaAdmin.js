import {RECEIVE_CINEMA_ADMIN} from "../constants/actionTypes";

const initState={
    cinemaAdmin:{
        cinema_admin_id:null,
        nick_name:null,
        password:null,
        phone:null,
        birth:null,
        real_name:null,
        avatar:null
    }
}
const cinemaAdmin=(state=initState,action)=>{
    if (action.type===RECEIVE_CINEMA_ADMIN){
        return action.cinemaAdmin
    }else {
        return state
    }
}
export default cinemaAdmin;