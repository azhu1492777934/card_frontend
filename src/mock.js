const Mock = require('mockjs');
const Random = Mock.Random;

const  plan_list = function () {
    let first_group = [],
        second_group = [],
        third_group = [];
    for(let i = 0;i<5;i++){
        let obj = {
            card_source:Random.integer(1,29),
            day: 180,
            describe: Random.csentence(1, 29),
            first_price: null,
            id: Random.integer(6000,7000),
            is_can_renew: 0,
            is_elb_deductible: 0,
            is_recommend: true,
            market_price: 160,
            max_deductible_elb: 30,
            name: Random.integer(1,29)+"元活动套餐",
            price: 59.9,
            remark: Random.csentence(1, 29),
            surplus_times: "False",
            type: 0
        }
        first_group.push(obj)
    }

    for(let i = 0;i<5;i++){
        let obj = {
            card_source:Random.integer(1,29),
            day: 180,
            describe: Random.csentence(1, 29),
            first_price: null,
            id: Random.integer(1000,5000),
            is_can_renew: 0,
            is_elb_deductible: 0,
            is_recommend: true,
            market_price: 160,
            max_deductible_elb: 30,
            name: Random.integer(1,100)+"元测试套餐",
            price: 59.9,
            remark: Random.csentence(1, 29),
            surplus_times: "False",
            type: 1,
        }
        second_group.push(obj)
    }

    for(let i = 0;i<5;i++){
        let obj = {
            card_source:Random.integer(8000,9000),
            day: 180,
            describe:Random.csentence(1, 29),
            first_price: null,
            id: 10921,
            is_can_renew: 0,
            is_elb_deductible: 0,
            is_recommend: true,
            market_price: 160,
            max_deductible_elb: 30,
            name: Random.integer(1,500)+"元加油包",
            price: 59.9,
            remark: Random.csentence(1, 29),
            surplus_times: "False",
            type: 2,
        }
        third_group.push(obj)
    }
    return {
        0:first_group,
        1:second_group,
        2:third_group
    }
}

console.log(plan_list())

Mock.mock(/\/api\/list-prices[\s\S]*?/,'get',()=>{
    const obj = {
        state:1,
        msg:'success',
        data:plan_list()
    }
    return obj
});
