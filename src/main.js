// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import VueRouter from "vue-router"
import exportPage from "./components/page/export"
import importPage from "./components/page/import"
import surePage from "./components/page/sure"
import changePage from "./components/page/change"
import dCode from "./components/page/dCode"
import startPage from './components/page/start'
import axios from 'axios'
import qs from 'qs'
import Model from './Model/model'
import Encrypt from './AES/myAES'
import 'element-ui/lib/theme-default/index.css'
import { Notification,Loading,Select,Option} from 'element-ui';


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Encrypt)
Vue.use(Model)

Vue.prototype.$axios = axios;
Vue.prototype.qs = qs


// element-ui配置
Vue.prototype.$notify = Notification
Vue.use(Loading.directive)
Vue.prototype.$loading = Loading.service
Vue.use(Select)
Vue.use(Option)


let router = new VueRouter({
	mode:'history',
	routes:[
	{
		path:'/',
		redirect:"/import"
	},
	{
		path:"/import",
		component:importPage
	},
	{
		path:"/export",
		component:exportPage
	},
	{
		path:"/change",
		name:'change',
		component:changePage
	},
	{
		path:"/sure",
		component:surePage
	},
	{
		path:'/dCode',
		component:dCode
	},
	{
		path:'/start',
		component:startPage
	}]
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
