function filterDate(date){
    var spaceIndex = date.indexOf(' ');
    return date.substr(0,spaceIndex);
}//删除详情时间参数
export  default {
    install:function (Vue) {
        Vue.prototype.filterDate = (data) =>filterDate(data)
    }
}