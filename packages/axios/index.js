import axios from "axios"
import { loadProgressBar } from "axios-progress-bar"

class HttpByAxios {
  constructor() {}
  create(opt) {
    let _this = this
    var defauts = {
      loadProgressBar: false,
      headers: {},
      createOptions: {}
    }
    this.options = Object.assign(defauts, opt)
    // 请求列表
    const requestList = []
    // 取消列表
    const CancelToken = axios.CancelToken
    let sources = {}
    let axiosInstance = axios.create(_this.options.createOptions)
    if (this.options.loadProgressBar) {
      loadProgressBar({}, axiosInstance)
    }
    //http request 拦截器
    axiosInstance.interceptors.request.use(
      config => {
        const request = JSON.stringify(config.url) + JSON.stringify(config.data)
        config.cancelToken = new CancelToken(cancel => {
          sources[request] = cancel
        })
        //判断请求是否已存在请求列表，避免重复请求，将当前请求添加进请求列表数组；
        if (requestList.includes(request)) {
          sources[request]("取消重复请求")
        } else {
          requestList.push(request)
        }
        for (let i in this.options.headers) {
          config.headers[i] = this.options.headers[i]
        }
        return config
      },
      error => {
        return Promise.reject(err)
      }
    )
    //响应拦截器即异常处理
    axiosInstance.interceptors.response.use(
      response => {
        // 将当前请求中请求列表中删除
        const request =
          JSON.stringify(response.config.url) +
          JSON.stringify(response.config.data)
        requestList.splice(
          requestList.findIndex(item => item === request),
          1
        )
        const res = response.data // 响应成功后已经获取 res.data
        return Promise.resolve(res)
      },
      err => {
        let errMsg = {
          status: "",
          msg: ""
        }
        if (err && err.response) {
          errMsg.status = err.response.status
          switch (err.response.status) {
            case 400:
              errMsg.msg = "错误请求"
              break
            case 401:
              errMsg.msg = "未授权，请重新登录"
              break
            case 403:
              errMsg.msg = "拒绝访问"
              break
            case 404:
              errMsg.msg = "请求错误,未找到该资源"
              break
            case 405:
              errMsg.msg = "请求方法未允许"
              break
            case 408:
              errMsg.msg = "请求超时"
              break
            case 500:
              errMsg.msg = "服务器端出错"
              break
            case 501:
              errMsg.msg = "网络未实现"
              break
            case 502:
              errMsg.msg = "网络错误"
              break
            case 503:
              errMsg.msg = "服务不可用"
              break
            case 504:
              errMsg.msg = "网络超时"
              break
            case 505:
              errMsg.msg = "http版本不支持该请求"
              break
            default:
              errMsg.msg = `连接错误${err.response.status}`
          }
        } else {
          if (err.message) {
            errMsg.msg = err.message
          } else {
            errMsg.msg = "连接到服务器失败"
          }
        }
        _this.options.errCallback && _this.options.errCallback(errMsg)
        return Promise.resolve(err.response)
      }
    )
    let get = (url, params, config) =>
      axiosInstance.get(url, { params }, config)
    let post = (url, data, config) => axiosInstance.post(url, data, config)
    let _delete = (url, data, config) =>
      axiosInstance.delete(url, { data }, config)
    let put = (url, data, config) => axiosInstance.put(url, data, config)
    return { axiosInstance, get, post, _delete, put }
  }
}

const httpByAxios = new HttpByAxios()

export default httpByAxios
