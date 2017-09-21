<template>
	<div class="change-board">
		<div class="board-intro">
			<h1 class="ml-20">数据修改</h1>
			<p>说明：可以根据资产编号进行搜索，对资产进行资料修改，只要修改负责人，该负责人对应部门的相关资料会自动修改</p>
		</div>
		<div class="search-line">
			资产编号：<input v-model.lazy="propertyNum" @keyup.enter="searchProperty(propertyNum)">
			<button type="button" class="btn ml-20" @click="searchProperty(propertyNum)">搜索</button>
		</div>

		<div class="change-info" v-show="isSearched">
			<template v-for="(item,index) in equipmentInfo">
				<div class="operation-board-line" v-if="!item.last">
					<div class="operationbpard-line-left">
						{{item.name}}
					</div>
					<input v-if='item.input' :disabled="item.disabled" v-model="item.value"></input>
					<v-choosen v-if='item.choosen' :choosens='item.info'>
					</v-choosen>
					<my-datepicker v-if="item.choseDate" class='choseDate'></my-datepicker>
					<input type="file" v-if="item.picture" class="no-border" accept="image/*" @change="changeImage($event)">
					<!-- <button v-if="item.last" class="sureBtn">确定修改</button> -->
				</div>
				<div v-else id="imgArea">
					<img src="" alt="" >
				</div>
			</template>	
				
		</div>
		<div class="sureBtn"  v-show="isSearched">确定修改</div>	
	</div>
</template>
<script>
import VChoosen from '../base/choosen'
// import VInput from '../base/input'
import myDatepicker from '../base/datePicker'
export default{
	name:'change',
	components:{
		VChoosen,
		myDatepicker
	},
	data(){
		return{
			propertyNum:'',
			// isSearched:false,
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
					name:'存档地点：',
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
					name:'状态：',
					value:'',
					choosen:true,
					info:['在用','维修','遗弃']
				},
				{
					name:'国产/进口：',
					value:'',
					choosen:true,
					info:['国产','进口']
				},
				{
					name:'修改图片：',
					picture:true
				},
				{
					name:'备注：',
					input:true,
					value:''
				},
				{
					last:true
				}
				],
		}
	},
	computed:{
		isSearched(){
			if ( this.propertyNum && this.propertyNum.length>0) {
				return true;
			}
			return false;
		}
	},

	// 界面每次出现都会执行
	activated:function(){
		this.propertyNum = this.$route.params.searchNum
		this.equipmentInfo[0].value=this.propertyNum;
	},

	methods:{
		// 搜索资产编号
		searchProperty(num){
			console.log(this.searchNum)

			if (/^[0-9]*$/g.test(num) && num.length>0) {
				this.isSearched=true;
				this.equipmentInfo[0].value=num;
			} else {}
			
		},
		// 选取图片
		changeImage(event){
			
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