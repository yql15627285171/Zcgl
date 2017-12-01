 <template>
	<div class="selection-component">
		<div class="selection-show" @click="toggleDrop">
			<span>{{selections[nowIndex].label}}</span>
			<div class="arrow"></div>
		</div>
		<div class="selection-list" v-show="isDrop">
			<ul>
				<li v-for="(item,index) in selections" @click="chosenSelection(index)">
					{{item.label}}
				</li>
			</ul>
		</div>
	</div>
</template>
<script>
export default{
	name:'selection',
	props:{
		selections:Array
	},
	data(){
		return{
			nowIndex:0,
			isDrop:false
		}
	},
  // watch:{
  //   selections:function(newValue){
  //     console.log('改变了')
  //   }
  // },
	methods:{
		toggleDrop(){
			this.isDrop = !this.isDrop
		},
		chosenSelection(index){
			this.nowIndex = index
			this.isDrop = false
      // console.log(this.selections)
			this.$emit("on-change",index)
		}
		
	}
}
</script>
<style scoped>
.selection-component{
	position: relative;
	display: inline-block;
}

.selection-show {
  border: 1px solid #e3e3e3;
  padding: 0 15px 0 15px;
  display: inline-block;
  position: relative;
  cursor: pointer;
  height: 20px;
  line-height: 20px;
  border-radius: 3px;
  background: #fff;
  font-size: 13px;
}
/* 自己添加的 */
.selection-component .selection-show span{
  display: inline-block;
  width: 70px;
  text-align: center;
}
.selection-show .arrow {
  display: inline-block;
  border-left: 4px solid transparent;
  border-right: 4px solid transparent;
  border-top: 5px solid #e3e3e3;
  width: 0;
  height: 0;
  margin-top: -1px;
  margin-left: 1px;
  margin-right: -14px;
  vertical-align: middle;
}

.selection-list {
  display: inline-block;
  position: absolute;
  left: 0;
  top: 20px;
  width: 100%;
  background: #fff;
  border-top: 1px solid #e3e3e3;
  border-bottom: 1px solid #e3e3e3;
  z-index: 5;
}

.selection-list li {
  padding: 5px 15px 5px 10px;
  border-left: 1px solid #e3e3e3;
  border-right: 1px solid #e3e3e3;
  cursor: pointer;
  background: #fff;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  font-size: 13px;
  text-align: center;
  width: 79px;

}
.selection-list li:hover {
  background: #e3e3e3;
}









</style>