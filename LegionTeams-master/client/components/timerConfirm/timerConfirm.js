var timerConfirm = new Chronos.Timer(1000);
var increment; var seconds=0; 
var minutes=0; 
var realtime;
Template.timerConfirm.helpers({

	timeC: function(){
		increment =((timerConfirm.time.get()/1000)).toFixed(0);
		if(increment > 0){
			seconds=seconds+1;
		if(seconds===60)
		{
			minutes=minutes+1;
			seconds=0; 
		}

}
		if(seconds < 10){
			realtime=minutes+":0"+seconds

		}
		else{
			realtime=minutes+":"+seconds;
		}
		
		return realtime;  
	}
});

timerConfirm.start();
