<template>
	<div class="opreation-board">
		<div class="board-intro">
			<h1 class="ml-20">数据导入</h1>
			<p>说明：导入信息的时候选择单个导入或者批量导入其中之一即可</p>
		</div>
		<!-- 批量导入文件区 -->
		<div class="operation-board-file">
			<h3 class="ml-20">批量导入</h3>
			<div class="ml-20">说明：未开放</div>
			<div class="mt-20 ml-20">
			<input type="file" accept="application/vnd.ms-excel" class="chosenFile" @change="changeFile($event)" disabled>
			<button type="button" @click="upladfile" class="ml-20 btn">确定上传</button>
			<button type="button" @click="downloadTemplate" class="ml-20 btn">下载Excel模板</button>
			<!-- <a href="https://www.trjiot.cn/Images/0200230.jpg" download="template">下载模板</a> -->
			</div>
		</div>
		<div class="space mt-20 mb-20"></div>

		<!-- 单个导入表单区 -->
		<div class="operation-board-form" v-loading="loading" element-loading-text="loading">
			<h3 class="ml-20">单个导入</h3>
			<div class="ml-20">说明：导入新设备信息时,资产编号不能为空</div>
			<div class="operation-simple-in mt-20 mb-20">
				<template v-for="(item,index) in equipmentInfo">
					<div class="operation-board-line" v-if="!item.showPic">
						<div class="operationbpard-line-left" >
							{{item.name}}
						</div>
						
						<input v-if='item.input' v-model='item.value'></input>
						<!-- <v-choosen v-if='item.choosen' :choosens='item.info' :defaultChosenindex='[-1]' @on-change="selectChange(item.name,$event)" >
						</v-choosen> -->
						<el-select v-model="item.value" clearable placeholder="请选择" v-if='item.choosen' size='small'>
						    <el-option
						      v-for="items in item.info"
						      :label='items'
						      :key="items"
						      :value="items">
						    </el-option>
						</el-select>

						<my-datepicker v-if="item.choseDate" class='choseDate' @on-change="selectChange(item.name,$event)"></my-datepicker>
					
						<!-- 上传图片 -->
						<input type="file" v-if="item.picture" class="no-border" accept="image/*" @change="changeImage($event)" id="devImage">
						<!-- <button v-if="item.last" class="sureBtn">确定上传</button> -->
					</div>
					<div v-else-if="showuploadImage" id="imgArea" >
						<img :src="imgSrc" alt="logo" onerror="()=>{console.log('图片不存在')}">
					</div>
				</template>
			</div>
			<div class="button" @click='singleUpload'>立即上传</div>
			
		</div>

		

	</div>
</template>
<script>
// import VChoosen from '../base/choosen'

import myDatepicker from '../base/datePicker'

// import Axios from 'axios'
export default{
	name:'import',
	components:{
		// VChoosen,
		// VInput,
		myDatepicker
	},
	data(){
		return{
			
			loading:false,
			// 预览上传图片是否显示
			showuploadImage:false,
			// 预览图片路径
			imgSrc:"",
			// 选择的图片
			choseImage:null,
			excellFile:null,
			// filePath:'',
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
					value:'',
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
					choosen:true,
					info:['国产','进口']
					// info:[
					// {
					// 	label:'国产',
					// 	value:'国产'
					// },
					// {
					// 	label:'进口',
					// 	value:'进口'
					// },
					// ]
				},
				{
					name:'状态：',
					value:'',
					choosen:true,
					info:['废弃','在用','在用无折旧','在用有折旧','在用外借']
					// info:[
					// {
					// 	label:'废弃',
					// 	value:'废弃'
					// },
					// {
					// 	label:'在用',
					// 	value:'在用'
					// },
					// {
					// 	label:'在用无折旧',
					// 	value:'在用无折旧'
					// },
					// {
					// 	label:'在用有折旧',
					// 	value:'在用有折旧'
					// },
					// {
					// 	label:'在用外借',
					// 	value:'在用外借'
					// }
					// ]
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
				{
					showPic:true,
					value:''
				}
				],




  // for Vue 2.0


		}
	},
	methods:{
		// 上传文件
		upladfile(){
			
			// var file = new FormData();
			// file.append('file',this.excellFile)
			// this.$axios.post('https://www.trjiot.cn/Excel/'+this.excellFile.name)
			// .then(function(res){
			//   console.log(res.data);
			// })
			// .catch(function(err){
			//   console.log(err);
			// })	
			
		},
		// 下载excel模板
		downloadTemplate(){

			window.open("https://www.trjiot.cn/ExcelTemplet/Templet.xls") 
		},

		changeFile(event){
			this.excellFile = event.target.files[0]

			console.log(this.excellFile)
		},

		// 上传照片
		singleUploadImage(){
			// 清空图片信息
			document.getElementById("devImage").value = ''
			this.showuploadImage = false
			this.imgSrc = ''

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
				this.resetAll()
			})
			.catch((res)=>{
				this.loading = false
				this.requestFail('网络故障')
			})

		},

		// 单个上传
		singleUpload(){
			// 开始转圈
			if (/^[0-9]*$/g.test(this.equipmentInfo[0].value) && this.equipmentInfo[0].value.length>0){
				this.loading = true
				var temp = new Array()
				for (var i = 0; i < this.equipmentInfo.length - 1; i++) {
					temp.push(this.equipmentInfo[i].value)
				}	
				// 去掉图片的值
				temp.splice(18, 1);
				// 16与15互换位置
				var tempchange = temp[16];
				temp[16] = temp[15];
				temp[15] = tempchange
				var param = temp.join(",")
				 //进行网络请求
				 var params = {
				 	infoValue:param,
				 	evalue:this.encrypt()
				 }

				 console.log(params)

				 this.$axios.post('https://www.trjiot.cn/weixin.asmx/SaveSingleAssetInfo',this.qs.stringify(params))
				 .then((res)=>{

				 	var result = res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "").split("：")
				 	console.log(result)
				 	if (result[0] == '成功') {
				 		if (this.showuploadImage) {
				 			this.singleUploadImage()
				 		}else {
				 			this.loading = false
				 			this.requestSuccess('上传成功')
				 			this.resetAll()
				 		}
				 		
				 	}else if(result[0] == '失败'){
				 		this.loading = false
				 		this.requestFail('该设备编号可能已经存在')
				 	}
				 }) 
				 .catch((res)=>{
				 	this.loading = false
				 	this.requestFail('网络故障')
				 })

			}else{
				this.requestWarning('资产编号有误')
			}

			

		},

		// 选择改变
		selectChange(attr,val){
			// 17
			if (attr == '状态：') {
				// 状态
				this.equipmentInfo[17].value = this.equipmentInfo[17].info[val]
			}else if(attr == '国产/进口：'){
				// 国产/进口
				this.equipmentInfo[16].value = this.equipmentInfo[16].info[val]
			}else{
				// 时间
				this.equipmentInfo[9].value = val
				
			}


		},
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
 		   		// $("#imgArea").innerHTML = '插入图片'
 		   		that.imgSrc = e.target.result;
 		   }
			
		},

		// 上传完之后清空表格
		resetAll(){
			for (var i = 0; i < this.equipmentInfo.length; i++) {
				this.equipmentInfo[i].value = ''
			}
			this.showuploadImage = false
			this.imgSrc = ''

		}



	}
}
</script>

<style scoped>
/* h2{
	margin:0.75em  20px;
	font-size: 2.0em;
	font-weight: bold; 

} */


.space{
  background: #f7fcff;
  height: 20px;
}

.chosenFile{
	/* border: 1px solid #ccc; */
	width: 180px;
	margin-left: 60px;
}
.choseDate{
	display: inline-block;
}

.btn{
	border:1px solid #4fc08d;
	background: #4fc08d;
	color: #fff;
}


.operation-simple-in{
	display: flex;
	align-items: center;
	flex-wrap: wrap;
	/* margin-bottom: 40px; */

}

.operation-board-line{
	width: 400px;
	margin: 10px 0;
}

.operation-board-line input{
	font-size: 14px;
 	border: 1px solid #ccc;
 	width: 200px
}

.operationbpard-line-left{
	display: inline-block;
	width: 160px;
	text-align: right;


}

span{
	color: red;
	margin-left: 10px;
}

/* .sureBtn{
	padding: 5px 10px 5px 10px;
	border: 1px solid #e3e3e3;
	background-color: #4fc08d;
	cursor: pointer;
	
	font-size: 13px;
	text-align: center;
	border-radius: 5px;
} */

.operation-board-line .no-border{
	border: none;
	font-size: 13px;
}

#imgArea{
	margin-left: 100px;
}

#imgArea img{ 
	width: 200px;
	height: 200px;
}

.button{
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

</style>