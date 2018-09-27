<template>
	<div class="export-board" v-loading="loading" element-loading-text="loading">
		<div class="board-intro" >
			<h1 class="ml-20">数据导出</h1>
			<p>说明：根据条件，筛选数据,并能下载相应的excel文件</p>
		</div>
		<div class="chose-line mt-20 ml-20">
			<div class="chose-item inline-block ml-20">
				编号：<input type="text" v-model="selectNum" @change ="selectChange">
			</div>
			<div class="chose-item inline-block ml-20">
				负责人：<input type="text" v-model="selectPerson" @change ="selectChange">
			</div>
			<!-- <div class="chose-item inline-block ml-20">
				名称：
				<v-selection :selections="name" class="inline-block" @on-change="selectChange('name',$event)"></v-selection>
			</div> -->
			<div class="chose-item inline-block ml-20">
				状态：
				<v-selection :selections="state" class="inline-block" @on-change="selectChange('state',$event)"></v-selection>
			</div>
			<div class="button inline-block ml-20" @click="export2Excel">导出表格</div>
		</div> 
		<div class="table-list" v-if="showData.length>0">
			<table>
				<tr>
					<th v-for="head in tableHeads">{{head.label}}</th>
				</tr>
				<tr v-for="item in showTableData" class="showDetails">
				
					<td v-for="head in tableHeads">
						<!-- <router-link :to="{name:'change',params:{searchNum:item.num}}"> -->
							<span>{{item[head.key]}}</span>
						<!-- </router-link> -->
					</td>
				
					
				</tr>
			</table>
			<!-- <my-page :total="2000" @pagechange="pagechange" class="page"></my-page> -->
			<my-page :total="showData.length" @pagechange="pagechange" class="page" v-if="showData.length>10"></my-page>
		</div>

<!-- 		<div class="page">
			<my-page :total="showData.length" @pagechange="pagechange" class="page"></my-page>
		</div> -->
	</div>
</template>
<script>
import vSelection from '../base/selection'
import myPage from '../base/pageComponent'
export default{
	name:"export",
	components:{
		vSelection,
		myPage
	},
	created(){
		// Vue开始生成时，可以在这里进行网络请求
		// this.showData = this.dataSource;

	},
	data(){
		return{
			// selectName:"全部",
			selectState:"全部",
			selectPerson:"",
			selectNum:"",
			showData:[],//显示在excel的数据
			showTableData:[],
			loading:false,//是否
			state:[
			{
				label:"全部",
				value:0
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
				key:'AssetNo'
			},
			{
				label:'名称',
				key:'AssetName'
			},
			{
				label:'品牌',
				key:'AssetBrand'
			},
			// {
			// 	label:'型号',
			// 	key:'AssetType'
			// },
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
				key:'PurchasePrice'
			},
			{
				label:'日期',
				key:'PurchaseTime'
			},
			{
				label:'负责人',
				key:'KeeperName'
			},
			{
				label:'当前中心',
				key:'KeeperPartLever1'
			},
			{
				label:'使用部门',
				key:'KeeperPartLever2'
			},
			{
				label:'存放地点',
				key:'Place'
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
				key:'Status'
			},
			// {
			// 	label:'备注',
			// 	key:'',
			// }
			],

			// 数据源
			dataSource:[],

		}
	},
	mounted(){
		this.getAllStatus()
		// this.getAllInfo()
	},


	

	methods:{
		// 获取状态
		getAllStatus(){

			var params = {
				itemsName:'Status',
				evalue:this.encrypt()
			}

			this.$axios.post('https://www.trjiot.cn/weixin.asmx/GetItemsNameList',this.qs.stringify(params))
			.then((res)=>{
				var result = res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, "")
				var jsonResult = JSON.parse(result)

				if (jsonResult.state=='成功') {
					// statement
					var status = jsonResult.Status
					for (var i = 0; i < status.length; i++) {
						var temp = {
							label:status[i],
							value:i+1
						}

						this.state.push(temp);

					}

					this.getAllInfo()

				}
			})
			.catch((res)=>{

			})

		},


		// 获取所有
		getAllInfo(){
			this.loading = true
			var params = {
				AssetNo:"ALL",
				evalue:this.encrypt()
			}
			this.$axios.post('https://www.trjiot.cn/weixin.asmx/GetAssetInfo',this.qs.stringify(params))
			.then((res)=>{
				this.loading = false
				console.log(res.data)
				var resultString = res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, "").replace(/[ ]/g, "")
				if (resultString.indexOf("失败") != 0){
					// statement
					var result = resultString.split("|")

			
					for (var i = 0; i < result.length; i++) {
						var aPiece = result[i].split(",")
						// 将数据封装成对象
						var resObject = {
							AssetNo:aPiece[0],

							AssetName:aPiece[1],

							AssetBrand:aPiece[2],

							AssetType:aPiece[3],

							AssetSize:aPiece[4],

							FactoryNo:aPiece[5],

							ManagementNo:aPiece[6],

							AssetOrdor:aPiece[7],

							PurchasePrice:aPiece[8],

							PurchaseTime:aPiece[9],

							KeeperName:aPiece[10],

							KeeperPartLever1:aPiece[11],

							KeeperPartLever2:aPiece[12],

							Place:aPiece[13],

							FactoryName:aPiece[14],

							TradeType:aPiece[15],

							Accessory:aPiece[16],

							Status:aPiece[17],

							remarks:aPiece[18],
						}
						this.dataSource.push(resObject)
						this.showData = this.dataSource
						
						if (this.dataSource.length<10) {
							this.showTableData = this.dataSource
						}else{
							this.showTableData = this.dataSource.slice(0,10)
						}
						
					}

				}
				
			})

	},

		// 分类选择
		selectChange(attr,index){

			var that = this;

			if (attr == "name") {
				this.selectName = this.name[index].label;
			}
			else if(attr == "state"){
				this.selectState = this.state[index].label
			}

			
			var temp = this.dataSource;
			// 筛选编号
			if (this.selectNum != "") {
				// statement
				this.showData = temp.filter(function(element) {
					
					return (element.AssetNo == that.selectNum);
				})
				
				temp = this.showData
			}else{
				this.showData = temp;
			}
			// 筛选负责人
			if (this.selectPerson != "") {
				// statement
				this.showData = temp.filter(function(element) {
					
					return (element.KeeperName == that.selectPerson);
				})
				
				temp = this.showData
			}else{
				this.showData = temp;
			}
			// 筛选设备名称
			// if (this.selectName != "全部") {
			// 	this.showData = temp.filter(function(element) {
					
			// 		return (element.AssetName == that.selectName);
			// 	})
				
			// 	temp = this.showData
			// }else {
			// 	this.showData = temp;
			// }

			// 筛选状态
			if (this.selectState!= "全部") {
				this.showData = temp.filter(function(element) {
					return (element.Status == that.selectState);
				})
				temp = this.showData
			}else {
				this.showData = temp
			}

			if (this.showData.length<10) {
				this.showTableData = this.showData
			}else{
				this.showTableData = this.showData.slice(0,10)
			}
			console.log(this.showTableData)

		
		},
		
		// 改变页面的时候
		pagechange(currentPage){
			console.log(currentPage)
			var startIndex = (currentPage - 1) * 10
			this.showTableData = this.showData.slice(startIndex, startIndex+10)
			// this.showTableData.splice(0, this.showTableData.length)
			// for (var i = 0; i < 10; i++) {
			// 	this.showTableData.push(this.showData[startIndex+i])
			// }
		},


		// 显示详细信息，跳转到修改界面
		// showDetailsMessage(){
		// 	console.log('要跳转了')
		// },

		// 导出表格的两个方法
		export2Excel() { 
　　　　　　require.ensure([], () => { 
　　　　　　　　const { export_json_to_excel } = require('../../vendor/Export2Excel'); 
　　　　　　　　const tHeader = ['资产编号', '设备名称', '品牌','型号','规格','出厂编号','行政部门编号','序列号','资产原值','日期','当前负责人','当前中心','使用部门','存放地点','生产厂家','国产/进口','附属设备或配置','状态','备注']; 
　　　　　　　　const filterVal = ['AssetNo','AssetName','AssetBrand','AssetType','AssetSize','FactoryNo','ManagementNo','AssetOrdor','PurchasePrice','PurchaseTime','KeeperName','KeeperPartLever1','KeeperPartLever2','Place','FactoryName','TradeType','Accessory','Status','remarks']; 
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
.export-board{
	/* position: relative; */
}

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
/* 样式一 */
.table-list {

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

  vertical-align: middle;
}

.table-list th
{
	 padding: 10px 0;
}

.table-list th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
}


/* 样式2 */
/* .table-list {

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
  padding: 10px 0;
  width: 100px;
  vertical-align: middle;
}

.table-list th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
} */



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

/* .page{
	position: absolute;
	width: 1000px;
	bottom: 10px;

} */

</style>