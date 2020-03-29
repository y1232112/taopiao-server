
import films from "./films";
import cinemas from "./cinemas";
import {combineReducers} from "redux";
import loginPrivate from "./loginPrivite";
import menuResponse from "./menuResponse";
import movieCrew from "./movieCrew";
import checkedList from "./checkedList";
import filmPageInfo from "./filmPageInfo";
import movieCrewPageInfo from "./movieCrewPageInfo";
import cinemaPageInfo from "./cinemaPageInfo";
import queryFilmList from "./queryFilmList";
import queryMovieCrewList from "./queryMovieCrewList";
import queryCinemaList from "./queryCinemaList";
import queryStatusCinema from "./queryStatusCinema";
import queryStatusFilm from "./queryStatusFilm";
import queryStatusMovieCrew from "./queryStatusMovieCrew";
import movieCrewPageSize from "./movieCrewPageSize";
import filmPageSize from "./filmPageSize";
import cinemaPageSize from "./cinemaPageSize";

export default combineReducers(
   {
       films,
       cinemas,
       loginPrivate: loginPrivate,
       menuResponse: menuResponse,
       movieCrew: movieCrew,
      checkedList:checkedList,
       filmPageInfo,
       movieCrewPageInfo,
       cinemaPageInfo,
       queryFilmList,
       queryMovieCrewList,
       queryCinemaList,
       queryStatusCinema,
       queryStatusFilm,
       queryStatusMovieCrew,
       movieCrewPageSize,
       filmPageSize,
       cinemaPageSize,
   }
)