import React from "react";
import 'font-awesome/less/font-awesome.less';
import 'react-fontawesome';

class Menu extends React.Component{


    constructor(props, context) {
        super(props, context);
        this.state={
            click1:false,
            click2:false,
            click3:false
        }}

    handleOncklick1=(show)=>{
       this.setState({click1:!show})
    }
    // handleOncklick2=(show)=>{
    //    this.setState({click2:!show})
    // }
    // handleOncklick3=(show)=>{
    //     this.setState({click3:!show})
    // }
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
    render() {
     const Tag1=this.state.click1;
     const Tag2=this.state.click2;
     const Tag3=this.state.click3;
        return <div style={{color:'white'}}>
            <ul style={{listStyle:'none'}} id={'menu'}>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click1:!Tag1})}>电影管理</span>
                    <ul className={'two_ul'} style={{display:this.handleShow1()}}>
                        <li className={'two_li'}> 添加影片</li>
                        <li className={'two_li'}>删除影片</li>
                        <li className={'two_li'}>电影列表</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click2:!Tag2})}>影员管理</span>
                    <ul className={'two_ul'} style={{display:this.handleShow2()}}>
                        <li className={'two_li'}>添加影员</li>
                        <li className={'two_li'}>编辑影员</li>
                        <li className={'two_li'}>影员列表</li>
                    </ul>
                </li>
                <li className={'warp_li'}>
                    <span onClick={()=>this.setState({click3:!Tag3})}>影院管理</span>
                    <ul className={'two_ul'} style={{display:this.handleShow3()}}>
                        <li className={'two_li'}>添加影院</li>
                        <li className={'two_li'}>编辑影院</li>
                        <li className={'two_li'}>影院列表</li>
                    </ul>
                </li>
            </ul>

        </div>
    }

}
export default Menu;