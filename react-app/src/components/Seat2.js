import React from "react";
class Seat2 extends React.Component{
    render() {
        return this.props.itemValue==0?<img
            src={require("../imges/seat_xx_bj.png")} width={'30px'} height={'30px'} style={{visibility:"hidden"}}/>:<img  src={require("../imges/seat_bj.png")} width={'30px'} height={'30px'}/>
    }
}
export default Seat2;