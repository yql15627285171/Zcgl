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
// import axios from 'axios'

Vue.config.productionTip = false
// Vue.use(axios)
Vue.use(VueRouter)
let router = new VueRouter({
	// mode:'history',
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
	}]
})


/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
