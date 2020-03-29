import React from "react";
import {connect} from "react-redux";
import {getAllCinemas, getAllMovieCrew, getCinemaPage, getDelete, postEdit} from "../apis/data";
import {cinemaListApi, deleteCinemaApi, modifyCinemaApi} from "../apis/api";
import $ from "jquery";
import * as sysType from "../constants/const";
import * as API from "../apis/api";
import {store} from "../index";
import {checkedList, getCinemaPageInfo, receiveCinemas} from "../actions";
import alert from "../utils/alert";
import {queryList, queryPageInfo} from "../actions/pageInfo";
class EditCinema extends React.Component{
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
    handleClick1(Tag,data){
        // {console.log('---------------',data)}
        this.setState({
            dialogShow:  <div id={'dialogWrap'} style={{width:'50%',margin:'0 auto'}}>

                <div><label className={'dialogLabel'}>影院ID：</label><input id={'edit1'} className={'dialogInput1'} readOnly={true} defaultValue={data.data.cinema_id}/></div>
                <div><label className={'dialogLabel'}>影院名称：</label><input id={'edit2'} className={'dialogInput'} defaultValue={data.data.cinema_name}/></div>
                <div><label className={'dialogLabel'}>所在省：</label><input id={'edit3'} className={'dialogInput'}  defaultValue={data.data.province}/></div>
                <div><label className={'dialogLabel'}>所在城市：</label><input id={'edit4'} className={'dialogInput'} defaultValue={data.data.city}/></div>
                <div><label className={'dialogLabel'}>区县：</label><input id={'edit5'} className={'dialogInput'} defaultValue={data.data.county}/></div>
                <div><label className={'dialogLabel'}>详细地址：</label><input id={'edit6'} className={'dialogInput'} defaultValue={data.data.address}/></div>

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
            deleteKey:key.data.cinema_id,
            clickPageX:e.pageX-60+'px',
            clickPageY:e.pageY-25+'px'
        })
        //    进行删除操作
        // console.log('-------delete---key-----',key)
    }
    //
    ClickConfirmDelete=async (key)=>{
    await getDelete(deleteCinemaApi,key);
        this.setState({isDeleteDialog:false})
        // getAllCinemas(cinemaListApi)
        getCinemaPage(API.cinemaPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)
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
    //提交编辑
    handleEdit=async ()=>{

        let json={
            "version":sysType.VERSION,
            "params":{
               cinema_id:Number($("#edit1").val()),
                cinema_name:$("#edit2").val(),
                province:$("#edit3").val(),
                city:$("#edit4").val(),
                county:$("#edit5").val(),
                address:$("#edit6").val()

            }
        }
// console.log(']]]',this.props.pageInfo,this.props.pageInfo.pageSize)
        await postEdit(modifyCinemaApi,json)
        this.setState({isDialog:false})
       getCinemaPage(API.cinemaPageApi,this.props.pageInfo.currentPage,this.props.pageInfo.pageSize)



    }
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
        if (e.currentTarget.innerHTML===this.props.pageInfo.currentPage){
            alert("已经是第"+e.currentTarget.innerHTML+"页")
        }else {
            //先判断是否是查询状态1
            if (this.props.queryStatusCinema===1){
                store.dispatch(receiveCinemas(queryList(this.props.queryCinemaList,e.currentTarget.innerHTML, this.props.pageInfo.pageSize)))
                store.dispatch(getCinemaPageInfo(queryPageInfo(this.props.queryCinemaList,e.currentTarget.innerHTML, this.props.pageInfo.pageSize)))
            }else getCinemaPage(API.cinemaPageApi, e.currentTarget.innerHTML, this.props.pageInfo.pageSize)

        }
}
    //处理首页和尾页
    handleClickFirstAndLast=(e)=>{
        if (e.currentTarget.innerHTML==="首页"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            } else{
                if (this.props.queryStatusCinema===1){
                    store.dispatch(receiveCinemas(queryList(this.props.queryCinemaList,1, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaPageInfo(queryPageInfo(this.props.queryCinemaList,1, this.props.pageInfo.pageSize)))

                }else {
                    getCinemaPage(API.cinemaPageApi,1,this.props.pageInfo.pageSize)
                }
            }
        }else if (e.currentTarget.innerHTML==="尾页"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else{
                if (this.props.queryStatusCinema===1){
                    store.dispatch(receiveCinemas(queryList(this.props.queryCinemaList,this.props.pageInfo.totalPage, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaPageInfo(queryPageInfo(this.props.queryCinemaList,this.props.pageInfo.totalPage, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaPage(API.cinemaPageApi,this.props.pageInfo.totalPage,this.props.pageInfo.pageSize)
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
                if (this.props.queryStatusCinema===1){
                    store.dispatch(receiveCinemas(queryList(this.props.queryCinemaList,this.props.pageInfo.currentPage-1, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaPageInfo(queryPageInfo(this.props.queryCinemaList,this.props.pageInfo.currentPage-1, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaPage(API.cinemaPageApi,this.props.pageInfo.currentPage-1,this.props.pageInfo.pageSize)
                }

            }
        }else if (e.currentTarget.innerHTML==="&gt;&gt;"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else {
                if (this.props.queryStatusCinema===1){
                    store.dispatch(receiveCinemas(queryList(this.props.queryCinemaList,this.props.pageInfo.currentPage+1, this.props.pageInfo.pageSize)))
                    store.dispatch(getCinemaPageInfo(queryPageInfo(this.props.queryCinemaList,this.props.pageInfo.currentPage+1, this.props.pageInfo.pageSize)))
                }else {
                    getCinemaPage(API.cinemaPageApi,this.props.pageInfo.currentPage+1,this.props.pageInfo.pageSize)
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
                alert("已超出总的记录数，或请刷新");
                return;
            }
            if (size<5){
                alert("规定每一页的大小不能小于5条记录！！！！请重新输入")
                return;
            }

            if (this.props.queryStatusCinema===1){
                store.dispatch(receiveCinemas(queryList(this.props.queryCinemaList,1, size)))
                store.dispatch(getCinemaPageInfo(queryPageInfo(this.props.queryCinemaList,1, size)))
            }else {
                getCinemaPage(API.cinemaPageApi,1,size)
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
            if (this.props.queryStatusCinema===1){
                store.dispatch(receiveCinemas(queryList(this.props.queryCinemaList,page, size)))
                store.dispatch(getCinemaPageInfo(queryPageInfo(this.props.queryCinemaList,page, size)))
            }else {
                getCinemaPage(API.cinemaPageApi,page,size)
            }
        }else alert("请输入数字")

    }
    render() {
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
        let key= 0;
        let myList= myDatasource.map(data=><tr  key={data.cinema_id}>


                <td><input onChange={(event) => this.handleChangeBox(event,this.state.checkBoxList)} value={data.cinema_id} type={'checkbox'}/></td>
                <td>{data.cinema_id}</td>
                <td>{data.cinema_name}</td>
                <td>{data.province}</td>
                <td>{data.city}</td>
                <td>{data.county}</td>
                <td>{data.address}</td>

                <td><a className={'click'} onClick={()=>this.handleClick1(this.state.isDialog,{data})}>编辑</a>
                    <a id={key++} style={{marginLeft:'5px'}} className={'click'} onClick={(e)=>this.handleclick2({data},e)}>删除</a></td>
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
                <div style={{margin:'0',padding:'0',width:'100%',height:'100%',position:'relative'}}>
                    <div style={{textAlign:'center',fontWeight:'bold',height:'6%',marginTop:'2%'}}>编辑您的选项</div>
                    <div style={{ overflowY:'scroll',height:'70%'}}>{this.state.dialogShow}</div>
                    <div style={{position:'absolute',bottom:'35px',width:'100%',display:'block',textAlign:'center'}}>
                        <button
                            onClick={()=>this.handleEdit()}
                            className={'dbutton'}>确认</button><button
                        onClick={()=>{
                            this.setState({isDialog:false,dialogShow:<div></div>
                            })

                        }}
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
      pageInfo:state.cinemaPageInfo,
     queryStatusCinema: state.queryStatusCinema,
    queryCinemaList: state.queryCinemaList

})
export default connect(mapStateToProps) (EditCinema);