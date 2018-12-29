function checkICCID(iccid) {
    if(iccid.length < 19 || iccid.length > 20 || iccid.substr(0,2)!='89'){
        return {
            state:0,
            msg:'ICCID有误,请输入正确的ICCID'
        }
    }
    return{
        state:1
    }
}//校验ICCID

function formatterCardTime(){
    let date = new Date()
    var o = {
        "month": (date.getMonth() + 1), //月份
        "date": date.getDate()<10?'0'+date.getDate():date.getDate(), //日
        "hours": date.getHours()<10?'0'+date.getHours():date.getHours(), //小时
        "minutes": date.getMinutes()<10?'0'+date.getMinutes():date.getMinutes(), //分
        "second": date.getSeconds()<10?'0'+date.getSeconds():date.getSeconds(), //秒
    };

    return {
        searchTime:o.month+'-'+o.date+' '+o.hours+':'+o.minutes,
        millisecond:date.getTime()
    }
}//记录查询时间

function sortObj(jsonObj) {
    let arr=[];
    for(var key in jsonObj){
        arr.push(key)
    }
    arr.sort();
    let str='';
    for(var i in arr){
        str +=arr[i]+"="+jsonObj[arr[i]]+"&"
    }
    return str.substr(0,str.length-1)
}//倒序排列对象

function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};
function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};
function removeStorage(key) {
    localStorage.removeItem(key)
};

export {
    setStorage,
    getStorage,
    removeStorage,
    checkICCID,
    formatterCardTime,
    sortObj
}