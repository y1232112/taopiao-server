import React from "react";
import {getAllMovieCrew, getCinemaPage, getDelete, getFilmPage, getMovieCrewPage, postEdit} from "../apis/data";
import {deleteMovieCrewApi, modifyMovieCrewApi, movieCrewListApi} from "../apis/api";
import * as sysType from "../constants/const";
import $ from "jquery";
import {store} from "../index";
import {checkedList, getCinemaPageInfo, getMovieCrewPageInfo, receiveCinemas, receiveMovieCrew} from "../actions";
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
    handleClick1(data){
        // {console.log('---------------',data)}
        this.setState({
            dialogShow:  <div id={'dialogWrap'} style={{width:'50%',margin:'0 auto'}}>
                <div style={{textAlign:'center',fontWeight:'bold'}}>编辑您的选项</div>
                <div><label style={{width:'40%'}} className={'dialogLabel'}>影员ID：</label><input id={'edit1'} value={data.data.movie_crew_id} className={'dialogInput1'}/></div>
                <div><label className={'dialogLabel'}>影员名称：</label><input id={'edit2'} className={'dialogInput'} defaultValue={data.data.movie_crew_name}/></div>
                <div><label className={'dialogLabel'}>影员照片：</label><input id={'edit3'} className={'dialogInput'}  defaultValue={data.data.img}/></div>


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
           clickPageX:e.pageX-60+'px',
           clickPageY:e.pageY-25+'px'
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

        let json={
            "version":sysType.VERSION,
            "params":{
                movie_crew_id:$("#edit1").val(),
                movie_crew_name:$("#edit2").val(),
               img:$("#edit3").val()
            }
        }

       await postEdit(modifyMovieCrewApi,json)
     // getAllMovieCrew(movieCrewListApi)
        getMovieCrewPage(API.movieCrewPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
        this.setState({isDialog:false})


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
            return 'block'
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
            return arr.map(item=> <span className={"pageSpan"}><a onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
        }else if (11>=tp>8){

            if ((tp/2)>t){
                arr=[1,2,3,4,5,6,7,8]
                return arr.map(item=> <span className={"pageSpan"}><a onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
            }else {
                arr=[4,5,6,7,8,9,10,11]
                return arr.map(item=> <span className={"pageSpan"}><a onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)}
        }else if (tp>11){
            if ((tp/2)>=t){

                if (t>=3){
                    arr=[t-2,t-1,t,t+1,t+2,t+3,t+4,t+5]
                    return arr.map(item=> <span className={"pageSpan"}><a onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }else {
                    arr=[1,2,3,4,5,6,7,8]
                    return arr.map(item=> <span className={"pageSpan"}><a onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }
            }else if ((tp/2)<t){


                if (tp-2>=t){
                    arr=[t-5,t-4,t-3,t-2,t-1,t,t+1,t+2]
                    return arr.map(item=> <span className={"pageSpan"}><a onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
                }else {
                    arr=[tp-7,tp-6,tp-5,tp-4,tp-3,tp-2,tp-1,tp]
                    return arr.map(item=> <span className={"pageSpan"}><a onClick={(e)=>this.handleClickSpanNumber(e)}>{item}</a></span>)
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
        // console.log('---props---datasource--edt mc---',this.props.DataSource)

        const  dialogStyle={
            width:'50%',
            height:'70%',
            zIndex:'9999',
            position:'fixed',
            top:'80px',
            left:'25%',
            backgroundColor:'#ffffff',

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
                <td>{data.img}</td>

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
                <div style={{margin:'0',padding:'0',width:'100%',height:'100%',position:'relative'}}>
                    {this.state.dialogShow}
                    <div style={{position:'absolute',bottom:'35px',width:'100%',display:'block',textAlign:'center'}}>
                        <button onClick={()=>this.handleEdit()} className={'dbutton'}>确认</button>
                        <button onClick={()=>this.setState({isDialog:false,dialogShow:<div></div>})} className={'dbutton'}>取消</button>
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
    queryMovieCrewList: state.queryMovieCrewList
})
export default connect(mapStateToProps) (EditMovieCrew);