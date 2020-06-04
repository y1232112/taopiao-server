import React from "react";
import {receiveShowItem} from "../actions";
import {store} from "../index";
import $ from "jquery";
class ShowItem extends React.Component{
    handleChangeItem=(e)=>{
        let v=e.target.value.trim();
        console.log("======s"+v)
        if (v=="1"||v=="2"||v=="3"||v=="4"){

            store.dispatch(receiveShowItem(v))

        }
    }
    render() {
        return <div style={{width:"800px"}}>
            <input
             onChange={(e)=>this.handleChangeItem(e)}
            id={"item_nums"} placeholder={"输入食品条目个数"}/>

        </div>

    }
}
export default ShowItem;