import {LOGIN_PRIVITE_GET, LOGIN_PRIVITE_INIT, LOGIN_PRIVITE_SKIP} from "../constants/actionTypes";

const iniState={
    loginpivate:0
};
const loginprivate=(state=iniState.loginpivate,action)=>{
    switch (action.type) {
        case LOGIN_PRIVITE_INIT:
            return action.loginprivate;
        case LOGIN_PRIVITE_GET:
            return action.loginprivate;
        case LOGIN_PRIVITE_SKIP:
            return action.loginprivate;
        default:
            return state;

    }
}
export default loginprivate;