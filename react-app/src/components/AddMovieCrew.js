import React from "react";
import {getAllMovieCrew, getMovieCrewPage, postAdd} from "../apis/data";
import {addFilmApi, addMovieCrewApi, movieCrewListApi, movieCrewPageApi} from "../apis/api";
import {store} from "../index";
import * as types from '../constants/actionTypes';
import Axios from "axios";
import {connect} from "react-redux";
import $ from 'jquery';
class AddMovieCrew extends React.Component{
    //sync 加上上await等待此步完成才可进行下一步操作，以便操作完成时才可请求刷新数据
    handleClickAddMovieCrew=async (put1,put2)=>{
        if (put1.value==''||put1.value==null){
            alert('姓名不能为空')
            return ;
        }
        let json={
            "version":0.1,
            "params":{
                "movie_crew_name":put1.value,
            "img":put2.value
            }

        }
        // console.log('---add---',json)
      await postAdd(addMovieCrewApi, json)
        getMovieCrewPage(movieCrewPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
        // getAllMovieCrew(movieCrewListApi)

    }
    //重置
    handleReset=()=>{
        console.log('---reset---')
        $(".addInput").val('');

    }
    render() {

        return <div>
            <div className={'addBar'}>
                <div style={{textAlign:'center',fontWeight:'bold'}}>添加影员</div>

                <div><label  className={'addLabel'}>影员姓名：</label><input  ref={'put1'} className={'addInput'}/> </div>
                <div><label  className={'addLabel'}>影员相片：</label><input  ref={'put2'} className={'addInput'}/>  </div>
                <div className={'add_button_row'}><button className={'dbutton'}
                onClick={()=>this.handleClickAddMovieCrew(this.refs.put1,this.refs.put2)}>保存</button>
                    <button
                        onClick={()=>this.handleReset()}
                        className={'dbutton'}>取消</button></div>

            </div>
        </div>
    }

}
const mapStateToProps=state=>({
    pageInfo:state.movieCrewPageInfo
})
export default  connect(mapStateToProps)(AddMovieCrew);