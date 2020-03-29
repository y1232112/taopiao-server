import {LOGIN_PRIVITE_GET, LOGIN_PRIVITE_INIT, LOGIN_PRIVITE_SKIP} from "../constants/actionTypes";

const iniState={
    loginPrivate:0
};
const loginPrivate=(state=iniState.loginPrivate,action)=>{
    switch (action.type) {
        case LOGIN_PRIVITE_INIT:
            return action.loginPrivate;
        case LOGIN_PRIVITE_GET:
            return action.loginPrivate;
        case LOGIN_PRIVITE_SKIP:
            return action.loginPrivate;
        default:
            return state;

    }
}
export default loginPrivate;