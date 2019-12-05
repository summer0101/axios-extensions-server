import axiosExtensionsServer from "../../packages/axios"

let http = axiosExtensionsServer.create({
    loadProgressBar: false,
    headers: {},
    createOptions: {},
    errCallback(err){
        console.log(err.status)
        console.log(err.msg)
    }
})
let api = {
    getInfo(){
       return http.get("https://github.com/summer0101/axios-extensions-server")
    }

};

export default api;
