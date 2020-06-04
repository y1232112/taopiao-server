import React from "react";
import {connect} from "react-redux";
import $ from "jquery";
import {postAdd} from "../apis/data";
import {addServeApi} from "../apis/api";
class AddServe extends React.Component{
    handleClickAdd=(v2)=>{

        let p1=v2.value.trim();
        if (p1==''||p1==null){
            alert('不能为空')
            return ;
        }

        let json={
            "params":{
                "cinema_id":this.props.cinema[0].cinema_id,
                "serve_type":$("#serveType").val(),
                "description":p1
            }
        }
        postAdd(addServeApi,json)
    }
    handleClickCancel=()=>{
        $(".put").val('');
    }

    render() {
        // console.log("------+++"+this.props.serveTypes[0])

        return <div>
            <div className={'addBar'}>
                <div style={{textAlign:'center',fontWeight:'bold'}}>添加服务</div>
                <div><label className={'addLabel'}>服务类型：</label><select id={"serveType"}>
                    <option value={"改签"}>改签</option>
                    <option value={"退"}>退</option>
                    <option value={"3D眼镜"}>3D眼镜</option>
                </select></div>
                <div><label  className={'addLabel'}>服务说明：</label><input  ref={'put1'} className={'addInput'}/> </div>

                <div className={'add_button_row'}><button className={'dbutton'}
                                                          onClick={()=>this.handleClickAdd(this.refs.put1)}>保存</button>
                    <button
                        onClick={()=>this.handleReset()}
                        className={'dbutton'}>取消</button></div>

            </div>
        </div>
    }
}
const mapStateToProps=state=>({

    cinema:state.cinema,
})
export default connect(mapStateToProps)(AddServe);