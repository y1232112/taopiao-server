import Axios from "axios";

import {store} from "../index";
import {
    actionNoAssCinemaAdminPageInfo, currentShowHallI,
    getCinemaAdminPageInfo,
    getCinemaPageInfo,
    getFimPageInfo,
    getMovieCrewPageInfo,
    getQueryCinemaAdminList,
    getQueryCinemaList,
    getQueryFilmList,
    getQueryMovieCrewList,
    getQueryStatusCinema,
    getQueryStatusCinemaAdmin,
    getQueryStatusFilm,
    getQueryStatusMovieCrew,
    receiveAssignCinemaAdminIds,
    receiveAssignCinemaIds,
    receiveCinemaAdmin,
    receiveCinemaAdmins, receiveCinemaByAdminId,
    receiveCinemas, receiveCinemaSeats,
    receiveFilms, receiveHallByCinema,
    receiveMovieCrew, receiveMyServe, receiveMySnacks,
    receiveNoAssCinemaAdmin, receiveNotice, receivePostImgUrl, receiveSchedule, receiveServeTypes
} from "../actions";
import * as API from "./api";
import alert from "../utils/alert";
import queryMovieCrewList from "../reducers/queryMovieCrewList";
import {queryList, queryPageInfo} from "../actions/pageInfo";
import {DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE} from "../constants/const";
import {scheduleApi} from "./api";
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
           console.log("影片信息加载异常",Error)
        })

}

export function getAllCinemas(api) {
    Axios.get(api)
        .then(Response=>{
            store.dispatch(receiveCinemas(Response.data))
        })
        .catch(Error=>{
           console.log("影院信息加载异常",Error)
        })
}
export function getAllMovieCrew(api) {
    Axios.get(api)
        .then(Response=>{
            store.dispatch(receiveMovieCrew(Response.data))

        })
        .catch(Error=>{

              console.log("影员信息加载异常",Error)
        })
}
//获取为分配的管理员列表
export  function getNoAssAdmin(api) {
       Axios(api)
          .then((Response)=>{
              store.dispatch(receiveNoAssCinemaAdmin(Response.data))
             store.dispatch(actionNoAssCinemaAdminPageInfo(queryPageInfo(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
          })
          .catch(function (err) {
           console.log("管理员数据请求异常")
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
             console.log("影员信息加载异常",error)
         })
}
export function getFilmPage(api,page,pageSize) {
    Axios.get(api+"?page="+page+"&"+"pageSize="+pageSize)
        .then((Response)=>{
            store.dispatch(receiveFilms(Response.data.params))
            store.dispatch(getFimPageInfo(Response.data.pageInfo))
        })
        .catch(function (error) {
            console.log("影片信息加载异常",error)
        })
}
export function getCinemaPage(api,page,pageSize) {
    Axios.get(api+"?page="+page+"&"+"pageSize="+pageSize)
        .then((Response)=>{
            store.dispatch(receiveCinemas(Response.data.params))
            store.dispatch(getCinemaPageInfo(Response.data.pageInfo))
        })
        .catch(function (error) {
          console.log("影院信息加载异常",error)
        })
}
export function getCinemaAdminPage(api,page,pageSize) {
   Axios.get(api+"?page="+page+"&"+"pageSize="+pageSize)
       .then((Response)=>{
           store.dispatch(receiveCinemaAdmins(Response.data.params))
           store.dispatch(getCinemaAdminPageInfo(Response.data.pageInfo))
       })
       .catch(function (error) {
          console.log("影院管理员信息加载异常",error)
       })
}
//模糊查询,查询
export async function getFilmQuery(api,film_name,director,product_area,type) {
  await Axios.get(api+"?film_name="+film_name+"&"+"director="+director+"&"+"product_area="+product_area+"&"+"type="+type)
      .then((Response)=>{
         // 保存查询的临时数组
         store.dispatch(getQueryFilmList(Response.data))
          //从数组之中读取数据显示为一页
          store.dispatch(receiveFilms(queryList(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
          //更新分页信息
          store.dispatch(getFimPageInfo(queryPageInfo(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
          //修改为查询状态
          store.dispatch(getQueryStatusFilm(DEFAULT_START_PAGE))
      })
      .catch(function (error) {
          console.log(error)
      })
}
export async function getMovieCrewQuery(api,movie_crew_name) {
    await Axios.get(api+"?movie_crew_name="+movie_crew_name)
        .then((Response)=>{
          store.dispatch(getQueryMovieCrewList(Response.data))
            store.dispatch(receiveMovieCrew(queryList(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
            store.dispatch(getMovieCrewPageInfo(queryPageInfo(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
            store.dispatch(getQueryStatusMovieCrew(DEFAULT_START_PAGE))
        })
        .catch(function (error) {
            console.log("影员查询异常")
        })
}
export async function getCinemaQuery(api,cinema_name,province,city) {
    await Axios.get(api+"?cinema_name="+cinema_name+"&"+"province="+province+"&"+"city="+city)
        .then((Response)=>{
             store.dispatch(getQueryCinemaList(Response.data))
            store.dispatch(receiveCinemas(queryList(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
            store.dispatch(getCinemaPageInfo(queryPageInfo(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
            store.dispatch(getQueryStatusCinema(DEFAULT_START_PAGE))
        })
        .catch(function (error) {
             console.log("影院查询异常")
        })
}
export async function getCinemaAdminQuery(api,nick_name,phone,real_name) {
    await Axios.get(api+"?nick_name="+nick_name+"&"+"phone="+phone+"&"+"real_name="+real_name)
        .then((Response)=>{
            store.dispatch(getQueryCinemaAdminList(Response.data))
            store.dispatch(receiveCinemaAdmins(queryList(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
            store.dispatch(getCinemaAdminPageInfo(queryPageInfo(Response.data,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)))
            store.dispatch(getQueryStatusCinemaAdmin(DEFAULT_START_PAGE))
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
            console.log("添加失败",error)
        })

}
//编辑

export async function postEdit(api,json) {
  await Axios.post(api,json)
       .then((Response)=>{
           if(Response.data.message=="操作成功"){
               // alert('成功编辑一条记录')
               // setTimeout("alert('成功编辑一条记录')",100)

                   alert("成功编辑一条记录");

           }else {
               // alert("编辑失败")
            alert('编辑失败')

           }
       })
       .catch(function (error) {
         alert('编辑失败')
           console.log("编辑失败",error)
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
            console.log("删除失败",Error)
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
            console.log("删除失败",Error)
        })

}
//插入分配信息
export async function  insertAssignInfo(api,json) {
   await Axios.post(api,json)
       .then((Response)=>{
           if (Response.data.message=="操作成功"){
               alert("分配成功")
           }


       })
       .catch(function (error) {
          alert("分配失败")
       })
}
//获得已经分配的影院id数组
export function getAssignCinemaIds(api) {
      Axios.get(api)
         .then((Response)=>{
             store.dispatch(receiveAssignCinemaIds(Response.data.ids))
         })
         .catch(function (error) {
            console.log("分配信息加载异常")
         })
}
//获得已经分配的管理员id数组
export function getAssignCinemaAdminIds(api) {
   Axios.get(api)
       .then((Response)=>{
           store.dispatch(receiveAssignCinemaAdminIds(Response.data.ids))
       })
       .catch(function (error) {
           console.log("管理员分配的信息请求异常",error)
       })
}
//添加影厅信息
export function postAddHall(api,json) {
    Axios.post(api,json)
        .then((Response)=>{
            if (Response.data.message=="操作成功"){
                alert("添加成功")
            }
        })
        .catch(function (error) {
            alert("添加异常")
             console.log(error)
        })
}
//获得影院管理员
export function postAndReceiveCinemaAdmin(api,json) {
  Axios.post(api,json)
      .then((Response)=>{
          store.dispatch(receiveCinemaAdmin(Response.data[0]))

      })
      .catch(function (error) {
         alert("管理员信息获取异常")
          console.log(error)
      })
}
//根据管理员信息获取影院信息
export  function getCinemaByAdminId(api,id) {
    Axios.get(api+id)
        .then((Response)=>{
            store.dispatch(receiveCinemaByAdminId(Response.data))
            getSchedulesByCinemaId(scheduleApi,Response.data[0].cinema_id)
        })
        .catch(function (error) {
        alert("影院信息请求异常")
            console.log(error)
        })
}
export function postAddSeats(api,json) {
    Axios.post(api,json)
        .then((Response)=>{
            if (Response.data.message=="操作成功"){
                alert("位置信息添加成功")
            }
        })
        .catch(function (error) {
           alert("位置信息添加失败");
           console.log(error)
        })

}
//获得影厅信息
export function getHallByCinema(api,id) {
    Axios.get(api+id)
        .then((Response)=>{
            console.log("hall---get "+Response.data)
            store.dispatch(receiveHallByCinema(Response.data));
            if (Response.data==""){

                store.dispatch(currentShowHallI(Response.data))
            }else {
                store.dispatch(currentShowHallI(Response.data[0]))
            }

        })
        .catch(function (error) {
            alert("影厅信息获取异常");
            console.log(error)
        })
}
//获得影院座位信息
export function getCinemaSeats(api,id) {
    Axios.get(api+id)
        .then((Response)=>{
            store.dispatch(receiveCinemaSeats(Response.data))
        })
        .catch(function (error) {
            alert("影院座位信息获取异常");
            console.log(error)
        })

}
//发送图片
export function postUploadImg(api,formData) {
    const instance=Axios.create({
        withCredentials: true
    })
    instance.post(api,formData)
        .then((Response)=>{
            console.log(Response.data);
            if (Response.data!=="上传失败"&&Response.data!=="图片格式不正确"&&Response.data!=="图片大小不能超过100k"&&Response.data!=="文件为空"){
                store.dispatch(receivePostImgUrl(Response.data))
            }else {
                alert(Response.data)
            }
        })
        .catch(function (error) {
              alert("图片上传失败")
            console.log(error)
        })
}
//添加场次
export function postAddSchedule(api,json) {
   Axios.post(api,json)
       .then((Response)=>{
           if (Response.data.message=="操作成功"){
               alert("添加成功")
           }else {
               alert("添加失败")
           }
       })
       .catch(function (error) {
           alert("场次信息添加异常")
           console.log(error)

       })
}
//获取场次信息
export function getSchedulesByCinemaId(api,id) {
    Axios.get(api+id)
        .then((Response)=>{
            store.dispatch(receiveSchedule(Response.data))

        })
        .catch(function (error) {
           alert("长此信息获取一异常")
        })

}
// export function getServeTypes(api) {
//   Axios.get(api)
//       .then((Response)=>{
//
//       })
//       .catch(function (error) {
//           console.log(error)
//       })
// }
export function getMyServe(api,id) {
    Axios.get(api+id)
        .then((Response)=>{
            store.dispatch(receiveMyServe(Response.data))
        })
        .catch(function (error) {
          console.log(error)
        })
}
//获得影院小食
export function getMySnacks(api,id) {
    Axios.get(api+id)
        .then((Response)=>{
            store.dispatch(receiveMySnacks(Response.data))
        })
        .catch(function (error) {
            console.log(error)
        })
}
export function postDelete(api,json) {
   Axios.post(api,json)
       .then((Response)=>{
           if (Response.data.message=="操作成功"){
               alert("删除成功")
           }else {
               alert("删除失败")
           }
       })
       .catch(function (error) {
          console.log(error)
       })
}
export function postAddSnack(api,json) {
    Axios.post(api,json)
        .then((Response)=>{
            if (Response.data.message=="操作成功"){
                alert("添加成功")
            }else {
                alert("添加失败")
            }
        })
        .catch(function (error) {
            alert("小食信息添加异常")
            console.log(error)

        })
}
export function getNotice(api,id) {
 Axios.get(api+id)
     .then((Response)=>{
         store.dispatch(receiveNotice(Response.data))
     })
     .catch(function (error) {
         console.log(error)
     })
}
export function postCommon(api,json) {
    Axios.post(api,json)
        .then((Response)=>{
            if (Response.data.message=="操作成功"){
                alert("添加成功")
            }else {
                alert("添加失败")
            }
        })
        .catch(function (error) {
            alert("添加失败")
            console.log(error)

        })
}
export function postMyInfo(api,json) {
    Axios.post(api,json)
        .then((Response)=>{
            if (Response.data.message=="操作成功"){
                alert("更新成功")
            }else {
                alert("更新失败")
            }
        })
        .catch(function (error) {
            alert("更新失败")
            console.log(error)

        })
}
export function getAll() {

}

