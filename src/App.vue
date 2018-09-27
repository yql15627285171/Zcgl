<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <img src="./assets/trj.png" class="logoImg">
        <div class="logoText"><span>深圳航天泰瑞捷资产管理系统</span></div>
        <div class="header-nav">
          <ul>
            <li @click="showOutModel">{{userName}}</li>
            <li v-if='userName.length > 0'>|</li>
            <li @click="showLoginModel">退出登录</li>
          </ul>
        </div>
      </div>
    </div>
    <div class="content container">
      <div class="content-left">
      <img :src="operationIcon">
        <ul>
          <router-link v-for="item in operation" :to="{ path: item.path }" tag="li" active-class="active">
            {{ item.name }}
          </router-link>
        </ul>
      </div>
      <div class="content-right">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </div>
    </div>
    <div class="footer">
      
      <span>CopyRight © 2017 深圳市航天泰瑞捷电子有限公司 版权所有</span>
      <a href="http://www.miitbeian.gov.cn/">|粤ICP备17141636号-1</a>
      <a href="http://www.miitbeian.gov.cn/" >
        <img src="./assets/ba.png" class="gongan"></a>
     
      
        
  
    </div>
    <!-- 弹框 -->
    <!-- 登录 -->
    <v-dialog :isShow="showLogDialog"  @on-close="closeDialog">
      <!-- <log-form></log-form> -->
      <div style="text-align:center">
        <img :src="loginCode" alt="" style="width:150px;height:150px">
      </div>
      
    </v-dialog>
   
  </div>
</template>

<script>
// import Hello from './components/Hello'
import vDialog from './components/base/dialog'
import logForm from './components/base/logForm'
export default {

  name: 'app',
  components:{
    vDialog,
    logForm
  },
  data(){
    return{
      userName:'',
      showLogDialog:false,
      showOutDialog:false,
      showAboutDialog:false,
      loginCode:'',
      guid:'',//二维码标记
      timer:null,
      operation:[
      {
        name:"数据导入",
        active:false,
        // imageUrl:'./assets/import.png'
        path:'/import'
      },
      {
        name:"数据导出",
        active:false,
        // imageUrl:'./assets/export.png'
        path:'/export'
      },
      {
        name:"数据修改",
        active:false,
        // imageUrl:'./assets/change.png'
        path:"/change"
      },
      {
        name:"数据确认",
        active:false,
        // imageUrl:'./assets/sure.png'
        path:'/sure',
      },
      {
        name:"资产标签",
        active:false,
        path:"/dCode"
      },
      {
        name:'盘点任务',
        active:false,
        path:'/start'
      }],
      iconMap:{
        '/import':require('./assets/import.png'),
        '/change':require('./assets/change.png'),
        '/export':require('./assets/export.png'),
        '/sure':require('./assets/sure.png'),
        '/dCode':require('./assets/dCode.png'),
        '/start':require('./assets/start.png')
      }
    }
  },
  computed:{
    operationIcon(){
      return this.iconMap[this.$route.path] 

    }
  },
  mounted(){
    console.log('登录')
    this.loginCode = ''
    var date = new Date()
    var time = date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString()

    var userInfo = this.fetch();
    if ( time == userInfo.time ) {
      console.log(userInfo)
      this.userName = userInfo.name
    }else {
      this.showLoginModel()
      console.log('显示二维码')
    }

  },
  methods:{
  
    showLoginModel(){
      // 清除localStorage
      this.remove()
    
      this.showLogDialog=true

      var params = {evalue:this.encrypt()}
      this.$axios.post('https://www.trjiot.cn/weixin.asmx/GetQRCodeImageForLoad',this.qs.stringify(params))
      .then((res)=>{
        var result = res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "").split("：")
        this.loginCode = 'https://www.trjiot.cn'+result[1]
        
        // 获取guid
        var picName = result[1].split("/")[2]
        this.guid = picName.split(".")[0]
        console.log(this.guid)
        this.listenHeart()
        // this.timer = setInterval(handler: any, timeout?: long, arguments...: any)
      })


    },

    // 监听心跳
    listenHeart:function(){
      console.log('监听心跳')
      var params = {
        guid:this.guid,
        evalue:this.encrypt()
      }

      this.$axios.post('https://www.trjiot.cn/weixin.asmx/QueryQRCodeScanResult',this.qs.stringify(params))
      .then((res)=>{
        var result =res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "").split("：", )
        console.log(result)
        if (result[0]== '失败') {
          this.timer =   setTimeout(()=>{this.listenHeart()}, 1000)
          // this.listenHeart()
        }else  {
          var name = result[1].split(",")[1]
          // 存储在浏览器中
          var date = new Date()
          var store = {
            time:date.getFullYear().toString() + date.getMonth().toString() + date.getDate().toString(),
            name:name
          }
          this.save(store)


          this.userName = name
          clearTimeout(this.timer)
          this.showLogDialog=false
          // 重新登录就要重新刷新
          // window.reload()
          // this.$router.replace('/import')
        }
       
      })
    },

    showOutModel(){
      this.showOutDialog=true
    },
    showAboutModel(){
      this.requestSuccess('导入成功')
    },
    closeDialog(){
      // this.showLogDialog=false;
      this.showOutDialog=false
      this.showAboutDialog=false
    }
  }

  
}
</script>

<style>
/* http://meyerweb.com/eric/tools/css/reset/ 
   v2.0 | 20110126
   License: none (public domain)
*/

html, body, div, span, applet, object, iframe, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}
a {
  color: inherit;
  text-decoration: none;
}
body {
  background: #f0f2f5;
  font-family: "Helvetica Neue",Helvetica,Arial,"Hiragino Sans GB","Hiragino Sans GB W3","Microsoft YaHei UI","Microsoft YaHei","WenQuanYi Micro Hei",sans-serif;
  font-size: 14px;
  color: #444;
}

.header{
  background: #363636;
  color: #b2b2b2;
  height: 90px;
  line-height: 90px;
  width: 100%;
}

.container {
  width: 1200px;
  margin: 0 auto;
  overflow: hidden
}

.footer {
  /*text-align: center;*/
  height: 80px;
  width: 100%;
  /*line-height: 80px;*/
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.gongan{
  height: 20px;
  display: block;
}

.logoImg{
  float: left;
  margin-top: 10px;
  width: 60px;
}

.logoText{
  float: left;
  margin-left: 20px;
  font-size: 20px;
}

.header-nav{
  float: right;
}

.header-nav li{
  display: inline-block;
  margin: 0 4px;
  cursor: pointer;
}

.content{
  margin-top: 20px;
}

.content-left{
  float: left;
  width: 200px;
  text-align: center;
  background-color: #fff;
}
.content-left ul{
  margin: 20px 0;
}

.content-left li{
  text-align: left;
  padding:10px 15px;
  font-size: 14px;
  cursor: pointer;
}

.content-left img{
  margin-top: 20px;
  width: 100px;
  height: 100px;
}

.content-right {
  float: left;
  width: 980px;
  min-height: 700px;
  margin-left: 20px;
  background-color: #fff;
  position: relative;
}

.active{
  background: #4fc08d;
  color: #fff;
}

.content-left li:hover {
  background: #ccc;
}

/* 全局控制 */
.board-intro p {
  background: #f7fcff;
  padding: 10px 20px;
  color: #999;
  line-height: 1.8;
}

.ml-20{
  margin-left: 20px;
}

.mt-20{
  margin-top: 20px;
}

.mb-20{
  margin-bottom: 20px;
}


</style>
