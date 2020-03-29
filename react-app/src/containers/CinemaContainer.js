import React from "react";
import {store} from "../index";
import * as types from "../constants/actionTypes";
import Menu from "../components/Menu";
import {connect} from "react-redux";
import CinemaMenu from "../components/CinemaMenu";
class CinemaContainer extends React.Component{

    render() {

        store.dispatch({
            type:types.LOGIN_PRIVITE_GET,
            loginPrivate:1
        })
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
            backgroundColor:'#2a2a58',

        };
        const mainCotainer={
            width: '79%',
            backgroundColor:'#eaeaea'
        };
        const headerStyle={
            height:'80px',
            backgroundColor:'#fffefd',
        };
        const contentStyle={
            // width:'100%',
            margin: '25px',
            backgroundColor:'#ffffff',
        };
        const titleStytle={
            height:'30px',
            backgroundColor:'#eaeaea',
            borderRadius:'2px',
        }
        const dataMargin={

            margin:'0px',
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
        return <div style={{position:'fixed', top:'80px'}}>
            <div style={wrapStyle}>
                <div style={menuContainer}>
                    <div style={menuMargin}>
                        <div style={menuTop}></div>
                        <div style={menuMain}>
                           <CinemaMenu/>
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
    change:state.loginPrivate,
})
export default connect(mapStateTopProps) (CinemaContainer);
