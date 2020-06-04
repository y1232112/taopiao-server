import React from "react";
import {getCookie} from "../utils/cookieUtils";
import Axios from "axios";
import {addFilmApi, filmListApi, filmPageApi, postUploadImgApi} from "../apis/api";
import getAllFilms, {getFilmPage, postAdd, postUploadImg} from "../apis/data";
import $ from "jquery";
import {connect} from "react-redux";
import {getObjectURL} from "../utils/imgUtils";
import {store} from "../index";
import {receivePostImgUrl, receiveUploadImgUrl} from "../actions";
import {validateDate, validateDateTime} from "../utils/dateTimeUtil";
class AddFilm extends React.Component{


 handleClickAddFilm=async (f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11)=>{
     console.log('refs===put',f1.value.trim())
     if (f1.value.trim()==''||f1.value==null){
         alert('电影名不能为空')
         return ;
     }
     if (f2.value.trim()==''||f2.value==null){
         alert('导演不能为空')
         return ;
     }
     if (f3.value.trim()==''||f3.value==null){
         alert('请输入电影长度')
         return ;
     }

     if (f4.value.trim()==''||f4.value==null){
         alert('请输入出产地')
         return ;
     }
     if (f5.value.trim()==''||f5.value==null){
         alert('请输入电影简介')
         return ;
     }
     if (f6.value.trim()==''||f6.value==null){
         alert('请输入电影类型')
         return ;
     }
    if (!validateDate(f7.value.trim())){
        alert('上映日期格式不对')
        return ;
    }
    if (!validateDate(f8.value.trim())){
         alert('下档日期格式不对')
         return ;
     }
     // let match = /^[1-9]\d*$/;
     // let march3=/^[1-9]\d*\.\d+$/;
     // let match4=/0\.\d+$/;
     // // console.log("f10",f10.value.trim())
     // if (!match.test(f9.value.trim())){
     //     alert("想看人数请输入整数")
     //     return ;
     // }
     // if(!march3.test(f10.value.trim())&&!match.test(f10.value.trim())&&!match4.test(f10.value.trim())){
     //     alert("综合评分格式不正确")
     //     return;
     // }
     let json= {
         "version": 0.1,
         "params": {
             "film_name": f1.value,
             "director": f2.value,
             "film_length": f3.value,
             "product_area": f4.value,
             "brief": f5.value,
             "type": f6.value,
             "public_date": f7.value,
             "end_date": f8.value,
             "actor": f9.value,
             "img": this.props.postImgUrl
         }
     }
     // console.log('---add---',json)
    await postAdd(addFilmApi,json);
     // getAllFilms(filmListApi)
     getFilmPage(filmPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
     store.dispatch(receivePostImgUrl(""))

 }
    //
    handleReset=()=>{
        console.log('---reset---')
        $(".addInput").val('');

    }
    handleChangeImg=(e)=> {

       console.log("file:",e.target.files[0],e.target.result)
        let file=e.target.files[0];
        let getUrl = null;
        const windowURL = window.URL || window.webkitURL;//实现预览
        if (window.createObjectURL !== undefined) { // basic
            getUrl = window.createObjectURL(file);
        } else if (window.URL !== undefined) { // mozilla(firefox)
            getUrl = window.URL.createObjectURL(file);
        } else if (window.webkitURL !== undefined) { // webkit or chrome
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


      return <div id={"add_module"}>
               <div className={'addBar'}>
                   <div style={{textAlign:'center',fontWeight:'bold'}}>添加电影</div>

                   {console.log('-----------cookie---',getCookie("SYS_ADMIN"))}
                   {console.log('-----------cookie---',getCookie("SYS_PASSWORD"))}
                   <div><label  className={'addLabel'}>电影名称：</label><input ref={'addF1'} className={'addInput'}/> </div>
                   <div><label className={'addLabel'}>导演：</label><input ref={'addF2'} className={'addInput'}/>  </div>
                   <div><label  className={'addLabel'}>电影长度：</label><input ref={'addF3'} className={'addInput'} /></div>

                   <div><label  className={'addLabel'}>出产地区：</label><input ref={'addF4'} className={'addInput'}/> </div>
                   <div style={{height:"155px"}} ><label className={'addLabel'}>电影简介：</label><textarea ref={'addF5'} className={'addInput1'} /></div>

                   <div><label className={'addLabel'}>类型：</label><input ref={'addF6'} className={'addInput'} /></div>
                   <div><label className={'addLabel'}>上演时间：</label><input ref={'addF7'} className={'addInput'} /></div>
                   <div><label  className={'addLabel'}>下档期日：</label><input ref={'addF8'} className={'addInput'} /></div>
                   <div><label className={'addLabel'}>主演：</label><input ref={'addF9'} className={'addInput'} /></div>
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


                   <div className={'add_button_row'}>
                       <button className={'dbutton'}

                   onClick={()=>this.handleClickAddFilm(
                       this.refs.addF1,
                       this.refs.addF2,
                       this.refs.addF3,
                       this.refs.addF4,
                       this.refs.addF5,
                       this.refs.addF6,
                       this.refs.addF7,
                       this.refs.addF8,
                       this.refs.addF9,


                   )}>保存</button><button
                       onClick={()=>this.handleReset()}
                       className={'dbutton'}>取消</button></div>

               </div>
      </div>
    }

}
const mapStateToProps=state=>({
    pageInfo:state.filmPageInfo,
    upUrl: state.upUrl,
    postImgUrl: state.postImgUrl
})
export default connect(mapStateToProps)(AddFilm);