import * as types from '../constants/actionTypes'
import data from "../apis/data";


//获取电影
const receiveMovies=films=>({
    type:types.RECEIVE_FILMS,
    films
});

//获取影院
const receiveCinemas=cinemas=>({
    type:types.RECEIVE_CINEMA,
    cinemas
})
export const loginGet={
    type:types.LOGIN_PRIVITE_GET,
    loginpivate: 1
}

//
// const receiveLginPrivate=loginprivate=>({
//     type:types.LOGIN_PRIVITE_INIT,
//     loginprivate
// })
// export const loginPrivateInit=()=>dispatch=>{
//     dispatch(receiveLginPrivate(data.loginprivate))
// }