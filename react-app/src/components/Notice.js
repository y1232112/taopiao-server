import React from "react";
import {connect} from "react-redux";
import {getNotice, postAdd, postCommon} from "../apis/data";
import {noticeApi, updateNoticeApi} from "../apis/api";
import $ from "jquery";
class Notice extends React.Component{
    componentDidMount() {
        getNotice(noticeApi,this.props.cinema[0].cinema_id)
    }

    handleClick=()=>{
         console.log("-----00---"+$("#text_a1").val().trim())
        console.log("-----00---"+this.props.notice)
        let json={
             "params":{
                 "cinema_id":this.props.cinema[0].cinema_id,
                 "notice":$("#text_a1").val().trim()
             }

        }
        postCommon(updateNoticeApi,json)
    }
    render() {
        return <div>
            <div>{this.props.notice==""?"你还没有发布公告":<label>你可以更新公告</label>}</div>
          <textarea style={{width:"500px"}} id={"text_a1"} defaultValue={this.props.notice}/>
          <div>
              <button className={"myBtn"} onClick={()=>this.handleClick()}>更新公告</button>
          </div>
        </div>
    }
}
const mapStateToProps=state=>({
    cinema:state.cinema,
    notice: state.notice,
})
export default connect(mapStateToProps)(Notice);