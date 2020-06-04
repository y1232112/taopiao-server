import React from "react";
import $ from "jquery";
import {postAdd} from "../apis/data";
import {addRoleApi} from "../apis/api";
import alert from "../utils/alert";

class AddRole extends React.Component{
    handleClickAddRole=async (put1,put2,put3)=>{
        let match = /[0-9]$/;

        let p1=put1.value.trim();
        let p2=put2.value.trim();
        let p3=put3.value.trim();
        if (match.test(p1)&&match.test(p2)) {


            if (p1 == '' || p1 == null) {
                alert('不能为空')
                return;
            }
            if (p2 == '' || p2 == null) {
                alert('不能为空')
                return;
            }
            if (p3 == '' || p3 == null) {
                alert('不能为空')
                return;
            }
            let json = {
                "version": 0.1,
                "params": {
                    "movie_crew_id": p1,
                    "film_id": p2,
                    "role": p3
                }

            }
            // console.log('---add---',json)
            await postAdd(addRoleApi, json);
        }else {
            alert("id请输入猜数字")
        }
    }
    //重置
    handleReset=()=>{
        console.log('---reset---')
        $(".addInput").val('');

    }
    render() {

        return <div>
            <div className={'addBar'}>
                <div style={{textAlign:'center',fontWeight:'bold'}}>添加角色</div>

                <div><label  className={'addLabel'}>影员id：</label><input  ref={'put1'} className={'addInput'}/> </div>

                <div><label  className={'addLabel'}>电影id：</label><input  ref={'put2'} className={'addInput'}/> </div>


                <div><label  className={'addLabel'}>饰演角色：：</label><input  ref={'put3'} className={'addInput'}/> </div>




                <div className={'add_button_row'}><button className={'dbutton'}
                                                          onClick={()=>this.handleClickAddRole(this.refs.put1,this.refs.put2,this.refs.put3)}>保存</button>
                    <button
                        onClick={()=>this.handleReset()}
                        className={'dbutton'}>取消</button></div>

            </div>
        </div>
    }
}
export default AddRole;