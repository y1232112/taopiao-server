import React from "react";
import {store} from "../index";
import {receiveDiscountNumbeer} from "../actions";
class DiscountBox extends React.Component{
  handleChangeDiscpunt=(e)=>{
      console.log("discount box "+e.target.value)
      store.dispatch(receiveDiscountNumbeer(e.target.value))
  }
    render() {
        return <select id={"price_box"} onChange={(e)=>this.handleChangeDiscpunt(e)}>
            <option value={10}>原价</option>
          <option value={9.9}>9.9</option>
            <option value={9.8}>9.8</option>
            <option value={9.7}>9.7</option>
            <option value={9.6}>9.6</option>
            <option value={9.5}>9.5</option>
            <option value={9.4}>9.4</option>
            <option value={9.3}>9.3</option>
            <option value={9.2}>9.2</option>
            <option value={9.1}>9.1</option>
            <option value={9}>9</option>
            <option value={8.9}>8.9</option>
            <option value={8.8}>8.8</option>
            <option value={8.7}>8.7</option>
            <option value={8.6}>8.6</option>
            <option value={8.5}>8.5</option>
            <option value={8.4}>8.4</option>
            <option value={8.3}>8.3</option>
            <option value={8.2}>8.2</option>
            <option value={8.1}>8.1</option>
            <option value={8}>8</option>
            <option value={7.9}>7.9</option>
            <option value={7.8}>7.8</option>
            <option value={7.7}>7.7</option>
            <option value={7.6}>7.6</option>
            <option value={7.5}>7.5</option>
            <option value={7.4}>7.4</option>
            <option value={7.3}>7.3</option>
            <option value={7.2}>7.2</option>
            <option value={7.1}>7.1</option>
            <option value={7}>7</option>
            <option value={6.9}>6.9</option>
            <option value={6.8}>6.8</option>
            <option value={6.7}>6.7</option>
            <option value={6.6}>6.6</option>
            <option value={6.5}>6.5</option>
            <option value={6.4}>6.4</option>
            <option value={6.3}>6.3</option>
            <option value={6.2}>6.2</option>
            <option value={6.1}>6.1</option>
            <option value={6}>6</option>
            <option value={5.9}>5.9</option>
            <option value={5.8}>5.8</option>
            <option value={5.7}>5.7</option>
            <option value={5.6}>5.6</option>
            <option value={5.5}>5.5</option>
            <option value={5.4}>5.4</option>
            <option value={5.3}>5.3</option>
            <option value={5.2}>5.2</option>
            <option value={5.1}>5.1</option>
            <option value={5}>5</option>
            <option value={4.9}>4.9</option>
            <option value={4.8}>4.8</option>
            <option value={4.7}>4.7</option>
            <option value={4.6}>4.6</option>
            <option value={4.5}>4.5</option>
            <option value={4.4}>4.4</option>
            <option value={4.3}>4.3</option>
            <option value={4.2}>4.2</option>
            <option value={4.1}>4.1</option>
            <option value={4}>4</option>
            <option value={3.9}>3.9</option>
            <option value={3.8}>3.8</option>
            <option value={3.7}>3.7</option>
            <option value={3.6}>3.6</option>
            <option value={3.5}>3.5</option>
            <option value={3.4}>3.4</option>
            <option value={3.3}>3.3</option>
            <option value={3.2}>3.2</option>
            <option value={3.1}>3.1</option>
            <option value={3}>3</option>
            <option value={2.9}>2.9</option>
            <option value={2.8}>2.8</option>
            <option value={2.7}>2.7</option>
            <option value={2.6}>2.6</option>
            <option value={2.5}>2.5</option>
            <option value={2.4}>2.4</option>
            <option value={2.3}>2.3</option>
            <option value={2.2}>2.2</option>
            <option value={2.1}>2.1</option>
            <option value={2}>2</option>
            <option value={1.9}>1.9</option>
            <option value={1.8}>1.8</option>
            <option value={1.7}>1.7</option>
            <option value={1.6}>1.6</option>
            <option value={1.5}>1.5</option>
            <option value={1.4}>1.4</option>
            <option value={1.3}>1.3</option>
            <option value={1.2}>1.2</option>
            <option value={1.1}>1.1</option>
            <option value={1}>1</option>
            <option value={0.9}>0.9</option>
            <option value={0.8}>0.8</option>
            <option value={0.7}>0.7</option>
            <option value={0.6}>0.6</option>
            <option value={0.5}>0.5</option>
            <option value={0.4}>0.4</option>
            <option value={0.3}>0.3</option>
            <option value={0.2}>0.2</option>
            <option value={0.1}>0.1</option>
        </select>
    }
}
export default DiscountBox;