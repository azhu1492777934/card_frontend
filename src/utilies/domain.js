/*
* 支付中心重定向url
* */
import {checkBrowser, checkDevice} from "./index";

let global_variables = {
  packed_project: 'card', // 修改项目
  authorized_redirect_url: '',
  realname_url: '',
  version: '1.1',
  RuntimeEnv: checkBrowser(),
  device: checkDevice(),
  mifi_project: {
    empty_router_url: '/mifi/card/index',
    DevelopDomain: 'http://mifiserver-test.china-m2m.com',
    ProductionDomain: 'https://mifiserver.china-m2m.com',
    app_key: 'LKyU8N3izh7b28dnQl5Wqziq6m',
    app_secret: 'fyGDWOHCfgyBHmHmY30Z3aE1k9mv1RXp6fYooK6sX728U',
  },
  card_project: {
    empty_router_url: '/weixin/card/lookup',
    DevelopDomain: 'http://cardserver-test.china-m2m.com',
    ProductionDomain: 'https://cardserver.china-m2m.com',
    app_key: 'tz4Mdxeg5bMKgzkxsUNjpL6msQ',
    app_secret: '6XPjkJtW0evK1zv7lVb8xnbZpTUjh2zisJ2l9vEZtLFGf',
  },
  new_project: {
    empty_router_url: '/weixin/card/lookup',
    DevelopDomain: 'https://cardserver.qiyu-m2m.com',
    ProductionDomain: 'https://cardserver.qiyu-m2m.com',
  },
  realname: {
    DevelopDomain: 'http://realname-test.china-m2m.com/auth/new_card/real_name',
    ProductionDomain: 'http://realname.china-m2m.com/auth/new_card/real_name'
  }
};

/*
* 当前打包项目
* */
// if(process.env.NODE_ENV === 'development'){
if (process.env.NODE_ENV === 'production') {
  global_variables.realname_url = global_variables.realname.ProductionDomain;
  global_variables.authorized_redirect_url = global_variables[`${global_variables.packed_project}_project`].ProductionDomain;
} else {
  global_variables.realname_url = global_variables.realname.DevelopDomain;
  global_variables.authorized_redirect_url = global_variables[`${global_variables.packed_project}_project`].DevelopDomain;
}

export default global_variables
