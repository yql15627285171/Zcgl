import CryptoJS from './AES'
import dataUtil from './Date'
export default{
  install(Vue,options){
     Vue.prototype.encrypt =  function(data) {
   
	    var key = CryptoJS.enc.Latin1.parse('j>r%T.w8#7*6J\"r%T.w8#7*6');
	    var iv = CryptoJS.enc.Latin1.parse('a@ss<_2et.T^&r\"j');
	    
	    var ADEData
	    if(data == null){
	      ADEData = dataUtil.formatTime1(new Date())
	      // ADEData = '2017-10-31 15:31:02'
	    }else{
	      ADEData = data +'$'+ dataUtil.formatTime1(new Date())
	    }
	    // console.log(ADEData)
	    return CryptoJS.AES.encrypt(ADEData, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.ZeroPadding }).toString();
		}


		
	 }
}