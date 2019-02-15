import md5 from 'js-md5';

function checkICCID(iccid) {
    if (iccid.length < 19 || iccid.length > 20 || iccid.substr(0, 2) != '89') {
        return {
            state: 0,
            msg: 'ICCID有误,请输入正确的ICCID'
        }
    }
    return {
        state: 1
    }
}//校验ICCID

function formatterCardTime() {
    let date = new Date()
    var o = {
        "month": (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1), //月份
        "date": date.getDate() < 10 ? '0' + date.getDate() : date.getDate(), //日
        "hours": date.getHours() < 10 ? '0' + date.getHours() : date.getHours(), //小时
        "minutes": date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(), //分
        "second": date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(), //秒
    };

    return {
        searchTime: o.month + '-' + o.date + ' ' + o.hours + ':' + o.minutes,
        millisecond:  new Date().getTime()
    }
}//记录查询时间

function setStorage(key, value,type) {
    if(type=='arr'||type=='obj'){
        localStorage.setItem(key, JSON.stringify(value));
    }else {
        localStorage.setItem(key, value);
    }
};

function getStorage(key,type) {

    if(type=='arr'||type=='obj'){
        return JSON.parse(localStorage.getItem(key));
    }else{
        return localStorage.getItem(key);
    }
};

function removeStorage(key) {
    localStorage.removeItem(key)
};

function toDecimal(val) {
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

function filterDate(date) {
    var spaceIndex = date.indexOf(' ');
    return date.substr(0, spaceIndex);
}//删除详情时间参数

function objKeySort(obj) {
    var newkey = Object.keys(obj).sort();
    var newObj = {};
    for (var i = 0; i < newkey.length; i++) {
        newObj[newkey[i]] = obj[newkey[i]];
    }
    return newObj;
}//排序参数

function codeParam(param, type) {
    let commParam = {
        timestamp: Math.round(new Date().getTime() / 1000),
        version: 'v1',
        format: 'json',
        app_key: 'XznBRoBGEgoCUtZbDbtL0G1QhE',
        nonce:new Date().getMilliseconds()+'0'+Math.floor(Math.random()*10000)
    };

    let newParam = Object.assign(param, commParam),
        sortParm = objKeySort(newParam),
        row_sign = '',
        sign = '';
    for (var i in sortParm) {
        row_sign += i + '=' + sortParm[i] + '&'
    }
    row_sign += 'EThOWYkcwsrrCEsFTbgvHFWLaEJwrThDcYqrPbIuhufVp';
    sign = md5(row_sign);
    commParam.sign = sign;

    let finalParam = {};

    if (type == 'post') {
        finalParam = commParam
    } else {
        finalParam = Object.assign(param, commParam);
    }

    let param_str = '';

    for (var i in finalParam) {
        param_str += i + '=' + finalParam[i] + '&';
    }

    param_str = param_str.substring(0, param_str.lastIndexOf("&"));

    return param_str
}//支付中心及用户中心 参数加密


function checkBrowser() {
    var userAgent = navigator.userAgent.toLowerCase();

    if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
        || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4)))
    {

        if (userAgent.match(/Alipay/i) == "alipay") {
            return 'alipay'
        } else if (userAgent.match(/MicroMessenger/i) == "micromessenger") {
            return 'wechat'
        }else if(/(uni-app)/.test(userAgent)){
            return 'app'
        } else{
            return 'mobile'
        }
    }else{
        return  'pc'
    }


}//查看用户环境 微信/支付宝/app

function getUrlParam(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
    var r = window.location.search.substr(1).match(reg);  //匹配目标参数
    if (r != null) return unescape(r[2]);
    return null; //返回参数值
}

function inArray (elem, arr, i) {
    return arr == null ? -1 : arr.indexOf(elem, i);
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
    getUrlParam,
    inArray,
}