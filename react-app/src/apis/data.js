import Axios from "axios";

import {store} from "../index";
import {
    getCinemaPageInfo,
    getFimPageInfo,
    getMovieCrewPageInfo,
    getQueryCinemaList,
    getQueryFilmList,
    getQueryMovieCrewList, getQueryStatusCinema,
    getQueryStatusFilm,
    getQueryStatusMovieCrew,
    receiveCinemas,
    receiveFilms,
    receiveMovieCrew
} from "../actions";
import * as API from "./api";
import alert from "../utils/alert";
import queryMovieCrewList from "../reducers/queryMovieCrewList";
import {queryList, queryPageInfo} from "../actions/pageInfo";
Axios.defaults.baseURL='http://localhost:3000';
Axios.defaults.withCredentials=true;
Axios.defaults.timeout=100000;

export default function getAllFilms(api)
{

    Axios.get(api)
        .then(Response => {
            store.dispatch(receiveFilms(Response.data))
        })
        .catch(Error => {
            setTimeout("alert('电影信息请求异常')",100)
        })

}
export function getAllCinemas(api) {
    Axios.get(api)
        .then(Response=>{
            store.dispatch(receiveCinemas(Response.data))
        })
        .catch(Error=>{
            setTimeout("alert('影院信息请求异常')",100)
        })
}
export function getAllMovieCrew(api) {
    Axios.get(api)
        .then(Response=>{
            store.dispatch(receiveMovieCrew(Response.data))

        })
        .catch(Error=>{

                setTimeout("alert('影员信息请求异常')",100)
        })
}
//按页加载
export function getMovieCrewPage(api,page,pageSize) {
     Axios.get(api+"?page="+page+"&"+"pageSize="+pageSize)
         .then((Response)=>{
             store.dispatch(receiveMovieCrew(Response.data.params))
             store.dispatch(getMovieCrewPageInfo(Response.data.pageInfo))
         })
         .catch(function (error) {
              alert("影员信息加载异常")
         })
}
export function getFilmPage(api,page,pageSize) {
    Axios.get(api+"?page="+page+"&"+"pageSize="+pageSize)
        .then((Response)=>{
            store.dispatch(receiveFilms(Response.data.params))
            store.dispatch(getFimPageInfo(Response.data.pageInfo))
        })
        .catch(function (error) {
            alert("影员信息加载异常")
        })
}
export function getCinemaPage(api,page,pageSize) {
    Axios.get(api+"?page="+page+"&"+"pageSize="+pageSize)
        .then((Response)=>{
            store.dispatch(receiveCinemas(Response.data.params))
            store.dispatch(getCinemaPageInfo(Response.data.pageInfo))
        })
        .catch(function (error) {
            alert("影员信息加载异常")
        })
}
//模糊查询,查询
export async function getFilmQuery(api,film_name,director,status,product_area,type) {
  await Axios.get(api+"?film_name="+film_name+"&"+"director="+director+"&"+"status="+status+"&"+"product_area="+product_area+"&"+"type="+type)
      .then((Response)=>{
         // 保存查询的临时数组
         store.dispatch(getQueryFilmList(Response.data))
          //从数组之中读取数据显示为一页
          store.dispatch(receiveFilms(queryList(Response.data,1,5)))
          //更新分页信息
          store.dispatch(getFimPageInfo(queryPageInfo(Response.data,1,5)))
          //修改为查询状态
          store.dispatch(getQueryStatusFilm(1))
      })
      .catch(function (error) {
          console.log(error)
      })
}
export async function getMovieCrewQuery(api,movie_crew_name) {
    await Axios.get(api+"?movie_crew_name="+movie_crew_name)
        .then((Response)=>{
          store.dispatch(getQueryMovieCrewList(Response.data))
            store.dispatch(receiveMovieCrew(queryList(Response.data,1,5)))
            store.dispatch(getMovieCrewPageInfo(queryPageInfo(Response.data,1,5)))
            store.dispatch(getQueryStatusMovieCrew(1))
        })
        .catch(function (error) {
            console.log("影员查询异常")
        })
}
export async function getCinemaQuery(api,cinema_name,province,city) {
    await Axios.get(api+"?cinema_name="+cinema_name+"&"+"province="+province+"&"+"city="+city)
        .then((Response)=>{
             store.dispatch(getQueryCinemaList(Response.data))
            store.dispatch(receiveCinemas(queryList(Response.data,1,5)))
            store.dispatch(getCinemaPageInfo(queryPageInfo(Response.data,1,5)))
            store.dispatch(getQueryStatusCinema(1))
        })
        .catch(function (error) {
             console.log("影院查询异常")
        })
}
//添加，加上上await等待此步完成才可进行下一步操作，以便操作完成时才可请求刷新数据
export async function postAdd(api,json) {
   await Axios.post(api,json)
        .then((Response)=>{
            if(Response.data.message=="操作成功"){
                setTimeout("alert('添加成功')",100)
            }else {
                setTimeout("alert('添加失败')",100)
            }
        })
        .catch((error)=>{
            setTimeout("alert('添加失败')",100)
        })

}
//编辑

export async function postEdit(api,json) {
  await Axios.post(api,json)
       .then((Response)=>{
           if(Response.data.message=="操作成功"){
               // alert('成功编辑一条记录')
               // setTimeout("alert('成功编辑一条记录')",100)
               setTimeout(function () {
                   alert("成功删除一条记录");
               }, 100);
           }else {
               // alert("编辑失败")
               setTimeout("alert('编辑失败')",100)
           }
       })
       .catch(function (error) {
           setTimeout("alert('编辑失败')",100)
       })
}
//删除，加上上await等待此步完成才可进行下一步操作，以便操作完成时才可请求刷新数据
export async function getDelete(api,key) {
   await Axios.get(api+key)
        .then((Response)=>{
            if (Response.data.message=="操作成功"){

                setTimeout("alert('一条记录已成功删除')",100)
            }else setTimeout("alert('删除失败')",100)
        })
        .catch(Error=>{
            setTimeout("alert('删除失败')",100)
        })

}
//批量删除
export async function postSomeDelete(api,json) {


    await Axios.post(api,json)
        .then((Response)=>{
            if (Response.data.message=="操作成功"){

                setTimeout("alert('已成功删除记录')",100)
            }else setTimeout("alert('删除失败')",100)
        })
        .catch(Error=>{
            setTimeout("alert('删除失败')",100)
        })

}
export function getAll() {

}

