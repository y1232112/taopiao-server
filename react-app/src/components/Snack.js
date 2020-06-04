import React from "react";
import {getCinemaPage, getDelete, getMySnacks, postDelete} from "../apis/data";
import {default as API, deleteCinemaApi, deleteMySnackApi, mySnackApi} from "../apis/api";
import {connect} from "react-redux";
class Snack extends React.Component{
    constructor() {
        super();
        this.state={
            isDeleteDialog: false,
            deleteKey: null,
            clickPageX: null,
            clickPageY: null,
        }
    }
componentDidMount() {
    getMySnacks(mySnackApi,this.props.cinema[0].cinema_id)
}
    dialog = (Tag) => {
        if (Tag == false) {
            return 'none'
        } else {
            return 'flex'
        }
    }
    handleclick2 = (key, e) => {
        let obj = document.getElementById(e.currentTarget.id);
        // console.log('------td----id-----',obj.scrollTop)
        // console.log('------e----page-----',e.pageX,e.pageY+'px')

        // 进行显示删除的弹窗操作
        this.setState({
            isDeleteDialog: true,
            deleteKey: key.data.snack_id,
            clickPageX: e.pageX - 120 + 'px',
            clickPageY: e.pageY - 25 + 'px'
        })
        //    进行删除操作
        // console.log('-------delete---key-----',key)
    }
    ClickConfirmDelete = async (key) => {
        // await getDelete(deleteCinemaApi, key);
        this.setState({isDeleteDialog: false})
        // getAllCinemas(cinemaListApi)
        let json={
            "params":{
                "cinema_id":this.props.cinema[0].cinema_id,
                "snack_id":key
            }
        }
        postDelete(deleteMySnackApi,json)
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
                title:'小食编号',
                dataIndex:'snack_id'
            },
            {
                title:'套餐人数',
                dataIndex: 'num_type'
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
                title:'折扣后价格',
                dataIndex:'discount_price'
            },
            {
                title:'图片',
                dataIndex:'img'
            },
            {
                title:'详情',
                dataIndex:'detail'
            },
            {
                title:'移除商品',
                dataIndex:'delete'
            }
            // {
            //     title:'项1',
            //     dataIndex:'item1'
            // },
            // {
            //     title:'容量',
            //     dataIndex:'it_size1'
            // },
            // {
            //     title:'数量',
            //     dataIndex:'it_num1'
            // },
            // {
            //     title:'项2',
            //     dataIndex:'item2'
            // },
            // {
            //     title:'容量',
            //     dataIndex:'it_size2'
            // },
            // {
            //     title:'数量',
            //     dataIndex:'it_num2'
            // },
            // {
            //     title:'项1',
            //     dataIndex:'item3'
            // },
            // {
            //     title:'容量',
            //     dataIndex:'it_size3'
            // },
            // {
            //     title:'数量',
            //     dataIndex:'it_num3'
            // },
            // {
            //     title:'项4',
            //     dataIndex:'item4'
            // },
            // {
            //     title:'容量',
            //     dataIndex:'it_size4'
            // },
            // {
            //     title:'数量',
            //     dataIndex:'it_num4'
            // }
        ]
        const dataSource=this.props.mySnacks;
        const title=columns.map(
            column=><th key={column.dataIndex}>{column.title}</th>
        );
        let key= 0;
        let myList= dataSource.map(data=><tr  key={data.snack_id}>
                <td>{data.snack_id}</td>
                <td>{data.num_type}</td>
                <td>{data.origin_price}</td>
                <td>{data.discount}</td>
                <td>{data.discount_price}</td>
            <td>{(data.img=="null"||data.img==null||data.img.trim()=='')?<img  src={''} width={'50px'} height={'60px'}
                                                                               style={{opacity:'0'}}/>:<img  src={data.img} width={'50px'} height={'60px'}/>}</td>
            <td>

                {data.it_size1}x{data.item1}x{data.it_num1} {

            } {
                data.item2==""?<label></label>:<label>{data.it_size2}x{data.item2}x{data.it_num2}</label>
            } {
                data.item3==""?<label></label>:<label>{data.it_size3}x{data.item3}x{data.it_num3}</label>
            } {
                data.item4==""?<label></label>:<label>{data.it_size4}x{data.item4}x{data.it_num4}</label>
            }
            </td>

            {/*   <td>{data.item1}</td>*/}
            {/*    <td>{data.it_size1}</td>*/}
            {/*    <td>{data.it_num1}</td>*/}
            {/*   <td>{data.item2}</td>*/}
            {/*<td>{data.it_size2}</td>*/}
            {/*<td>{data.it_num2}</td>*/}
            {/*<td>{data.item3}</td>*/}
            {/*<td>{data.it_size3}</td>*/}
            {/*<td>{data.it_num3}</td>*/}
            {/*<td>{data.item4}</td>*/}
            {/*<td>{data.it_size4}</td>*/}
            {/*<td>{data.it_num4}</td>*/}
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
            {/**********************************删除时的确认框*****************************************************/}

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
    mySnacks: state.mySnacks,
})
export default connect(mapStateToProps) (Snack);