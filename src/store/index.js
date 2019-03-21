import Vue from 'vue'
import Vuex from 'vuex'
import userInfo from './modules/userInfo'
import mifiCommon from './modules/mifiCommon'

Vue.use(Vuex)


const store = new Vuex.Store({
    modules:{
        userInfo,
        mifiCommon
    }
});

export default store;