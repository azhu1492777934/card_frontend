function filterDate(date){
    if(date.indexOf(' ')>0){
        var spaceIndex = date.indexOf(' ');
        return date.substr(0,spaceIndex);
    }
    return date
}//删除详情时间参数

function clacDaysSpan(start_at,  end_at){
    let  arr_start_at,  arr_end_at,  new_start_at,  new_end_at ,spanDays,
        cur_start_at = filterDate(start_at),
        cur_end_at = filterDate(end_at);

    arr_start_at  =  cur_start_at.split('-');
    arr_end_at  =  cur_end_at.split('-');
    new_start_at  =  new  Date(`${arr_start_at[1]}-${arr_start_at[2]}-${arr_start_at[0]}`);
    new_end_at  =  new  Date(`${arr_end_at[1]}-${arr_end_at[2]}-${arr_end_at[0]}`);

    spanDays  =  parseInt(Math.abs(new_start_at  -  new_end_at)  /  1000  /  60  /  60  /24) ;
    return  spanDays
}

export  default {
    install:function (Vue) {
        Vue.prototype.filterDate = (data) =>filterDate(data);
        Vue.prototype.clacDaysSpan = (start_at,end_at) => clacDaysSpan(start_at,end_at);
    }
}