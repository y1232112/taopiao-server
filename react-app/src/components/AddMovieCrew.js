import React from "react";
import {getAllMovieCrew, getMovieCrewPage, postAdd, postUploadImg} from "../apis/data";
import {addFilmApi, addMovieCrewApi, movieCrewListApi, movieCrewPageApi, postUploadImgApi} from "../apis/api";
import {store} from "../index";
import * as types from '../constants/actionTypes';
import Axios from "axios";
import {connect} from "react-redux";
import $ from 'jquery';
import {receivePostImgUrl, receiveUploadImgUrl} from "../actions";
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
                "sex":$("#select_mc").val().trim(),
            "img":this.props.postImgUrl
            }

        }
        // console.log('---add---',json)
      await postAdd(addMovieCrewApi, json)
        getMovieCrewPage(movieCrewPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
        // getAllMovieCrew(movieCrewListApi)
        store.dispatch(receivePostImgUrl(""))
    }
    //重置
    handleReset=()=>{
        console.log('---reset---')
        $(".addInput").val('');

    }

    handleChangeImg=(e)=> {

        console.log("file:",e.target.files[0],e.target.result)
        let file=e.target.files[0];
        let getUrl = null;
        const windowURL = window.URL || window.webkitURL;//实现预览
        if (window.createObjectURL != undefined) { // basic
            getUrl = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            getUrl = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            getUrl = window.webkitURL.createObjectURL(file);
            formData.append('img',file);
        }
        console.log("url file",getUrl)
        store.dispatch(receiveUploadImgUrl(getUrl))
        console.log("图片大小",file.size)
        // $("#preview").attr("src",getUrl)
        if (file.size > 102400) {
            alert('不能上传大于100k的图片')
            return;
        }
        let formData = new FormData();
        formData.append('uploadFile',file,file.name)// 通过append向form对象添加数据,可以通过append继续添加数据

        postUploadImg(postUploadImgApi,formData)

    }
    renderOpacity=()=>{
        if (this.props.upUrl==""||this.props.upUrl==undefined){
            return 0;
        }else {
            return 1;
        }
    }
    render() {

        return <div>
            <div className={'addBar'}>
                <div style={{textAlign:'center',fontWeight:'bold'}}>添加影员</div>

                <div><label  className={'addLabel'}>影员姓名：</label><input  ref={'put1'} className={'addInput'}/> </div>
                <div><label className={'addLabel'}>性别：</label><select className={'addInput'} id={"select_mc"}>
                    <option value={"男"}>男</option>
                    <option value={"女"}>女</option>
                </select> </div>
                <div><label className={'addLabel'}>图片：</label>

                    <input
                        onChange={(e)=>this.handleChangeImg(e)}
                        id={'input_file'}
                        ref={'addF12'} className={'addInput'} type={'file'} name={'img'} multiple={'multiple'}
                        accept={"image/gif,image/jpeg,image/jpg,image/png,image/svg"}/>



                </div>

                <div>
                    <div style={{border:'1px solid #777',width:'100px',height:'120px',marginLeft:'120px'}}>
                        <img style={{opacity:this.renderOpacity()}} id={'preview'} src={this.props.upUrl} id={'img0'} width={'100px'} height={'120px'}/>

                    </div>

                </div>
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
    pageInfo:state.movieCrewPageInfo,
    postImgUrl: state.postImgUrl,
    upUrl: state.upUrl
})
export default  connect(mapStateToProps)(AddMovieCrew);