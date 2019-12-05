import Vue from "vue"
import App from "./App.vue"
import router from "./router"

import axiosExtensionsServer from "../packages/axios"

Vue.prototype.$http = axiosExtensionsServer.create({
  loadProgressBar: true,
  headers: {},
  createOptions: {},
  errCallback(msg) {
    console.log(msg)
  }
})

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount("#app")
