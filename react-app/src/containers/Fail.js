import React from "react";
import {Link, NavLink} from "react-router-dom";
import {connect} from "react-redux";
const Fail=(change)=> {
    let item;
    // if (change.change==1){
    //     console.log("cinema===change"+change.change)
    // }
    // if (change.change==2){
    //     console.log("sys===change"+change.change)
    // }

 if (change.change==1){
            item=<Link to={{pathname: '/cinema'}}>
                <img width={"200px"} height={"80px"} src={require("../imges/forword.png")} id={"goBackBtn"}/>
            </Link>}
    if (change.change==2){
            item=<Link to={{pathname: '/sysadmin'}}>
                <img width={"200px"} height={"80px"} src={require("../imges/forword.png")} id={"goBackBtn"}/>
            </Link>}
      else if (change.change==0) {
          item=<Link to={{pathname: '/'}}>
                <img width={"200px"} height={"80px"} src={require("../imges/forword.png")} id={"goBackBtn"}/>
            </Link>}
    {console.log("props change============", change.change)}

   return <div id={"not_found"}>

        {/*<Link to={{pathname: '/'}}>*/}
        {/*    <img width={"200px"} height={"80px"} src={require("../imges/forword.png")} id={"goBackBtn"}/>*/}
        {/*</Link>*/}
       {item}
        <div style={{display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh'}}>

            <div style={{
                zIndex: '9999',
                width: '100%',
                height: '100%',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                fontWeight: 'bold'
            }}>

                <div style={{width: '500px', height: '50px', textAlign: 'center'}}>empty and Fall or never login.....
                </div>
            </div>


        </div>
    </div>
}
const mapStateToProps=state=>({
    change:state.loginPrivate
})
export default connect(mapStateToProps)(Fail);