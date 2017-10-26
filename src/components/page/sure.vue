<template>
	<div class="sure-board">
		<div class="board-intro">
			<h1 class="ml-20">数据确认</h1>
			<p>说明：处理数据操作时,必须注意选择的时间，只有正确的时间段才能显示正确的数据</p>
		</div>
		<div class="selection-line">
			<div class="date-type inline-block mt-20 ">
				数据类型：
				<my-selection :selections='selectionType' class="inline-block" @on-change="valueChange('type',$event)"></my-selection>
			
			</div>
			<div class="start-time inline-block ">
				盘点年份：
				<!-- <my-datepicker class="inline-block"></my-datepicker> -->
				<my-selection :selections='selectionYears' class="inline-block" @on-change="valueChange('year',$event)"></my-selection>
			</div>
			<div class="end-time inline-block ">
				盘点次数：
				<my-selection :selections='selectionTimes' class="inline-block" @on-change="valueChange('times',$event)"></my-selection>
			</div>
			<div class="button inline-block ml-20" @click="checkData(true)">查询</div>
			<div class="button inline-block ml-20" @click="allPassCheck()">一键审核</div>
	<!-- 	<div class="search-word inline-block ml-20">
			关键词：
		</div> -->
		</div>
		<div class="table-list" v-if='dataSource.length> 0 '>
			<table>
				<tr>
					<th v-for="head in tableHeads">{{head.label}}</th>
				</tr>
				<tr v-for="(item,index) in showData">
					<td v-for="head in tableHeads">
						<span v-if="!item[head.last]">{{item[head.key]}}</span>
						<button class="pass" v-if="head.last"  @click="passCheck(index)">通过审核</button>
						<button class="cancel" v-if="head.last" @click="cancelCheck(index)">取消审核</button>
					</td>
				</tr>
			</table>
			<my-page :total="dataSource.length" @pagechange="pagechange" v-if="dataSource.length>10"></my-page>
		</div>
	</div>
</template>
<script>
import mySelection from '../base/selection'
import myDatepicker from '../base/datePicker'
import myPage from '../base/pageComponent'
export default{
	name:'sure',
	components:{
		mySelection,
		myDatepicker,
		myPage
	},
	data(){

		return{
			sign:11,
			yearsAndTimes:[],//请求回来的年份和时间的数据源
			times:'',
			selectionTimes:[],
			year:'',
			selectionYears:[],
			type:'变动数据',
			dataSource:[],//网络请求回来的数据源
			showData:[],//
			canAllPass:false,
			selectionType:[
			{
				label:'变动数据',
				value:11
			},
			{
				label:'不变数据',
				value:10
			},
			{
				label:'未盘数据',
				value:0
			}],
			//表头
			tableHeads:[
			{
				label:'资产编号',
				key:'AssetNo'
			},
			{
				label:'存放地点',
				key:'Place'
			},
			{
				label:'存放状态',
				key:'Status'
			},
			{
				label:'负责人',
				key:'KeeperName'
			},
			{
				label:'操作',
				key:'operation',
				last:true
			}],

		}
	},
	methods:{
		// 返回当前页码
		pagechange(currentPage){
			var startIndex = (currentPage - 1) * 10
			var endIndex = start + 10
			this.showData = this.dataSource.slice(startIndex, endIndex)
		},
		// 选项的改变
		valueChange(attr,index){

			if (attr == 'type') {
				// this.type = this.selectionType[index].label
				this.sign = this.selectionType[index].value
				// console.log(this.type)
			}else if(attr == 'year'){
				this.year = this.selectionYears[index].label

				// 选择对应年份的次数

				// 清除记录
				this.selectionTimes.splice(0, this.selectionTimes.length)
				var aData = this.yearsAndTimes.filter((element)=>{
					return element.years == this.year
				});

				var time = aData[0].times
				console.log(aData)	
				console.log(time)
				for (var i = 0; i < time.length; i++) {
					this.selectionTimes.push({
						label:time[i],
						value:i
					})
				}
			}else{
				this.times = this.selectionTimes[index].label
			}
		},
		// 查询
		checkData(){
			// 清空数据
			this.dataSource.splice(0, this.dataSource.length)
			this.showData.splice(0, this.showData.length)

		
			// 重组tableHead数据
			if (this.sign == 0) {
				this.tableHeads=[
				{
					label:'资产编号',
					key:'AssetNo'
				},
				{
					label:'存放地点',
					key:'Place'
				},
				{
					label:'存放状态',
					key:'Status'
				},
				{
					label:'负责人',
					key:'KeeperName'
				}]
			}else{
				this.tableHeads=[
				{
					label:'资产编号',
					key:'AssetNo'
				},
				{
					label:'存放地点',
					key:'Place'
				},
				{
					label:'存放状态',
					key:'Status'
				},
				{
					label:'负责人',
					key:'KeeperName'
				},
				{
					label:'操作',
					key:'operation',
					last:true
				}]
			}
			
			var	params = {
					sign:this.sign.toString(),
					year:this.year,
					times:this.times,
					evalue:this.encrypt()
				}
			
			if (this.sign == 10) {
				// statement
				this.canAllPass = true
			}else {
				this.canAllPass = false
			}

				this.$axios.post('https://www.stsidea.com/weixin.asmx/GetAssetCheckInfoByStatus',this.qs.stringify(params))
				.then((res)=>{
					var result = res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "").split("：")
					if (result[0] == '成功') {
						// statement
						this.dataSource.splice(0, this.dataSource.length)
						this.showData.splice(0, this.showData.length)
						
						var resArr = result[1].split("|")

						console.log(resArr)
						if (resArr[0] == "") {
							return
						}
						for (var i = 0; i < resArr.length; i++) {
							var aPieceArr = resArr[i].split(",")
							var apiece = {
								AssetNo:aPieceArr[0],
								Place:aPieceArr[1],
								Status:aPieceArr[2],
								KeeperName:aPieceArr[3]
							}

							this.dataSource.push(apiece)

						}

						console.log(this.dataSource)

						// 显示数据
						if (this.dataSource.length <=10) {
							// statement
							this.showData = this.dataSource
						}else {
							this.showData = this.dataSource.slice(0,10)
						}
						
					}
					
				})
			
		},


		// 一键审核
		allPassCheck(){
			if (this.canAllPass) {
				// statement
				var params = {
					assetNo:'all',
					year:this.year,
					times:this.times,
					sign:'0',
					evalue:this.encrypt()
				}
				// console.log(param)
				this.$axios.post('https://www.stsidea.com/weixin.asmx/ExamineResult',this.qs.stringify(params))
				.then((res)=>{

					console.log(res)
				})
			}else {
				// 提示用户不能一键审核
			}
			
		},
		// 通过审核
		passCheck(index){

			var params = {
				assetNo:this.showData[index].AssetNo,
				year:this.year,
				times:this.times,
				sign:'0',
				evalue:this.encrypt()
			}
			// console.log(param)
			this.$axios.post('https://www.stsidea.com/weixin.asmx/ExamineResult',this.qs.stringify(params))
			.then((res)=>{
				console.log(res)
				// 改变显示
			})
		},
		// 取消审核
		cancelCheck(index){
			var params = {
				assetNo:this.showData[index].AssetNo,
				year:this.year,
				times:this.times,
				sign:'1',
				evalue:this.encrypt()
			}
			// console.log(param)
			this.$axios.post('https://www.stsidea.com/weixin.asmx/ExamineResult',this.qs.stringify(params))
			.then((res)=>{
				console.log(res)
			})
		},

		// 获取数据库中的年份和对应的次数
		getYearsAndTimes(){
			var params = {
				evalue:this.encrypt()
			}
			this.$axios.post('https://www.stsidea.com/weixin.asmx/GetYearsAndTimesList',this.qs.stringify(params))
			.then((res)=>{
				var result = JSON.parse(res.data.replace(/<[^>]+>/g, "").replace(/[' '\r\n]/g, ""))
				console.log(result)
				this.yearsAndTimes = result.data

				var data = result.data

				// 年份
				this.selectionYears.splice(0, this.selectionYears.length)
				for (var i = 0; i < data.length; i++) {
					var aYear = {
						label:data[i].years,
						value:i
					}
					this.selectionYears.push(aYear)
				}
				this.year = this.selectionYears[0].label

				// 对应的次数
				this.selectionTimes.splice(0, this.selectionTimes.length)
				var nowTimes = data[0].times
				for (var i = 0; i < nowTimes.length; i++) {
					this.selectionTimes.push({
						label:nowTimes[i],
						value:i
					})
				}
				this.times = this.selectionTimes[0].label
				this.checkData()
			})
		}
	},
	created(){
		// var myDate = new Date()
		// var fullYear = myDate.getFullYear()
		// this.year = fullYear.toString()
		// var lastYear = {
		// 	label:(fullYear - 1).toString(),
		// 	value:0
		// }
		// var thisYear = {
		// 	label:fullYear.toString(),
		// 	value:1
		// }
		// var nextYear = {
		// 	label:(fullYear + 1).toString(),
		// 	value:2
		// }
		// this.selectionYears.push(lastYear)
		// this.selectionYears.push(thisYear)
		// this.selectionYears.push(nextYear)


		// this.checkData(true)

		// 为了防止报错给一个渲染的数据，此数据没有任何意义
		this.selectionYears=[{
			lable:'0',
			value:'0'
		}]
		this.selectionTimes=[{
			lable:'0',
			value:'0'
		}]

		this.getYearsAndTimes()
	},
}
</script>

<style scoped>
.inline-block{
	display: inline-block
}	
.date-type{
	margin-left: 40px;
}

.start-time{
	margin-left: 40px;
}
.end-time{
	margin-left: 50px;
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
  padding: 10px 0;
  width: 100px;
  vertical-align: middle;
}

.table-list th {
  background: #4fc08d;
  color: #fff;
  border: 1px solid #4fc08d;
  /* cursor: pointer; */
}

/* .table-list th.active {
  background: #35495e;
}
 */

.times{
	width: 100px;
	outline: none;

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
  	margin-left: 20px;
}
.pass,.cancel{
	border: none;
	line-height: 20px;
	color: #222;
}

.pass{
	background-color: #4fc08d;
}

.cancel{
	background-color: #c36;
}







</style>