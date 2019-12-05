<p style="text-align:center">
<img src="https://img.shields.io/badge/axios-^0.19.0-green">
<img src="https://img.shields.io/badge/axiosProgressBar-^1.2.0-green">
<img src="https://img.shields.io/badge/vueCookie-^1.1.4-green">
<img src="https://img.shields.io/badge/license-ISC-green">
</p>

## Introduction

`axios-extensions-server` 对 axios 实例化并二次封装

主要功能如下：

- 全局请求配置；
- 全局请求状态管理；
- 错误信息收集并提示，自定义 callback 处理；
- 加入 loadProgressBar 请求显示进度样式；
- get,post,put,\_delete 请求的封装；
- 取消重复请求：

## Install

```bash
npm install --save axios-extensions-server
```

## Usage

```bash

可在文件中引入
import axiosExtensionsServer from 'axios-extensions-server';

let http = axiosExtensionsServer.create({
    loadProgressBar: false,
    headers: {},
    createOptions: {},
    errCallback(err){
        console.log(err.status)
        console.log(err.msg)
    }
})
http.get(...)
或者
Vue.prototype.$http = axiosExtensionsServer.create({
    loadProgressBar: false,
    headers: {},
    createOptions: {},
    errCallback(msg){
        console.log(err.status)
        console.log(err.msg)
    }
});

this.$http.get(...)

```

### 参数相关

| 参数名          | 类型    | 默认值 | 解释                                                  | 是否必传 | 备注 |
| --------------- | ------- | ------ | ----------------------------------------------------- | -------- | ---- |
| loadProgressBar | Boolean | false  | 参考 https://www.npmjs.com/package/axios-progress-bar | 否       |      |
| headers         | Object  | {}     | 需要的头信息，例如：Authorization                     | 否       |      |
| createOptions   | Object  | {}     | 创建 axios 实例时所需设置                             | 否       |      |
| errCallback     | Object  | {}     | 发生错误时的回调，返回值是一个对象                    | 否       |      |

### 封装的方法

```
axios.get(url,[params, config])
axios.post(url[,data[, config]])
axios.put(url[,data[, config]])
axios._delete(url[,data, config])

注：delete方法封装成为_delete
```
