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
			<!-- <a :href="codeUrl" target="_blank" class="btn" download="w3logo">下载</a> -->

		</div>
		<div class="codeArea" v-if="codeUrl.length>0">
			<img :src="codeUrl" alt="">
		</div>
	</div>
</template>
<script>
export default{
	name:"dCode",
	data(){
		return{
			propertyNum:"",
			// downloadNum:"",
			codeUrl:''
		}
	},
	methods:{
		searchProperty(){
			if (/^[0-9]*$/g.test(this.propertyNum) && this.propertyNum.trim().length>0) {
				// 网络请求图片
				var params = {
					CodeNo:this.propertyNum.trim(),
					evalue:this.encrypt()
				}
				
				this.$axios.post('https://www.stsidea.com/weixin.asmx/SaveQRCodeImage',this.qs.stringify(params))
				.then((res)=>{
					console.log(res)
					var resunltArr =res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "").split("：")
					// console.log(resunltArr)
					this.codeUrl = "https://www.stsidea.com" + resunltArr[1]
					console.log(this.codeUrl)
				})
				.catch((error)=>{

				})
				// this.$axios.post('https://www.stsidea.com/weixin.asmx/SaveQRCodeImage', {CodeNo: this.propertyNum})
				// .then((res)=>{
				// 	console.log(res)
				// })
				// .catch((error)=>{

				// })

			} 
			
		},
		downloadCode(){
				// window.open(this.codeUrl)
				this.$axios({
					methods:'POST',
					url:this.codeUrl,
					
				})
			
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
	width: 500px;
	height: 250px;
	/* background: orange; */
	margin: 50px 0 0 100px;
}

.codeArea img{
	width: 100%;
	height: 100%;
	border: none;
}
</style>