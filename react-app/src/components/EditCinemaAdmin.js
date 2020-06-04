import React from "react";
import {connect} from "react-redux";
import {getCinemaAdminPage, getDelete, postEdit, postUploadImg} from "../apis/data";
import * as API from "../apis/api";
import {store} from "../index";
import {
    checkedList,
    getCinemaAdminPageInfo,
    receiveCinemaAdmins,
    receivePostImgUrl,
    receiveUploadImgUrl
} from "../actions";
import * as sysType from "../constants/const";
import $ from "jquery";
import alert from "../utils/alert";
import {queryList, queryPageInfo} from "../actions/pageInfo";
import dateTimeUtil, {validateDate, validateDateTime} from "../utils/dateTimeUtil";
import {postUploadImgApi} from "../apis/api";
class EditCinemaAdmin extends React.Component{
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
    /**
     * [obj].map=>(data=>.....<td>..onclick={()=this....(param1(...,data))}
     * 此时窜的参数data,函数处理时只能拿到第一个遍历对象的值
     * [obj].map=>(data=>.....<td>..onclick={()=this....(param1(...,{data}))}
     * 参数多了一个括号{data}，顺利拿到了当前值console为data:{......}
     * 处理编辑时的弹窗，把map遍历到的、当前点击的data对象闯过来进行遍历
     * 这里设置了state,把table选中行存入state..<div>...<div>
     * 同时更新弹窗标记，设其为true，使其弹窗，便于编辑
     * 编辑完毕时，点击去取消onclick事件，setstate....isdialog为false，同时也应该还原state的弹窗的内容setstate...<div><div>
     * 否侧接下来每一次编辑时会弹出第一次弹出的编辑文档，而不是当前的遍历对象，或者说是当前记录行
     * map遍历dom虚拟文档时，当前遍历对象（data)
     * @param Tag
     * @param data
     */
    handleCancelEdit=()=>{
        this.setState({isDialog:false,dialogShow:<div></div>})
        $("#input_file").val("");
        store.dispatch(receiveUploadImgUrl(""))
    }
    handleClick1(Tag,data){
        // {console.log('---------------',data)}
        this.setState({
            dialogShow:  <div id={'dialogWrap'} style={{width:'322px',margin:'0 auto'}}>

                <div><label className={'dialogLabel'}>管理员ID：</label><input id={'edit1'} className={'dialogInput1'} readOnly={true} defaultValue={data.data.cinema_admin_id}/></div>
                <div><label className={'dialogLabel'}>昵称：</label><input id={'edit2'} className={'dialogInput'} defaultValue={data.data.nick_name}/></div>
                <div><label className={'dialogLabel'}>电话：</label><input id={'edit3'} className={'dialogInput'}  defaultValue={data.data.phone}/></div>
                <div><label className={'dialogLabel'}>真实姓名：</label><input id={'edit4'} className={'dialogInput'} defaultValue={data.data.real_name}/></div>
                <div><label className={'dialogLabel'}>出生日期：</label><input id={'edit5'} className={'dialogInput'} defaultValue={dateTimeUtil(data.data.birth)}/></div>
                <div><label className={'dialogLabel'}>性别：</label><input id={'edit6'} className={'dialogInput'} defaultValue={data.data.sex}/></div>
                <div><label className={'dialogLabel'}>头像：</label>
                    <div style={{border:'#777 1px solid',width:'80px',height:'100px',marginLeft:'120px'}}>
                        {(data.data.avatar=="null"||data.data.avatar==null||data.data.avatar.trim()=='')?<img id={"img_1"} src={''} width={'80px'} height={'100px'}
                                                                                                     style={{opacity:'0'}}/>:<img id={"img_1"} src={data.data.avatar} width={'80px'} height={'100px'}/>}</div>
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
            deleteKey:key.data.cinema_admin_id,
            clickPageX:e.pageX-120+'px',
            clickPageY:e.pageY-25+'px'
        })
        //    进行删除操作
        // console.log('-------delete---key-----',key)
    }
    //
    ClickConfirmDelete=async (key)=>{
        await getDelete(API.modifyCinemaAdminApi,key);
        this.setState({isDeleteDialog:false})
        // getAllCinemas(cinemaListApi)
        getCinemaAdminPage(API.cinemaAdminPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
    }
    //监听性选择Box
    handleChangeBox=(e,preChecked)=>{

        let tempSet;
        if(e.currentTarget.checked===true){
            preChecked.push(e.currentTarget.value)
            tempSet=new Set(preChecked);
            let currentChecked=Array.from(tempSet);
            this.setState({checkBoxList:currentChecked})
            store.dispatch(checkedList(currentChecked))
            console.log('---------check box----',currentChecked)
        }
        if (e.currentTarget.checked===false){
            let tempArray=[];
            if (preChecked.length===1){
                if (preChecked[0]===e.currentTarget.value){
                    tempArray=[]
                }
            }else {
                for (let i=0;i<preChecked.length;i++){
                    if (preChecked[i]!==e.currentTarget.value){
                        tempArray.push(preChecked[i]);


                    }
                }


            }
            this.setState({checkBoxList:tempArray})
            store.dispatch(checkedList(tempArray))
            console.log('----currentBox---',tempArray)
        }


    }
    //提交编辑
    handleEdit=async ()=>{

        let test=$("#edit5").val();
        // console.log("---edit--test  datetime---",test2)
        if ($("#edit6").val().trim()!=="男"&&$("#edit6").val().trim()!=="女"){
            alert("请输入正确的性别");
            return ;
        }
        let url=this.props.postImgUrl==""?$("#img_1").attr("src"):this.props.postImgUrl;
        if(validateDate(test)){
            // console.log("正确")
            let json={
                "version":sysType.VERSION,
                "params":{
                    cinema_admin_id:Number($("#edit1").val().trim()),
                    nick_name:$("#edit2").val().trim(),
                    phone:$("#edit3").val().trim(),
                    real_name:$("#edit4").val().trim(),
                    birth:$("#edit5").val().trim(),
                    sex:$("#edit6").val().trim(),
                    avatar:url

                }
            }

            await postEdit(API.modifyCinemaAdminApi,json)
            this.setState({isDialog:false,dialogShow:<div></div>})
            getCinemaAdminPage(API.cinemaAdminPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
            store.dispatch(receivePostImgUrl(""))
            store.dispatch(receiveUploadImgUrl(""))
            $("#input_file").val("");
        }else {
            alert("请输入正确的，日期格式")
        }




    }
    dialog=(Tag)=>{
        if (Tag===false){
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
            //先判断是否是查询状态1
            if (this.props.queryStatusCinemaAdmin===1){
                store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,e.currentTarget.innerHTML, this.props.pageInfo.pageSize)))
                store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,e.currentTarget.innerHTML, this.props.pageInfo.pageSize)))
            }else getCinemaAdminPage(API.cinemaAdminPageApi, e.currentTarget.innerHTML, this.props.pageInfo.pageSize)

        }
    }
    //处理首页和尾页
    handleClickFirstAndLast=(e)=>{
        if (e.currentTarget.innerHTML==="首页"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            } else{
                if (this.props.queryStatusCinemaAdmin===1){
                    store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,1, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,1, this.props.pageInfo.pageSize)))

                }else {
                    getCinemaAdminPage(API.cinemaAdminPageApi,1,this.props.pageInfo.pageSize)
                }
            }
        }else if (e.currentTarget.innerHTML==="尾页"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else{
                if (this.props.queryStatusCinemaAdmin===1){
                    store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,this.props.pageInfo.totalPage, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,this.props.pageInfo.totalPage, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaAdminPage(API.cinemaAdminPageApi,this.props.pageInfo.totalPage,this.props.pageInfo.pageSize)
                }
            }
        }
    }
    //处理上一页和下一页
    handleClickPreAndNext=(e)=>{
        // console.log('-----------pre  nex---',e.currentTarget.innerHTML)
        if (e.currentTarget.innerHTML==="&lt;&lt;"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            }else {
                if (this.props.queryStatusCinemaAdmin===1){
                    store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,this.props.pageInfo.currentPage-1, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,this.props.pageInfo.currentPage-1, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaAdminPage(API.cinemaAdminPageApi,this.props.pageInfo.currentPage-1,this.props.pageInfo.pageSize)
                }

            }
        }else if (e.currentTarget.innerHTML==="&gt;&gt;"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else {
                if (this.props.queryStatusCinemaAdmin===1){
                    store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,this.props.pageInfo.currentPage+1, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,this.props.pageInfo.currentPage+1, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaAdminPage(API.cinemaAdminPageApi,this.props.pageInfo.currentPage+1,this.props.pageInfo.pageSize)
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
                alert("已超出总的记录数，或请刷新");
                return;
            }
            if (size<5){
                alert("规定每一页的大小不能小于5条记录！！！！请重新输入")
                return;
            }

            if (this.props.queryStatusCinemaAdmin===1){
                store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,1, size)))
                store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,1, size)))
            }else {
                getCinemaAdminPage(API.cinemaAdminPageApi,1,size)
            }



        }else alert("请输入数字")
    }
    handleClickToPage=()=>{
        let page=$("#gotoPage").val();
        let size=this.props.pageInfo.pageSize

        let match =/[0-9]$/;
        if (match.test(page)) {
            if (page>this.props.pageInfo.totalPage){
                alert("已超出最大页面，请刷新刷新页面！")
                return;
            }if (page<=0){
                alert("没有这个页面")
                return;
            }
            if (this.props.queryStatusCinemaAdmin===1){
                store.dispatch(receiveCinemaAdmins(queryList(this.props.queryCinemaAdminList,page, size)))
                store.dispatch(getCinemaAdminPageInfo(queryPageInfo(this.props.queryCinemaAdminList,page, size)))
            }else {
                getCinemaAdminPage(API.cinemaAdminPageApi,page,size)
            }
        }else alert("请输入数字")

    }
    //显示分配信息
    renderAssignA=(id)=>{
        let tempArr=this.props.assignCinemaAdminIds;
        let preLength=tempArr.length;
        tempArr.push(id);
        let tempSet=new Set(tempArr);
        let nextSize=tempSet.size;
        // console.log("分配id数组测试长度",tempArr,nextSize);

        if (preLength===nextSize){
            tempArr.pop();
            // console.log("分配id数组测试长度",tempArr,nextSize)
            return <a style={{marginLeft:'5px',color:"#777",pointerEvents:"none",fontSize:'12px'}}>
                已分配
            </a>
        }else {

            tempArr.pop();
            return <a style={{marginLeft:'5px',color:"#dd0000",pointerEvents:"none",fontSize:'12px'}}>
                未分配
            </a>
        }
    }
    render() {
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
        let key= 0;
        let myList= myDatasource.map(data=><tr  key={data.cinema_admin_id}>


                <td><input onChange={(event) => this.handleChangeBox(event,this.state.checkBoxList)} value={data.cinema_admin_id} type={'checkbox'}/></td>
                <td>{data.cinema_admin_id}</td>
                <td>{data.nick_name}</td>
                <td>{data.phone}</td>
                <td>{data.real_name}</td>
                <td>{dateTimeUtil(data.birth)}</td>
                <td>{data.sex}</td>
                <td>{(data.avatar==null||data.avatar=='null'||data.avatar=='')?<img src={''} width={'50px'} height={'60px'}
                                                                                    style={{opacity:'0'}}/>:<img src={data.avatar} width={'50px'} height={'60px'}/>}</td>

                <td id={"cinemaOption"}><a className={'click'} onClick={()=>this.handleClick1(this.state.isDialog,{data})}>编辑</a>
                    <a id={key++} style={{marginLeft:'5px'}} className={'click'} onClick={(e)=>this.handleclick2({data},e)}>删除</a>
                    {this.renderAssignA(data.cinema_admin_id)}
                </td>

            </tr>
        )
        return <div style={tableStyle}><table id={"editTable"}>

            <thead> <th>选择</th>{title}<th>操作</th></thead>
            <tbody>
            {myList}
            </tbody>
        </table>
            {/********************************分页信息**************************************/}
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
            {/***************************************编辑时弹窗功能*****************************************/}
            <div style={dialogStyle} id={'dialog'}>
                <div className={"wrap_edt_admin_dialog"}>

                    <div style={{textAlign:'center',fontWeight:'bold',height:'6%',marginTop:'2%'}}>编辑您的选项</div>
                    <div style={{ overflowY:'scroll',height:'70%'}}>{this.state.dialogShow}</div>
                    <div style={{width:'100%',display:'block',textAlign:'center',paddingTop:'15px',backgroundColor:'#efefef'}}>

                        <div><label >更换及预览图片：</label>

                            <input
                                onChange={(e)=>this.handleChangeImg(e)}
                                id={'input_file'}
                                className={'addInput'} type={'file'} name={'img'} multiple={'multiple'}
                                accept={"image/gif,image/jpeg,image/jpg,image/png,image/svg"}/>



                        </div>

                        <div>
                            <div style={{border:'1px solid #777',width:'80px',height:'100px',marginLeft:'140px',backgroundColor:'#fff'}}>
                                {console.log("url"+this.props.postImgUrl,this.props.upUrl)}
                                <img style={{opacity:this.renderOpacity()}} id={'preview'} src={this.props.upUrl} id={'img0'} width={'80px'} height={'100px'}/>

                            </div>

                        </div>
                        <button
                            onClick={()=>this.handleEdit()}
                            className={'dbutton'}>确认</button><button
                        onClick={()=>this.handleCancelEdit()}

                        className={'dbutton'}>取消</button></div>

                </div>
            </div>
            {/**********************************删除时的确认框*****************************************************/}

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
    pageInfo:state.cinemaAdminPageInfo,
    queryStatusCinemaAdmin: state.queryStatusCinemaAdmin,
    queryCinemaAdminList: state.queryCinemaAdminList,
    assignCinemaAdminIds: state.assignCinemaAdminIds,
    upUrl: state.upUrl,
    postImgUrl: state.postImgUrl
})
export default connect(mapStateToProps)(EditCinemaAdmin);