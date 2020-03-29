import React from "react";
import {store} from "../index";
import * as types from "../constants/actionTypes"
import {connect} from "react-redux";
import Menu from "../components/Menu";
import EditFilm from "../components/EditFilm";
import AddFilm from "../components/AddFilm";
import FilmList from "../components/FilmList";
import AddMovieCrew from "../components/AddMovieCrew";
import EditMovieCrew from "../components/EditMovieCrew";
import MovieCrewList from "../components/MovieCrewList";
import AddCinema from "../components/AddCinema";
import EditCinema from "../components/EditCinema";
import CinemaList from "../components/CinemaList";
import ButtonSearchBar from "../components/ButtonSearchBar";
class SysContainer extends React.Component{




shouldComponentUpdate(nextProps, nextState, nextContext) {
    if (nextProps!==this.props){
        return true
    }
}

    render() {
        store.dispatch({
            type:types.LOGIN_PRIVITE_GET,
            loginPrivate:2
        });

        let films=this.props.films;
        let movieCrew=this.props.movieCrew;
        let cinemas=this.props.cinemas;

        {console.log('---crew up  test------',this.props.moviecrew)}
        {console.log('---crew up  test--let----',movieCrew)}

        let menuResponse=this.props.menuResponse;
        // console.log('---meu----',menuresponse)
        // console.log('----films----',films)
        // console.log('----movieCrew----',movieCrew)
        // console.log('--this  props--movieCrew----',this.props.movieCrew)
        const wrapStyle={
                margin:'0',
                padding:'0',
                height:'100vh',

                display:'flex',
                overflow:'hidden',
                flexWrap:'nowrap',
            backgroundColor:'rgba(247,241,238,1)'
        };
        const menuContainer={
            width:'20%',
            height: '100%',
           backgroundColor:'#2a2a58',
            // paddingBottom:99,

        };

        const mainContainer={
            width: '80%',
            backgroundColor:'#eaeaea',
            overflowY:'scroll',
            overflowX:'hidden',
        };
        const headerStyle={
           height:'80px',
            backgroundColor:'#fffefd',
        };
        const contentStyle={
            // width:'100%',
            margin: '25px',
            backgroundColor:'#ffffff',
        };
        const titleStytle={
            height:'70px',
            backgroundColor:'#eaeaea',
            borderRadius:'2px',
            whiteSpace:'no-warp',
        }
        const dataMargin={

            margin:'0px',
        };
        const table={
            margin:'5px',
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
                title:'状态',
                dataIndex:'status'
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
                title:'想看人数',
                dadaIndex:'wish_num'
            },
            {
                title:'综合评分',
                dadaIndex:'score'
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
       const columns2=[
           {
               title:'影员编号',
               dataIndex:'movie_crew_id'
           },
           {
               title:'影员姓名',
               dataIndex: 'movie_crew_name'
           },
           {
               title:'影员照片',
               dataIndex:'img'
           }
        ]
        const columns3=[
           {
               title:'影院编号',
               dataIndex:'cinema_id'
           },
            {
                title:'影院名称',
                dataIndex: 'cinema_name'
            },{
                title:'所在省',
                dataIndex:'province'
            },{
                title:'所在城市',
                dataIndex:'city'
            },
            {
                title:'所在区县',
                dataIndex:'county'
            },{
                title:'详细地址',
                dataIndex:'address'
            }

        ]

        //条件渲染
        const showTitle=()=>{
            switch (menuResponse) {
                case 1:
                    return "添加影片"
                case 2:
                    return "编辑影片"
                case 3:
                    return "电影列表"
                case 4:
                    return "添加影员"
                case 5:
                    return "编辑影员"
                case 6:
                    return "影员列表"
                case 7:
                    return "添加影院"
                case 8:
                    return "编辑影院"
                case 9:
                    return "影院列表"
                default:
                    return "添加影片"
            }
        }
        const  showContent=()=>{
            switch (menuResponse) {
                case 1:
                    console.log('---case---',menuResponse)
                    return <AddFilm/>
                case 2:
                    console.log('---case---',menuResponse)
                    return <EditFilm DataSource={films} Columns={columns}/>
                case 3:
                    return <FilmList DataSource={films} Columns={columns}/>
                case 4:
                    return <AddMovieCrew/>
                case 5:
                    return <EditMovieCrew DataSource={movieCrew} Columns={columns2}/>
                case 6:
                    return <MovieCrewList DataSource={movieCrew} Columns={columns2}/>
                case 7:
                    return <AddCinema/>
                case 8:
                    return <EditCinema DataSource={cinemas} Columns={columns3}/>
                case 9:
                    return <CinemaList DataSource={cinemas} Columns={columns3}/>
                default:
                   return <AddFilm/>
            }
        }
        return <div style={{padding:'0',margin:'0'}}>
            <div style={wrapStyle}>
               <div style={menuContainer}>
                   <div style={menuMargin}>
                       <div style={menuTop}></div>
                       <div style={menuMain}>
                        <Menu/>
                       </div>
                   </div>
               </div>
                <div style={mainContainer}>
                    <div style={headerStyle}>

                    </div>
                    <div style={contentStyle}>
                        <div id={'content'} style={dataMargin}>
                            <div style={titleStytle} >
                                <label>
                                    {
                                    showTitle()
                                    }

                                </label>
                                <ButtonSearchBar
                                    menuResponse={menuResponse}
                                    checkedList={this.props.checkedList}
                                    movieCrewPageInfo={this.props.movieCrewPageInfo}
                                    cinemaPageInfo={this.props.cinemaPageInfo}
                                    filmPageInfo={this.props.filmPageInfo}
                                    queryStatusMovieCrew={this.props.queryStatusMovieCrew}
                                queryStatusCinema= {this.props.queryStatusCinema}
                                queryStatusFilm= {this.props.queryStatusFilm}
                                />
                            </div>
                            <div id={'dataContent'} style={table}>

                              {showContent()}


                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
const mapStateTopProps=state=>({
    change:state.loginPrivate,
    films:state.films,
    menuResponse:state.menuResponse,
    movieCrew:state.movieCrew,
    cinemas:state.cinemas,
    checkedList:state.checkedList,
    movieCrewPageInfo: state.movieCrewPageInfo,
    cinemaPageInfo: state.cinemaPageInfo,
    filmPageInfo: state.filmPageInfo,
    queryStatusMovieCrew: state.queryStatusMovieCrew,
    queryStatusCinema: state.queryStatusCinema,
    queryStatusFilm: state.queryStatusFilm

})
export default connect(mapStateTopProps)( SysContainer);