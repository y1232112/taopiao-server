import * as types from '../constants/actionTypes'



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