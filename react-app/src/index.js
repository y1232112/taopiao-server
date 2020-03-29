import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import thunk from "redux-thunk";
import {applyMiddleware, createStore} from "redux";
import reducer from './reducers';
import {Provider} from "react-redux";
import {createLogger} from "redux-logger/src";
import getAllFilms, {getAllCinemas, getAllMovieCrew, getCinemaPage, getFilmPage, getMovieCrewPage} from "./apis/data";
import * as API from "./apis/api";
import {LOGIN_PRIVITE_INIT} from "./constants/actionTypes";
import {filmListApi} from "./apis/api";
import {cinemaListApi} from "./apis/api";
import {movieCrewListApi} from "./apis/api";



const middleware=[thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
export const store=createStore(
    reducer,
    applyMiddleware(...middleware)
);
// getAllFilms(filmListApi);
// getAllCinemas(cinemaListApi);
// getAllMovieCrew(movieCrewListApi)
getFilmPage(API.filmPageApi,1,5);
getCinemaPage(API.cinemaPageApi,1,5);
getMovieCrewPage(API.movieCrewPageApi,1,5)

store.dispatch({
    type:LOGIN_PRIVITE_INIT,
    loginPrivate: 0
});
let loginPrivate=store.getState().loginPrivate;
console.log('----------index--store------',loginPrivate);

ReactDOM.render(
    <Provider store={store}>
        <App loginPrivate={loginPrivate}/>
    </Provider>
, document.getElementById('root'));


serviceWorker.unregister();
