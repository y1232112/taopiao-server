import React from "react";
import dateTimeUtil from "../utils/dateTimeUtil";
import alert from "../utils/alert";
import {getCinemaPage, getFilmPage} from "../apis/data";
import * as API from "../apis/api";
import $ from "jquery";
import {connect} from "react-redux";
import {store} from "../index";
import {getFimPageInfo, receiveFilms} from "../actions";
import {queryList, queryPageInfo} from "../actions/pageInfo";
class FilmList extends React.Component{
    handleClickSpanNumber=(e)=>{
        console.log('--page span number-',e.currentTarget.innerHTML)
        if (e.currentTarget.innerHTML===this.props.pageInfo.currentPage){
            alert("已经是第"+e.currentTarget.innerHTML+"页")
        }else {
            if (this.props.queryStatusFilm===1){
                //从数组之中读取数据显示为一页
                store.dispatch(receiveFilms(queryList(this.props.queryFilmList,e.currentTarget.innerHTML,this.props.pageInfo.pageSize)))
                //更新分页信息
                store.dispatch(getFimPageInfo(queryPageInfo(this.props.queryFilmList,e.currentTarget.innerHTML,this.props.pageInfo.pageSize)))
            }else getFilmPage(API.filmPageApi,e.currentTarget.innerHTML,this.props.pageInfo.pageSize)
        }

    }
    //处理首页和尾页
    handleClickFirstAndLast=(e)=>{
        if (e.currentTarget.innerHTML==="首页"){
            if (this.props.pageInfo.currentPage===1){
                alert("已经是第一页")
            } else {
                if (this.props.queryStatusFilm===1){
                    //从数组之中读取数据显示为一页
                    store.dispatch(receiveFilms(queryList(this.props.queryFilmList,1,this.props.pageInfo.pageSize)))
                    //更新分页信息
                    store.dispatch(getFimPageInfo(queryPageInfo(this.props.queryFilmList,1,this.props.pageInfo.pageSize)))
                }else {
                    getFilmPage(API.filmPageApi,1,this.props.pageInfo.pageSize)
                }

            }
        }else if (e.currentTarget.innerHTML==="尾页"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else {
                if (this.props.queryStatusFilm===1){
                    //从数组之中读取数据显示为一页
                    store.dispatch(receiveFilms(queryList(this.props.queryFilmList,this.props.pageInfo.totalPage,this.props.pageInfo.pageSize)))
                    //更新分页信息
                    store.dispatch(getFimPageInfo(queryPageInfo(this.props.queryFilmList,this.props.pageInfo.totalPage,this.props.pageInfo.pageSize)))
                }else {
                    getFilmPage(API.filmPageApi,this.props.pageInfo.totalPage,this.props.pageInfo.pageSize)
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
                if (this.props.queryStatusFilm===1){
                    //从数组之中读取数据显示为一页
                    store.dispatch(receiveFilms(queryList(this.props.queryFilmList,this.props.pageInfo.currentPage-1,this.props.pageInfo.pageSize)))
                    //更新分页信息
                    store.dispatch(getFimPageInfo(queryPageInfo(this.props.queryFilmList,this.props.pageInfo.currentPage-1,this.props.pageInfo.pageSize)))
                }else {
                    getFilmPage(API.filmPageApi,this.props.pageInfo.currentPage-1,this.props.pageInfo.pageSize)
                }

            }
        }else if (e.currentTarget.innerHTML==="&gt;&gt;"){
            if (this.props.pageInfo.currentPage===this.props.pageInfo.totalPage){
                alert("已经是最后一页")
            }else {
                if (this.props.queryStatusFilm===1){
                    //从数组之中读取数据显示为一页
                    store.dispatch(receiveFilms(queryList(this.props.queryFilmList,this.props.pageInfo.currentPage+1,this.props.pageInfo.pageSize)))
                    //更新分页信息
                    store.dispatch(getFimPageInfo(queryPageInfo(this.props.queryFilmList,this.props.pageInfo.currentPage+1,this.props.pageInfo.pageSize)))
                }else {
                    getFilmPage(API.filmPageApi,this.props.pageInfo.currentPage+1,this.props.pageInfo.pageSize)
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
                alert("已超出最大的记录数，或请刷新！！！")
                return;
            }
            if (size<5){
                alert("规定每一页的最小请求记录不小于5条！！！请重新输入")
                return;
            }
            if (this.props.queryStatusFilm===1){
                //从数组之中读取数据显示为一页
                store.dispatch(receiveFilms(queryList(this.props.queryFilmList,1,size)))
                //更新分页信息
                store.dispatch(getFimPageInfo(queryPageInfo(this.props.queryFilmList,1,size)))
            }else {
                getFilmPage(API.filmPageApi,1,size)
            }

        }else alert("请输入数字")
    }
    handleClickToPage=()=>{
        let page=$("#gotoPage").val();
        let match =/[0-9]$/;
        if (match.test(page)){
            if (page<=0){
                alert("没有这个页面！！！请重新输入！！！")
                return;
            }
            if (page>this.props.pageInfo.totalPage){
                alert("已超出总的记录数！！或请刷新，或重新输入！！！")
                return;
            }
            if (this.props.queryStatusFilm===1){
                //从数组之中读取数据显示为一页
                store.dispatch(receiveFilms(queryList(this.props.queryFilmList,page,this.props.pageInfo.pageSize)))
                //更新分页信息
                store.dispatch(getFimPageInfo(queryPageInfo(this.props.queryFilmList,page,this.props.pageInfo.pageSize)))
            }else {
                getFilmPage(API.filmPageApi,page,this.props.pageInfo.pageSize)
            }
        }else alert("请输入数字")
    }
    render() {
        const title=this.props.Columns.map(
            column=><th key={column.dataIndex}>{column.title}</th>
        )
        const columnLength=this.props.Columns.length;
        // console.log('----columnLength--',columnLength);


        const tableStyle={
            margin:'0 auto',
            borderCollapse:'collapse',
            borderSpacing:'1',

        }

        const myDatasource=this.props.DataSource;
        let key=0;
        let myList= myDatasource.map(data=><tr  key={data.film_id}>

                <td>{data.film_id}</td>
                <td>{data.film_name}</td>
                <td>{data.director}</td>
                <td>{data.film_length}</td>
                <td>{data.status}</td>
                <td>{data.product_area}</td>
                <td>{data.brief}</td>
                <td>{data.type}</td>
                <td>{dateTimeUtil(data.public_date)}</td>
                <td>{data.wish_num}</td>
                <td>{data.score}</td>
                <td>{data.actor}</td>
                <td>{data.img}</td>
                </tr>
        )
        return <div>
            {/***********************************表格*************************/}
            <table id={"readListTable"}>

                <thead> {title}</thead>
                <tbody>
                {myList}
                </tbody>
            </table>
            {/**************************************分页信息************************************/}
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
        </div>
    }

}
const mapStateToProps=state=>({
    pageInfo:state.filmPageInfo,
    queryStatusFilm: state.queryStatusFilm,
    queryFilmList: state.queryFilmList
})
export default connect(mapStateToProps)(FilmList);