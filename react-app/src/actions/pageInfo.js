

function getTotalPage(data,page,pageSize) {
    if (( data.length%pageSize)===0){
        return data.length/pageSize
    }else return Math.floor(data.length/pageSize)+1
}

 export const queryPageInfo=(data,page,pageSize) =>
      ({
               currentPage:page,
             pageSize: pageSize,
             totalPage:getTotalPage(data,page,pageSize),
             totalCount:data.length,
            prePage:page-1>=1?page-1:1,
           nextPage:((page+1)<=getTotalPage(data,page,pageSize))?page+1:page,
         lastPage:data.length%pageSize===0?data.length-pageSize:data.length-data.length%pageSize
     })

 export function queryList(data,page,pageSize) {
    let tempArr=[];
      let start=(page-1)*pageSize;
      for (let i=0;i<data.length;i++){
          if (start<=i&&i<(start+pageSize)){
              tempArr.push(data[i])
          }
      }
      // console.log("---page----info ---action---",tempArr)
      return tempArr;
 }


