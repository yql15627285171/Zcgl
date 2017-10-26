<template>
	<div class="start-board">
		<div class="board-intro">
			<h1 class="ml-20">盘点启动</h1>
			<p>说明：根据提示启动盘点，当新一次盘点启动也是上一次盘点的截止时间</p>
		</div>
		<div class="start-operation">
			<div class="startYear">
				<span>启动年份：</span>
				<my-selection :selections='selectionYears' class="inline-block" @on-change="valueChange"></my-selection>
			</div>
			<div class="startNumber">
				<span>启动次数：</span>
				<input type="number" v-model="times">
			</div>
			<div class="startButton" @click='startTask'>
				启动
			</div>
		</div>
	</div>
</template>
<script>
import mySelection from '../base/selection'
export default{
	name:'start',
	components:{
		mySelection,
	},
	data(){
		return{
			selectionYears:[],
			year:'',
			times:'',
		}

	},
	beforeMount(){
		var myDate = new Date()
		this.year = myDate.getFullYear().toString()
		var thisYear = {
			label:myDate.getFullYear(),
			value:0
		}
		var nextYear = {
			label:myDate.getFullYear() + 1,
			value:1
		}
		this.selectionYears.push(thisYear)
		this.selectionYears.push(nextYear)
		console.log(this.selectionYears)
	},
	methods:{

		valueChange(index){
			// console.log(index)
			this.year = this.selectionYears[index].toString()
		},

		startTask(){
			var params = {
					year:this.year,
					times:this.times,
					evalue:this.encrypt()
				}
			
				
			this.$axios.post('https://www.stsidea.com/weixin.asmx/StartCheckTask',this.qs.stringify(params))
			.then((res)=>{
				// console.log(res.data)
				var result = res.data.replace(/<[^>]+>/g, "").replace(/[\r\n]/g, "").replace(/[ ]/g, "")
				console.log(result)
				if (result.indexOf("成功") == 0) {
					// 提示成功
				}else if(result.indexOf("失败") == 0){
					// 提示失败
				}
			})
		}
	}
}
</script>
<style scoped>
.start-operation{
	margin: 60px 0 0 240px;
}	
.startYear,
.startNumber{
	margin-bottom: 40px;
}


.startButton{
	width: 100px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	border:1px solid #4fc08d;
  	background: #4fc08d;
  	color: #fff;
  	cursor: pointer;
  	border-radius: 5px;
  	margin-left: 30px;
}	
</style>