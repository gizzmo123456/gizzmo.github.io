// events.js

var z_offset = 0;

var min_z = -3600, max_z = 1200;

var mousePressed;

var currentMousePosition = [0, 0];
var lastMousePosition = [0, 0];
var mouseDelta = [0, 0];

var lastMouseButton = 0;

function zoom(event){
	
	z_offset += event.deltaY/5.0;
	
	z_offset = Clamp(z_offset, min_z, max_z);

	document.getElementById("DEBUG_0").innerHTML = z_offset;
	
}

function mouseDown(event){
	mouseDown = true;
	lastMouseButton = event.which;
}

function mouseUp(event){
	mouseDown = false;
	lastMouseButton = 0;
}

function updateMousePosition(event){
		
	currentMousePosition[0] = event.offsetX;
	currentMousePosition[1] = event.offsetY;
	
	mouseDelta[0] = currentMousePosition[0] - lastMousePosition[0];
	mouseDelta[1] = currentMousePosition[1] - lastMousePosition[1];
	
}

// call at the end of the frame to update the event ready for the next frame
// prevents delta sticking if an event is not triggered next frame.
function clearEvent()
{
	
	lastMousePosition[0] = currentMousePosition[0];
	lastMousePosition[1] = currentMousePosition[1];
	
	mouseDelta[0] = 0;
	mouseDelta[1] = 0;
	
}