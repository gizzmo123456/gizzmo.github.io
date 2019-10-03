// Cal loader.js

var loadCal = function(url){
	
	var xhttp = new XMLHttpRequest();
	
	xhttp.onreadystatechange = function() {
		
		if (this.readyState == 4 && this.status == 200) {
			document.getElementById("DEBUG_0").innerHTML =
			this.responseText;
		}
		
	};
	
	xhttp.open("GET", url, true);
	xhttp.send();
	
}