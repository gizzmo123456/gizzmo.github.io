// draw.js
// See: https://github.com/HackerPoet/NonEuclidean/blob/master/NonEuclidean/Camera.cpp

// canvas w/h
var width = window.innerWidth - 50;
var height = window.innerHeight - 250;
var ar = width / height;

 // for now we'll only use the far plane but the near plane should be added later if the project is continued.
 var farPlane = 800;
 
 // FOV is not right :| (I think the is should be 1f / tan(fov_deg * pi / 360f)) ??
 var feildOfViwew = 80;//45;//width/(45);
 var FOV = Math.tan( (feildOfViwew/2) * (Math.PI / 180.0) )

// world To Cam 

/*
 * gets position in range of -1, 1, reivent to cam center
 * @param positionAlongAxis	:	position along axis in world space
 * @param axisLength		:	length of axis
 * @return					:	postition in cam space along axis (range -1, 1)
 */
 function GetPosInCamSpace(positionAlongAxis, axisLength)
 {
	 return (positionAlongAxis - (axisLength / 2.0)) / (axisLength / 2.0);
 }
 
/*
 * gets position in range of 0, 1, reivent to cam (from left to right)
 * @param positionAlongAxis	:	position along axis in world space
 * @param axisLength		:	length of axis
 * @return					:	postition in cam space along axis (range 0, 1)
 */
 function GetPosInCamSpace_uncentered(positionAlongAxis, axisLength)
 {
	 return 1 - (positionAlongAxis / axisLength);
 }
 
// Cam To World
 
/*
 * converts cam position (-1, 1) to world position
 * @param positionAlongAxis	:	position along axis in cam space
 * @param axisLength		:	length of axis
 * @return					:	postition in world space along axis (range -1, 1)
 */
function CamSpaceToWorldPosition(positionAlongAxis, axisLength)
{
	return (positionAlongAxis + 1) * (axisLength/2.0);
}

/*
 * converts cam position (0, 1) to world position
 * @param positionAlongAxis	:	position along axis in cam space
 * @param axisLength		:	length of axis
 * @return					:	postition in world space along axis (range 0, 1)
 */
function CamSpaceToWorldPosition_uncentered(positionAlongAxis, axisLength)
{
 	return (positionAlongAxis * axisLength);
}
 
 // prep
 
 function MakePrep(positionAlongAxis, far)
 {
	return (positionAlongAxis / far) * FOV * ar;
 }
 
 /////////////////////
 // Rotate
 /////////////////////
 
 function rotate(rot_x, rot_y, rot_z, face_id, vect_id)
 {
	 if(rot_x != 0)
		rotate_x(rot_x, face_id, vect_id);
	
	if(rot_y != 0)
		rotate_y(rot_x, face_id, vect_id);
	
	if(rot_z != 0)
		rotate_z(rot_x, face_id, vect_id);
 }
 
 function rotate_x(rot_delta, face_id, vect_id)
 {
	 
	 var sin_t = Math.sin(rot_delta);
	 var cos_t = Math.cos(rot_delta);
	 
	 var y = faces[face_id][vect_id][1];
	 var z = faces[face_id][vect_id][2];
	 
	 faces[face_id][vect_id][1] = y * cos_t - z * sin_t;
	 faces[face_id][vect_id][2] = z * cos_t + y * sin_t;
	 
 }
 
 
  function rotate_y(rot_delta, face_id, vect_id)
 {
	 
	 var sin_t = Math.sin(rot_delta);
	 var cos_t = Math.cos(rot_delta);
	 
	 var x = faces[face_id][vect_id][0];
	 var z = faces[face_id][vect_id][2];
	 
	 faces[face_id][vect_id][0] = x * cos_t - z * sin_t;
	 faces[face_id][vect_id][2] = z * cos_t + x * sin_t;
	 
 }
 
 function rotate_z(rot_delta, face_id, vect_id)
 {
	 
	 var sin_t = Math.sin(rot_delta);
	 var cos_t = Math.cos(rot_delta);
	 
	 var x = faces[face_id][vect_id][0];
	 var y = faces[face_id][vect_id][1];
	 
	 faces[face_id][vect_id][0] = x * cos_t - y * sin_t;
	 faces[face_id][vect_id][1] = y * cos_t + x * sin_t;
	 
 }
 
 
 /////////////
 function IsRendered(posRevCam, min = -1, max = 1)
 {
	 return min <= posRevCam && posRevCam <= max; 
 }
 
 