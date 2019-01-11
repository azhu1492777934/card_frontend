const state ={
    showUser:false,//是否显示用户信息
    userInfoInner:{
        account:{
            rmb:0,
            elb:0
        },
        nickname:'eLink',
        avatar:''
    }//用户信息
}

const getters ={

}


const mutations = {
    changeUserInfo(state,info){
        state.userInfoInner = info
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