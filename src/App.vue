<template>
  <div id="app">
    <div class="header">
      <div class="container">
        <img src="./assets/trj.png" class="logoImg">
        <div class="logoText"><span>深圳航天泰瑞捷资产管理系统</span></div>
        <div class="header-nav">
          <ul>
            <li @click="showOutModel">退出</li>
            <li @click="showLoginModel">登录</li>
            <li >|</li>
            <li @click="showAboutModel">关于</li>
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
      <p>CopyRight © 2017 深圳市航天泰瑞捷电子有限公司 版权所有</p>
    </div>
    <!-- 弹框 -->
    <!-- 登录 -->
    <v-dialog :isShow="showLogDialog"  @on-close="closeDialog">
      <log-form></log-form>
    </v-dialog>
    <!-- 退出 -->
    <v-dialog :isShow="showOutDialog"  @on-close="closeDialog">
      是够要确定退出
    </v-dialog>
    <!-- 关于 -->
    <v-dialog :isShow="showAboutDialog" @on-close="closeDialog">
      这是资产管理系统
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
      showLogDialog:false,
      showOutDialog:false,
      showAboutDialog:false,
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
      }],
      iconMap:{
        '/import':require('./assets/import.png'),
        '/change':require('./assets/change.png'),
        '/export':require('./assets/export.png'),
        '/sure':require('./assets/sure.png'),
        '/dCode':require('./assets/dCode.png'),
      }
    }
  },
  computed:{
    operationIcon(){
      return this.iconMap[this.$route.path] 

    }
  },
  methods:{
    showLoginModel(){
      this.showLogDialog=true
    },
    showOutModel(){
      this.showOutDialog=true
    },
    showAboutModel(){
      this.showAboutDialog=true
    },
    closeDialog(){
      this.showLogDialog=false;
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
  text-align: center;
  height: 80px;
  width: 100%;
  line-height: 80px;
  background: #e3e4e8;
  clear: both;
  margin-top: 30px;
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
}

.active,
.content-left li:hover {
  background: #4fc08d;
  color: #fff;
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
