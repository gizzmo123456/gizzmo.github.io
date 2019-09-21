//main.js

/*
 * Draws a poly to canvas
 * @ param canv		:		canvas to draw to
 * @ param loc_x	:		x position in world space
 * @ param loc_y	:		y position in world space
 * @ param loc_z	:		z position in world space
 * @ param newFace	:		is this the start of a new face.
 * @ return			:		returns the draw [x, y] position
 */ 
function draw(canv, loc_x, loc_y, loc_z, newFace)
{
	
	// convert the into cam space
	loc_x = GetPosInCamSpace(loc_x, width);
	loc_y = GetPosInCamSpace(loc_y, height);
	loc_z = GetPosInCamSpace_uncentered(loc_z, farPlane);
		
	// make perspective
	loc_x = MakePrep(loc_x, loc_z);
	loc_y = MakePrep(loc_y, loc_z);
	
	if(!IsRendered(loc_x, -1.5, 1.5) || !IsRendered(loc_y, -1.5, 1.5) || !IsRendered(loc_z, -0.1, 4) ) return;
	
	// convert back to world space 
	loc_x = CamSpaceToWorldPosition(loc_x, width);
	loc_y = CamSpaceToWorldPosition(loc_y, height);
	
	// Draw
	if (newFace)
		canv.moveTo(loc_x, loc_y);
	else
		canv.lineTo(loc_x, loc_y);
	
	return [loc_x, loc_y];
	
}

// @ param length:		lenght of transform axis
// @ param lineWidth:	width of trasform axis
// @ param offset:		array of axis offsets
function drawAxis(length, lineWidth, offset = [0, 0, 0])
{
	//draw axis
	ctx.strokeStyle = "red";
	ctx.lineWidth = lineWidth;
	ctx.beginPath();
	
	draw(ctx, offset[0], offset[1], offset[2], true);
	draw(ctx, offset[0], -length + offset[1], offset[2], false);
	
	ctx.closePath();
	ctx.stroke();
	
	ctx.strokeStyle = "green";
	ctx.beginPath();
	
	draw(ctx, offset[0], offset[1], offset[2], true);
	draw(ctx, offset[0]+length, offset[1], offset[2], false);
	
	ctx.closePath();
	ctx.stroke();
	
	ctx.strokeStyle = "blue";
	ctx.beginPath();
	
	draw(ctx, offset[0], offset[1], offset[2], true);
	draw(ctx, offset[0], offset[1], -length + offset[2], false);
	
	ctx.closePath();
	ctx.stroke();
}


