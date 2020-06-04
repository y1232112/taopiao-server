import React from "react";
import {queryList, queryPageInfo} from "../actions/pageInfo"
import {DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE, VERSION} from "../constants/const";
import alert from "../utils/alert";
import {store} from "../index";
import {actionNoAssCinemaAdminPageInfo, getCinemaAdminPageInfo, receiveCinemaAdmins} from "../actions";
import {getCinemaAdminPage, getNoAssAdmin, insertAssignInfo} from "../apis/data";
import * as API from "../apis/api";
import $ from "jquery";
import dateTimeUtil from "../utils/dateTimeUtil";
class Assign extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            isShowTAG:false,
            confirmPageX:null,
            confirmPageY:null,
            ConfirmItem:null,
            queryList:[],
            queryPage:1,
            savePage:DEFAULT_START_PAGE
        }
    }

    //查询时分页显示的数据
    queryCurrentPageList=()=>{
       return queryList(this.state.queryList,this.state.queryPage,DEFAULT_PAGE_SIZE)
    }
    //模糊查询
    handleClickQuery=(nick,phone,name)=>{
       // console.log("-------assign refs---",nick.value.trim(),phone.value.trim(),name.value.trim())
        let list=this.props.noAssCinemaAdmin;
        // console.log("----read---",list[0],list[0].nick_name)
        let v1=nick.value.trim();
        let v2=phone.value.trim();
        let v3=name.value.trim();
        let l1=v1.length;
        let l2=v2.length;
        let l3=v3.length;
        let tempArr=[];
        if ((v1==='')&&(v2==='')&&(v3==='')){
            alert("你还没熟人任何信息");

        }else {
            if ((v1!=="")&&(v2==="")&&(v3==="")){
                for (let i=0;i<list.length;i++){
                    //    进行模糊查询
                        if (list[i].nick_name.indexOf(v1)!==-1){
                            tempArr.push(list[i])

                        }

                }
              // console.log("*******",tempArr,v1,l1);
            }else if ((v1==="")&&(v2!=="")&&(v3==="")){
                for (let i=0;i<list.length;i++){
                        //    进行模糊查询
                        if (list[i].phone.indexOf(v2)!==-1){
                            tempArr.push(list[i])

                    }
                }
                // console.log("*******",tempArr,v2,l2);
            }else if ((v1==="")&&(v2==="")&&(v3!=="")){
                for (let i=0;i<list.length;i++){
                    //    进行模糊查询
                    if (list[i].real_name.indexOf(v3)!==-1){
                        tempArr.push(list[i])

                    }
                }
                // console.log("*******",tempArr,v3,l3);

            }else if ((v1!=="")&&(v2!=="")&&(v3==="")){
                for (let i=0;i<list.length;i++){
                    //    进行模糊查询
                    if ((list[i].nick_name.indexOf(v1)!==-1)&&(list[i].phone.indexOf(v2)!==-1)){
                        tempArr.push(list[i])

                    }
                }
                // console.log("*******",tempArr);
            }else if ((v1!=="")&&(v2==="")&&(v3!=="")){
                for (let i=0;i<list.length;i++){
                    //    进行模糊查询
                    if ((list[i].nick_name.indexOf(v1)!==-1)&&(list[i].real_name.indexOf(v3)!==-1)){
                        tempArr.push(list[i])

                    }
                }
                // console.log("*******",tempArr);
            }else if ((v1==="")&&(v2!=="")&&(v3!=="")){
                for (let i=0;i<list.length;i++){
                    //    进行模糊查询
                    if ((list[i].phone.indexOf(v2)!==-1)&&(list[i].real_name.indexOf(v3)!==-1)){
                        tempArr.push(list[i])

                    }
                }
                // console.log("*******",tempArr);
            }else if ((v1!=="")&&(v2!=="")&&(v3!=="")){
                for (let i=0;i<list.length;i++){
                    //    进行模糊查询
                    if ((list[i].nick_name.indexOf(v1)!==-1)&&(list[i].phone.indexOf(v2)!==-1)&&(list[i].real_name.indexOf(v3)!==-1)){
                        tempArr.push(list[i])

                    }
                }
                // console.log("*******",tempArr);
            }

           let page=this.props.pageInfo.currentPage;
            this.setState({queryList:tempArr,savePage:page});
            store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(tempArr,1, DEFAULT_PAGE_SIZE)))
        }
    }
    //重置
    handleReset=()=>{
        store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.props.noAssCinemaAdmin,this.state.savePage, DEFAULT_PAGE_SIZE)))

        this.setState({queryList:[]});

    }
   handleShow=(tag)=>{
        if (tag){
            return "block"
        }else return "none"
   }
   //设置元素堆叠顺序当组件需要显示时可以调整zIndex值时期处于顶层显示
   handleZIndex=(tag)=>{
        if (tag){
            return 2000
        }else return -1
   }
   getDataSourceForPage=(data)=>{
        return queryList(this.props.noAssCinemaAdmin,this.props.pageInfo.currentPage,DEFAULT_PAGE_SIZE)
   }
    //********************************************分页***********************************************************

    handleClickSpanNumber=(e)=>{
        console.log('--page span number-',e.currentTarget.innerHTML)
        if (e.currentTarget.innerHTML==this.props.pageInfo.currentPage){
            alert("已经是第"+e.currentTarget.innerHTML+"页")
        }else {
            if (this.state.queryList.length===0){
                store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.props.noAssCinemaAdmin,e.currentTarget.innerHTML, DEFAULT_PAGE_SIZE)))

            }else {

                this.setState({queryPage:e.currentTarget.innerHTML})
                store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.state.queryList,e.currentTarget.innerHTML, DEFAULT_PAGE_SIZE)))

            }

        }
    }
    //处理首页和尾页
    handleClickFirstAndLast=(e)=>{
        if (e.currentTarget.innerHTML==="首页"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            } else{
                if (this.state.queryList.length===0){
                    store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.props.noAssCinemaAdmin,DEFAULT_START_PAGE, DEFAULT_PAGE_SIZE)))

                }else {
                    this.setState({queryPage:1});
                    store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.state.queryList,1, DEFAULT_PAGE_SIZE)))

                }


            }
        }else if (e.currentTarget.innerHTML==="尾页"){
            let tp=this.props.pageInfo.totalPage;
            let admins=this.props.noAssCinemaAdmin;
            if (this.props.pageInfo.currentPage===tp){
                alert("已经是最后一页")
            }else{
                if (this.state.queryList.length===0){
                    store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(admins,tp, DEFAULT_PAGE_SIZE)))

                }else {
                    this.setState({queryPage:tp});
                    store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.state.queryList,tp, DEFAULT_PAGE_SIZE)))

                }

            }
        }
    }
    //处理上一页和下一页
    handleClickPreAndNext=(e)=>{
          let page=this.props.pageInfo.currentPage;
          let prePage=this.props.pageInfo.prePage;
          let nextPage=this.props.pageInfo.nextPage;

        console.log('-----------pre  nex---',prePage,nextPage)
        if (e.currentTarget.innerHTML==="&lt;&lt;"){
            if (this.props.pageInfo.currentPage==1){
                alert("已经是第一页")
            }else {
                if (this.state.queryList.length===0){
                    store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.props.noAssCinemaAdmin,prePage, DEFAULT_PAGE_SIZE)))

                }else {
                    this.setState({queryPage:prePage})
                    store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.state.queryList,prePage, DEFAULT_PAGE_SIZE)))

                }



            }
        }else if (e.currentTarget.innerHTML==="&gt;&gt;"){
            if (this.props.pageInfo.currentPage==this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else {
                if (this.state.queryList.length===0){
                    store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.props.noAssCinemaAdmin,nextPage, DEFAULT_PAGE_SIZE)))

                }else {
                    this.setState({queryPage:nextPage});
                    store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.state.queryList,nextPage, DEFAULT_PAGE_SIZE)))

                }

            }

        }
    }
    //渲染当页的菜单
    handleChangePage=(item)=>{
        console.log("page---current----",this.props.pageInfo.currentPage)
        if (item==this.props.pageInfo.currentPage){
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
            return arr.map(item=> <span className={"pageSpan"}><a
                style={this.handleChangePage(item)}
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
    handleClickToPage=()=>{
        let page=$("#gotoPage_02").val();
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
              if (this.state.queryList.length===0){
                  store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.props.noAssCinemaAdmin,page, size)))

              }else {
                  this.setState({queryPage:page})
                  store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(this.state.queryList,page, DEFAULT_PAGE_SIZE)))

              }


        }else alert("请输入数字")

    }
    renderConfirm=()=>{
        if (this.state.isShowTAG){
            return "flex";
        }else return "none";
    }
    handleClickCancel=()=>{

        this.setState({ConfirmItem:null, isShowTAG:false,})
    }
    handleClickSave=async (cinema_id,cinema_admin_id)=>{
        let json={
            "version":VERSION,
            "params":{
                "cinema_id":cinema_id,
                "cinema_admin_id":cinema_admin_id
            }
        }
        this.props.handleXXXForChildren();
        await insertAssignInfo(API.insertAssInfo,json)
        getNoAssAdmin(API.cinema_no_Ass_cinemaAdminApi)
        this.setState({ConfirmItem:null,isShowTAG:false})
    }
    handleClickTr=(e,item)=>{
        this.setState({confirmPageX:e.pageX,confirmPageY:e.pageY,isShowTAG:true,
            confirmItem:<div id={"ass_confirm_info"}>
                <div><span className={"tip"}>即将发布的分配信息：</span></div>
                <div><span className={"title"}>影院编号：</span><span>{this.props.assItem.cinema_id}</span></div>
                <div><span className={"title"}>影院名：</span><span>{this.props.assItem.cinema_name}</span></div>
                <div><span className={"title"}>管理员编号为：</span><span>{item.cinema_admin_id}</span></div>
                <div><span className={"title"}> 管理员昵称：</span><span>{item.nick_name}</span></div>
                <div className={"confirm_btn_div"}>
                    <button onClick={()=>this.handleClickSave(this.props.assItem.cinema_id,item.cinema_admin_id)}>确认</button>
                    <button onClick={()=>this.handleClickCancel()}>取消</button>
                </div>
               </div>

        })
        // console.log("----------------item---------",item)
        return
    }
    render() {
        // 表头数据
        const columns=[
            {
                title:'管理员编号',
                dataIndex:'cinema_admin_id'
            },
            {
                title:'管理员昵称',
                dataIndex: 'nick_name'
            },{
                title:'电话',
                dataIndex:'phone'
            },
            {
                title:'真实姓名',
                dataIndex:'real_name'
            },
            {
                title:'出生日期',
                dataIndex:'birth'
            },
            {
                title:'性别',
                dataIndex:'sex'
            },
            {
                title:'头像',
                dataIndex:'avatar'
            }

        ]
        let Tag=this.props.TAG;
       let list=this.props.cinemaAdmins;
       let pageInfo=this.props.pageInfo;
       let status=this.props.queryStatusCinemaAdmin;
       let queryList=this.props.queryCinemaAdminList;
        const wrap={
            position:"fixed",
            top:0,
            left:0,
            width:"100%",
            height:"100%",
            display: "flex",
            justifyContent:"center",
            alignItems:"center",
            backgroundColor: "rgba(0,0,0,0.4)",
           zIndex: this.handleZIndex(Tag)
        }
       const assignStyle={
           position: "relative",
           width: "1000px",
           height: "500px",
           // top:"200px",
           // left:"25%",
           zIndex:99999,
           border:"#777 1px solid",
           overflow:"scroll",
           backgroundColor:"#f2f2f2",
           display:this.handleShow(Tag)
       }
       const dataMargin={
            margin:"15px"
       }

       let dataSource=this.state.queryList.length===0?this.getDataSourceForPage(this.props.noAssCinemaAdmin):this.queryCurrentPageList();
        const title=columns.map(item=><th key={item.dataIndex}>{item.title}</th>)
        const items=dataSource.map(item=><tr onClick={(e)=>this.handleClickTr(e,item)}>
              <td>{item.cinema_admin_id}</td>
            <td>{item.nick_name}</td>
            <td>{item.phone}</td>
            <td>{item.real_name}</td>
            <td>{dateTimeUtil(item.birth)}</td>
            <td>{item.sex}</td>
            <td>{item.avatar}</td>
            <td></td>
            </tr>
        )
       return <div style={wrap} id={"Assign"}>
           <div style={assignStyle}>
               <div>
                   <img onClick={()=>this.props.handleXXXForChildren()}
                       src={require("../imges/go_back_ic.png")} width={"60px"} height={"30px"} style={{float:"right"}}/>
               </div>
                <div style={dataMargin}>
                    {/******************内容区域****************************/}


                    <div style={{textAlign:"center",fontWeight:"bold"}}>分配影院</div>
                    <div>
                        <input ref={"nick"} className={'mySearch'}  placeholder={'输入昵称'}/>
                        <input ref={"phone"} className={'mySearch'}  placeholder={'输入电话'}/>
                        <input ref={"name"} className={'mySearch'}  placeholder={'输入真实姓名'}/>
                        <button onClick={()=>this.handleClickQuery(this.refs.nick,this.refs.phone,this.refs.name)} className={"qBtn"}>查询</button>
                        <button onClick={()=>this.handleReset()} className={"reBtn"}>重置</button>
                    </div>
                    <div>
                        <table id={"no_ass_cinema_admin_table"}>
                            <thead>{title}</thead>
                            <tbody>{items}</tbody>
                        </table>
                    </div>
                {/***************************************分页************************   */}
                    {console.log("----page===no===ass",this.props.pageInfo)}
                <div className={"no_ass_page"}>
                    <span className={"count"}>共有 <span className={"countStyle"}>{this.props.pageInfo.totalCount}</span> 条记录</span>
                    <span className={"count"}>共有 <span className={"countStyle"}> {this.props.pageInfo.totalPage}</span> 页</span>
                    <span className={"count"}>本页 <span className={"countStyle"}> {dataSource.length}</span> 条数据</span>
                    <span className={"sheZhiWrap"}  style={{position:"relative"}}>
                <span id={"tzSpan"} style={{position:"absolute"}}>跳转至</span>
                <img className={"sheZhiBtn"} align={"AbsBottom"} src={require("../imges/tiaozhuan.png")} onClick={()=>this.handleClickToPage()}/>


            </span>
                    <span  className={"to"}>至<input id={"gotoPage_02"} defaultValue={this.props.pageInfo.currentPage}/>页</span>
                    <span className={"pageSpan"}><a onClick={(e)=>this.handleClickFirstAndLast(e)}>首页</a></span>
                    <span className={"pageSpan"}><a onClick={(e)=>this.handleClickPreAndNext(e)}>{"<<"}</a></span>
                    {this.doRenderForPage()}
                    <span className={"pageSpan"}><a onClick={(e)=>this.handleClickPreAndNext(e)}>{">>"}</a></span>
                    <span className={"pageSpan"}><a onClick={(e)=>this.handleClickFirstAndLast(e)}>尾页</a></span>
                </div>
                </div>
               {/*******************************************确认分配？？********************************/}
               <div id={"confirm_ass_wrap"} style={{display:this.renderConfirm(),backgroundColor:"#fff",minHeight:"250px",width:"350px",
                   justifyContent:"center",alignItems:"center",
               position:"absolute",top:"100px",right:"323px",zIndex:999999,color:"#777"}}>
                  {this.state.confirmItem}

               </div>
           </div>

       </div>;
   }
}
export default Assign;