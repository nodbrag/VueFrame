import axios  from 'axios' //ajax异步请求插件
import NProgress from 'nprogress' // 进度条插件
import 'nprogress/nprogress.css'// 进度条插件样式
//基地址
let base = 'http://localhost:50025';  //接口代理地址参见：config/index.js中的proxyTable配置

NProgress.configure({ showSpinner: false })// NProgress Configuration

let msg = '服务器忙，请稍后再试';
//设置超时时间
axios.defaults.timeout = 10000;
//跨域请求，允许保存cookie
axios.defaults.withCredentials = true;

//HTTPrequest请求拦截
axios.interceptors.request.use(config => {
   //进度条开始
   NProgress.start();

   //if (store.getters.token)
   //{
   	  config.headers['Authorization'] ='Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJodHRwOi8vc2NoZW1hcy54bWxzb2FwLm9yZy93cy8yMDA1LzA1L2lkZW50aXR5L2NsYWltcy9uYW1lIjoiYWRtaW4xIiwiZXhwIjoxNTU2NzkzOTM4LCJpc3MiOiJodHRwOi8vbG9jYWxob3N0OjUwMDI1IiwiYXVkIjoiaHR0cDovL2xvY2FsaG9zdDo1MDAzIn0.zDCq39_cN37L2kNXtSEkfrGj1jcaFKPcl_uohO0jBoY' ;// 让每个请求携带Authorization
    //}
  return config
}, error => {
  console.log('err' + error)// for debug
  return Promise.reject(error)
});
//HTTPresponse拦截
axios.interceptors.response.use(data => {
  NProgress.done();
  return data
}, error => {
  NProgress.done();
  return Promise.reject(error);
});

export const POST = (url, params) => {
  return axios.post(`${base}${url}`, params).then(res => res.data)
};

export const GET = (url, params) => {

  return axios.get(`${base}${url}`, {params: params}).then(res => res.data)
};

export const PUT = (url, params) => {
  return axios.put(`${base}${url}`, params).then(res => res.data)
};

export const DELETE = (url, params) => {
  return axios.delete(`${base}${url}`, {params: params}).then(res => res.data)
};

export const PATCH = (url, params) => {
  return axios.patch(`${base}${url}`, params).then(res => res.data)
};

