import React from "react";

import {store} from "../index";
import {connect} from "react-redux";
import * as types from '../constants/actionTypes'


class LoginContainer extends React.Component{

    constructor(props) {
        super(props);
        this.state={LoginTag:true};
        this.handleClick=this.handleClick.bind(this)
    }

    //选择登陆身份
    handleClick=(e,Tag)=>{
       this.setState({LoginTag: !Tag})
    }


    handleClickLoginIn=(e,Tag,admin,password,repassword)=>{
        // console.log('----admin---',admin.value);
        // console.log('----pass---',password.value);
        if (admin.value==null||admin.value==''){
            alert('账号不能为空');
            return;
        }
        if (password.value==null||password.value==''){
            alert('密码不能为空');
            return;
        }
        if (repassword.value==null||repassword.value==''){
            alert('请确认您的密码');
            return;
        }
        if (password.value!=repassword.value){
            alert('前后输入的密码不一致')
            return;
        }
         store.dispatch({
            type:types.LOGIN_PRIVITE_SKIP,
                loginPrivate:3
        })
        //系统模块状态1,3，影城模块状态为2,3======》0为初始状态不能访问正常页面
        //状态3仅登录时修改，以此访问登录处理页面，防止路由传参，undefined错误
        //Tag为true,!Tag为false
        //Tag表示影城管理员模块
        //!Tag表示系统管理员模块


        //路由跳转传参
        this.props.history.push({pathname:'/delLogin',state:{admin:admin.value,password:password.value,Tag:Tag}});

    }
    render() {

      const bodyStyle={
        display:'flex',
        justifyContent:'center',
        alignItems:'center',
        width: '100%',
        height: "100vh",
        justifyItems:'center',
        backgroundSize:'cover',


    };
    const loginWarpStyle={

        fontWeight:'bold',
        marginTop:'60px',
        width:'600px',
        // height:'420px',

        display: 'block'
    };
    const infoPaddingStyle={
        margin: '100px'
    };
    const btnStyle={
        width:'400px',
        height:'35px',
        fontWeight:'bold',
        // backgroundColor: 'rgb(113,55,35)',

        border:'none',
        borderRadius: '4px'

    };
    const inputStyle={
        width:'300px',
        height:'28px',


    };
  let tag;

    return <div style={bodyStyle} id={'bg'}>
        <div style={loginWarpStyle} id='login'>
            <div style={infoPaddingStyle}>
                <div style={{textAlign:"center",fontSize:'28px',fontWeight:'bold'}}>淘票后台系统登录</div>
                <div>
                    <form >
                        <div  style={{textAlign:'right'}}>
                            <div style={{marginTop:'25px'}}>
                                <label style={{width:'100px'}}>管理员账号：</label>
                                <input placeholder={'请输入昵称'} ref={'admin'} type={'text'} className='myinput'  style={inputStyle}/>
                            </div>
                            <div style={{marginTop:'25px'}}>
                                <label style={{width:'100px'}}>密码：</label>
                                <input placeholder={'请输入密码'} ref={'password'} type='password' className='myinput' style={inputStyle}/>
                            </div>
                            <div style={{marginTop:'25px'}}>
                                <label style={{width:'100px'}}>确认密码：</label>
                                <input placeholder={'请再次输入您的密码'} ref={'repassword'} type='password' className='myinput' style={inputStyle}/>
                            </div>
                            <div style={{textAlign:'left',marginTop:'25px'}}>

                                <input checked={this.state.LoginTag} name={'cinemaadmin'}  type={'radio'}
                                       onClick={(e1)=>this.handleClick(e1,this.state.LoginTag)}/>影城管理员

                                <input checked={!this.state.LoginTag} name={'sysadmin'}  type={'radio'}
                                       onClick={(e2)=>this.handleClick(e2,this.state.LoginTag)}/>系统管理员


                            </div>
                        </div>

                        <div style={{marginTop:'25px',textAlign:'center'}}><button id='btn'
                                                                                   onClick={e3=>this.handleClickLoginIn(e3,this.state.LoginTag
                        ,this.refs.admin,this.refs.password,this.refs.repassword)}
                                                                                   style={btnStyle}>登录</button></div>
                    </form>


                </div>
            </div>
        </div>
    </div>

}



}
const mapStateToProps=state=>({
    loginPrivate:state.loginPrivate
})
export default connect(mapStateToProps)(LoginContainer);