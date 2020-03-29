import React from "react";
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';

import {store} from "../index";
import {checkedList, receiveMenu} from "../actions";

class Menu extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.state={
            click1:false,
            click2:false,
            click3:false
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
    //点击菜单实现
    handleClickMenu=(e)=>{

      console.log('--e----',Number(e.currentTarget.id))
        store.dispatch(receiveMenu(Number(e.currentTarget.id)))
        //每点击一次菜单对checkBox得到的id数组进行初始化
        store.dispatch(checkedList([]))
    }
    render() {
     const Tag1=this.state.click1;
     const Tag2=this.state.click2;
     const Tag3=this.state.click3;
        return <div style={{color:'white'}}>
            <ul style={{listStyle:'none'}} id={'menu'}>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click1:!Tag1})}>电影管理</span>
                    <ul className={'two_ul'} style={{display:this.handleShow1()}}>
                        <li id={1} onClick={(e)=>this.handleClickMenu(e)} className={'two_li'}>添加影片</li>
                        <li id={2} onClick={(e)=>this.handleClickMenu(e)} className={'two_li'}>编辑影片</li>
                        <li id={3} onClick={(e)=>this.handleClickMenu(e)} className={'two_li'}>电影列表</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click2:!Tag2})}>影员管理</span>
                    <ul className={'two_ul'} style={{display:this.handleShow2()}}>
                        <li onClick={(e)=>this.handleClickMenu(e)} id={4} className={'two_li'}>添加影员</li>
                        <li onClick={(e)=>this.handleClickMenu(e)} id={5} className={'two_li'}>编辑影员</li>
                        <li onClick={(e)=>this.handleClickMenu(e)} id={6} className={'two_li'}>影员列表</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click3:!Tag3})}>影院管理</span>
                    <ul className={'two_ul'} style={{display:this.handleShow3()}}>
                        <li onClick={(e)=>this.handleClickMenu(e)} id={7} className={'two_li'}>添加影院</li>
                        <li onClick={(e)=>this.handleClickMenu(e)} id={8} className={'two_li'}>编辑影院</li>
                        <li onClick={(e)=>this.handleClickMenu(e)} id={9} className={'two_li'}>影院列表</li>
                    </ul>
                </li>
            </ul>

        </div>
    }

}
export default Menu;