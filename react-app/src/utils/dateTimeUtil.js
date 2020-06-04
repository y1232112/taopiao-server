export default function readFormatDate(inputdate) {
    const date = new Date(inputdate);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    //判断是否为N数字，不是则返回一个空字符串
    if (
    isNaN(y)||isNaN(m)||isNaN(d)

    ){
       return ""
    }else return y + '-' + m + '-' + d;

};
export  function readFormatDateTime(inputTime) {
    const date = new Date(inputTime);
    const y = date.getFullYear();
    let m = date.getMonth() + 1;
    m = m < 10 ? ('0' + m) : m;
    let d = date.getDate();
    d = d < 10 ? ('0' + d) : d;
    let h = date.getHours();
    h = h < 10 ? ('0' + h) : h;
    let minute = date.getMinutes();
    let second = date.getSeconds();
    minute = minute < 10 ? ('0' + minute) : minute;
    second = second < 10 ? ('0' + second) : second;
    //判断是否为N数字，不是则返回一个空字符串
    if (
        isNaN(y)||isNaN(m)||isNaN(d)||isNaN(h)||isNaN(minute)||isNaN(second)

    ){
        return ""
    }else return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;

};
export function isDateOut(putDate) {
    const date1=new Date(putDate)
    const date2=new Date();
    if (date1<date2){
        return true;
    }else {
        return false;
    }
}
export function isTimeOut(datestring1,datestring2) {
   const date1=new Date(datestring1)
    const date2=new Date(datestring2)
    if(date2.getTime()<date1.getTime()){
       return true
    }else{
       return false
    }
}

//验证是否日期、时间模式，如果是，则判断，相应月份的天书是否合格
export function validateDateTime(myInput) {
     let str=myInput.trim();
     //匹配日期
     let date=/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
     let regExp1=new RegExp(date);
     //匹配时间
     let time=/(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
     let regExp2=new RegExp(time);
     //匹配日期时间
     let dateTime=/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])\s+(20|21|22|23|[0-1]\d):[0-5]\d:[0-5]\d$/;
     //匹配前面为0的月和day
    let singleNumber=/0[0-9]$/;
    let regExp4=new RegExp(singleNumber);
     let regExp3=new RegExp(dateTime);
     if (regExp1.test(myInput)||regExp2.test(myInput)||regExp3.test(myInput)){
        console.log("-------------reg-匹配------------",myInput)
         //如果匹配日期（只输入的日期)
         if (regExp1.test(myInput)){
         //    直接判断日期是否合格
             let s=myInput.split("-");
             let y=s[0];
             let m=s[1];
             let d=s[2];
             // console.log("-------------reg---y m d---------",y,m,d);
             if (regExp4.test(m)){
                 m=m.charAt(1)
             }
             if (regExp4.test(d)){
                 d=d.charAt(d)
             }
             // console.log("-------------reg111---y m d---------",y,m,d);
             // console.log("-------------reg111---day of month---------",dayOfMonth(Number(y),Number(m)));
             if (dayOfMonth(Number(y),Number(m))<Number(d)){
                alert("日期无效，这个月没有这一天")
                 return false;
             }else return true;

         }else {
         //    匹配日期时间
             let s=myInput.split(" ");
         //    验证日期
             let s2=s[0].split("-")
             // console.log("-------------reg---s2---------",s2);
             let y=s2[0];
             let m=s2[1];
             let d=s2[2];
             // console.log("-------------reg---y m d---------",y,m,d);
             if (regExp4.test(m)){
                 m=m.charAt(1)
             }
             if (regExp4.test(d)){
                 d=d.charAt(d)
             }
             // console.log("-------------reg111---y m d---------",y,m,d);
             if (dayOfMonth(Number(y),Number(m))<Number(d)){
                 alert("日期无效，这个月没有这一天")
                 return false;
             }else return true;
         }

     }else {
         // console.log("-------------reg---不匹配----------",myInput);
         alert("请输入这种格式：2014-03-04 08:02:03")
         return false
     }

}
//验证是否日期、时间模式，如果是，则判断，相应月份的天书是否合格
export function validateDate(myInput) {
    let str=myInput.trim();
    //匹配日期
    let date=/[1-9]\d{3}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])$/;
    let regExp1=new RegExp(date);
    //匹配前面为年的月和day
    let singleNumber=/0[0-9]$/;
    let regExp4=new RegExp(singleNumber);


        console.log("-------------reg-匹配------------",myInput)
        //如果匹配日期
        if (regExp1.test(myInput)){
            //    直接判断日期是否合格
            let s=myInput.split("-");
            let y=s[0];
            let m=s[1];
            let d=s[2];
            // console.log("-------------reg---y m d---------",y,m,d);
            if (regExp4.test(m)){
                m=m.charAt(1)
            }
            if (regExp4.test(d)){
                d=d.charAt(1)
            }
            // console.log("-------------reg111---y m d---------",y,m,d);
            // console.log("-------------reg111---day of month---------",dayOfMonth(Number(y),Number(m)));
            if (dayOfMonth(Number(y),Number(m))<Number(d)){
                alert("日期无效，这个月没有这一天")
                return false;
            }else return true;




    }else {
        // console.log("-------------reg---不匹配----------",myInput);
        alert("请输入这种格式：2014-03-04")
        return false
    }

}
//判断是否闰年----->4年一润，百年不润，400年再润
export function isLeapYear(year) {
 if (typeof year=="number"){
     if ((year%4===0&&year%100!==0)||year%400===0){
         return true
     }else {
         return false
     }
 }
}

//判断日期是否合格--->2月闰年有29天，平年28天，4,6,9,11有30天，1,3,5,7,8,10,12个31天
//7前单月大，7后双月大
export function dayOfMonth(year,month) {
    if (typeof month==="number"&&typeof year==="number"){
        if (month===2){
            if (isLeapYear(year)){
                return 29;
            }else return 28;
        }else if (month === 4 || month === 6 ||month === 9 ||month === 11){
            return 30;
        }else {
            return 31;
        }
    }

}