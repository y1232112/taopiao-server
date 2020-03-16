import Axios from "axios";

import {store} from "../index";
Axios.defaults.baseURL='http://localhost:3000';
Axios.defaults.withCredentials=true;
Axios.defaults.timeout=100000;

export default function getAllFilms(api, type)
{

    Axios.get(api)
        .then(Response => {
            store.dispatch({
                type: type,
                films: Response.data
            })
        })
        .catch(Error => {
            alert('电影信息请求异常')
        })

}
export function getAllCinemas(api,type) {
    Axios.get(api)
        .then(Response=>{
            store.dispatch({
                type:type,
                cinemas:Response.data
            })
        })
        .catch(Error=>{
            alert('影院信息请求异常')
        })
}
export function getAll() {

}

