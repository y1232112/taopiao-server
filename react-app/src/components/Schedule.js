import React from "react";
import {connect} from "react-redux";
import dateTimeUtil from "../utils/dateTimeUtil";
import {store} from "../index";
import {getDelete, getFilmPage, getSchedulesByCinemaId, postDelete} from "../apis/data";
import {default as API, deleteFilmApi, deleteScheduleApi, scheduleApi} from "../apis/api";
class Schedule extends React.Component{
    constructor() {
        super();
        this.state={
            isDeleteDialog:false,
            deleteKey:null,
            clickPageX:null,
            clickPageY:null,
        }
    }

 handleClick=()=>{

 }
    handleclick2=(key,e)=>{
        let obj=document.getElementById(e.currentTarget.id);
        // console.log('------td----id-----',obj.scrollTop)
        // console.log('------e----page-----',e.pageX,e.pageY+'px')

        // 进行显示删除的弹窗操作
        this.setState({
            isDeleteDialog:true,
            deleteKey:key.data.schedule_id,
            clickPageX:e.pageX-120+'px',
            clickPageY:e.pageY-25+'px'
        })
        //    进行删除操作
        // console.log('-------delete---key-----',key)
    }
    ClickConfirmDelete=async (key)=>{

        let json={
            params:{
                "schedule_id":key
            }
        }
        postDelete(deleteScheduleApi,json);
        getSchedulesByCinemaId(scheduleApi,this.props.cinema[0].cinema_id)
        this.setState({   isDeleteDialog:false,
            deleteKey:null,
            clickPageX:null,
            clickPageY:null});


    }
    dialog=(Tag)=>{
        if (Tag==false){
            return 'none'
        }
        else {
            return 'flex'
        }
    }
    render() {
        const deleteDialogStyle={
            width: '10%',
            height: '10%',
            backgroundColor:'#ffffff',

            top:this.state.clickPageY,
            left:this.state.clickPageX,
            position:'fixed',
            zIndex: '9999',
            display:this.dialog(this.state.isDeleteDialog)

        }
        const columns=[
            {
                title:'场次编号',
                dataIndex:'schedule_id'
            },
            {
                title:'电影编号',
                dataIndex: 'film_id'
            },
            {
                title:'影厅编号+名称',
                dataIndex:'hall_name'
            },
            {
                title:'上映日期',
                dataIndex:'show_date'
            },
            {
                title:'原始价格',
                dataIndex:'origin_price'
            },
            {
                title:'折扣',
                dataIndex:'discount'
            },
            {
                title:'折扣价',
                dataIndex:'discount_price'
            },
            {
                title:'开始时间',
                dataIndex:'start_time'
            },
            {
                title:'结束时间',
                dataIndex:'end_time'
            },
            {
                title:'语言',
                dataIndex:'language'
            }
            ]
        const dataSource=this.props.schedules;
        const title=columns.map(
            column=><th key={column.dataIndex}>{column.title}</th>
        );
        let key= 0;
        let myList= dataSource.map(data=><tr  key={data.schedule_id}>
                <td>{data.schedule_id}</td>
                <td>{data.film_id}</td>
                <td>{data.hall_id+" ， "+data.hall_name}</td>
                <td>{data.show_date}</td>
            <td>{data.origin_price}</td>
            <td>{data.discount}</td>
            <td>{data.discount_price}</td>
            <td>{data.start_time}</td>
            <td>{data.end_time}</td>
            <td>{data.language}</td>
            <td><a style={{color:"blue"}} onClick={(e)=>this.handleclick2({data},e)}>删除</a></td>
            </tr>
        )
        return <div>
            <table id={"readListTable"}>

                <thead> {title}</thead>
                <tbody>
                {myList}
                </tbody>
            </table>
            <div className={'deleteDialogWrap'}  style={deleteDialogStyle}>
                <div className={'deleteDialog'}>
                    <button className={'deleteButton'}
                            onClick={()=>this.ClickConfirmDelete(this.state.deleteKey)}>确认</button>
                    <button  className={'deleteButton'} onClick={()=>this.setState({isDeleteDialog:false})}>取消</button>
                </div>
            </div>
        </div>
    }
}
const mapStateToProps=state=>({
    cinema:state.cinema,
    halls:state.halls,
    currentHall: state.currentHall,
    schedules: state.schedules
})
export default connect(mapStateToProps)(Schedule);