<template>
  <div class="card">

    <!-- for Vue 2.0 -->
    <div class="row">
      <my-datepicker :date.sync="choseDate" :option="option" :limit="limit"></my-datepicker>
    </div>

  </div>
</template>

<script>
// for Vue 2.0
import myDatepicker from 'vue-datepicker/vue-datepicker-es6.vue'

export default {
	name:'picker',
  data () {
    return {
      // for Vue 2.0
  

      choseDate:{
        time:''
      },
      option: {
        type: 'day',
        week: ['周一', '周二', '周三', '周四', '周五', '周六', '周日'],
        month: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
        format: 'YYYY-MM-DD',
        placeholder: '请选择日期',
        inputStyle: {
          'display': 'inline-block',
          'font-size': '14px',
          'border': '1px solid #ccc',
          'color': '#5F5F5F',
          width: '200px'
        },
        color: {
          header: '#ccc',
          headerText: '#f00'
        },
        buttons: {
          ok: '确定',
          cancel: '取消'
        },
        overlayOpacity: 0.5, // 0.5 as default
        dismissible: true // as true as default
      },

      limit: [{
        type: 'weekday',
        available: [0,1, 2, 3, 4, 5,6]
      }]
    

    }


  },
  components: {
    myDatepicker
  },
  computed:{
    value:function(){
      return this.choseDate.time
    }
  },  
  watch:{
    value:function(val){
      this.$emit("on-change",val)
    }
    
  }
}
</script>
<style scoped>
.row{
  width: 200px;
}
</style>
