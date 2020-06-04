import React from "react";
import $ from "jquery";
import {store} from "../index";
import {getQueryStatusFilm} from "../actions";
import {getFilmQuery} from "../apis/data";
import * as API from "../apis/api";
class CinemaFilmSearch extends React.Component{
    handleClickQuery=async ()=>{
        await getFilmQuery(
            API.filmSearchApi,
            $("#field_1").val(),
            $("#field_2").val(),
            $("#field_3").val(),
            $("#field_4").val(),

        )
    }
    handleReset=()=> {
        $("#field_1").val('')
        $("#field_2").val('')
        $("#field_3").val('')
        $("#field_4").val('')

        store.dispatch(getQueryStatusFilm(0))
    }
    render(){
        return <div id={'cinemaSearchFilm'}>
        <span>
            <input id={"field_1"} className={'mySearch'}   placeholder={'输入电影名'}/>
               <input id={"field_2"} className={'mySearch'}  placeholder={'输入导演'}/>

            <input id={"field_3"} className={'mySearch'}  placeholder={'输入出产地'}/>
            <input id={"field_4"} className={'mySearch'}  placeholder={'输入类型'}/>

           </span>
            <button onClick={()=>this.handleClickQuery()} className={"qBtn"}>查询</button>
            <button onClick={()=>this.handleReset()} className={"reBtn"}>重置</button>
        </div>
    }
}
export default CinemaFilmSearch;