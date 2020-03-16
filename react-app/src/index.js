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
import getAllFilms , {getAllCinemas} from "./apis/data";
import {cinemaListApi, filmListApi} from "./apis/api";
import * as types from "./constants/actionTypes"
import {RECEIVE_FILMS} from "./constants/actionTypes";
import {LOGIN_PRIVITE_INIT} from "./constants/actionTypes";


const middleware=[thunk];
if (process.env.NODE_ENV !== 'production') {
    middleware.push(createLogger());
}
export const store=createStore(
    reducer,
    applyMiddleware(...middleware)
);
getAllFilms(filmListApi,types.RECEIVE_FILMS);
getAllCinemas(cinemaListApi,types.RECEIVE_CINEMA);
store.dispatch({
    type:LOGIN_PRIVITE_INIT,
    loginprivate: 0
});
let loginprivate=store.getState().loginprivate;
console.log('----------index--store------',loginprivate);
ReactDOM.render(
    <Provider store={store}>
        <App loginprivate={loginprivate}/>
    </Provider>
, document.getElementById('root'));


serviceWorker.unregister();
