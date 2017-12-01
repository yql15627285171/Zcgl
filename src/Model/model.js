const STORAGE_KEY = 'auto-login-key'//定义常量保存键值
export default{
  install(Vue,options){
     Vue.prototype.requestSuccess =  function(message) {
   
   			   this.$notify({
		          title: '成功',
		          message: message,
		          type: 'success',
		          duration:2000
		        });	
		},


	Vue.prototype.requestFail =  function(message) {
     
        this.$notify.error({
          title: '错误',
          message: message,
          duration:2000
        });
	},

	Vue.prototype.requestWarning =  function(message) {
     
       this.$notify({
          title: '警告',
          message:message,
          type: 'warning',
          duration:2000

        });
	},
// 把变量存储在浏览器变量中

	Vue.prototype.fetch = function(){
       return JSON.parse(window.localStorage.getItem(STORAGE_KEY)|| '[]');
   },

 	Vue.prototype.save = function(items){
      window.localStorage.setItem(STORAGE_KEY,JSON.stringify(items))
  },

  Vue.prototype.remove = function(){
      window.localStorage.removeItem(STORAGE_KEY)
  }

	

	}
}