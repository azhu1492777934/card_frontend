import {getStorage, setStorage} from "../../utilies";

const state = {
  showBalancePay: getStorage('balance_pay') || false, //增加是否显示用户信息
  showUser: false,//是否显示用户信息
  decrypt_data: getStorage('decrypt_data', 'obj'),
  userInfoInner: getStorage('userInfo', 'obj') || {
    account: {
      balance: 0,
      rmb: 0,
      elb: 0
    },
    nickname: '',
    avatar: '',
    mobile: ''
  },//用户信息
};

const getters = {};

const mutations = {
  changeUserInfo(state, info) {
    state.userInfoInner = info;
    setStorage('userInfo', info, 'obj');
    if (state.decrypt_data) {
      state.userInfoInner.nickname = state.decrypt_data.nickname;
      state.userInfoInner.avatar = state.decrypt_data.headimgurl;
    }
  },
  changeUserStatus(state, userStatus) {
    state.showUser = userStatus
  },
  changeCanBalancePay(state, canBalancePay) {
   
      state.showBalancePay = canBalancePay

    
  }
}

const actions = {
  invokeChange(context, info) {
    context.commit('changeUserInfo', info)
  },//触发mutation 传入数据
  invokeUserStatus(context, userStatus) {
    context.commit('changeUserStatus', userStatus)
  }
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions
}
