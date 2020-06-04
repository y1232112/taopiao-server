
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
import cinemaAdmins from "./cinemaAdmins";
import cinemaAdminPageInfo from "./cinemaAdminPageInfo";
import cinemaAdminPageSize from "./cinemaAdminPageSize";
import queryStatusCinemaAdmin from "./queryStatusCinemaAdmin";
import queryCinemaAdminList from "./queryCinemaAdminList";
import noAssCinemaAdmin from "./noAssCinemaAdmin";
import noAssCinemaAdminPageInfo from "./noAssCinemaAdminPageInfo";
import queryNoAssAdminList from "./queryNoAssAdmin";
import assignCinemaIds from "./assignCinemaIds";
import assignCinemaAdminIds from "./assignCinemaAdminIds";
import seatInfo from "./seatInfo";
import cinemaAdmin from "./cinemaAdmin";
import cinema from "./cinema";
import halls from "./halls";
import cinemaSeats from "./cinemaSeats";
import currentHall from "./currentHall";
import upUrl from "./upUrl";
import postImgUrl from "./postImgUrl";
import schedules from "./schedules";
import myServe from "./myServe";
import discountNumber from "./discountNumber";
import originPrice from "./originPrice";
import showItem from "./showItem";
import mySnacks from "./mySnacks";
import notice from "./notice";

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
       cinemaAdmins,
       cinemaAdminPageInfo,
       cinemaAdminPageSize,
       queryStatusCinemaAdmin,
      queryCinemaAdminList,
       noAssCinemaAdmin,
       noAssCinemaAdminPageInfo,
       queryNoAssAdminList,
       assignCinemaIds,
       assignCinemaAdminIds,
       seatInfo,
       cinemaAdmin,
       cinema,
       halls,
       cinemaSeats,
       currentHall,
       upUrl,
       postImgUrl,
       schedules,
       myServe,
       discountNumber,
       originPrice,
       showItem,
       mySnacks,
       notice,
   }
)