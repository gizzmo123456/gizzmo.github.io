var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};

function Clamp(v, min, max)
{
	if( v < min ) return min;
	else if( v > max ) return max;
	
	return v;
}