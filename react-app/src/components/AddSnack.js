import React from "react";
import {postAdd, postAddSnack, postUploadImg} from "../apis/data";
import {addServeApi, addSnackApi, postUploadImgApi, uploadSnackImgApi} from "../apis/api";
import $ from "jquery";
import DiscountBox from "./DiscountBox";
import {connect} from "react-redux";
import {store} from "../index";
import {
    receiveDiscountNumbeer,
    receiveOriginPrice,
    receivePostImgUrl,
    receiveShowItem,
    receiveUploadImgUrl
} from "../actions";
import ShowItem from "./ShowItem";

class AddSnack extends React.Component{
    constructor() {
        super();
        this.state={
            value1:0
        }
    }
    componentDidMount() {
        store.dispatch(receiveOriginPrice(0))
        store.dispatch(receiveDiscountNumbeer(10))
    }
   componentWillUnmount() {
        store.dispatch(receiveUploadImgUrl(""))
   }

    handleClickAdd=()=>{
        let p0=$("#put0").val().trim();
        let p1=$("#put1").val().trim();
        if (p0==""||p1==""){
            alert("输入的信息不能为空")
            return;
        }
        let match = /^[1-9]\d*$/;
        let march3=/^[1-9]\d*\.\d+$/;
        let match4=/0\.\d+$/;
        if (!match.test(p0)){
            alert("场次id只能是数字")
            return;
        }
        if(!march3.test(p1)&&!match.test(p1)&&!match4.test(p1)){
            alert("价格格式不正确")
            return;
        }
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
        if($("#input_file").val()==""){
            alert("你还没有上传图片")
            return;
        }
if (this.props.showItem==1){
    let p2=$("#put2").val().trim();
    let p3=$("#put3").val().trim();
    let p4=$("#put4").val().trim();
    if (p2==""||p3==""||p4==""){
        alert("输入的信息不能为空")
        return;
    }
    let json={
        "params":{
            "snack_id":p0,
            "cinema_id":this.props.cinema[0].cinema_id,
            "num_type":$("#num_type").val(),
            "origin_price":o,
            "discount":discount,
            "discount_price":discountPrice,
            "img": this.props.postImgUrl,
            "item1":p2,
            "it_size1":p3,
            "it_num1":p4,
            "item2":"",
            "it_size2":"",
            "it_num2":"",
            "item3":"",
            "it_size3":"",
            "it_num3":"",
            "item4":"",
            "it_size4":"",
            "it_num4":"",
        }
    }
    postAddSnack(addSnackApi,json)

}else if (this.props.showItem==2){
    let p2=$("#put2").val().trim();
    let p3=$("#put3").val().trim();
    let p4=$("#put4").val().trim();

    let p5=$("#put5").val().trim();
    let p6=$("#put6").val().trim();
    let p7=$("#put7").val().trim();
    if (p2==""||p3==""||p4==""||p5==""||p6==""||p7==""){
        alert("输入的信息不能为空")
        return;
    }
    let json={
        "params":{
            "snack_id":p0,
            "cinema_id":this.props.cinema[0].cinema_id,
            "num_type":$("#num_type").val(),
            "origin_price":o,
            "discount":discount,
            "discount_price":discountPrice,
            "img": this.props.postImgUrl,
            "item1":p2,
            "it_size1":p3,
            "it_num1":p4,
            "item2":p5,
            "it_size2":p6,
            "it_num2":p7,
            "item3":"",
            "it_size3":"",
            "it_num3":"",
            "item4":"",
            "it_size4":"",
            "it_num4":"",
        }
    }
    postAddSnack(addSnackApi,json)
}else if (this.props.showItem==3){
    let p2=$("#put2").val().trim();
    let p3=$("#put3").val().trim();
    let p4=$("#put4").val().trim();

    let p5=$("#put5").val().trim();
    let p6=$("#put6").val().trim();
    let p7=$("#put7").val().trim();

    let p8=$("#put8").val().trim();
    let p9=$("#put9").val().trim();
    let p10=$("#put10").val().trim();
    if (p2==""||p3==""||p4==""||p5==""||p6==""||p7==""||p8==""||p9==""||p10==""){
        alert("输入的信息不能为空")
        return;
    }
    let json={
        "params":{
            "snack_id":p0,
            "cinema_id":this.props.cinema[0].cinema_id,
            "num_type":$("#num_type").val(),
            "origin_price":o,
            "discount":discount,
            "discount_price":discountPrice,
            "img": this.props.postImgUrl,
            "item1":p2,
            "it_size1":p3,
            "it_num1":p4,
            "item2":p5,
            "it_size2":p6,
            "it_num2":p7,
            "item3":p8,
            "it_size3":p9,
            "it_num3":p10,
            "item4":"",
            "it_size4":"",
            "it_num4":"",
        }
    }
    postAddSnack(addSnackApi,json)
}else if (this.props.showItem==4){
    let p2=$("#put2").val().trim();
    let p3=$("#put3").val().trim();
    let p4=$("#put4").val().trim();

    let p5=$("#put5").val().trim();
    let p6=$("#put6").val().trim();
    let p7=$("#put7").val().trim();

    let p8=$("#put8").val().trim();
    let p9=$("#put9").val().trim();
    let p10=$("#put10").val().trim();

    let p11=$("#put11").val().trim();
    let p12=$("#put12").val().trim();
    let p13=$("#put13").val().trim();
    if (p2==""||p3==""||p4==""||p5==""||p6==""||p7==""||p8==""||p9==""||p10==""||p11==""||p12==""||p13==""){
        alert("输入的信息不能为空")
        return;
    }
    let json={
        "params":{
            "snack_id":p0,
            "cinema_id":this.props.cinema[0].cinema_id,
            "num_type":$("#num_type").val(),
            "origin_price":o,
            "discount":discount,
            "discount_price":discountPrice,
            "img": this.props.postImgUrl,
            "item1":p2,
            "it_size1":p3,
            "it_num1":p4,
            "item2":p5,
            "it_size2":p6,
            "it_num2":p7,
            "item3":p8,
            "it_size3":p9,
            "it_num3":p10,
            "item4":p11,
            "it_size4":p12,
            "it_num4":p13,
        }
    }
    postAddSnack(addSnackApi,json)
}




        console.log("提交 小食"+this.props.showItem)
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

   renderShow2=(p)=>{
        if (this.props.showItem==2||this.props.showItem==3||this.props.showItem==4){
          return p
        }
   }
    renderShow3=(p)=>{
        if (this.props.showItem==3||this.props.showItem==4){
            return p
        }
    }
    renderShow4=(p)=>{
        if (this.props.showItem==4){
            return p
        }
    }
    handleChangeImg=(e)=> {

        console.log("file:",e.target.files[0],e.target.result)
        let file=e.target.files[0];
        let getUrl = null;
        const windowURL = window.URL || window.webkitURL;//实现预览
        if (window.createObjectURL != undefined) { // basic
            getUrl = window.createObjectURL(file);
        } else if (window.URL != undefined) { // mozilla(firefox)
            getUrl = window.URL.createObjectURL(file);
        } else if (window.webkitURL != undefined) { // webkit or chrome
            getUrl = window.webkitURL.createObjectURL(file);
            formData.append('img',file);
        }
        console.log("url file",getUrl)
        store.dispatch(receiveUploadImgUrl(getUrl))
        console.log("图片大小",file.size)
        // $("#preview").attr("src",getUrl)
        if (file.size > 102400) {
            alert('不能上传大于100k的图片')
            return;
        }
        let formData = new FormData();
        formData.append('uploadFile',file,file.name)// 通过append向form对象添加数据,可以通过append继续添加数据

        postUploadImg(uploadSnackImgApi,formData)

    }
    renderOpacity=()=>{
        if (this.props.upUrl==""||this.props.upUrl==undefined){
            return 0;
        }else {
            return 1;
        }
    }
    handleReset=()=>{
        console.log('---reset---')
        $(".put").val('');
    store.dispatch(receiveUploadImgUrl(""))
        store.dispatch(receivePostImgUrl(""))
    }
    render() {
        let o=this.props.originPrice;
        let d=this.props.discountNumber;
        let v=this.props.showItem;
        console.log("  item******************** "+v)
        const show2=()=>{
            return <div style={{width:"400px"}}  className={"item"} id={"item2"}>
                <div className={"item_m_p"}>
                    <div className={"snack_warp1"}>
                        <div className={"snack_warp2"}>  <label className={'addLabel'}>小食名：</label></div>
                        <div className={"snack_warp3"}>  <input  id={'put5'} className={'put'}/></div></div>
                    <div className={"snack_warp1"}>
                        <div className={"snack_warp2"}>  <label className={'addLabel'}>大小：</label></div>
                        <div className={"snack_warp3"}>  <input  id={'put6'} className={'put'}/></div></div>
                    <div className={"snack_warp1"}>
                        <div className={"snack_warp2"}>  <label className={'addLabel'}>个数：</label></div>
                        <div className={"snack_warp3"}>  <input  id={'put7'} className={'put'}/></div></div>
                </div>
            </div>
        }
        const show3=()=>{
         return <div style={{width:"400px"}}  className={"item"} id={"item3"}>
             <div className={"item_m_p"}>
                 <div className={"snack_warp1"}>
                     <div className={"snack_warp2"}>  <label className={'addLabel'}>小食名：</label></div>
                     <div className={"snack_warp3"}>  <input  id={'put8'} className={'put'}/></div></div>
                 <div className={"snack_warp1"}>
                     <div className={"snack_warp2"}>  <label className={'addLabel'}>大小：</label></div>
                     <div className={"snack_warp3"}>  <input  id={'put9'} className={'put'}/></div></div>
                 <div className={"snack_warp1"}>
                     <div className={"snack_warp2"}>  <label className={'addLabel'}>个数：</label></div>
                     <div className={"snack_warp3"}>  <input  id={'put10'} className={'put'}/></div></div>
             </div>
         </div>
        }
        const show4=()=>{
            return <div style={{width:"400px"}}  className={"item"} id={"item4"}>
                <div className={"item_m_p"}>
                    <div className={"snack_warp1"}>
                        <div className={"snack_warp2"}>  <label className={'addLabel'}>小食名：</label></div>
                        <div className={"snack_warp3"}>  <input  id={'put11'} className={'put'}/></div></div>
                    <div className={"snack_warp1"}>
                        <div className={"snack_warp2"}>  <label className={'addLabel'}>大小：</label></div>
                        <div className={"snack_warp3"}>  <input  id={'put12'} className={'put'}/></div></div>
                    <div className={"snack_warp1"}>
                        <div className={"snack_warp2"}>  <label className={'addLabel'}>个数：</label></div>
                        <div className={"snack_warp3"}>  <input  id={'put13'} className={'put'}/></div></div>
                </div>
            </div>
        }
        const showPrice=Math.floor(o*(d/10) * 100) / 100
        return <div>{ console.log("  item******************** "+v)}
                    <ShowItem/>
                  <div className={'snackAddBar'}>
                <div style={{textAlign:'center',fontWeight:'bold'}}>添加小食</div>
                <div style={{width:"860px",display:"flex",flexWrap:"wrap"}}>
                    <div style={{width:"400px"}} className={"item"}>
                        <div className={"item_m_p"}>
                        <div className={"snack_warp1"}>
                            <div className={"snack_warp2"}>  <label className={'addLabel'}>小食id：</label></div>
                            <div className={"snack_warp3"}>  <input  id={'put0'} className={'put'}/></div></div>
                        <div className={"snack_warp1"}>
                            <div className={"snack_warp2"}><label className={'addLabel'}>套餐人数：</label></div>
                            <div className={"snack_warp3"}>
                                <select id={"num_type"} >
                                    <option value={"单人餐"}>单人餐</option>
                                     <option value={"双人餐"}>双人餐</option>
                                     <option value={"多人餐"}>多人餐</option>
                                </select>
                            </div>
                        </div>

                            <div className={"snack_warp1"}>
                                <div className={"snack_warp2"}><label>输入折扣:</label></div><div className={"snack_warp3"}>
                                <DiscountBox/></div>
                            </div>
                            <div className={"snack_warp1"}>
                                <div className={"snack_warp2"}><label>原始价格:</label></div>
                                <div className={"snack_warp3"}>
                                        <input onChange={(e)=>this.handleChangePrice(e)}
                                       id={'put1'} className={'put'}/></div>
                            </div>
                            <div className={"snack_warp1"}>
                                <div className={"snack_warp2"}><label>折扣之后的价格:</label></div>
                                <div className={"snack_warp3"}>
                                <label>￥</label><label style={{color:"red"}}>{showPrice}</label></div>
                            </div>
                       </div>
                    </div>


                    <div style={{width:"400px"}}  className={"item"} id={"item_1"}>
                        <div className={"item_m_p"}>
                            <div className={"snack_warp1"}>
                                <div className={"snack_warp2"}>  <label className={'addLabel'}>小食名：</label></div>
                                <div className={"snack_warp3"}>  <input  id={'put2'} className={'put'}/></div></div>
                            <div className={"snack_warp1"}>
                                <div className={"snack_warp2"}>  <label className={'addLabel'}>大小：</label></div>
                                <div className={"snack_warp3"}>  <input  id={'put3'} className={'put'}/></div></div>
                            <div className={"snack_warp1"}>
                                <div className={"snack_warp2"}>  <label className={'addLabel'}>个数：</label></div>
                                <div className={"snack_warp3"}>  <input  id={'put4'} className={'put'}/></div></div>
                        </div>
                    </div>

                    {this.renderShow2(show2())}
                    {this.renderShow3(show3())}
                    {this.renderShow4(show4())}
                    <div style={{width:"400px"}}  className={"item"} id={"item_0"}>
                        <div className={"item_m_p"}>
                            <div style={{textAlign:"center"}}><label className={'addLabel'}>图片：</label>

                                <input
                                    onChange={(e)=>this.handleChangeImg(e)}
                                    id={'input_file'}
                                    ref={'addF12'} className={'put'} type={'file'} name={'img'} multiple={'multiple'}
                                    accept={"image/gif,image/jpeg,image/jpg,image/png,image/svg"}/>



                            </div>

                            <div style={{marginTop:"25px"}}>
                                <div style={{border:'1px solid #777',width:'100px',height:'120px',marginLeft:'120px'}}>
                                    <img style={{opacity:this.renderOpacity()}} id={'preview'} src={this.props.upUrl} id={'img0'} width={'100px'} height={'120px'}/>

                                </div>

                            </div>
                        </div>
                    </div>
                </div>



                <div className={'add_button_row'}><button className={'dbutton'}
                                                          onClick={()=>this.handleClickAdd()}>保存</button>
                    <button
                        onClick={()=>this.handleReset()}
                        className={'dbutton'}>取消</button></div>

            </div>
        </div>
    }
}
const mapStateToProps=state=>({
    cinema:state.cinema,
    discountNumber: state.discountNumber,
    originPrice: state.originPrice,
    showItem: state.showItem,
    postImgUrl: state.postImgUrl,
    upUrl: state.upUrl
})
export default connect(mapStateToProps)(AddSnack);