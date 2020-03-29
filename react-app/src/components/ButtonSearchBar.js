import React from "react";
import alert from "../utils/alert";
import $ from "jquery"
import contains from "../utils/helpUtil";
import * as sysTypes from "../constants/const"
import * as API from "../apis/api";
import getAllFilms, {
    getCinemaQuery,

    getFilmPage,
    getFilmQuery,
    getMovieCrewQuery,
    postSomeDelete
} from "../apis/data";
import {store} from "../index";
import {filmListApi} from "../apis/api";
import {movieCrewListApi} from "../apis/api";
import {cinemaListApi} from "../apis/api";
import {checkedList, getQueryStatusCinema, getQueryStatusFilm, getQueryStatusMovieCrew} from "../actions";
import {filmPageApi} from "../apis/api";
import {movieCrewPageApi} from "../apis/api";
import {cinemaPageApi} from "../apis/api";
import {cinemaSearchApi} from "../apis/api";
class ButtonSearchBar extends React.Component{






    handleClickDelete=async ()=>{
        if (this.props.checkedList.length==0){
            alert("你还没有选择")
            return ;
        }
     let json={
         "version":sysTypes.VERSION,
         "params":{
             "ids":this.props.checkedList
         }
     }
    let api;
        switch (this.props.menuResponse) {
            case 2:
               await postSomeDelete(API.deleteFilmsApi,json)
                // getAllFilms(filmListApi);
                let c=this.props.filmPageInfo.currentPage
                let s=this.props.filmPageInfo.pageSize
                getFilmPage(filmPageApi,c,s)
                store.dispatch(checkedList([]))
                break;
            case 5:
              await postSomeDelete(API.deleteMovieCrewsApi,json)
                // getAllMovieCrew(movieCrewListApi)
                let c2=this.props.movieCrewPageInfo.currentPage
                let s2=this.props.movieCrewPageInfo.pageSize
                getFilmPage(movieCrewPageApi,c2,s2)
                store.dispatch(checkedList([]))
                break;
            case 8:
               await postSomeDelete(API.deleteCinemasApi,json)
                // getAllCinemas(cinemaListApi)
                let c3=this.props.cinemaPageInfo.currentPage
                let s3=this.props.cinemaPageInfo.pageSize
               getFilmPage(cinemaPageApi,c3,s3)
                store.dispatch(checkedList([]))
                break;
            default:
                return ;
        }




        console.log('-----stop---e-------')
    }
    handleRenderInput=()=>{
        console.log("----------menu----------",this.props.menuResponse)
        if (this.props.menuResponse===2||this.props.menuResponse===3){
            return <span>
            <input id={"field_1"} className={'mySearch'}   placeholder={'输入电影名'}/>
               <input id={"field_2"} className={'mySearch'}  placeholder={'输入导演'}/>
            <input id={"field_3"} className={'mySearch'}  placeholder={'输入状态'}/>
            <input id={"field_4"} className={'mySearch'}  placeholder={'输入出产地'}/>
            <input id={"field_5"} className={'mySearch'}  placeholder={'输入类型'}/>

           </span>
        }

        if (this.props.menuResponse===5||this.props.menuResponse===6){
           return <span>
            <input id={"field_1"} className={'mySearch'}  placeholder={'输入影员名称'}/>

           </span>
        }
        if (this.props.menuResponse===8||this.props.menuResponse===9){
            return <span>
            <input id={"field_1"} className={'mySearch'}  placeholder={'输入影院名'}/>
               <input id={"field_2"} className={'mySearch'}  placeholder={'输入省份'}/>
            <input id={"field_3"} className={'mySearch'}  placeholder={'输入城市'}/>

           </span>
        }

    }
    handleClickQuery=async ()=>{
        if (this.props.menuResponse===2||this.props.menuResponse===3){
            console.log("-----field---",    $("#field_1").val())
           await getFilmQuery(
               API.filmSearchApi,
               $("#field_1").val(),
               $("#field_2").val(),
               $("#field_3").val(),
               $("#field_4").val(),
               $("#field_5").val()
           )
        }
        if (this.props.menuResponse===5||this.props.menuResponse===6){
            console.log("-----field---",    $("#field_1").val())
               await getMovieCrewQuery(
                    API.movieCrewSearchApi,
                    $("#field_1").val()
                )
        }
         if (this.props.menuResponse===8||this.props.menuResponse===9){
             console.log("-----field---",    $("#field_1").val())
              await getCinemaQuery(
                   API.cinemaSearchApi,
                   $("#field_1").val(),
                   $("#field_2").val(),
                   $("#field_3").val(),
               )
        }

    }
    handleReset=()=>{
         $("#field_1").val('')
        $("#field_2").val('')
        $("#field_3").val('')
        $("#field_4").val('')
        $("#field_5").val('')
        if (this.props.menuResponse===2||this.props.menuResponse===3){
            store.dispatch(getQueryStatusFilm(0))
        }
        if (this.props.menuResponse===5||this.props.menuResponse===6){
            store.dispatch(getQueryStatusMovieCrew(0))
        }
        if (this.props.menuResponse===8||this.props.menuResponse===9){
            store.dispatch(getQueryStatusCinema(0))
        }

    }
    handleRender=(menu,dom1,dom2)=>{

        switch (menu) {
            case 3:
                return dom1
            case 6:
                return dom1
            case 9:
                return dom1
            case 2:
                return dom2
            case 5:
                return dom2
            case 8:
                return dom2
            default:
                return ;
        }
    }
    //条件渲染删除按钮
      doRenderButton=()=>{

        if (this.props.checkedList.length==0){
            return 'someDeleteBtn0'
        }else {
            return 'someDeleteBtn'
        }

      }

    dom1=()=>{
        return <div id={"dom1"}>
            {
                this.handleRenderInput()
            }
            <button onClick={()=>this.handleClickQuery()} className={"qBtn"}>查询</button>
            <button onClick={()=>this.handleReset()} className={"reBtn"}>重置</button>
            </div>
    }
    dom2=()=>{

      return <div style={{width:'500px'}} id={"dom2"}>

              <button  id={'mBtn'}
                      onClick={()=>this.handleClickDelete()}
                      className={this.doRenderButton()}>
                  删除
              </button>
          {
              this.handleRenderInput()
          }
          <button onClick={()=>this.handleClickQuery()} className={"qBtn"}>查询</button>
          <button onClick={()=>this.handleReset()} className={"reBtn"}>重置</button>
      </div>
    }

    render() {

        return <div id={"ButtonSearchBar"}>
            {
                this.handleRender(this.props.menuResponse,this.dom1(),this.dom2())
            }

        </div>
    }
}

export default ButtonSearchBar;