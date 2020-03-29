import React from "react";
import Axios from "axios";
import {cinemaAdminLoginApi, sysLoginApi} from "../apis/api";
import {setCookie} from "../utils/cookieUtils";

import {connect} from "react-redux";

class LoginDelOption extends React.Component{


    constructor(props) {
        super(props);

    }
    //错误边界

    componentDidCatch(error, info) {
        // 显示回退UI
        this.setState({hasError: true});
    }

        render() {

         const admin=this.props.location.state.admin
          const password=this.props.location.state.password;
          const Tag=this.props.location.state.Tag;



            //定义一个跳转，方便axios路由跳转，不能直接在axios里进行路由跳转
            const routerSkip = (msg, Tag) => {
                if (msg == '操作成功' && Tag == true) {

                    this.props.history.push('/cinema')
                } else if (msg == '操作成功' && Tag == false) {
                    this.props.history.push('/sysadmin')
                }
            };
            //失败后鹿楼跳转
            const routerFailSkip=()=>{
                this.props.history.push('/');
            }

            //跳转到处理页面
            if (!Tag) {
                //    创建数据参数
                let json = {
                    "admin": admin,
                    "password": password
                };
                Axios.post(sysLoginApi, json)
                    .then((response) => {
                        let msg = response.data.message;
                        console.log('---response--message----',msg);
                        if (msg == '操作成功') {
                            setCookie("SYS_ADMIN", admin, 20);
                            setCookie("SYS_PASSWORD", password, 20);

                            // this.props.history.push('/sysadmin');
                            alert('登录成功');
                            routerSkip(msg,Tag);
                        } else {
                            alert(msg)
                            routerFailSkip();
                        }
                    })
                    .catch(function (error) {
                        console.log('----axios---',error)
                       routerFailSkip()
                    });


            } else {
                //    创建数据参数
                let json = {
                    "admin": admin,
                    "password": password
                }
                Axios.post(cinemaAdminLoginApi, json)
                    .then(function (response) {
                        let msg = response.data.message;
                        alert(msg);
                        if (msg == '操作成功') {
                            setCookie("CINEMA_ADMIN", admin, 20);
                            setCookie("CINEMA_PASSWORD", password, 20);
                            // this.props.history.push('/sysadmin');
                            routerSkip(msg,Tag);
                        }
                        else {
                            routerFailSkip();
                        }
                    })
                    .catch(function (error) {
                        alert('登陆失败');
                        routerFailSkip();

                    });

            }



        return   <div style={{display:'flex',justifyContent:'center',alignItems:'center'}}>
            <div>
                <p>del...... </p>

            </div>
        </div>
    }

}
const mapStateToProps=state=>({
    loginPrivate:state.loginPrivate
})
export default connect(mapStateToProps) (LoginDelOption);