import React from "react";
import {getCinemaSeats, getHallByCinema, postDelete} from "../apis/data";
import {cinemaSearchApi, deleteHallApi, receiveAllHallByCinemaApi, receiveCinemaSeatsApi} from "../apis/api";
import {connect} from "react-redux";
import Seat from "./Seat";
import Seat2 from "./Seat2";
import {store} from "../index";
import {currentShowHallI} from "../actions";
class Hall extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            isDeleteDialog:false,
        }
    }

    componentDidMount() {
    getHallByCinema(receiveAllHallByCinemaApi,this.props.cinema[0].cinema_id)
    getCinemaSeats(receiveCinemaSeatsApi,this.props.cinema[0].cinema_id)
}
renderHallMenuBg=(id)=>{
   if (this.props.currentHall.hall_id==id){
       return {backgroundColor:"#202040",color:"#fff"}
   }
}

handleClickLi=(item)=>{
    if (this.props.currentHall.hall_id!==item.hall_id){
        store.dispatch(currentShowHallI(item))
    }

}
    //弹窗显示
    dialog=(Tag)=>{
        if (Tag==false){
            return 'none'
        }
        else {
            return 'flex'
        }
    }
    handleShowTag=()=>{
        this.setState({isDeleteDialog:true})
    }
    handleConfirm=()=>{
         let json={

             params:{
                 cinema_id:this.props.currentHall.cinema_id,
                 hall_id:this.props.currentHall.hall_id
             }
         }
         postDelete(deleteHallApi,json);
        this.setState({isDeleteDialog:false})
        getHallByCinema(receiveAllHallByCinemaApi,this.props.cinema[0].cinema_id)
        getCinemaSeats(receiveCinemaSeatsApi,this.props.cinema[0].cinema_id)
    }
    handleCalel=()=>{
        this.setState({isDeleteDialog:false})
    }
    render() {
    let row=this.props.currentHall.row_count;
    let column=this.props.currentHall.column_count;
    let id=this.props.currentHall.hall_id;
    let cinemaSeats=this.props.cinemaSeats;
    let temp=[];
    let temp0=[];
        if (this.props.cinemaSeats!==undefined&&this.props.cinemaSeats.length!==0){

            for(let k=0;k<cinemaSeats.length;k++){
                if (cinemaSeats[k].hall_id==id){
                    temp.push(cinemaSeats[k])
                }
            }
          let count=0;

            for(let i=0;i<row;i++){

            let temp1=[];
                for (let j=0;j<column;j++){
                    count++
                    for(let g=0;g<temp.length;g++){
                        if (temp[g].seat_id==count){
                            temp1.push(temp[g]);

                        }

                    }


                }
                temp0.push(temp1)
            }
            console.log("-----ss-----",temp0,cinemaSeats[0].hall_id)
        }
        const deleteDialogStyle={
            width: '100%',
            height: '100%',
            top:'0',
            left:'0',
            opacity:'0.4',
            backgroundColor:'#111',
            position:'fixed',

            zIndex: '9999',
            display:this.dialog(this.state.isDeleteDialog),
            justifyContent:'center',
            alignItems:'center',

        }
     let data=this.props.halls;
     let key=0;
       let item=data.map(item=><li
           onClick={()=>this.handleClickLi(item)}
           id={item.hall_id} key={key++} className={'menu_li'} style={this.renderHallMenuBg(item.hall_id)}>
           {item.hall_name}
       </li>)
        let r=1;
        let seat=temp0.map(item=><div style={{width:'1000px',display:'flex'}}>
                <div style={{width:'100px',textAlign:'center'}}>
                    {r++}
                </div>
                <div style={{width:'900px',textAlign:'center'}}>
                    {item.map(
                        itm=><Seat2 seat={temp0} row={itm.row} count={itm.seat_id} totalRow={row} totalColumn={column} itemValue={itm.active}/>
                    )}
                </div>

            </div>
        )
        return <div style={{width:'100%',display:'block',margin:'0 auto'}} id={"hall"}>
            <div style={{width:'100%',display:'block',margin:'0 auto'}}>
             <ul id={"hall_ul"}>
                 {item}
             </ul>
            </div>
        <div style={{width:'1000px',display:'block',margin:'0 auto',border:'1px solid #777'}}>
            <div style={{width:'1000px',display:'block',margin:'0 auto',border:'1px solid #777',textAlign:'center'}} id={'hall_info'}>
                <label className={'hall_info_title'}>影厅编号:</label>
                <label className={'hall_info_description'}>{id}</label>
                <label className={'hall_info_title'}>影厅名称:</label>
                <label className={'hall_info_description'}>{this.props.currentHall.hall_name}</label>
                <label className={'hall_info_title'}>行数:</label>
                <label className={'hall_info_description'}>{row}</label>
                <label className={'hall_info_title'}>列数:</label>
                <label className={'hall_info_description'}>{column}</label>
                <button onClick={()=>this.handleShowTag()} id={"hall_delete_btn"}>删除该影厅</button>
            </div>
            <div>
                <img src={require("../imges/yinmu_bj.png")} width={'1000px'} height={'80px'}/>
            </div>
            <div>
                {seat}
            </div>

        </div>
            <div style={deleteDialogStyle}>
                    <div style={{backgroundColor:'#ffffff',width:"250px",height:'100px',display:'flex',justifyContent:'center',
                        alignItems:'center',}}>
                        <button onClick={()=>this.handleConfirm()} className={'mbtn'} style={{width:"50px",height:'30px'}}>确认</button>
                        <button onClick={()=>this.handleCalel()} className={'mbtn'} style={{width:"50px",height:'30px'}}>取消</button>
                    </div>
            </div>
        </div>
    }
}
const mapStateToProps=state=>({
    cinema:state.cinema,
    halls:state.halls,
    currentHall: state.currentHall,
    cinemaSeats: state.cinemaSeats
})
export default connect(mapStateToProps)(Hall);