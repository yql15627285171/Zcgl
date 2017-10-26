<template>
	<div class="component">
        <ul class="list">
          <li
          v-for="(item, index) in choosens"
          @click="chosenSelection(index)"
          :class="{active:index == nowIndex}"
          >{{ item }}</li>
        </ul>
      </div>
    </div>
</template>
<script>
export default{
	name:'choosen',
	props:{
		choosens:Array,
    defaultChosenindex:Array
	},
	data(){
		return{
			nowIndex: -1
		}
	},
  watch:{
    defaultChosenindex:function(newValue){
      this.nowIndex = newValue[0]
    }
  },
	methods:{
		chosenSelection(index){
			this.nowIndex = index
      this.$emit('on-change',index)
		}
	}
}
</script>

<style scoped>

.component {
  position: relative;
  display: inline-block;
}
.list li{
  display: inline-block;
  border: 1px solid #e3e3e3;
  height: 25px;
  line-height: 25px;
  padding: 0 8px;
  margin-right: 5px;
  border-radius: 3px;
  text-align: center;
  cursor: pointer;
}
.list li.active {
  border-color: #4fc08d;
  background: #4fc08d;
  color: #fff;
}

</style>