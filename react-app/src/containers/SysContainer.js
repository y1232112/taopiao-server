import React from "react";
import {store} from "../index";
import * as types from "../constants/actionTypes"
import {connect} from "react-redux";
import Menu from "../components/Menu";
class SysContainer extends React.Component{

    render() {
        store.dispatch({
            type:types.LOGIN_PRIVITE_GET,
            loginprivate:2
        });
        const wrapStyle={
                margin:'0',
                padding:'0',
                height:'100vh',
                width:'100%',
                display:'flex',

                flexWrap:'nowrap',
            backgroundColor:'rgba(247,241,238,1)'
        };
        const menuContainer={
            width:'20%',
            height: '100%',
           backgroundColor:'#2a2a58'
        };
        const mainCotainer={
            width: '79%',
            backgroundColor:'#fffefd'
        };
        const headerStyle={
           height:'64px',
            backgroundColor:'rgba(58,56,175,0.86)',
        };
        const contentStyle={
            // width:'100%',
            margin: '25px',
            backgroundColor:'#fffefd',
        };
        const titleStytle={
            height:'30px',
            backgroundColor:'#7687ff',
            borderRadius:'2px',
        }
        const dataMargin={

            margin:'5px',
        };
        const table={
            margin:'5px',
        }
        const menuMargin={
            margin:'0px',
        }
        const menuTop={
            height:'64px',

        }
        const menuMain={
            marginTop:'25px',
        }
        return <div>
            <div style={wrapStyle}>
               <div style={menuContainer}>
                   <div style={menuMargin}>
                       <div style={menuTop}></div>
                       <div style={menuMain}>
                        <Menu/>
                       </div>
                   </div>
               </div>
                <div style={mainCotainer}>
                    <div style={headerStyle}>

                    </div>
                    <div style={contentStyle}>
                        <div style={dataMargin}>
                            <div style={titleStytle}>
                                标题
                            </div>
                            <div style={table}>数据表格</div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
const mapStateTopProps=state=>({
    change:state.loginpivate,
})
export default connect(mapStateTopProps)( SysContainer);