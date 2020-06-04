import React from "react";
import {connect} from "react-redux";
import {getMyServe, postDelete, postEdit} from "../apis/data";
import {deleteMyServeApi, serveApi, updateMyServeApi} from "../apis/api";
import $ from "jquery";
class Serve extends React.Component{
    constructor() {
        super();
        this.state={
            dialogShow: <div></div>,
            isShow:false,
            type:null
        }
    }
 componentDidMount() {
     getMyServe(serveApi,this.props.cinema[0].cinema_id)
 }
    dialog = (Tag) => {
        if (Tag == false) {
            return 'none'
        } else {
            return 'flex'
        }
    }
    handleModify=(i)=>{
        this.setState({isShow:true,
            dialogShow:<div style={{width:"250px",margin:"25px auto"}}>
                    <label style={{fontWeight:"bold"}}>说明： </label><textarea id={"myServeDescription"} defaultValue={i.description}/>
            </div>
            ,type:i.serve_type
        })

    }
    handleCancel=()=>{
        this.setState({isShow:false,dialogShow:<div></div>})
    }
    handlePostEdit=()=>{
       console.log("type"+this.state.type,$("#myServeDescription").val())
        let json={
            "params":{
                "cinema_id":this.props.cinema[0].cinema_id,
                "serve_type":this.state.type,
                "description":$("#myServeDescription").val()
            }
        }
        postEdit(updateMyServeApi,json)
}
handleDeleteServe=(p1,p2)=>{
        let json={
            "params":{
                "cinema_id":p1,
                "serve_type":p2
            }
        }
        postDelete(deleteMyServeApi,json)
}
 render() {
     const  dialogStyle={
         width:'100%',
         height:'100%',
         zIndex:'9999',
         position:'fixed',
         top:0,
         left:0,

         // backgroundColor:'#ffffff',

         display:this.dialog(this.state.isShow)
     }
     let c=0;
     const item=this.props.myServe;
     let item1;
     if (item.length==0){
         item1=""
     }else {
         item1=item.map(i=><li style={{backgroundColor:"#f9f9f9",margin:"10px",width:"250px"}}>
             <div style={{padding:"10px"}}>
                 <div>{++c}</div>
                 <div><label style={{fontWeight:"bold"}}>服务项目:</label><span style={{color:"#777"}}>{i.serve_type}</span>  </div>
                 <div><label style={{fontWeight:"bold"}}>服务说明:</label><span style={{display:"inlineBlock",whiteSpace:"normal",wordWrap:"breakWord",color:"#777"}}>
                 {i.description}
                 </span></div>

                 <div><button onClick={()=>this.handleModify(i)} className={"myServeBtn"}>修改说明</button>
                     <button
                         onClick={()=>this.handleDeleteServe(i.cinema_id,i.serve_type)}
                         className={"myServeBtn"}>删除项目</button></div>
             </div>

         </li>)
     }
     return <div style={{width:"800px"}}>
          <ul style={{listStyle:"none",display:'flex',width:"800px"}}>
              {item1}
          </ul>
         <div style={dialogStyle}>
             <div style={{width:"350px",height:"250px",margin:"100px auto",backgroundColor:"#ffffff"}}>
                 <div>
                     {this.state.dialogShow}
                     <div style={{textAlign:"center"}}><button
                         onClick={()=>this.handlePostEdit()}
                         className={"myServeBtn"}>确定</button><button onClick={()=>this.handleCancel()} className={"myServeBtn"}>取消</button></div>
                 </div>

             </div>
         </div>
     </div>
 }
}
const mapStateToProps=state=>({
    cinema:state.cinema,
    myServe: state.myServe,
})
export default connect(mapStateToProps)(Serve);