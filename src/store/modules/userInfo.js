import {getStorage} from "../../utilies";

const state ={
    showUser:false,//是否显示用户信息
    userInfoInner: getStorage('userInfo','obj') ||{
        account:{
            rmb:0,
            elb:0
        },
        nickname:'eLink',
        avatar:'',
    },//用户信息
    decrypt_data:getStorage('decrypt_data','obj')
}


const getters ={

}


const mutations = {
    changeUserInfo(state,info){
        state.userInfoInner = getStorage('userInfo','obj');
        state.userInfoInner = info;
        if(state.decrypt_data){
            state.userInfoInner.nickname = state.decrypt_data.nickname;
            state.userInfoInner.avatar = state.decrypt_data.headimgurl;
        }
    },
    changeUserStatus(state,userStatus){
        state.showUser = userStatus
    }
}

const actions = {
    invokeChange(context,info){
        context.commit('changeUserInfo',info)
    },//触发mutation 传入数据
    invokeUserStatus(context,userStatus){
        context.commit('changeUserStatus',userStatus)
    }
}

export default {
    namespaced:true,
    state,
    getters,
    mutations,
    actions
}