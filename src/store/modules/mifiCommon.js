//  mifi项目 请求公共加载

const state = {
    intercept: {
        loading: false,
        show: false,
        errorMsg: '',
    },
}

const mutations = {
    changeLoadingStatus(state,payload){
        state.intercept.loading = payload.flag;
    },
    changeErrStatus(state,payload){
        state.intercept.show = payload.show;
        state.intercept.errorMsg = payload.errorMsg;
    }
}

export default {
    namespaced:true,
    state,
    mutations,
}