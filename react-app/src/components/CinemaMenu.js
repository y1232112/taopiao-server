import React from "react";
import {store} from "../index";
import {receiveMenu, receiveUploadImgUrl} from "../actions";
class CinemaMenu extends React.Component{

    constructor(props, context) {
        super(props, context);
        this.state={
            click1:false,
            click2:false,
            click3:false,
           click4:false,
           click5:false

        }}



    handleShow1=()=>{
        if (this.state.click1==false){
            return 'none'
        }else return 'block'
    }
    handleShow2=()=>{
        if (this.state.click2==false){
            return 'none'
        }else return 'block'
    }
    handleShow3=()=>{
        if (this.state.click3==false){
            return 'none'
        }else return 'block'
    }
    handleShow4=()=>{
        if (this.state.click4==false){
            return 'none'
        }else return 'block'
    }
    handleShow5=()=>{
        if (this.state.click5==false){
            return 'none'
        }else return 'block'
    }
    handleClickMenu=(e)=>{
        console.log('--e----',Number(e.currentTarget.id))
        store.dispatch(receiveMenu(Number(e.currentTarget.id)));


    }
    handleNotice=()=>{
        store.dispatch(receiveMenu(10));
    }

    render() {
        const Tag1=this.state.click1;
        const Tag2=this.state.click2;
        const Tag3=this.state.click3;
        const Tag4=this.state.click4;
        const Tag5=this.state.click5;
        return <div style={{color:'white'}}>
            <ul style={{listStyle:'none'}} id={'cinema_menu'}>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click1:!Tag1})}>影厅管理</span>
                    <ul className={'two_ul'} style={{display:this.handleShow1()}}>
                        <li id={1} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}> 添加影厅</li>
                        <li id={2} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}>查看影厅</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click2:!Tag2})}>场次管理</span>
                    <ul className={'two_ul'} style={{display:this.handleShow2()}}>
                        <li id={3} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}>添加场次</li>
                        <li id={4} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}>查看场次</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click3:!Tag3})}>影片信息</span>
                    <ul className={'two_ul'} style={{display:this.handleShow3()}}>

                        <li id={5} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}>影片列表</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click4:!Tag4})}>服务</span>
                    <ul className={'two_ul'} style={{display:this.handleShow4()}}>
                        <li id={6} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}>添加服务</li>
                        <li id={7} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}>我的服务</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click5:!Tag5})}>小食</span>
                    <ul className={'two_ul'} style={{display:this.handleShow5()}}>
                        <li id={8} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}>添加小食</li>
                        <li id={9} className={'two_li'} onClick={(e)=>this.handleClickMenu(e)}>我的小食</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.handleNotice()}>公告</span>
                </li>

            </ul>

        </div>
    }
}
export default CinemaMenu;