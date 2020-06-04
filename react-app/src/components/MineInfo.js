import React from "react";
import {connect} from "react-redux";
import {getNotice, postAdd, postCommon, postMyInfo} from "../apis/data";
import {noticeApi, updateMineInfoApi, updateNoticeApi} from "../apis/api";
import $ from "jquery";
import dateTimeUtil from "../utils/dateTimeUtil";
import md5 from "js-md5";
import {salt} from "../constants/const";
class MineInfo extends React.Component{
    componentDidMount() {
        getNotice(noticeApi,this.props.cinema[0].cinema_id)
    }

    handleClick=()=>{
          let bth=$("#bth").val();
        let nm=$("#nm").val().trim();
        let ph=$("#ph").val().trim();
        let se=$("#se").val().trim();
        let rn=$("#rn").val().trim();
        let pw=$("#pw").val().trim();
        let md5Password=md5(pw+salt);
        if (nm==null||nm==""||ph==null||ph==""||se==null||se==""||rn==null||rn==""){
            alert("除了密码请不要输入空值");
            return;
        }
        let ps;
        if (pw==null||pw==""){
              ps=this.props.admin.password;
        }else {
            ps=md5Password;
        }
        let date=/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
        let regExp1=new RegExp(date);
        if (!regExp1.test(bth)){
            alert("日期格式不正确")
            return;
        }
        let json={
            "params":{
                "cinema_admin_id":this.props.admin.cinema_admin_id,
                "birth":bth,
                "nick_name":nm,
                "phone":ph,
                "sex":se,
                "real_name":rn,
                "password":ps
            }

        }
        postMyInfo(updateMineInfoApi,json)
    }
    render() {
        let admin=this.props.admin;
        let u;
        if (this.props.admin.avatar==null){
            u=this.props.admin.avatar
        }else {
            u="img/defaultavatar.jpg"
        }
        console.log("-----00---"+admin)
        return <div >
            <div style={{textAlign:"center"}}>
                <div style={{width:"150px",textAlign:"right"}}> <label>头像</label></div>
                <div style={{width:"250px"}}><label><img src={admin.avatar}
                                                         style={{width:"50px",height:"50px"}}/></label></div>
            </div>
             <div style={{width:"400px",display:"flex"}}>

                 <div style={{width:"150px"}} id={"mine_label_font"}>

                     <div style={{width:"150px",textAlign:"right",paddingRight:"5px"}}> <label>id:</label></div>

                 <div style={{width:"150px",textAlign:"right",paddingRight:"5px"}}> <label>出生日期:</label></div>
                 <div style={{width:"150px",textAlign:"right",paddingRight:"5px"}}> <label>昵称:</label></div>
                 <div style={{width:"150px",textAlign:"right",paddingRight:"5px"}}>      <label>电话:</label></div>
                 <div style={{width:"150px",textAlign:"right",paddingRight:"5px"}}>  <label>性别:</label></div>
                 <div style={{width:"150px",textAlign:"right",paddingRight:"5px"}}>  <label>真实姓名:</label></div>
                 <div style={{width:"150px",textAlign:"right",paddingRight:"5px"}}> <label>密码:</label></div>
                 </div>
                 <div style={{width:"250px",paddingLeft:"10px"}}>
                     <div style={{width:"250px"}}><label>{admin.cinema_admin_id}</label></div>
                     <div style={{width:"250px"}}><input id={"bth"} defaultValue={dateTimeUtil(admin.birth)}/></div>
                     <div style={{width:"250px"}}> <input id={"nm"} defaultValue= {admin.nick_name}/></div>
                     <div style={{width:"250px"}}> <input id={"ph"} defaultValue= {admin.phone}/></div>
                     <div style={{width:"250px"}}>   <input id={"se"} defaultValue={admin.sex}/></div>
                     <div style={{width:"250px"}}>  <input id={"rn"} defaultValue={admin.real_name}/></div>
                     <div style={{width:"250px"}}>  <input id={"pw"} type={"password"}/></div>
                 </div>
             </div>

            <div style={{width:"400px",textAlign:"center"}}>
                <button className={"myBtn"} onClick={()=>this.handleClick()}>更新</button>
            </div>
        </div>
    }
}
const mapStateToProps=state=>({
    cinema:state.cinema,
     admin:state.cinemaAdmin
})
export default connect(mapStateToProps)(MineInfo);