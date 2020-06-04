import React from "react";
import {store} from "../index";
import * as types from "../constants/actionTypes";
import {connect} from "react-redux";
import CinemaMenu from "../components/CinemaMenu";
import AddHall from "../components/AddHall";
import Hall from "../components/Hall";
import AddSchedule from "../components/AddSchedule";
import Schedule from "../components/Schedule";
import {getCookie} from "../utils/cookieUtils";
import {
    getCinemaByAdminId,
    getCinemaSeats, getMySnacks,
    getSchedulesByCinemaId,
    postAndReceiveCinemaAdmin
} from "../apis/data";
import {
    cinemaSearchApi, mySnackApi,
    receiveCinemaAdminApi,
    receiveCinemaByAdminIdApi,
    scheduleApi,

} from "../apis/api";
import {receiveMenu, receivePostImgUrl, receiveServeTypes} from "../actions";
import FilmList from "../components/FilmList";
import ButtonSearchBar from "../components/ButtonSearchBar";
import CinemaFilmSearch from "../components/CinemaFilmSearch";
import AddServe from "../components/AddServe";
import Serve from "../components/Serve";
import AddSnack from "../components/AddSnack";
import Snack from "../components/Snack";
import Notice from "../components/Notice";
import MineInfo from "../components/MineInfo";
class CinemaContainer extends React.Component{

    //渲染标题
    renderTitle=()=>{
        switch (this.props.menuResponse) {
            case 1:
                return "影厅管理>添加影厅"
            case 2:
                return "影厅管理>查看影厅"
            case 3:
                return "场次管理>添加场次"
            case 4:
                return "场次管理>查看场次"
            case 5:
                return "影片信息>影片列表"
            case 6:
                return "服务>添加服务"
            case 7:
                return "服务>我的服务"
            case 8:
                return "小食>添加小食"
            case 9:
                return "小食>我的小食"
            case 10:
                return "公告"
            case 11:
                return "我的信息"
            default:
                return "影厅管理>添加影厅"

        }
   }


   componentDidMount() {

   }

   componentWillMount() {
       store.dispatch({
           type:types.LOGIN_PRIVITE_GET,
           loginPrivate:1
       })

       store.dispatch({
           type:types.RECEIVE_SEAT_INFO,
           seatInfo:{
               rows:0,
               columns:0,
               path:[],
               seat:[]
           }
       })

       let nick_name=getCookie("CINEMA_ADMIN");
       let password=getCookie("CINEMA_PASSWORD");
       let json={
           "params":{
               "nick_name":nick_name,
               "password":password
           }
       }

       postAndReceiveCinemaAdmin(receiveCinemaAdminApi,json)

   }
   renderContentOther=()=>{
          if (this.props.menuResponse==7||this.props.menuResponse==8||this.props.menuResponse==10){
              return "#eaeaea"
          }else {
              return "#ffffff"
          }
   }
   handleClickToMineInfo=()=>{
        store.dispatch(receiveMenu(11))
   }
    render() {
        let films=this.props.films;
        const columns=[
            {
                title:'电影编号',
                dataIndex:'film_id'
            },
            {
                title:'电影名称',
                dataIndex: 'film_name'
            },
            {
                title:'导演',
                dataIndex:'director'
            },
            {
                title:'片长',
                dataIndex:'film_length'
            },
            {
                title:'出产地区',
                dataIndex:'product_area'
            },
            {
                title:'简介',
                dadaIndex:'brief'
            },
            {
                title:'类型',
                dadaIndex:'type'
            },
            {
                title:'上演时间',
                dadaIndex:'public-date'
            },
            {
                title:'下档时间',
                dadaIndex:'end_date'
            },

            {
                title:'主演',
                dadaIndex:'actor'
            },
            {
                title:'图片',
                dadaIndex:'actor'
            }
            ]

        const wrapStyle={
            margin:'0',
            padding:'0',
            height:'100vh',
            width:'100%',
            display:'flex',
            overflow:'hidden',
            flexWrap:'nowrap',
            backgroundColor:'rgb(242,242,242)'
        };
        const menuContainer={
            width:'20%',
            height: '100%',


        };
        const mainContainer={
            width: '80%',
            backgroundColor:'#eaeaea',
            overflow: "scroll"
        };
        const headerStyle={
            height:'80px',
            backgroundColor:'#fffefd',
            position:'relative'
        };
        const contentStyle={
            // width:'100%',
            margin: '25px',
            backgroundColor:this.renderContentOther(),
            position:'relative'
        };
        const dataMargin={

            margin:'0px',
        };
        const titleStyle={
            height:'30px',
            backgroundColor:'#eaeaea',
            borderRadius:'2px',
            whiteSpace:'no-warp',
            fontWeight:'bold'
        }
        const table={
            margin:'0px',
            // minHeight:'200PX',
            overflowY:'scroll',

        }
        const menuMargin={
            margin:'0px',

        }
        const menuTop={
            height:'80px',

        }
        const menuMain={
            marginTop:'0px',
        }
        //
        let t=this.props.admin.cinema_admin_id
        console.log("id",t)
        if (t!==undefined){
            getCinemaByAdminId(receiveCinemaByAdminIdApi,this.props.admin.cinema_admin_id)

        }
      const  renderContent=()=>{
            switch (this.props.menuResponse) {
                case 1:
                    return <AddHall/>
                case 2:
                    return <Hall/>
                case 3:
                    return <AddSchedule/>
                case 4:
                    return <Schedule/>
                case 5:
                    return <FilmList DataSource={films} Columns={columns}/>
                case 6:
                    return <AddServe/>
                case 7:
                    return <Serve/>
                case 8:
                    return <AddSnack/>
                case 9:
                    return <Snack/>
                case 10:
                    return <Notice/>
                case 11:
                    return <MineInfo/>
                default:
                    return <AddHall/>
            }
        }
        const renderQuery=()=>{
            if (this.props.menuResponse==5){
                return <CinemaFilmSearch/>
            }
        }
        return <div  style={{padding:'0',margin:'0'}}>
            <div style={wrapStyle}>
                <div style={menuContainer} id={"menuContainer"}>
                    <div style={menuMargin}>
                        <div style={menuTop}></div>
                        <div style={menuMain}>
                           <CinemaMenu/>

                        </div>
                    </div>
                </div>
                <div style={mainContainer}>
                    <div style={headerStyle}>
                        <a
                            onClick={()=>this.handleClickToMineInfo()}
                            id={"to_mine_info"} style={{position:"absolute",bottom:"5px",left:"20px",color:"blue"}}>我的个人信息</a>
                    </div>
                    <div style={contentStyle}>
                        <div style={dataMargin}>
                            <div style={titleStyle}>
                                {this.renderTitle()}

                            </div>
                            <div style={{backgroundColor:'#eaeaea'}}>
                                {renderQuery()}
                            </div>
                            <div id={'dataContent'} style={table}>{renderContent()}</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    }

}
const mapStateTopProps=state=>({
    change:state.loginPrivate,
    menuResponse: state.menuResponse,
    admin:state.cinemaAdmin,
    films:state.films,


})
export default connect(mapStateTopProps) (CinemaContainer);
