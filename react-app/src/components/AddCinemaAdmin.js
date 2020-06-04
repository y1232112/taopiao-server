import React from "react";
import {connect} from "react-redux";
import {getCinemaAdminPage, getCinemaPage, postAdd, postUploadImg} from "../apis/data";
import {addCinemaAdminApi, addCinemaApi, cinemaAdminPageApi, cinemaPageApi, postUploadImgApi} from "../apis/api";
import $ from "jquery";
import {VERSION} from "../constants/const";
import {store} from "../index";
import {receivePostImgUrl, receiveUploadImgUrl} from "../actions";
class AddCinemaAdmin extends React.Component{
    handleClickAddCinema=async (put1,put2,put3,put4)=>{
        if (put1.value.trim()==''||put1.value.trim()==null){
            alert('昵称不能为空')
            return ;
        }
        if (put2.value.trim()==''||put2.value.trim()==null){
            alert('电话不能为空')
            return ;
        }
        if (put3.value.trim()==''||put3.value.trim()==null){
            alert('真实姓名不能为空')
            return ;
        }
        if (put4.value.trim()==''||put4.value.trim()==null){
            alert('出生日期不能为空')
            return ;
        }

        let json={
            "version":VERSION,
            "params":{
                "nick_name":put1.value.trim(),
                "phone":put2.value.trim(),
                "real_name":put3.value.trim(),
                "birth":put4.value.trim(),
                "sex":$("#select_ca").val().trim(),
                "avatar":this.props.postImgUrl
            }

        }
        console.log('---add---',json)
        await postAdd(addCinemaAdminApi,json);
        // getAllCinemas(cinemaListApi)
        // getCinemaAdminPage(cinemaAdminPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
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
                <div style={{textAlign:'center',fontWeight:'bold'}}>添加影院</div>

                <div><label className={'addLabel'}>昵称：</label><input ref={'put1'} className={'addInput'}/> </div>
                <div><label className={'addLabel'}>电话：</label><input ref={'put2'} className={'addInput'}/>  </div>
                <div><label className={'addLabel'}>真实姓名：</label><input ref={'put3'} className={'addInput'} /></div>
                <div><label className={'addLabel'}>出生日期：</label><input ref={'put4'} className={'addInput'}/></div>
                <div><label className={'addLabel'}>性别：</label><select className={'addInput'} id={"select_ca"}>
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
                <div className={'add_button_row'}>
                    <button className={'dbutton'}

                            onClick={()=>this.handleClickAddCinema(
                                this.refs.put1,
                                this.refs.put2,
                                this.refs.put3,
                                this.refs.put4

                            )}>保存</button><button
                    onClick={()=>this.handleReset()}
                    className={'dbutton'}>取消</button></div>

            </div>
        </div>;
    }
}
const mapStateToProps=state=>({
    pageInfo:state.cinemaAdminPageInfo,
    postImgUrl: state.postImgUrl,
    upUrl: state.upUrl
})
export default connect(mapStateToProps) (AddCinemaAdmin);