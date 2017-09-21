<template>
	<div class="sure-board">
		<div class="board-intro">
			<h1 class="ml-20">数据确认</h1>
			<p>说明：处理数据操作时,必须注意选择的时间，只有正确的时间段才能显示正确的数据</p>
		</div>
		<div class="selection-line">
			<div class="date-type inline-block mt-20 ">
				数据类型：
				<my-selection :selections='selectionType' class="inline-block"></my-selection>
			
			</div>
			<div class="start-time inline-block ">
				开始日期：
				<my-datepicker class="inline-block"></my-datepicker>
			</div>
			<div class="end-time inline-block ">
				截止日期：<my-datepicker class="inline-block"></my-datepicker>
			</div>
	<!-- 	<div class="search-word inline-block ml-20">
			关键词：
		</div> -->
		</div>
		<div class="table-list">
			<table>
				<tr>
					<th v-for="head in tableHeads">{{head.label}}</th>
				</tr>
				<tr v-for="item in unchangeedData">
					<td v-for="head in tableHeads">
					<span v-if="!item[head.last]">
					{{item[head.key]}}</span>
					<button class="pass" v-if="head.last"  @click="passCheck">通过审核</button>
					<button class="cancel" v-if="head.last" @click="cancelCheck">取消审核</button>
					</td>
				</tr>
			</table>
			<my-page :total="2000" @pagechange="pagechange"></my-page>
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
			selectionType:[
			{
				label:'变动数据',
				value:0
			},
			{
				label:'不变数据',
				value:1
			},
			{
				label:'异常数据',
				value:2
			}],
			//表头
			tableHeads:[
			{
				label:'资产编号',
				key:'num'
			},
			{
				label:'存放地点',
				key:'place'
			},
			{
				label:'存放状态',
				key:'state'
			},
			{
				label:'负责人',
				key:'person'
			},
			{
				label:'操作',
				key:'operation',
				last:true
			}],
			// 不变数据
			unchangeedData:[
			{
				num:'0100230',
				place:'LT3F',
				state:'在用',
				person:'YYY',

			},
			{
				num:'0100240',
				place:'LT2F',
				state:'在用',
				person:'AAA'
			},
			{
				num:'0100250',
				place:'LT1F',
				state:'在用',
				person:'BBB'
			},
			{
				num:'0100230',
				place:'LT3F',
				state:'在用',
				person:'YYY',

			},
			{
				num:'0100240',
				place:'LT2F',
				state:'在用',
				person:'AAA'
			},
			{
				num:'0100250',
				place:'LT1F',
				state:'在用',
				person:'BBB'
			},
			{
				num:'0100230',
				place:'LT3F',
				state:'在用',
				person:'YYY',

			},
			{
				num:'0100240',
				place:'LT2F',
				state:'在用',
				person:'AAA'
			},
			{
				num:'0100250',
				place:'LT1F',
				state:'在用',
				person:'BBB'
			},
			{
				num:'0100250',
				place:'LT1F',
				state:'在用',
				person:'BBB'
			}],

			// 变动数据
			changedData:[
			{
				num:'0200230',
				place:'LT3F',
				state:'在用',
				person:'CCC'
			},
			{
				num:'0300230',
				place:'LT3F',
				state:'在用',
				person:'DDD'
			},
			{
				num:'0400230',
				place:'LT3F',
				state:'在用',
				person:'EEE'
			}]
		}
	},
	methods:{
		// 返回当前页码
		pagechange(currentPage){
			console.log(currentPage);
		},
		// 通过审核
		passCheck(){
			console.log('通过审核')
		},
		// 取消审核
		cancelCheck(){
			console.log('取消审核')

		}
	}
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
  width: 100px
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