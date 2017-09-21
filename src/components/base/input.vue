<template>
	<input type="text" v-model.lazy.trim='number'>
</template>
<script>
export default{
	name:'input',
	data(){
		return{
			number:""
		}
	},
	watch:{
		number(){

		}
	}
}
</script>

<style scoped>
input{
	display: inline-block;
	font-size: 14px;
 	border: 1px solid #ccc;
 	width: 200px

}
</style>