import React from "react";
import {store} from "../index";
import * as types from "../constants/actionTypes";
class CinemaContainer extends React.Component{
    render() {
        store.dispatch({
            type:types.LOGIN_PRIVITE_GET,
            loginprivate:1
        })
        return <div>影城模块</div>
    }

}
export default CinemaContainer;
