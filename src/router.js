import Vue from 'vue'
import Router from 'vue-router'
import activited_card from  './views/new_card/activated_card'
import recharge from './views/new_card/recharge'

Vue.use(Router)


export const constantRouterMap = [
    {
        path:'/',
        component:activited_card

    },{
        path:'/recharge',
        component:recharge

    }
]

export default new Router({
    routes: constantRouterMap
})


