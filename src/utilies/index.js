import md5 from 'js-md5';
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

function setStorage(key, value) {
    localStorage.setItem(key, JSON.stringify(value));
};

function getStorage(key) {
    return JSON.parse(localStorage.getItem(key));
};

function removeStorage(key) {
    localStorage.removeItem(key)
};

function toDecimal (val) {
    var value = val.toString();
    if (value.indexOf('.') > 0) {
        var decimal = value.substr(value.indexOf('.') + 1, value.length);
        var number = value.substr(0, value.indexOf('.'));
        if (decimal.length == 1) {
            return value + '0'
        } else if (decimal.length == 2) {
            return value
        } else if (decimal.length >= 3) {
            var new_value = parseFloat(value).toFixed(3);
            return new_value.substr(0, new_value.length - 1);
        }
    } else {
        return value + '.00'
    }
}//保留两位小数点

function filterDate(date){
    var spaceIndex = date.indexOf(' ');
    return date.substr(0,spaceIndex);
}//删除详情时间参数

function objKeySort(obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}//排序参数

function codeParam(param,type) {
    let commParam = {
        timestamp: Math.round(new Date().getTime() / 1000),
        version: 'v1',
        format: 'json',
        app_key: 'SMBQpaBWvVZPkpcBvDwQswDWxm',
    };

    let newParam = Object.assign(param,commParam),
        sortParm = objKeySort(newParam),
        row_sign = '',
        sign = '';
    for (var i in sortParm) {
        row_sign += i + '=' + sortParm[i] + '&'
    }
    row_sign += 'dcdAlgyn1GxxageKCqKxHYSIInCqDtkIgZaubdkpqVbDJ';
    sign = md5(row_sign);
    commParam.sign = sign;

    let finalParam = {};

    if(type=='post'){
        finalParam = commParam
    }else{
        finalParam = Object.assign(param,commParam);
    }

    let param_str = '';

    for(var i in finalParam){
        param_str+=i+'='+finalParam[i]+'&';
    }

    param_str = param_str.subscribe(0,param_str.lastIndexOf("&"));

    return param_str
}//支付中心及用户中心 参数加密

function checkBrowser() {
    var userAgent = navigator.userAgent.toLowerCase();
    if(userAgent.match(/Alipay/i)=="alipay"){
        return 'ali'
    }else if(userAgent.match(/MicroMessenger/i)=="micromessenger"){
        return 'wx'
    }else {
        return 'app'
    }
}//查看用户环境 微信/支付宝/app

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]); return null; //返回参数值
}

export {
    setStorage,
    getStorage,
    removeStorage,
    checkICCID,
    formatterCardTime,
    toDecimal,
    filterDate,
    codeParam,
    checkBrowser,
    getUrlParam
}