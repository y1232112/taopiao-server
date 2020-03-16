
import React from "react";
import "@babel/polyfill";
import axios from 'axios';
import App from './App';
import ReactDOM from 'react-dom';
import thunk from 'redux-thunk';
import { Provider } from 'react-redux';
import {applyMiddleware, createStore} from "redux";

import {getAllCinemas, getAllMovies} from "../../../../../react-app/src/actions";
import reducer from '../../../../../react-app/src/reducers'
import {RECEIVE_STATUS} from "../../../../../react-app/src/constants/actionTypes";
const middleware=[thunk];
export const store=createStore(
     reducer,
    applyMiddleware(...middleware)
)
store.dispatch(getAllCinemas);
store.dispatch(getAllMovies);
store.dispatch({
    type:RECEIVE_STATUS,
    "userStatus":1
})
// ReactDOM.render(
//     // <Provider store={store}>
//         <App />
//     // </Provider>
//  , document.getElementById('root'));


