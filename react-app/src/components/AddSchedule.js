import React from "react";
import {connect} from "react-redux";
import {getHallByCinema, postAddSchedule} from "../apis/data";
import {addScheduleApi, postAddSeatsApi, receiveAllHallByCinemaApi} from "../apis/api";
import $ from "jquery";
import DiscountBox from "./DiscountBox";
import {store} from "../index";
import {receiveOriginPrice} from "../actions";
import {isDateOut, isTimeOut} from "../utils/dateTimeUtil";
class AddSchedule extends React.Component{
componentDidMount() {
    getHallByCinema(receiveAllHallByCinemaApi,this.props.cinema[0].cinema_id)
}
handleClickCommitSchedule=()=>{
   // console.log("put ",$("#put1").val())
   //  console.log("select ",$("#select").val())
    if (this.props.halls==""){
        alert("你还没有添加影厅")
        return;
    }
   // let put1=$("#put1").val().trim();
    let put2=$("#put2").val().trim();
    let put3=$("#put3").val().trim();
    let put4=$("#put4").val().trim();
    let put5=$("#put5").val().trim();
    let put6=$("#put6").val().trim();
    let put7=$("#put7").val().trim();
    if (put2==''||put3==''||put4==''||put5==''||put6==''||put7==''){
       alert("输入的信息不能为空")
        return;
    }
    let match = /^[1-9]\d*$/;
    // if (!match.test(put1)){
    //     alert("场次id只能是数字")
    //     return;
    // }
    // if (!match.test(put1)){
    //     alert("影片ID只能是数字")
    //     return;
    // }
    let march3=/^[1-9]\d*\.\d+$/;
   let match4=/0\.\d+$/;
    if(!march3.test(put3)&&!match.test(put3)&&!match4.test(put3)){
        alert("价格格式不正确")
        return;
    }
    //匹配日期
    let date=/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    let regExp1=new RegExp(date);
    //匹配时间
    let time=/(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
    let regExp2=new RegExp(time);
    if (!regExp1.test(put4)){
        alert("日期格式不正确")
        return;
    }
    if (!regExp2.test(put5)){
        alert("开始时间格式不正确")
        return;
    }
    if (!regExp2.test(put6)){
        alert("结束时间格式不正确")
        return;
    }
    if (isDateOut(put4)){
        alert("排片日期不能小于当前日期")
        return;
    }
    if (isTimeOut(put4+" "+put5,put4+" "+put6)){
        alert("开始时间不能大于结束时间")
        return;
    }
    console.log("id----cinema",this.props.cinema[0].cinema_id)
    let o=this.props.originPrice;
    let d=this.props.discountNumber;
   let discount;
    const discountPrice=Math.floor(o*(d/10) * 100) / 100
  console.log("price"+discountPrice)
      if (d==10){
          discount="原价"
      }else {
          discount=d+"折"
      }
    console.log("disc"+discount)
    let json={
        "params":{
            // "schedule_id":put1,
            "film_id":put2,
            "cinema_id":this.props.cinema[0].cinema_id,
            "hall_id":$("#select").val(),
            "origin_price":put3,
            "discount":discount,
            "discount_price":discountPrice,
            "show_date":put4,
            "start_time":put5,
            "end_time":put6,
            "language":put7
        }
    }
    console.log("影厅名：id:"+$("#select").in,$("#select").val())
    postAddSchedule(addScheduleApi,json)

}

handleClickCancel=()=>{
      $(".put").val('');
}
handleChangePrice=(e)=>{
    let v=e.target.value.trim();
    let match = /^[1-9]\d*$/;
    let march3=/^[1-9]\d*\.\d+$/;
    let match4=/0\.\d+$/;
    if(!march3.test(v)&&!match.test(v)&&!match4.test(v)){
        store.dispatch(receiveOriginPrice(0))
    }else {
        store.dispatch(receiveOriginPrice(v))
    }

}
    render() {
    let o=this.props.originPrice;
    let d=this.props.discountNumber;

    const showPrice=Math.floor(o*(d/10) * 100) / 100

        console.log("discount number  :"+this.props.discountNumber)
        console.log("halls====",this.props.halls)
        const select=this.props.halls.map(item=><option value={item.hall_id}>{item.hall_name}</option>)
        return <div style={{width:'100%',height:'100%',backgroundColor:'#eaeaea'}}>
     <div>添加场次信息：</div>
            <div style={{width:'1000px',margin:'0 auto',display:'flex',justifyContent:'space-around'}} id={'schedule_info'}>
                <div style={{width:'480px',display:'block',backgroundColor:'#fff',textAlign:'right',paddingTop:'25px',paddingBottom:'25px'}}>
                    {/*<div  style={{width:'400px',display:'flex',justifyContent:'center'}}>*/}
                    {/*<div style={{width:'120px'}}><label>输入场次ID:</label></div><div style={{width:'200px'}}><input id={'put1'} className={'put'}/></div>*/}
                    {/*</div>*/}
                    <div style={{width:'400px',display:'flex',justifyContent:'center',marginTop:'5px'}}>
                    <div style={{width:'120px'}}><label>输入影片ID:</label></div><div style={{width:'200px'}}><input id={'put2'} className={'put'}/></div>
                    </div>
                    <div style={{width:'400px',display:'flex',justifyContent:'center',marginTop:'5px'}}>
                    <div style={{width:'120px'}}><label>选择影厅:</label></div><div style={{width:'200px'}}>
                         <select className={'select'} id={'select'}>
                           {select}
                         </select>
                    </div>
                    </div>
                    <div style={{width:'400px',display:'flex',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{width:'120px'}}><label>输入折扣:</label></div><div style={{width:'200px'}}>
                       <DiscountBox/></div>
                    </div>
                    <div style={{width:'400px',display:'flex',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{width:'120px'}}><label>原始价格:</label></div><div style={{width:'200px'}}>
                        <input onChange={(e)=>this.handleChangePrice(e)}
                        id={'put3'} className={'put'}/></div>
                    </div>
                    <div style={{width:'400px',display:'flex',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{width:'120px'}}><label>折扣之后的价格:</label></div><div style={{width:'200px'}}>
                        <label>￥</label><label style={{color:"red"}}>{showPrice}</label></div>
                    </div>

                </div>
                <div style={{width:'480px',display:'block',backgroundColor:'#fff',textAlign:'right',paddingTop:'25px',paddingBottom:'25px'}}>
                    <div style={{width:'400px',display:'flex',justifyContent:'center'}}>
                        <div style={{width:'120px'}}><label>放映日期:</label></div><div style={{width:'200px'}}><input id={'put4'} className={'put'}/></div>
                    </div>
                    <div style={{width:'400px',display:'flex',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{width:'120px'}}><label>开始时间:</label></div><div style={{width:'200px'}}><input id={'put5'} className={'put'}/></div>
                    </div>
                    <div style={{width:'400px',display:'flex',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{width:'120px'}}><label>结束时间:</label></div><div style={{width:'200px'}}><input id={'put6'} className={'put'}/></div>
                    </div>
                    <div style={{width:'400px',display:'flex',justifyContent:'center',marginTop:'5px'}}>
                        <div style={{width:'120px'}}><label>语言:</label></div><div style={{width:'200px'}}><input id={'put7'} className={'put'}/></div>
                    </div>
                </div>

            </div>
            <div style={{textAlign:'center',width:'1000px',margin:'0 auto',backgroundColor:'#eaeaea'}}>
                <div style={{textAlign:'center',width:'1000px',backgroundColor:'#eaeaea'}}>
                <button
                    onClick={()=>this.handleClickCommitSchedule()}
                    className={'schedule_btn'}>提交</button>
                <button
                    onClick={()=>this.handleClickCancel()}
                    className={'schedule_btn'}>取消</button>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps=state=>({
    cinema:state.cinema,
    halls:state.halls,
    currentHall: state.currentHall,
    cinemaSeats: state.cinemaSeats,
    discountNumber: state.discountNumber,
    originPrice: state.originPrice,
})
export default connect(mapStateToProps)(AddSchedule);