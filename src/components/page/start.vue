<template>
	<div class="start-board" v-loading="loading" element-loading-text="loading">
		<div class="board-intro">
			<h1 class="ml-20">盘点任务</h1>
			<p>说明：开启和结束盘点任务，结束任务与年份和次数无关，只会结束最新那次。一旦结束任务，同一年份同一次数的任务不可再启动</p>
		</div>
		<div class="start-operation" >
			<div class="startYear">
				<span>年份：</span>
				<my-selection :selections='selectionYears' class="inline-block" @on-change="valueChange"></my-selection>
			</div>
			<div class="startNumber">
				<span>次数：</span>
				<input v-model="times">
			</div>
			<div class="inline">
				<div class="startButton" @click='startTask'>启动</div>
				<div class="stopButton" @click='stopTask'>结束</div>
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
			loading:false,
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
		// 开启任务
		startTask(){
			var time = this.times.trim()
			if ( /^[0-9]*$/g.test(time) && time.length>0){
					var params = {
						year:this.year,
						times:time,
						evalue:this.encrypt()
					}
				
				this.loading = true
				this.$axios.post('https://www.trjiot.cn/weixin.asmx/StartCheckTask',this.qs.stringify(params))
				.then((res)=>{
					this.loading = false
					var result = res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "").split("：")
					
					if (result[0] == '成功') {
						// 提示成功
						this.requestSuccess('启动成功')
					}else if(result[0] == '失败'){
						// 提示失败
						this.requestFail(result[1])
					}
				})
				.catch((res)=>{
					this.loading = false
					this.requestFail('启动失败')
				})
			}else{
				this.requestWarning('启动次数必须是大于0的整数')
			}

						


		},
		// 结束任务
		stopTask(){
			var params = {
				evalue:this.encrypt()
			}
			this.loading = true
			this.$axios.post('https://www.trjiot.cn/weixin.asmx/EndCheckTask',this.qs.stringify(params))
			.then((res)=>{
				this.loading = false
				console.log(res.data)
				var result = res.data.replace(/<[^>]+>/g, "").replace(/[ \r\n]/g, "").split("：")
				
				if (result[0] == '成功') {
					// 提示成功
					this.requestSuccess('已停止盘点')
				}else if(result[0] == '失败'){
					// 提示失败
					this.requestFail(result[1])
				}
			})
			.catch((res)=>{
				this.loading = false
				this.requestFail('停止盘点失败')
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

.inline{
	display: flex
	/* width: 00px */
}

.startButton,
.stopButton{
	width: 100px;
	height: 30px;
	text-align: center;
	line-height: 30px;
	/* border:1px solid #4fc08d; */
  	background: #4fc08d;
  	color: #fff;
  	cursor: pointer;
  	border-radius: 5px;
  	
}

.stopButton{
	background: #ff3333;
	/* border: none; */
	margin-left: 30px;
}


</style>