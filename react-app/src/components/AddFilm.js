import React from "react";
import {getCookie} from "../utils/cookieUtils";
import Axios from "axios";
import {addFilmApi, filmListApi, filmPageApi} from "../apis/api";
import getAllFilms, {getFilmPage, postAdd} from "../apis/data";
import $ from "jquery";
import {connect} from "react-redux";
class AddFilm extends React.Component{


 handleClickAddFilm=async (f1,f2,f3,f4,f5,f6,f7,f8,f9,f10,f11,f12)=>{
     if (f1.value==''||f1==null){
         alert('电影名不能为空')
         return ;
     }
     if (f2.value==''||f2==null){
         alert('导演不能为空')
         return ;
     }
     if (f3.value==''||f3.value==null){
         alert('请输入电影长度')
         return ;
     }
     if(f4.value==''||f4.value==null){
         alert('请输入电影状态')
         return ;
     }
     if (f5.value==''||f5.value==null){
         alert('请输入出产地')
         return ;
     }
     if (f6.value==''||f6.value==null){
         alert('请输入电影简介')
         return ;
     }
     if (f7.value==''||f7.value==null){
         alert('请输入电影状态')
         return ;
     }

     let json= {
         "version": 0.1,
         "params": {
             "film_name": f1.value,
             "director": f2.value,
             "film_length": f3.value,
             "status": f4.value,
             "product_area": f5.value,
             "brief": f6.value,
             "type": f7.value,
             "public_date": f8.value,
             "wish_num": f9.value,
             "score": f10.value,
             "actor": f11.value,
             "img": f12.value,
         }
     }
     console.log('---add---',json)
    await postAdd(addFilmApi,json);
     // getAllFilms(filmListApi)
     getFilmPage(filmPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
 }
    //
    handleReset=()=>{
        console.log('---reset---')
        $(".addInput").val('');

    }
    render() {


      return <div>
               <div className={'addBar'}>
                   <div style={{textAlign:'center',fontWeight:'bold'}}>添加电影</div>

                   {console.log('-----------cookie---',getCookie("SYS_ADMIN"))}
                   {console.log('-----------cookie---',getCookie("SYS_PASSWORD"))}
                   <div><label  className={'addLabel'}>电影名称：</label><input ref={'addF1'} className={'addInput'}/> </div>
                   <div><label className={'addLabel'}>导演：</label><input ref={'addF2'} className={'addInput'}/>  </div>
                   <div><label  className={'addLabel'}>电影长度：</label><input ref={'addF3'} className={'addInput'} /></div>
                   <div><label  className={'addLabel'}>电影状态：</label><input ref={'addF4'} className={'addInput'}/></div>
                   <div><label  className={'addLabel'}>出产地区：</label><input ref={'addF5'} className={'addInput'}/> </div>
                   <div><label className={'addLabel'}>电影简介：</label><input ref={'addF6'} className={'addInput'} /></div>
                   <div><label className={'addLabel'}>类型：</label><input ref={'addF7'} className={'addInput'} /></div>
                   <div><label className={'addLabel'}>上演时间：</label><input ref={'addF8'} className={'addInput'} /></div>
                   <div><label  className={'addLabel'}>想看人数：</label><input pattern={'[0-9]'} ref={'addF9'} className={'addInput'} /></div>
                   <div><label className={'addLabel'}>综合评分：</label><input ref={'addF10'} className={'addInput'} /></div>
                   <div><label className={'addLabel'}>主演：</label><input ref={'addF11'} className={'addInput'} /></div>
                   <div><label className={'addLabel'}>图片：</label><input ref={'addF12'} className={'addInput'} /></div>
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
                       this.refs.addF10,
                       this.refs.addF11,
                       this.refs.addF12,
                   )}>保存</button><button
                       onClick={()=>this.handleReset()}
                       className={'dbutton'}>取消</button></div>

               </div>
      </div>
    }

}
const mapStateToProps=state=>({
    pageInfo:state.filmPageInfo
})
export default connect(mapStateToProps)(AddFilm);