<template>
	<div class="change-board" v-loading="loading" element-loading-text="loading">
		<div class="board-intro">
			<h1 class="ml-20">数据修改</h1>
			<p>说明：根据资产编号进行搜索,查询修改设备信息</p>
		</div>
		<div class="search-line">
			资产编号：<input v-model.lazy="propertyNum" @keyup.enter="searchProperty(propertyNum)">
			<button type="button" class="btn ml-20" @click="searchProperty(propertyNum)">搜索</button>
		</div>

		<div class="change-info" v-show="isSearched" >
			<template v-for="(item,index) in equipmentInfo" >
				<div class="operation-board-line" v-if="!item.last" >
					<div class="operationbpard-line-left">
						{{item.name}}
					</div>
					<input v-if='item.input' :disabled="item.disabled" v-model="item.value"></input>
					<!-- <v-choosen v-if='item.choosen' :choosens='item.info' :defaultChosenindex='item.defaultIndex' @on-change='valueChange(item.name,$event)'>
					</v-choosen> -->
					<el-select v-model="item.value" placeholder="请选择" v-if='item.choosen' size='small'>
					    <el-option
					      v-for="items in item.info"
					      :label='items'
					      :key="items"
					      :value="items">
					    </el-option>
					</el-select>

					
					<my-datepicker :date.sync="choseDate" :option="option" :limit="limit" v-if="item.choseDate" class='choseDate'></my-datepicker>
					<input type="file" v-if="item.picture" class="no-border" accept="image/*" @change="changeImage($event)" id="devImage">
					<!-- <button v-if="item.last" class="sureBtn">确定修改</button> -->
				</div>
				<div v-else id="imgArea">
					<img :src="imgSrc">
				</div>
			</template>	
				
		</div>
		<div class="sureBtn"  v-show="isSearched" @click='sureChange'>确定修改</div>	
	</div>
</template>
<script>

import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'
export default{
	name:'change',
	components:{
		myDatepicker
	},
	data(){
		return{
			// imageValue:'',
			loading:false,
			propertyNum:'',
			isSearched:false,
			imgSrc:'',
			equipmentInfo:[
				{
					name:'资产编号：',
					value:'',
					input:true,
					disabled:true
				},
				{
					name:'设备名称：',
					input:true,
					value:''
				},
				{
					name:'品牌：',
					input:true,
					value:''
				},
				{
					name:'型号：',
					input:true,
					value:''
				},
				{
					name:'规格：',
					input:true,
					value:''
				},
				{
					name:'出厂编号：',
					input:true,
					value:''
				},
				{
					name:'行政编号：',
					input:true,
					value:''
				},
				{
					name:'序列号：',
					input:true,
					value:''
				},
				{
					name:'资产原值：',
					input:true,
					value:''
				},
				{
					name:'购置日期：',
					choseDate:true,
					value:'2017.1.01',
				},
				{
					name:'当前负责人：',
					input:true,
					value:''

				},
				{
					name:'当前中心：',
					input:true,
					value:''
				},
				{
					name:'使用部门：',
					input:true,
					value:''
				},

				{
					name:'存档地点：',
					value:'',
					choosen:true,
					info:['ATB1F1','ATB1F2','ATB1F3','ATB1F4','ATB1F5','ATB2F1','ATB2F2','ATB2F3','ATB2F4','ATB2F5','LTB1F1','LTB1F2','LTB1F3','LTB1F4','LTB1F5','LTB1F6','FYB1F1','FYB1F2','FYB1F3','FYB1F4','FYB1F5','FYB2F1','FYB2F2','FYB2F3','FYB2F4','FYB2F5','FYB3F1','FYB3F2','FYB3F3','FYB3F4','FYB3F5']
				},
				
				{
					name:'生产厂家：',
					input:true,
					value:''
				},
				{
					name:'附加设备或配置：',
					input:true,
					value:''
				},
				{
					name:'国产/进口：',
					value:'',
					// defaultIndex:[-1],
					choosen:true,
					info:['国产','进口']
				},
				{
					name:'状态：',
					value:'',
					// defaultIndex:[-1],
					choosen:true,
					info:['废弃','在用','在用无折旧','在用有折旧','在用外借']
				},
				{
					name:"选取图片：",
					picture:true,
					value:''
				},
				{
					name:'备注：',
					input:true,
					value:''
				},
				// {
				// 	showPic:true,
				// 	value:''
				// }
				{
					last:true,
					value:''
				}
				],

				// datePicker数据
				choseDate:{
		        time:''
		      },
		      option: {
		        type: 'day',
		        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
		        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
		        format: 'YYYY-MM-DD',
		        placeholder: '请选择日期',
		        inputStyle: {
		          'display': 'inline-block',
		          'font-size': '14px',
		          'border': '1px solid #ccc',
		          'color': '#5F5F5F',
		          width: '200px'
		        },
		        color: {
		          header: '#ccc',
		          headerText: '#f00'
		        },
		        buttons: {
		          ok: '确定',
		          cancel: '取消'
		        },
		        overlayOpacity: 0.5, // 0.5 as default
		        dismissible: true // as true as default
		      },

		      limit: [{
		        type: 'weekday',
		        available: [0,1, 2, 3, 4, 5,6]
		      }]
	
		}
	},
	// 观察选择时间的改变
	computed:{
		time:function(){
			return this.choseDate.time

		}
	},
	watch:{
		time:function(newValue){
			
			this.equipmentInfo[9].value = newValue
		}
	},

	methods:{
		// 搜索资产编号
		searchProperty(num){
			document.getElementById("devImage").value = ''
			this.imgSrc = ''
			// 将
			var evalue = this.encrypt()
			var params = {
				assetNo:num,
				evalue:evalue
			}
			if (/^[0-9]*$/g.test(num) && num.length>0) {
				// 网路请求
				this.loading= true
				this.$axios.post('https://www.trjiot.cn/weixin.asmx/GetAssetInfo',this.qs.stringify(params))
				.then((res)=>{
				this.loading = false
				 var result = res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, "")
				 console.log(result)
				 if (result != "") {
				 	// statement
				 	this.isSearched=true;
				 	var resultArr = result.split(",")
				 	console.log(resultArr)
				 	// console.log(resultArr)
				 	// 先循环1
				 	for (var i = 0; i < resultArr.length - 1; i++) {
				 		this.equipmentInfo[i].value = resultArr[i]
				 	}

				 	this.equipmentInfo[19].value = resultArr[18]
				 	// 把错乱位置数据换一下
				 	var temp = this.equipmentInfo[16].value
				 	this.equipmentInfo[16].value = this.equipmentInfo[15].value
				 	this.equipmentInfo[15].value = temp
				 }
				
			
				this.choseDate.time = this.equipmentInfo[9].value

				// 显示图片
				var imgPath = 'https://www.trjiot.cn/Images/'+this.equipmentInfo[0].value+'.jpg'
				this.imgSrc = imgPath
				
				
				

				})

			}else{
				this.requestWarning('搜索的编号有误')
			}
			
		},
		// 选取图片
		changeImage(event){
			var that = this
			this.showuploadImage=true
			if(typeof FileReader === 'undefined'){
	        	// $("#imgArea").innerHTML = "抱歉，你的浏览器不支持预览";
	       		 event.target.setAttribute('disabled','disabled');
	       		 return;
 		   }

 		   var reader = new FileReader()

 		   reader.readAsDataURL(event.target.files[0])
 		   this.choseImage = event.target.files[0]
 		   reader.onload=function(e){
 		   		// base64数据
 		   		that.imgSrc = e.target.result;
 		   }
		},

		// 确认修改
		sureChange(){
			// 同时上传照片跟设备信息
			this.uploadDevInfo();
			// this.loading = true
			// this.$axios.all([this.uploadDevInfo(),this.uploadImage()])
			//   .then(this.$axios.spread((acct,perms)=>{
			//     //当这两个请求都完成的时候会触发这个函数，两个参数分别代表返回的结果
			//     this.loading = false
			//     console.log('同时请求完毕')
			//     console.log(acct)
			//     console.log(perms)
			//   }))
		},



		// 上传信息
		uploadDevInfo(){
			var AssetNo = this.equipmentInfo[0].value
			var items = 'AssetName='+this.equipmentInfo[1].value + ',' +
						'AssetBrand='+this.equipmentInfo[2].value + ',' +
						'AssetType='+this.equipmentInfo[3].value + ',' +
						'AssetSize='+this.equipmentInfo[4].value + ',' +
						'FactoryNo='+this.equipmentInfo[5].value + ',' +
						'ManagementNo='+this.equipmentInfo[6].value + ',' +
						'AssetOrdor='+this.equipmentInfo[7].value + ',' +
						'PurchasePrice='+this.equipmentInfo[8].value + ',' +
						'PurchaseTime='+this.equipmentInfo[9].value + ',' +
						'KeeperName='+this.equipmentInfo[10].value + ',' +
						'KeeperPartLever1='+this.equipmentInfo[11].value + ',' +
						'KeeperPartLever2='+this.equipmentInfo[12].value + ',' +
						'Place='+this.equipmentInfo[13].value + ',' +
						'FactoryName='+this.equipmentInfo[14].value + ',' +
						'Accessory='+this.equipmentInfo[15].value + ',' +
						'TradeType='+this.equipmentInfo[16].value + ',' +
						'Status='+this.equipmentInfo[17].value + ',' +
						'remarks='+this.equipmentInfo[19].value 
						

 			var param = {
 				assetNo:AssetNo,
 				items:items,
 				evalue:this.encrypt()
 			}
 
 			this.loading = true


 			// return this.$axios.post('https://www.trjiot.cn/weixin.asmx/UpdateAssetInfoByAdmin',this.qs.stringify(param))

			this.$axios.post('https://www.trjiot.cn/weixin.asmx/UpdateAssetInfoByAdmin',this.qs.stringify(param))
			.then((res)=>{
				// this.loading = false
				var result =  res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "")
				if (result == '成功') {
					console.log(document.getElementById("devImage").value)
					if (document.getElementById("devImage").value == '') {
						this.loading = false
						this.requestSuccess('数据上传成功')
					}else {
						this.uploadImage();
					}
					
					// statement
				}else {
					this.loading = false
					this.requestFail('数据上传失败')
				}


			})
			.catch((res)=>{
				this.loading = false
				this.requestFail('网络故障')
			})
		},

		// 上传修改照片
		uploadImage(){
			var param = new FormData()
			// console.log(this.choseImage)
			param.append('name',this.equipmentInfo[0].value)	
			param.append('evalue',this.encrypt())
			param.append('file',this.choseImage,this.choseImage.name)
			
			
			// console.log(param.get('file'))
			let config = {
            headers:{'Content-Type':'multipart/form-data'}
          	}

			this.$axios.post('https://www.trjiot.cn/weixin.asmx/SaveImageForHtml',param,config)
			.then((res)=>{
				this.loading = false
				var result =  res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "")
				if (result == '成功') {
					this.requestSuccess('上传成功')
					// this.uploadImage();
					// statement
				}else {
					
					this.requestWarning('上传数据成功,但是上传图片失败')
				}
			})
			.catch((res)=>{
				this.loading = false
				this.requestFail('网络故障')
			})

			// return this.$axios.post('https://www.trjiot.cn/weixin.asmx/SaveImageForHtml',param,config)
		}

	}
	

}
</script>

<style scoped>
.search-line{
	display: flex;
	align-items: center;
	margin:20px 100px 0 100px;
}

.btn{
	border: none;
	background-color: #4fc08d;
	height: 25px;
	line-height: 20px;
	width: 60px
}	

.search-line input{
	width: 200px;
	height: 20px;
	outline: none;

}

.change-info{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	margin: 60px 20px 20px 20px;

}
.change-info input{
	font-size: 14px;
 	border: 1px solid #ccc;
 	width: 200px
}

.change-info>div:first-child input{
	color: #999;
}

.operation-board-line{
	width: 400px;
	margin: 10px 0;
}

.operationbpard-line-left{
	display: inline-block;
	width: 160px;
	text-align: right;
}

.choseDate{
	display: inline-block;
}

#imgArea{
	margin-left: 100px;
}

#imgArea img{ 
	width: 200px;
	height: 200px;
}

.sureBtn{
	/* padding: 5px 10px 5px 10px;
	border: 1px solid #e3e3e3;
	background-color: #4fc08d;
	cursor: pointer;
	
	font-size: 13px;
	text-align: center;
	border-radius: 5px; */
	width: 80px;
	text-align: center;
	height: 36px;
	line-height: 36px;
	border:1px solid #4fc08d;
  	background: #4fc08d;
  	color: #fff;
  	margin: 0px 0 20px 150px;
  	cursor: pointer;
  	border-radius: 5px;
}

.operation-board-line .no-border{
	border: none;
	font-size: 13px;
}

	
</style>