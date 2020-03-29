import React from "react";
import {Link, NavLink} from "react-router-dom";
const Fail=()=>(
    <div id={"not_found"}>
        <Link to={{
            pathname:'/'
        }}>
            <img width={"200px"} height={"80px"} src={require("../imges/forword.png")} id={"goBackBtn"}/>

        </Link>
        <div style={{display:'flex',justifyContent:'center',alignItems:'center',height:'100vh'}}>

            <div style={{zIndex:'9999',width:'100%',height:'100%',display:'flex',justifyContent:'center',alignItems:'center',fontWeight:'bold'}}>

                <div style={{width:'500px',height:'50px',textAlign:'center'}}>empty and Fall or never login.....</div>
            </div>


        </div>
    </div>
)
export default Fail;