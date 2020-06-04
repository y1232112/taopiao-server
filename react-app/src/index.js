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

import {
    getAssignCinemaAdminIds,
    getAssignCinemaIds,

    getCinemaAdminPage,
    getCinemaPage,
    getFilmPage,
    getMovieCrewPage, getNoAssAdmin
} from "./apis/data";
import * as API from "./apis/api";
import {LOGIN_PRIVITE_INIT} from "./constants/actionTypes";
import {DEFAULT_PAGE_SIZE, DEFAULT_START_PAGE} from "./constants/const";
import {receivePostImgUrl} from "./actions";



const middleware=[thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
export const store=createStore(
    reducer,
    applyMiddleware(...middleware)
);

getFilmPage(API.filmPageApi,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE);
getCinemaPage(API.cinemaPageApi,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE);
getMovieCrewPage(API.movieCrewPageApi,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)
getCinemaAdminPage(API.cinemaAdminPageApi,DEFAULT_START_PAGE,DEFAULT_PAGE_SIZE)
getNoAssAdmin(API.cinema_no_Ass_cinemaAdminApi)
getAssignCinemaIds(API.assignCinemaIdsApi)
getAssignCinemaAdminIds(API.assignCinemaAdminIdsApi)
store.dispatch(receivePostImgUrl(""))
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
