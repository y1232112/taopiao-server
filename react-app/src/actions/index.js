import * as types from '../constants/actionTypes'
import queryStatusCinemaAdmin from "../reducers/queryStatusCinemaAdmin";
import {RECEIVE_ASSIGN_CINEMA_ADMIN_IDS} from "../constants/actionTypes";



//获取电影
export const receiveFilms=films=>({
    type:types.RECEIVE_FILMS,
    films
});

//获取影院
export const receiveCinemas=cinemas=>({
    type:types.RECEIVE_CINEMA,
    cinemas
})
//获取影院管理员
export const receiveCinemaAdmins=cinemaAdmins=>({
    type:types.RECEIVE_CINEMA_ADMINS,
    cinemaAdmins
})
export const loginGet={
    type:types.LOGIN_PRIVITE_GET,
    loginPrivate: 1
}

//当前菜单项对应的页面
export const receiveMenu=menuResponse=>({
    type:types.MENU_CHANGE,
        menuResponse
})
//获取影员列表
export const receiveMovieCrew=movieCrew=>({
    type:types.RECEIVE_MOVIE_CREW,
    movieCrew
})
//批量选择id列表
export const checkedList=checkedList=>({
    type:types.CHECKED_LIST,
    checkedList
})
export const getFimPageInfo=filmPageInfo=>({
    type:types.FILM_PAGE_INFO,
        filmPageInfo
})
export const getMovieCrewPageInfo=movieCrewPageInfo=>({
    type:types.MOVIE_CREW_PAGE_INFO,
    movieCrewPageInfo
})
export const getCinemaPageInfo=cinemaPageInfo=>({
    type:types.CINEMA_PAGE_INFO,
    cinemaPageInfo
})
export const actionNoAssCinemaAdminPageInfo=noAssCinemaAdminPageInfo=>({
    type:types.NO_ASS_CINEMA_ADMIN_PAGE_INFO,
    noAssCinemaAdminPageInfo
})
export const getCinemaAdminPageInfo=cinemaAdminPageInfo=>({
    type:types.CINEMA_ADMIN_PAGE_INFO,
    cinemaAdminPageInfo
})
export const getQueryFilmList=queryFilmList=>({
    type:types.QUERY_FILM,
    queryFilmList
})
export const getQueryMovieCrewList=queryMovieCrewList=>({
    type:types.QUERY_MOVIE_CREW,
    queryMovieCrewList
})
export const getQueryCinemaList=queryCinemaList=>({
    type:types.QUERY_CINEMA,
    queryCinemaList
})
export const getQueryNoAssAdminList=queryNoAssAdminList=>({
    type:types.QUERY_NO_ASS_ADMIN_LIST,
    queryNoAssAdminList
})
export const getQueryCinemaAdminList=queryCinemaAdminList=>({
    type:types.QUERY_CINEMA_ADMIN,
    queryCinemaAdminList
})
export const getQueryStatusMovieCrew=queryStatusMovieCrew=>({
    type: types.STATUS_QUERY_MOVIE_CREW,
    queryStatusMovieCrew
})
export const getQueryStatusFilm=queryStatusFilm=>({
    type:types.STATUS_QUERY_FILM,
    queryStatusFilm
})
export const getQueryStatusCinema=queryStatusCinema=>({
    type:types.STATUS_QUERY_CINEMA,
    queryStatusCinema
})
export const getQueryStatusCinemaAdmin=queryStatusCinemaAdmin=>({
    type:types.STATUS_QUERY_CINEMA_ADMIN,
    queryStatusCinemaAdmin
})
export const getFilmPageSize=filmPageSize=>({
    type:types.FILM_PAGE_SIZE,
    filmPageSize
})
export const getCinemaPageSize=cinemaPageSize=>({
    type:types.CINEMA_PAGE_SIZE,
    cinemaPageSize
})
export const getMovieCrewPageSize=movieCrewPageSize=>({
    type:types.MOVIE_CREW_PAGE_SIZE,
    movieCrewPageSize
})
export const receiveNoAssCinemaAdmin=noAssCinemaAdmin=>({
    type:types.RECEIVE_NO_ASS_CINEMA_ADMIN,
  noAssCinemaAdmin
})
export const receiveAssignCinemaIds=assignCinemaIds=>({
    type:types.RECEIVE_ASSIGN_CINEMA_IDS,
    assignCinemaIds
})
export const receiveAssignCinemaAdminIds=assignCinemaAdminIds=>({
    type:RECEIVE_ASSIGN_CINEMA_ADMIN_IDS,
    assignCinemaAdminIds
})
export const receiveSeatInfo=seatInfo=>({
    type:types.RECEIVE_SEAT_INFO,
    seatInfo
})
export const receiveCinemaAdmin=cinemaAdmin=>({
    type:types.RECEIVE_CINEMA_ADMIN,
        cinemaAdmin
})
export const receiveCinemaByAdminId=cinema=>({
    type:types.RECEIVE_CINEMA_BY_ADMIN_ID,
    cinema
})
export const receiveHallByCinema=halls=>({
    type:types.RECEIVE_HALLS,
    halls
})
export const receiveCinemaSeats=cinemaSeats=>({
    type:types.RECEIVE_CINEMA_SEATS,
    cinemaSeats
})
export const currentShowHallI=currentHall=>({
    type:types.CURRENT_SHOW_HALL,
    currentHall
})
export const receiveUploadImgUrl=upUrl=>({
    type:types.RECEIVE_UPLOAD_IMG_URL,
    upUrl
})
export const receivePostImgUrl=postImgUrl=>({
    type:types.RECEIVE_POST_IMG_URL,
    postImgUrl
})
export const receiveSchedule=schedules=>({
    type:types.RECEIVE_SCHEDULES,
    schedules
})

export const receiveMyServe=myServe=>({
    type:types.RECEIVE_MYSERVE,
    myServe
})
export const receiveDiscountNumbeer=discountNumber=>({
    type:types.RECEIVE_DISCOUNT_NUMBER,
    discountNumber
})
export const receiveOriginPrice=originPrice=>({
    type:types.RECEIVE_ORIGIN_PRICE,
    originPrice
})
export const receiveShowItem=showItem=>({
    type:types.SHOW_ITEM,
    showItem
})
export const receiveMySnacks=mySnacks=>({
    type:types.MY_SNACKS,
    mySnacks
})
export const receiveNotice=notice=>({
    type:types.RECEIVE_NOTICE,
    notice
})