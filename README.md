## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### 项目授权重定向URL链接
src/utilies/domain.js
正式环境打包时需要将vue项目环境变量更改为'production'

### main.js中微信JSDK需要更改请求配置API
- cardserver项目为 '/api/v1/app/mifi_sign_info'
- mifi项目为 '/api/v1/app/sign_info'

### CDN资源引用报错后
打包文件app.js在IOS上会出现报错。由于缓存原因可能导致安卓上短时间内不会出现报错。