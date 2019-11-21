import md5 from 'js-md5';
import {_post} from "../http";
import global_variables from "./domain";
import {isUndefined} from "element-ui/src/utils/types";

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
  let o = {
    "month": (date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : (date.getMonth() + 1), //月份
    "date": date.getDate() < 10 ? '0' + date.getDate() : date.getDate(), //日
    "hours": date.getHours() < 10 ? '0' + date.getHours() : date.getHours(), //小时
    "minutes": date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes(), //分
    "second": date.getSeconds() < 10 ? '0' + date.getSeconds() : date.getSeconds(), //秒
  };

  return {
    searchTime: o.month + '-' + o.date + ' ' + o.hours + ':' + o.minutes,
    millisecond: new Date().getTime()
  }
}//记录查询时间

function setStorage(key, value, type, saveCookie) {
  if (type === 'arr' || type === 'obj') {
    localStorage.setItem(key, JSON.stringify(value));
  } else {
    localStorage.setItem(key, value);
  }
  if (saveCookie) {
    setCookie(key, value, type);
  }
};

function getStorage(key, type) {
  if (type === 'arr' || type === 'obj') {
    if (localStorage.getItem(key)) {
      return JSON.parse(localStorage.getItem(key));
    } else if (getCookie(key, type)) {
      return getCookie(key, type)
    }
    return undefined
  } else {
    if (localStorage.getItem(key)) {
      return localStorage.getItem(key);
    } else if (getCookie(key, type)) {
      return getCookie(key, type);
    }
    return undefined
  }
};

function removeStorage(key) {
  localStorage.removeItem(key)
  removeCookie(key);
};

function setCookie(key, value, type) {
  if (type === 'arr' || type === 'obj') {
    document.cookie = `${key}=${JSON.stringify(value)}`
  } else {
    document.cookie = `${key}=${value}`
  }
}

function getCookie(key, type) {
  var str = document.cookie;
  var arr = str.split("; ");
  for (let i = 0; i < arr.length; i++) {
    let newArr = arr[i].split("=");
    if (newArr[0] === key) {
      if (type === 'arr' || type === 'obj') {
        return JSON.parse(newArr[1]);
      } else {
        return newArr[1]
      }
    }
  }
}

function removeCookie(key) {
  let exp = new Date();
  exp.setTime(exp.getTime() - 1);
  let value = getCookie(key);
  if (value != null) {
    document.cookie = key + "=" + value + ";expires=" + exp.toGMTString();
  }
}


function toDecimal(val) {
  let type = Object.prototype.toString.call(val);
  if (type === '[object Undefined]' || type === '[object Null]') return '暂无';
  let value = val.toString();
  if (value.indexOf('.') > 0) {
    let decimal = value.substr(value.indexOf('.') + 1, value.length);
    let number = value.substr(0, value.indexOf('.'));
    if (decimal.length === 1) {
      return value + '0'
    } else if (decimal.length === 2) {
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
  let spaceIndex = date.indexOf(' ');
  return date.substr(0, spaceIndex);
}//删除详情时间参数

function objKeySort(obj) {
  let newkey = Object.keys(obj).sort(),
    newObj = {};
  for (let i = 0; i < newkey.length; i++) {
    newObj[newkey[i]] = obj[newkey[i]];
  }
  return newObj;
}//排序参数

function codeParam(param, type) {
  let timeSpan = getStorage('timeSpan') == 0 ? 0 : getStorage('timeSpan'),
    commParam = {
      timestamp: (Date.parse(new Date()) / 1000) + parseInt(timeSpan),
      version: 'v1',
      format: 'json',
      app_key: global_variables[`${global_variables.packed_project}_project`].app_key,
      nonce: new Date().getMilliseconds() + '0' + Math.floor(Math.random() * 10000)
    };

  let newParam = Object.assign(param, commParam),
    sortParm = objKeySort(newParam),
    row_sign = '',
    sign = '';
  for (let i in sortParm) {
    row_sign += i + '=' + sortParm[i] + '&'
  }
  row_sign += global_variables[`${global_variables.packed_project}_project`].app_secret;
  sign = md5(row_sign);
  commParam.sign = sign;

  let finalParam = {};

  if (type === 'post') {
    finalParam = commParam
  } else {
    finalParam = Object.assign(param, commParam);
  }

  let param_str = '';

  for (let i in finalParam) {
    param_str += i + '=' + finalParam[i] + '&';
  }

  param_str = param_str.substring(0, param_str.lastIndexOf("&"));

  return param_str
}//支付中心及用户中心 参数加密






function appParam(param, type) {
  let timeSpan = getStorage('timeSpan') == 0 ? 0 : getStorage('timeSpan'),
    commParam = {
      timestamp: (Date.parse(new Date()) / 1000) + parseInt(timeSpan),
      version: 'v1',
      format: 'json',
      app_key: "VC728xOw1yDgEXwaWI3ORlccemOj5hqy",
      nonce: new Date().getMilliseconds() + '0' + Math.floor(Math.random() * 10000)
    };

  let newParam = Object.assign(param, commParam),
    sortParm = objKeySort(newParam),
    row_sign = '',
    sign = '';
  for (let i in sortParm) {
    row_sign += i + '=' + sortParm[i] + '&'
  }
  row_sign += "qFWmkeSj9MtkraQAwcOqnc2XcFXtyoWwBPfZhaibDACUDBhBNs7dIDAWKn1CRG1l";
  sign = md5(row_sign);
  commParam.sign = sign;

  let finalParam = {};

  if (type === 'post') {
    finalParam = commParam
  } else {
    finalParam = Object.assign(param, commParam);
  }

  let param_str = '';

  for (let i in finalParam) {
    param_str += i + '=' + finalParam[i] + '&';
  }

  param_str = param_str.substring(0, param_str.lastIndexOf("&"));

  return param_str
}//app统计的参数加密

function checkBrowser() {
  var UA = navigator.userAgent.toLowerCase();
  if (/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0, 4))) {

    if ((/Alipay/i).test(UA)) {
      return 'alipay'
    } else if ((/MicroMessenger/i).test(UA)) {
      return 'wechat'
    } else if (/(uni-app)/.test(UA) || /(ylkids_android)/.test(UA) || /(ios1.1.0)/.test(UA) || /(app_charge)/.test(UA)) {
      return 'app'
    } else {
      return 'mobile'
    }
  } else {
    return 'pc'
  }
}//查看用户环境 微信/支付宝/app

// 检测手机设备
function checkDevice() {
  let u = navigator.userAgent;
  if (u.indexOf('Android') > -1 || u.indexOf('Linux') > -1) {
    return 'android'
  }
  if (!!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/) || u.indexOf('iPhone') > -1 || u.indexOf('iPad') > -1) {
    return 'iphone'
  }
}

function getUrlParam(name) {
  let reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)"); //构造一个含有目标参数的正则表达式对象
  let r = window.location.search.substr(1).match(reg);  //匹配目标参数
  if (r != null) return unescape(r[2]);
  return null; //返回参数值
}

function inArray(elem, arr, i) {
  return arr == null ? -1 : arr.indexOf(elem, i);
}

function getCardServerToken(params) {
  if (JSON.stringify(params) !== '{}') {
    let paramsBak = {};
    // let paramsBak = {...params};
    for (let i in params) {
      if (Object.prototype.toString.call(params[i]) !== '[object Undefined]' && Object.prototype.toString.call(params[i]) !== '[object Null]') {
        paramsBak[i] = params[i];
      }
    }
    paramsBak.salt = 'qhyl@#6688';
    let sortParams = objKeySort(paramsBak);
    let str = ''
    for (let i in sortParams) {
      str += `${i}=${sortParams[i]}&`
    }
    str = str.substr(0, str.length - 1);
    str = sha1(str);
    str = md5(str);

    return str
  }
}

function Today(val) {
  let newDate = val ? new Date(val) : new Date(),
    year = newDate.getFullYear(),
    month = newDate.getMonth() + 1,
    date = newDate.getDate();
  (month >= 1 && month <= 9) ? month = "0" + month : month;
  (date >= 0 && date <= 9) ? date = "0" + date : date;

  return `${year}-${month}-${date}`;
}

function GetUrlRelativePath() {
  let url = document.location.toString(),
    arrUrl = url.split("//"),
    start = arrUrl[1].indexOf("/"),
    relUrl = arrUrl[1].substring(start);//stop省略，截取从start开始到结尾的所有字符
  if (relUrl.indexOf("?") != -1) {
    relUrl = relUrl.split("?")[0];
  }
  return relUrl;
}//获取当前路径

function lossRate(params) {
  return _post('/api/v1/app/card_create_loss_rate', {
    ...params
  });
}// 流失率统计


//app点击统计

function appRate(type){
  if(localStorage.getItem("newAppStyle")=="app2"){
    return _post('/appRateApi/v1/userclicklog/click_log?'+appParam({},'post'),{user_id:getStorage('userInfo', 'obj').account.user_id ,type:type});
  }
}
function encodeUTF8(s) {
  var i, r = [], c, x;
  for (i = 0; i < s.length; i++)
    if ((c = s.charCodeAt(i)) < 0x80) r.push(c);
    else if (c < 0x800) r.push(0xC0 + (c >> 6 & 0x1F), 0x80 + (c & 0x3F));
    else {
      if ((x = c ^ 0xD800) >> 10 == 0) //对四字节UTF-16转换为Unicode
        c = (x << 10) + (s.charCodeAt(++i) ^ 0xDC00) + 0x10000,
          r.push(0xF0 + (c >> 18 & 0x7), 0x80 + (c >> 12 & 0x3F));
      else r.push(0xE0 + (c >> 12 & 0xF));
      r.push(0x80 + (c >> 6 & 0x3F), 0x80 + (c & 0x3F));
    }
  ;
  return r;
}

// 字符串加密成 hex 字符串
function sha1(s) {
  var data = new Uint8Array(encodeUTF8(s))
  var i, j, t;
  var l = ((data.length + 8) >>> 6 << 4) + 16, s = new Uint8Array(l << 2);
  s.set(new Uint8Array(data.buffer)), s = new Uint32Array(s.buffer);
  for (t = new DataView(s.buffer), i = 0; i < l; i++) s[i] = t.getUint32(i << 2);
  s[data.length >> 2] |= 0x80 << (24 - (data.length & 3) * 8);
  s[l - 1] = data.length << 3;
  var w = [], f = [
      function () {
        return m[1] & m[2] | ~m[1] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      },
      function () {
        return m[1] & m[2] | m[1] & m[3] | m[2] & m[3];
      },
      function () {
        return m[1] ^ m[2] ^ m[3];
      }
    ], rol = function (n, c) {
      return n << c | n >>> (32 - c);
    },
    k = [1518500249, 1859775393, -1894007588, -899497514],
    m = [1732584193, -271733879, null, null, -1009589776];
  m[2] = ~m[0], m[3] = ~m[1];
  for (i = 0; i < s.length; i += 16) {
    var o = m.slice(0);
    for (j = 0; j < 80; j++)
      w[j] = j < 16 ? s[i + j] : rol(w[j - 3] ^ w[j - 8] ^ w[j - 14] ^ w[j - 16], 1),
        t = rol(m[0], 5) + f[j / 20 | 0]() + m[4] + w[j] + k[j / 20 | 0] | 0,
        m[1] = rol(m[1], 30), m.pop(), m.unshift(t);
    for (j = 0; j < 5; j++) m[j] = m[j] + o[j] | 0;
  }
  ;
  t = new DataView(new Uint32Array(m).buffer);
  for (var i = 0; i < 5; i++) m[i] = t.getUint32(i << 2);

  var hex = Array.prototype.map.call(new Uint8Array(new Uint32Array(m).buffer), function (e) {
    return (e < 16 ? "0" : "") + e.toString(16);
  }).join("");
  return hex;
}

//减法精度问题
function Subtr(arg1, arg2) {
  var r1, r2, m, n;
  try {
    r1 = arg1.toString().split(".")[1].length
  } catch (e) {
    r1 = 0
  }
  try {
    r2 = arg2.toString().split(".")[1].length
  } catch (e) {
    r2 = 0
  }
  m = Math.pow(10, Math.max(r1, r2));
  n = (r1 >= r2) ? r1 : r2;
  return ((arg1 * m - arg2 * m) / m).toFixed(n);
}

export {
  getCardServerToken,
  setStorage,
  getStorage,
  removeStorage,
  checkICCID,
  formatterCardTime,
  toDecimal,
  filterDate,
  codeParam,
  checkBrowser,
  checkDevice,
  getUrlParam,
  inArray,
  Today,
  GetUrlRelativePath,
  lossRate,
  Subtr,
  appRate
}
