import React from 'react';

import LoginContainer from "./containers/LoginContainer";
import {HashRouter,Route} from "react-router-dom";
import SysContainer from "./containers/SysContainer";
import CinemaContainer from "./containers/CinemaContainer";
import Fail from "./containers/Fail";
import Success from "./containers/Success";
import LoginDelOption from "./containers/LoginDelOption";
import { connect } from 'react-redux';
import {store} from "./index";
import {RECEIVE_FILMS} from "./constants/actionTypes";

class App extends React.Component{

    constructor(props) {
        super(props);

    }


    //实现路由拦截登录处理页面需要传参才能正常访问，不能直接访问，会出现未定义错误
    //0表示未登录状态
    //登录时临时修改状态为3,可以访问登录处理页面，以便处理登录业务，对其他状态实现拦截
    //拦截后眺往Fail页面
    //1状态不能访问2状态
    //1状态表示影城管理员已登录
    //2状态表示系统管理员已登录
    //登录之后需要改回相应登录状态
    delPathLogin=()=>{

       if(this.props.change==0||this.props.change==1||this.props.change==2){
           return Fail;

       }else return LoginDelOption;
    };
    //处理系统管理员模块
    //拦截0,1状态，让2状态通过
    delPathSysAdmin=()=>{
        if(this.props.change==0||this.props.change==1){
            return Fail;
        }else return SysContainer;

    };
    //处理影城管理员模块
    //拦截0,2状态，让1状态通过
    delPathCinemaAdmin=()=>{
        if(this.props.change==0||this.props.change==2){
            return Fail;
        }else return CinemaContainer;
    };



    render() {
        console.log('0-props--private-render-',this.props.loginPrivate)

        console.log('0-props---change---render-',this.props.change)
    return (
        <HashRouter>
            <switch>
                <Route path={"/"} exact={true} component={LoginContainer}/>

                <Route path={"/cinema"} exact={true} component={this.delPathCinemaAdmin()}/>
                <Route path={"/fail"} exact={true} component={Fail}/>
                <Route path={"/sysadmin"} exact={true} component={this.delPathSysAdmin()}/>
                <Route path={"/success"} exact={true} component={Success}/>
                <Route path={"/delLogin"} exact={true} component={this.delPathLogin()}/>



            </switch>
        </HashRouter>

    );
}
}
const mapStateToProps=state=>({
    change:state.loginPrivate
})
export default connect(mapStateToProps) (App);
