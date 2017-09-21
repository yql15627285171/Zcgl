<template>
	<div class="codeBoard">
		<div class="board-intro">
			<h1 class="ml-20">资产标签</h1>
			<p>说明：可以在此模块导出二维码</p>
		</div>
		<div class="search-line">
			资产编号：<input v-model="propertyNum" @keyup.enter="searchProperty">
			<div type="button" class="btn ml-20" @click="searchProperty">搜索</div>
			<div type="button" class="btn ml-20" @click="downloadCode">下载</div>
		</div>
		<div class="codeArea">
			<img src="https://www.stsidea.com/Images/0200230.jpg" alt="">
		</div>
	</div>
</template>
<script>
export default{
	name:"dCode",
	data(){
		return{
			propertyNum:"",
			downloadNum:""
		}
	},
	methods:{
		searchProperty(){
			if (/^[0-9]*$/g.test(this.propertyNum) && this.propertyNum.length>0) {
				this.downloadNum == this.downloadNum
				// 网络请求图片
			} 
			
		},
		downloadCode(){
			if(this.downloadNum.length>0){
				
			}
		}
	}
}
</script>

<style scoped>
.search-line{
	margin:30px 0 30px 100px; 
}


.btn{
	width: 80px;
	text-align: center;
	height: 20px;
	line-height: 20px;
	border:1px solid #4fc08d;
  	background: #4fc08d;
  	color: #fff;
  	cursor: pointer;
  	border-radius: 5px;
  	display: inline-block;
}

.codeArea{
	width: 285px;
	height: 200px;
	background: orange;
	margin: 50px 0 0 150px;
}

.codeArea img{
	width: 100%;
	height: 100%
}
</style>