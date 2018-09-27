<template>
	<div class="codeBoard" v-loading="loading" element-loading-text="loading">
		<div class="board-intro">
			<h1 class="ml-20">资产标签</h1>
			<p>说明：右键点击二维码可以选择另存为下载 </p>
		</div>
		<div class="search-line">
			资产编号：<input v-model="propertyNum" @keyup.enter="searchProperty">
			<div type="button" class="btn ml-20" @click="searchProperty">搜索</div>
			<!-- <div type="button" class="btn ml-20" @click="downloadCode">下载</div> -->

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
			loading:false,
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
				this.loading = true
				this.$axios.post('https://www.trjiot.cn/weixin.asmx/SaveQRCodeImage',this.qs.stringify(params))
				.then((res)=>{
					this.loading = false
					
					var resunltArr =res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "").split("：")
					console.log(resunltArr)
					if (resunltArr[0] == '成功') {
						this.codeUrl = "https://www.trjiot.cn" + resunltArr[1]
					}else{
						this.requestWarning('搜索失败')
					}
					
					
				})
				.catch((error)=>{
					this.loading = false
					this.requestWarning('搜索失败')
				})
				// this.$axios.post('https://www.trjiot.cn/weixin.asmx/SaveQRCodeImage', {CodeNo: this.propertyNum})
				// .then((res)=>{
				// 	console.log(res)
				// })
				// .catch((error)=>{

				// })

			} else{
				this.requestWarning('资产编号有误')
			}
			
	},

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