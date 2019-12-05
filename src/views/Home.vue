<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/logo.png" />
    <HelloWorld msg="Welcome to Your Vue.js App" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue"
import api from "./_api"
export default {
  name: "home",
  components: {
    HelloWorld
  },
  created: async function() {
    this.$http
      .get("https://github.com/summer0101/axios-extensions-server")
      .then(res => {
        console.log(res)
        if (res.status == 200) {
          this.userInfo = res.result
        }
      })
      .catch(function(error) {
        console.log(error, 1)
      })
    let res = await api.getInfo()
    console.log(111, res)
  }
}
</script>
