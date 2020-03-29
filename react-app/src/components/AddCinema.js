import React from "react";
import {getAllCinemas, getCinemaPage, postAdd} from "../apis/data";
import {addCinemaApi, addMovieCrewApi, cinemaListApi, cinemaPageApi} from "../apis/api";

import $ from "jquery";
import {connect} from "react-redux";
class AddCinema extends React.Component{
    handleClickAddCinema=async (put1,put2,put3,put4,put5)=>{
        if (put1.value==''||put1.value==null){
            alert('影院名称不能为空')
            return ;
        }
        if (put2.value==''||put2.value==null){
            alert('省份不能为空')
            return ;
        }
        if (put3.value==''||put3.value==null){
            alert('城市不能为空')
            return ;
        }
        if (put4.value==''||put4.value==null){
            alert('区县不能为空')
            return ;
        }
        if (put5.value==''||put5.value==null){
            alert('请输入详细地址')
            return ;
        }
        let json={
            "version":0.1,
            "params":{
                "cinema_name":put1.value,
                "province":put2.value,
                "city":put3.value,
                "county":put4.value,
                "address":put5.value
            }

        }
        console.log('---add---',json)
      await postAdd(addCinemaApi,json);
        // getAllCinemas(cinemaListApi)
        getCinemaPage(cinemaPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
    }
    //重置
    handleReset=()=>{
        console.log('---reset---')
        $(".addInput").val('');

    }
    render() {
        return <div>
            <div className={'addBar'}>
                <div style={{textAlign:'center',fontWeight:'bold'}}>添加影院</div>

                <div><label className={'addLabel'}>影院名称：</label><input ref={'put1'} className={'addInput'}/> </div>
                <div><label className={'addLabel'}>所在省份：</label><input ref={'put2'} className={'addInput'}/>  </div>
                <div><label className={'addLabel'}>所在城市：</label><input ref={'put3'} className={'addInput'} /></div>
                <div><label className={'addLabel'}>所在区县：</label><input ref={'put4'} className={'addInput'}/></div>
                <div><label className={'addLabel'}>详细地址：</label><input ref={'put5'} className={'addInput'}/> </div>

                <div className={'add_button_row'}>
                    <button className={'dbutton'}

                onClick={()=>this.handleClickAddCinema(
                    this.refs.put1,
                    this.refs.put2,
                    this.refs.put3,
                    this.refs.put4,
                    this.refs.put5,
                )}>保存</button><button
                    onClick={()=>this.handleReset()}
                    className={'dbutton'}>取消</button></div>

            </div>
        </div>;
    }

}
const mapStateToProps=state=>({
    pageInfo:state.cinemaPageInfo
})
export default connect(mapStateToProps)(AddCinema);