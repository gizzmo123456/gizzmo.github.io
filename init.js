// init.js

var loadJS = function (url) {
	
	script = document.createElement('script');
	script.src = url;
	
	document.head.append(script);
	
}

// load requested object. (hash tag. squear is default)
var hash = location.href.split("?")[1];
var object = "sq";

switch( hash )
{
	case "pan":
		object = "Frying_pan_obj";
		break;
	case "donut":
		object = "do";
		break;
	case "drag":
		object = "haha";
		break;
	case "ship":
		object = "ship";
		break;
}


object = "objects/"+object+".obj.js";

loadJS(object);


