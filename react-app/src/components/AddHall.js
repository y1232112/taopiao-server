import React from "react";
import Seat from "./Seat";
import {connect} from "react-redux";
import {store} from "../index";
import $ from "jquery";
import * as types from "../constants/actionTypes";
import {postAddHall, postAddSeats} from "../apis/data";
import {addHallApi, postAddSeatsApi} from "../apis/api";
class AddHall extends React.Component{

    constructor(props, context) {
        super(props, context);

    }



//操作确定按钮
    handleClickBtn=(p1,p2,p3,p4)=>{
        // console.log("------------REFS----------",p3)

        let match = /[0-9]$/;
        if (match.test(p3)&&match.test(p4)&&match.test(p1)) {
            if (p1==''){
                alert('影厅编号不能为空')
                return;
            }
            if (p2==''){
                alert('影厅名不能为空');
                return;
            }
            if (p3<=0){
                alert("行数不能小于0")
                return;
            }
            if (p3>=99){
                alert("行数只能小于99")
                return;
            }
            if (p4<=0){
                alert("列数不能小于等于0")
                return;
            }
            if (p4>25){
                alert("列数只能小于25")
                return;
            }
            let tempArray=[];

            for (let r=0;r<p3;r++){
                let tempArray2=[];
                for (let c=0;c<p4;c++){
                    tempArray2.push(1)

                }
                tempArray.push(tempArray2)
            }
            console.log('temp:',tempArray)
            store.dispatch({
                type:types.RECEIVE_SEAT_INFO,
                seatInfo:{
                    rows:p3,
                    columns:p4,
                    path:[],
                    seat:tempArray
                }
            })

        }else {
            alert('请输入数字')
        }
    }
    //提交信息
    handleCommit= (p1,p2)=>{

        if (this.props.seatInfo.rows==0){
            alert('你还未输入有效信息');
            return ;
        }
        console.log(" 座位信息数组 ",this.props.seatInfo.seat,this.props.seatInfo.rows,this.props.seatInfo.columns)
        let seats=[];
        let count=1;
        let seat=this.props.seatInfo.seat;
         let r=this.props.seatInfo.rows;
         let c=this.props.seatInfo.columns;
         for (let i=0;i<r;i++){
             for (let j=0;j<c;j++){

                     let temp={
                         "seat_id":count++,
                         "cinema_id":this.props.cinema[0].cinema_id,
                         "hall_id":p1,
                         "row":i+1,
                         "column":j+1,
                         "active":seat[i][j]
                     };

               seats.push(temp);



             }
         }

           console.log("seats ---- info arr :",seats)
           console.log("cinema_id"+this.props.cinema[0].cinema_id)
            console.log("id name hall",p1,p2)
            let json={
                "params":{
                    "hall_id":p1,
                    "cinema_id":this.props.cinema[0].cinema_id,
                    "hall_name":p2,
                    "row_count":r,
                    "column_count":c,
                     "hall_type":$("#hallType").val(),
                   
                }
            }
            console.log(json)
           postAddHall(addHallApi,json);
         let json2={
             "params":{
                 "seats":seats
             }
         }
            postAddSeats(postAddSeatsApi,json2)

        store.dispatch({
            type:types.RECEIVE_SEAT_INFO,
            seatInfo:{
                rows:0,
                columns:0,
                path:[],
                seat:[]
            }
        })
    }
    render() {

        let st=this.props.seatInfo.seat;
        let c=this.props.seatInfo.columns;
        let ttr=this.props.seatInfo.rows;
        let r=1;
        let i=1;
        let seat=st.map(item=><div style={{width:'1000px',display:'flex'}}>
           <div style={{width:'100px',textAlign:'center'}}>
               {r++}
           </div>
            <div style={{width:'900px',textAlign:'center'}}>
                {item.map(
                    itm=><Seat seat={this.props.seatInfo.seat} row={r-1} count={i++} totalRow={ttr} totalColumn={c} itemValue={itm}/>
                )}
            </div>

        </div>
        )
        return <div style={{width:'1000px',display:'block',margin:'0 auto'}} id={'add_hall'}>
            <label>输入信息</label>
            <div style={{width:'1000px',display:'flex',margin:'15px auto',justifyContent:'space-between'}}>

                <input id={'hall_id'} ref={'hall_id'} placeholder={'影厅编号'}/>
                <input id={'hall_name'} ref={'hall_name'} placeholder={'输入影厅名'}/>
                <input ref={'rows'} placeholder={'座位行数（小于99）'}/>
                <input ref={'columns'} placeholder={'座位列数（小于26）'}/>
                <select id={'hallType'} >
                    <option value={"普通"}>普通</option>
                    <option value={"4DX厅"}>4DX厅</option>
                    <option value={"4D厅"}>4D厅</option>
                    <option value={"4DX厅"}>4DX厅</option>
                    <option value={"CGS中国巨幕厅"}>CGS中国巨幕厅</option>
                    <option value={"IMAX厅"}>IMAX厅</option>
                    <option value={"LUXE巨幕厅"}>LUXE巨幕厅</option>
                    <option value={"RealD厅"}>RealD厅</option>
                    <option value={"巨幕厅"}>巨幕厅</option>
                    <option value={"杜比全景声厅"}>杜比全景声厅</option>
                </select>
                <button className={'info_btn'}
                    onClick={()=>this.handleClickBtn(
                        this.refs.hall_id.value.trim(),
                        this.refs.hall_name.value.trim(),
                        this.refs.rows.value.trim(),
                        this.refs.columns.value.trim()
                    )}
                >确定</button>
            </div>
            <div style={{width:'1000px',display:'block',margin:'10px auto',border:'1px solid #777'}}>
                   <div style={{width:'1000px',display:'block',margin:'0 auto',textAlign:'center'}}>
                       <img align={'AbsBottom'} src={require("../imges/seat_bj.png")} width={'30px'} height={'30px'}/>
                       <label style={{paddingRight:'10px'}}>取消</label>
                       <img align={'AbsBottom'} src={require("../imges/seat_xx_bj.png")} width={'30px'} height={'30px'}/>
                       <label>不设座位</label>
                   </div>
                <div>
                    <img src={require("../imges/yinmu_bj.png")} width={'1000px'} height={'80px'}/>
                </div>
                <div>
                    {seat}

                </div>
                <div style={{width:'1000px',display:'block',margin:'10px auto',textAlign:'center'}}>
                    <button onClick={()=>this.handleCommit(
                        this.refs.hall_id.value.trim(),
                        this.refs.hall_name.value.trim(),
                    )} style={{margin:'10px'}} className={'info_btn'}>提交</button>
                    <button style={{margin:'10px'}} className={'info_btn'}>取消</button>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps=state=>({
    seatInfo: state.seatInfo,
    cinema:state.cinema
})
export default connect(mapStateToProps) (AddHall);