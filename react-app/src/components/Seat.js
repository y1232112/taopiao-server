import React from "react";
import {store} from "../index";
import * as types from "../constants/actionTypes";
class Seat extends React.Component{
    handleClickImg=()=>{
           let seat=this.props.seat;
           let pr=this.props.totalRow;
           let pc=this.props.totalColumn;
           //当前行
           let mr=this.props.row;
           let count=this.props.count;
           let itemValue=this.props.itemValue;
           //当前列
           let mc;
           if ((count%pc)===0){
               mc=pc;
           }else {
               mc=(count%pc)
           }
        let tempArray=[];

        for (let i=0;i<pr;i++){
            let tempArray2=[];
            for (let j=0;j<pc;j++){
                if ((mr-1==i)&&(mc-1==j)){
                    if (itemValue==1){
                        tempArray2.push(0)
                    }
                    if (itemValue==0){
                        tempArray2.push(1)
                    }
                }else {
                    tempArray2.push(seat[i][j])
                }


            }
            tempArray.push(tempArray2)
        }
        // console.log('------t---',tempArray)
        store.dispatch({
            type:types.RECEIVE_SEAT_INFO,
            seatInfo:{
                rows:pr,
                columns:pc,
                path:[],
                seat:tempArray
            }
        })
    }
    render() {

        // console.log('props row count column',this.props.row,this.props.count,this.props.count%this.props.totalColumn)
        return this.props.itemValue==1?<img onClick={()=>this.handleClickImg()} src={require("../imges/seat_bj.png")} width={'30px'} height={'30px'}/>:<img
            onClick={()=>this.handleClickImg()} src={require("../imges/seat_xx_bj.png")} width={'30px'} height={'30px'}/>
    }
}
export default Seat;