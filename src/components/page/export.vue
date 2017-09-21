<template>
	<div class="export-board">
		<div class="board-intro">
			<h1 class="ml-20">数据导出</h1>
			<p>说明：本模块具有数据查询与导出功能，根据不用的条件，能筛选出你想要的数据</p>
		</div>
		<div class="chose-line mt-20 ml-20">
			<div class="chose-item inline-block ml-20">
				编号：<input type="text" v-model="selectNum" @change ="selectChange">
			</div>
			<div class="chose-item inline-block ml-20">
				负责人：<input type="text" v-model="selectPerson" @change ="selectChange">
			</div>
			<div class="chose-item inline-block ml-20">
				名称：
				<v-selection :selections="name" class="inline-block" @on-change="selectChange('name',$event)"></v-selection>
			</div>
			<div class="chose-item inline-block ml-20">
				状态：
				<v-selection :selections="state" class="inline-block" @on-change="selectChange('state',$event)"></v-selection>
			</div>
			<div class="button inline-block ml-20" @click="export2Excel">导出表格</div>
		</div> 
		<div class="table-list">
			<table>
				<tr>
					<th v-for="head in tableHeads">{{head.label}}</th>
				</tr>
				<tr v-for="item in showData" class="showDetails">
				
					<td v-for="head in tableHeads">
						<router-link :to="{name:'change',params:{searchNum:item.num}}">
							<span>{{item[head.key]}}</span>
						</router-link>
					</td>
				
					
				</tr>
			</table>
			<!-- <my-page :total="2000" @pagechange="pagechange"></my-page> -->
		</div>
	</div>
</template>
<script>
import vSelection from '../base/selection'
export default{
	name:"export",
	components:{
		vSelection
	},
	created(){
		// Vue开始生成时，可以在这里进行网络请求
		this.showData = this.dataSource;
	},
	data(){
		return{
			selectName:"全部",
			selectState:"全部",
			selectPerson:"",
			selectNum:"",
			showData:[],
			state:[
			{
				label:"全部",
				value:0
			},
			{
				label:"在用",
				value:1
			},
			{
				label:"遗弃",
				value:2
			}],
			name:[
			{
				label:"全部",
				value:0
			},
			{
				label:"电脑",
				value:1
			},
			{
				label:"空调",
				value:2
			},
			{
				label:"交换机",
				value:3
			}],
			//表头
			tableHeads:[
			{
				label:'资产编号',
				key:'num'
			},
			{
				label:'名称',
				key:'name'
			},
			{
				label:'品牌',
				key:'brand'
			},
			{
				label:'型号',
				key:'typeNum'
			},
			// {
			// 	label:'规格',
			// 	key:''
			// },
			// {
			// 	label:'出厂编号',
			// 	key:''
			// },
			// {
			// 	label:'行政部门',
			// 	key:''
			// },
			// {
			// 	label:'序列号',
			// 	key:''
			// },
			{
				label:'资产原值',
				key:'price'
			},
			{
				label:'日期',
				key:'date'
			},
			{
				label:'负责人',
				key:'person'
			},
			{
				label:'当前中心',
				key:'nowCenter'
			},
			{
				label:'使用部门',
				key:'department'
			},
			{
				label:'存放地点',
				key:'place'
			},
			// {
			// 	label:'生产厂家',
			// 	key:''
			// },
			// {
			// 	label:'国产/进口',
			// 	key:''
			// },
			// {
			// 	label:'附属设备或配置',
			// 	key:''
			// },
			{
				label:'状态',
				key:'state'
			},
			// {
			// 	label:'备注',
			// 	key:'',
			// }
			],

			// 数据源
			dataSource:[
			{
				num:'1013',
				name:'电脑',
				brand:'联想',
				typeNum:'tc-ewk23',
				price:'2000',
				date:'2010-07-01',
				person:'王春明',
				nowCenter:'xxx',
				department:'研发中心',
				place:'LT2F',
				state:'在用'
			},
			
			{
				num:'1015',
				name:'交换机',
				brand:'联想',
				typeNum:'tc-ewk23',
				price:'2000',
				date:'2010-07-01',
				person:'王春梅',
				nowCenter:'xxx',
				department:'研发中心',
				place:'LT2F',
				state:'遗弃'
			},
			{
				num:'1014',
				name:'电脑',
				brand:'联想',
				typeNum:'tc-ewk23',
				price:'2000',
				date:'2010-07-01',
				person:'于其亮',
				nowCenter:'xxx',
				department:'研发中心',
				place:'LT2F',
				state:'在用'
			},
			{
				num:'1016',
				name:'交换机',
				brand:'联想',
				typeNum:'tc-ewk23',
				price:'2000',
				date:'2010-07-01',
				person:'王春梅',
				nowCenter:'xxx',
				department:'研发中心',
				place:'LT2F',
				state:'在用'
			}
			],

		}
	},
	computed:{
		showdata(){

		}
	},
	methods:{
		// 分类选择
		selectChange(attr,val){

			var that = this;
			if (attr == "name") {
				this.selectName = val.label;
			}
			else if(attr == "state"){
				this.selectState = val.label
			}

			
			var temp = this.dataSource;
			// 筛选编号
			if (this.selectNum != "") {
				// statement
				this.showData = temp.filter(function(element) {
					
					return (element.num == that.selectNum);
				})
				
				temp = this.showData
			}else{
				this.showData = temp;
			}
			// 筛选名字
			if (this.selectPerson != "") {
				// statement
				this.showData = temp.filter(function(element) {
					
					return (element.person == that.selectPerson);
				})
				
				temp = this.showData
			}else{
				this.showData = temp;
			}
			// 筛选设备名称
			if (this.selectName != "全部") {
				this.showData = temp.filter(function(element) {
					
					return (element.name == that.selectName);
				})
				
				temp = this.showData
			}else {
				this.showData = temp;
			}

			// 筛选状态
			if (this.selectState!= "全部") {
				console.log('sss')
				this.showData = temp.filter(function(element) {
					return (element.state == that.selectState);
				})
				temp = this.showData
			}else {
				this.showData = temp
			}			
		
		},
		
		// 显示详细信息，跳转到修改界面
		// showDetailsMessage(){
		// 	console.log('要跳转了')
		// },

		// 导出表格的两个方法
		export2Excel() { 
　　　　　　require.ensure([], () => { 
　　　　　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel'); 
　　　　　　　　const tHeader = ['资产编号', '名称', '品牌','型号','资产原值','日期','负责人','当前中心','使用部门','存放地点','状态']; 
　　　　　　　　const filterVal = ['num','name','brand','typeNum','price','date','person','nowCenter','department','place','state']; 
　　　　　　　　const list = this.showData; 
　　　　　　　　const data = this.formatJson(filterVal, list); 
　　　　　　　　export_json_to_excel(tHeader, data, '列表excel'); 
　　　　　　}) 
　　　　}, 
　　　　formatJson(filterVal, jsonData) { 
　　　　　　return jsonData.map(v => filterVal.map(j => v[j])) 
　　　　}


	}

}
</script>

<style scoped>

.inline-block{
	display: inline-block;
}

.button{
	width: 80px;
	text-align: center;
	height: 25px;
	line-height: 25px;
	border:1px solid #4fc08d;
  	background: #4fc08d;
  	color: #fff;
  	cursor: pointer;
  	border-radius: 5px;
}

.table-list {
  /* margin-top: 20px; */
  width: 900px;
  margin: 20px auto;
}

.table-list table {
  width: 100%;
  background: #fff;
}

.table-list td,
.table-list th {
  border: 1px solid #e3e3e3;
  text-align: center;
  width: 100px
}

.table-list th
{
	 padding: 10px 0;
}

.table-list th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  /* cursor: pointer; */
}

.showDetails:hover{
	background-color: #f0f0f0;
	cursor: pointer;
}

.showDetails span{
	display: inline-block;
	height: 35px;
	line-height: 35px;
	width: 79px
}

</style>