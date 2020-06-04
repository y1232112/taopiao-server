import React from "react";
import {
    getAllMovieCrew,
    getCinemaPage,
    getDelete,
    getFilmPage,
    getMovieCrewPage,
    postEdit,
    postUploadImg
} from "../apis/data";
import {deleteMovieCrewApi, modifyMovieCrewApi, movieCrewListApi, postUploadImgApi} from "../apis/api";
import * as sysType from "../constants/const";
import $ from "jquery";
import {store} from "../index";
import {
    checkedList,
    getCinemaPageInfo,
    getMovieCrewPageInfo,
    receiveCinemas,
    receiveMovieCrew, receivePostImgUrl,
    receiveUploadImgUrl
} from "../actions";
import {connect} from "react-redux";
import * as API from "../apis/api";
import alert from "../utils/alert";
import {queryList, queryPageInfo} from "../actions/pageInfo";
class EditMovieCrew extends React.Component{
    constructor(props, context) {
        super(props, context);
        this.state={
            isDialog:false,
            dialogShow:<div></div>,
            isDeleteDialog:false,
            deleteKey:null,
            clickPageX:null,
            clickPageY:null,
            checkBoxList:[]
        }
    }
// shouldComponentUpdate(nextProps, nextState, nextContext) {
//         if (nextProps!==this.props||nextState!==this.state){
//             return true
//         }else return false
// }
    renderOpacity=()=>{
        if (this.props.upUrl==""||this.props.upUrl==undefined){
            return 0;
        }else {
            return 1;
        }
    }

    handleChangeImg=(e)=> {
        store.dispatch(receiveUploadImgUrl(""));
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
        $("#preview").attr('src',getUrl)
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


    handleCancelEdit=()=>{
        this.setState({isDialog:false,dialogShow:<div></div>})
        $("#input_file").val("");
        store.dispatch(receiveUploadImgUrl(""))
    }
    handleClick1(data){

        // {console.log('---------------',data)}
        this.setState({
            dialogShow:  <div id={'dialogWrap'} style={{width:'322px',margin:'0 auto'}}>
                <div id={"edit_style"}>
                <div><label  className={'dialogLabel'}>影员ID：</label><input id={'edit1'} value={data.data.movie_crew_id} className={'dialogInput1'}/></div>
                <div><label className={'dialogLabel'}>影员名称：</label><input id={'edit2'} className={'dialogInput'} defaultValue={data.data.movie_crew_name}/></div>
                    <div><label className={'dialogLabel'}>性别：</label><input id={'edit3'} className={'dialogInput'} defaultValue={data.data.sex}/></div>

                    <div><label className={'dialogLabel'}>影员照片：</label>    </div>
                    <div style={{border:'#777 1px solid',width:'80px',height:'100px',marginLeft:'120px'}}>
                        {(data.data.img=="null"||data.data.img==null||data.data.img.trim()=='')?<img id={"img_1"} src={''} width={'80px'} height={'100px'}
                                                                                                     style={{opacity:'0'}}/>:<img id={"img_1"} src={data.data.img} width={'80px'} height={'100px'}/>}</div>
                </div>
            </div>

        });
        this.setState({isDialog:true})
    }
    handleclick2=(key,e)=>{

       let obj=document.getElementById(e.currentTarget.id);
        // console.log('------td----id-----',obj.scrollTop)
        // console.log('------e----page-----',e.pageX,e.pageY+'px')

       // 进行显示删除的弹窗操作
       this.setState({
           isDeleteDialog:true,
           deleteKey:key,
           clickPageX:e.pageX-120+'px',
           clickPageY:e.pageY-25+'px',
           dialogShow:<div></div>,
       })

        // console.log('-------my---key-----',key)
    }
    //对删除进行确认,    //sync 加上上await等待此步完成才可进行下一步操作，以便操作完成时才可请求刷新数据
    ClickConfirmDelete=async (key)=>{
        // console.log('---api+key---',key)
      await getDelete(deleteMovieCrewApi,key);
        this.setState({isDeleteDialog:false})
    //刷新页面
    //     getAllMovieCrew(movieCrewListApi)
        getMovieCrewPage(API.movieCrewPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
    }
    //提交编辑
    handleEdit=async ()=>{
         if ($("#edit3").val().trim()!=="男"&&$("#edit3").val().trim()!=="女"){
             alert("请输入正确的性别");
             return ;

         }
         let url=this.props.postImgUrl==""?$("#img_1").attr("src"):this.props.postImgUrl;
         console.log("-------post img src url",this.props.postImgUrl)
        console.log("-------post img src ",url)

        let json={
            "version":sysType.VERSION,
            "params":{
                movie_crew_id:$("#edit1").val().trim(),
                movie_crew_name:$("#edit2").val().trim(),
                sex:$("#edit3").val().trim(),
               img:url
            }
        }

       await postEdit(modifyMovieCrewApi,json)
     // getAllMovieCrew(movieCrewListApi)
        getMovieCrewPage(API.movieCrewPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
        this.setState({isDialog:false,dialogShow:<div></div>})

store.dispatch(receivePostImgUrl(""))
        store.dispatch(receiveUploadImgUrl(""))
        $("#input_file").val("");

    }
    //监听性选择Box
    handleChangeBox=(e,preChecked)=>{

        let tempSet;
        if(e.currentTarget.checked==true){
            preChecked.push(e.currentTarget.value)
            tempSet=new Set(preChecked);
            let currentChecked=Array.from(tempSet);
            this.setState({checkBoxList:currentChecked})
            store.dispatch(checkedList(currentChecked))
            console.log('---------check box----',currentChecked)
        }
        if (e.currentTarget.checked==false){
            let tempArray=[];
            if (preChecked.length==1){
                if (preChecked[0]=e.currentTarget.value){
                    tempArray=[]
                }
            }else {
                for (let i=0;i<preChecked.length;i++){
                    if (preChecked[i]!=e.currentTarget.value){
                        tempArray.push(preChecked[i]);


                    }
            }


            }
            this.setState({checkBoxList:tempArray})
            store.dispatch(checkedList(tempArray))
            console.log('----currentBox---',tempArray)
        }


    }
    //弹窗显示
    dialog=(Tag)=>{
        if (Tag==false){
            return 'none'
        }
        else {
            return 'flex'
        }
    }
    handleClickSpanNumber=(e)=>{
        console.log('--page span number-',e.currentTarget.innerHTML)
        if (e.currentTarget.innerHTML==this.props.pageInfo.currentPage){
            alert("已经是第"+e.currentTarget.innerHTML+"页")
        }else {
            if(this.props.queryStatusMovieCrew===1){
                store.dispatch(receiveMovieCrew(queryList(this.props.queryMovieCrewList,e.currentTarget.innerHTML, this.props.pageInfo.pageSize)))
                store.dispatch(getMovieCrewPageInfo(queryPageInfo(this.props.queryMovieCrewList,e.currentTarget.innerHTML, this.props.pageInfo.pageSize)))
            }else getMovieCrewPage(API.movieCrewPageApi, e.currentTarget.innerHTML, this.props.pageInfo.pageSize)

        }
    }
    //处理首页和尾页
    handleClickFirstAndLast=(e)=>{
        if (e.currentTarget.innerHTML==="首页"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            } else{
                if (this.props.queryStatusMovieCrew===1){
                    store.dispatch(receiveMovieCrew(queryList(this.props.queryMovieCrewList,1, this.props.pageInfo.pageSize)))
                    store.dispatch(getMovieCrewPageInfo(queryPageInfo(this.props.queryMovieCrewList,1, this.props.pageInfo.pageSize)))

                }else {
                    getMovieCrewPage(API.movieCrewPageApi,1,this.props.pageInfo.pageSize)
                }
            }
        }else if (e.currentTarget.innerHTML==="尾页"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else {
                if (this.props.queryStatusMovieCrew===1){
                    store.dispatch(receiveMovieCrew(queryList(this.props.queryMovieCrewList,this.props.pageInfo.totalPage, this.props.pageInfo.pageSize)))
                    store.dispatch(getMovieCrewPageInfo(queryPageInfo(this.props.queryMovieCrewList,this.props.pageInfo.totalPage, this.props.pageInfo.pageSize)))

                }else {
                    getMovieCrewPage(API.movieCrewPageApi,this.props.pageInfo.totalPage,this.props.pageInfo.pageSize)
                }
            }
        }
    }
    //处理上一页和下一页
    handleClickPreAndNext=(e)=>{
        if (e.currentTarget.innerHTML==="&lt;&lt;"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            }else {
                if (this.props.queryStatusMovieCrew===1){
                    store.dispatch(receiveMovieCrew(queryList(this.props.queryMovieCrewList,this.props.pageInfo.currentPage-1, this.props.pageInfo.pageSize)))
                    store.dispatch(getMovieCrewPageInfo(queryPageInfo(this.props.queryMovieCrewList,this.props.pageInfo.currentPage-1, this.props.pageInfo.pageSize)))

                }else {
                    getMovieCrewPage(API.movieCrewPageApi,this.props.pageInfo.currentPage-1,this.props.pageInfo.pageSize)
                }

            }
        }else if (e.currentTarget.innerHTML==="&gt;&gt;"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else {
                if (this.props.queryStatusMovieCrew===1){
                    store.dispatch(receiveMovieCrew(queryList(this.props.queryMovieCrewList,this.props.pageInfo.currentPage+1, this.props.pageInfo.pageSize)))
                    store.dispatch(getMovieCrewPageInfo(queryPageInfo(this.props.queryMovieCrewList,this.props.pageInfo.currentPage+1, this.props.pageInfo.pageSize)))

                }else {
                    getMovieCrewPage(API.movieCrewPageApi,this.props.pageInfo.currentPage+1,this.props.pageInfo.pageSize)
                }

            }
        }
    }
    //渲染当页的菜单
    handleChangePage=(item)=>{
        if (item===this.props.pageInfo.currentPage){
            return {backgroundColor:"#80000d",color:"#ffffff",padding:"6px 10px"}
        }else return {padding:"6px 10px"}
    }
    //条件渲染的分页
    doRenderForPage=()=>{
        let arr=[];
        let t=this.props.pageInfo.currentPage;
        let tp=this.props.pageInfo.totalPage;

        console.log('-----',this.props.pageInfo.totalPage)

        if (tp<=8){
            for (let i=1;i<=tp;i++){
                arr.push(i)
            }
            return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
        }else if (11>=tp>8){

            if ((tp/2)>t){
                arr=[1,2,3,4,5,6,7,8]
                return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                    onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
            }else {
                arr=[4,5,6,7,8,9,10,11]
                return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                    onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)}
        }else if (tp>11){
            if ((tp/2)>=t){

                if (t>=3){
                    arr=[t-2,t-1,t,t+1,t+2,t+3,t+4,t+5]
                    return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                        onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }else {
                    arr=[1,2,3,4,5,6,7,8]
                    return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                        onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }
            }else if ((tp/2)<t){


                if (tp-2>=t){
                    arr=[t-5,t-4,t-3,t-2,t-1,t,t+1,t+2]
                    return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                        onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }else {
                    arr=[tp-7,tp-6,tp-5,tp-4,tp-3,tp-2,tp-1,tp]
                    return arr.map(item=> <span className={"pageSpan"}><a style={this.handleChangePage(item)}
                        onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }
            }

        }

    }
//    调整页面大小并且制定加载的页面信息
    handleClickSize=()=>{

        let size=$("#modifyPageSize").val();

        let match =/[0-9]$/;

        if (match.test(size)) {
            if (size>this.props.pageInfo.totalCount){
                alert("已超出最大的记录数，或请刷新")
                return;
            }
            if (size<5){
                alert("规定每一页的最小记录不能少于5条！！！，请重新输入")
                return;
            }
            if (this.props.queryStatusMovieCrew===1){
                store.dispatch(receiveMovieCrew(queryList(this.props.queryMovieCrewList,1, size)))
                store.dispatch(getMovieCrewPageInfo(queryPageInfo(this.props.queryMovieCrewList,1, size)))

            }else {
                getMovieCrewPage(API.movieCrewPageApi,1,size)
            }




        }else alert("请输入数字")
    }
    handleClickToPage=()=>{
        let page=$("#gotoPage").val();
        let match =/[0-9]$/;
        if (match.test(page)){
            if (page<=0){
                alert("没有这个页面！！！")
                return;
            }
            if (page>this.props.pageInfo.totalPage){
                alert("已超出最大页面，或请刷新！！！")
                return;
            }
            if (this.props.queryStatusMovieCrew===1){
                store.dispatch(receiveMovieCrew(queryList(this.props.queryMovieCrewList,page, this.props.pageInfo.pageSize)))
                store.dispatch(getMovieCrewPageInfo(queryPageInfo(this.props.queryMovieCrewList,page, this.props.pageInfo.pageSize)))

            }else {
                getMovieCrewPage(API.movieCrewPageApi,page,this.props.pageInfo.pageSize)
            }
        }else alert("请输入数字")
    }
    render() {
        console.log('---props---post img url-----',this.props.postImgUrl)

        const  dialogStyle={
            width:'100%',
            height:'100%',
            zIndex:'9999',
            position:'fixed',
            top:0,
            left:0,

            display:this.dialog(this.state.isDialog)
        }
        const deleteDialogStyle={
            width: '10%',
            height: '10%',
            backgroundColor:'#ffffff',

            top:this.state.clickPageY,
            left:this.state.clickPageX,
            position:'fixed',
            zIndex: '9999',
            display:this.dialog(this.state.isDeleteDialog)

        }
        const title=this.props.Columns.map(
            column=><th key={column.dataIndex}>{column.title}</th>
        )
        const columnLength=this.props.Columns.length;
        // console.log('----columnLength--',columnLength);


        const tableStyle={
            margin:'0 auto',
            borderCollapse:'collapse',
            borderSpacing:'0',

        }

        const myDatasource=this.props.DataSource;
        let key=0;
        let myList= myDatasource.map(data=><tr  key={data.movie_crew_id}>


                <td><input onChange={(event) => this.handleChangeBox(event,this.state.checkBoxList)} type={'checkbox'} value={data.movie_crew_id}/></td>
                <td>{data.movie_crew_id}</td>
                <td>{data.movie_crew_name}</td>
            <td>{data.sex}</td>
                <td>{(data.img=="null"||data.img==null||data.img.trim()=='')?<img src={''} width={'50px'} height={'60px'}
                                                                                  style={{opacity:'0'}}/>:<img src={data.img} width={'50px'}
                                                                                                               height={'60px'}/>}</td>

                <td ><a className={'click'} onClick={()=>this.handleClick1({data})}>编辑</a>
                    <a id={key++} style={{marginLeft:'5px'}} className={'click'}
                       onClick={(e)=>this.handleclick2({data}.data.movie_crew_id,e)}>删除</a>

                </td>
            </tr>
        )
        return <div style={tableStyle}>
{/********************************************表格**********************************/}
            <table id={"editTable"}>
            <thead> <th>选择</th>{title}<th>操作</th></thead>
            <tbody>
            {myList}
            </tbody>
        </table>
            {/******************************************分页*******************************************8*/}
            <div className={'page'}>
                <span className={"count"}>共有 <span className={"countStyle"}>{this.props.pageInfo.totalCount}</span> 条记录</span>
                <span className={"count"}>共有 <span className={"countStyle"}> {this.props.pageInfo.totalPage}</span> 页</span>
                <span className={"count"}>本页 <span className={"countStyle"}> {myDatasource.length}</span> 条数据</span>
                <span className={"sheZhiWrap"}  style={{position:"relative"}}>
                <span id={"tzSpan"} style={{position:"absolute"}}>跳转</span>
                <img className={"sheZhiBtn"} align={"AbsBottom"} src={require("../imges/tiaozhuan.png")} onClick={()=>this.handleClickToPage()}/>


            </span>
                <span  className={"to"}>至<input id={"gotoPage"} defaultValue={this.props.pageInfo.currentPage}/>页</span>
                <span className={"size"}>大小<input id={"modifyPageSize"} defaultValue={this.props.pageInfo.pageSize}/></span>
                <span className={"sheZhiWrap"}  style={{position:"relative"}}>
                <span id={"tiShiSpan"} style={{position:"absolute"}}>点击设置每页最大记录数！！！</span>
                <img className={"sheZhiBtn"} align={"AbsBottom"} src={require("../imges/shezhi.png")} onClick={()=>this.handleClickSize()}/>


            </span>
                <span className={"pageSpan"}><a onClick={(e)=>this.handleClickFirstAndLast(e)}>首页</a></span>
                <span className={"pageSpan"}><a onClick={(e)=>this.handleClickPreAndNext(e)}>{"<<"}</a></span>
                {this.doRenderForPage()}
                <span className={"pageSpan"}><a onClick={(e)=>this.handleClickPreAndNext(e)}>{">>"}</a></span>
                <span className={"pageSpan"}><a onClick={(e)=>this.handleClickFirstAndLast(e)}>尾页</a></span>
            </div>
            {/**************************************编辑时弹窗**********************************************8*/}
            <div style={dialogStyle} id={'dialog'}>
                <div className={"wrap_edt_movieCrew_dialog"}>
                    <div style={{textAlign:'center',fontWeight:'bold'}}>编辑您的选项</div>
                    <div style={{ overflowY:'scroll',height:'250px'}}>{this.state.dialogShow}</div>
                    <div style={{width:'100%',display:'block',textAlign:'center',paddingTop:'15px',backgroundColor:'#efefef'}}>

                        <div><label >更换及预览图片：</label>

                            <input
                                onChange={(e)=>this.handleChangeImg(e)}
                                id={'input_file'}
                                className={'addInput'} type={'file'} name={'img'} multiple={'multiple'}
                                accept={"image/gif,image/jpeg,image/jpg,image/png,image/svg"}/>



                        </div>

                        <div>
                            <div style={{border:'1px solid #777',width:'80px',height:'100px',marginLeft:'100px',backgroundColor:'#fff'}}>
                                {console.log("url"+this.props.postImgUrl,this.props.upUrl)}
                                <img style={{opacity:this.renderOpacity()}} id={'preview'} src={this.props.upUrl} id={'img0'} width={'80px'} height={'100px'}/>

                            </div>

                        </div>
                        <button onClick={()=>this.handleEdit()} className={'dbutton'}>确认</button>
                        <button onClick={()=>this.handleCancelEdit()} className={'dbutton'}>取消</button>
                    </div>
                </div>
            </div>
            {/*****************************************************删除时弹窗****************************************/}

                <div className={'deleteDialogWrap'}  style={deleteDialogStyle}>
                    <div className={'deleteDialog'}>
                        <button className={'deleteButton'}
                        onClick={()=>this.ClickConfirmDelete(this.state.deleteKey)}>确认</button>
                        <button  className={'deleteButton'} onClick={()=>this.setState({isDeleteDialog:false})}>取消</button>
                    </div>
                </div>

        </div>



    }

}
const mapStateToProps=state=>({
    pageInfo:state.movieCrewPageInfo,
    queryStatusMovieCrew: state.queryStatusMovieCrew,
    queryMovieCrewList: state.queryMovieCrewList,
    upUrl: state.upUrl,
    postImgUrl: state.postImgUrl
})
export default connect(mapStateToProps) (EditMovieCrew);