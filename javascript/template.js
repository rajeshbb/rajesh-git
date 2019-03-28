function  raju() {
	document.getElementById("demo").style.display ='block';
}


function down() {
	var currentVal= document.getElementById("countdown").innerHTML;
    /*var newVal= currentVal -1;*/
    var newVal=0;
    if (currentVal > 0) {
    	newVal= currentVal -1;
    }
    document.getElementById("countdown").innerHTML=newVal;
}