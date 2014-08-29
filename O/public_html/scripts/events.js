var keys = {};  // object to hold the state of all key presses allows for multiple key detections

document.getElementById("showDebug").onclick = function() {
	document.getElementById('debugging').style.display=(document.getElementById('debugging').style.display=='block')?'none':'block';
	window.scrollTo(0, 500);
};

// Make the notification more responsive
document.getElementById("closeIntroBox").onclick = function(){
	document.getElementById("intro").parentElement.removeChild(document.getElementById("intro"))
};

document.onmousemove = function(e) {
		var rect = canvasHolder.getBoundingClientRect();
		var mouseCoor = {
			x: e.clientX - rect.left,
			y: e.clientY - rect.top
		};
		document.getElementById("showCoords").innerHTML = "Mouse Position: (" + (Math.floor(mouseCoor.x + world.where.corner.x)) + ", "
																			  + (Math.floor(-mouseCoor.y + world.where.corner.y + world.where.change.y)) + ")";
};


document.onkeydown = document.onkeyup = function(e) {
	e = e || window.event;
	keys[e.keyCode] = (e.type == "keydown");	// clever. Credit to B1KMusic @ stackoverflow
	
	if (e.type == "keydown" && keys[71]) {  // Bind G to changing Gravity mode
		mode=(mode=="mario"?"invert":"mario");
	}
	
	if (e.type == "keydown" && keys[82]) {  // Bind r to Restarting the level
		changeLevel(currentLevel, currentQuadrant);
	}
	
	if (e.type == "keydown" && keys[70]) {  // Bind f to Flipping the screen
		canvasHolder.className = (canvasHolder.className=="vertFlip")?"":"vertFlip";
	}
//	if (e.type == "keydown" && keys[27]) {	// Pressing escape makes fullscreen button correct
//		document.getElementById("fullscreenButton").innerHTML = "+";
//	}
};

var handleInput = function() {
//	if (keys[71]) {  // G
//		mode=(mode=="mario"?"invert":"mario");
//	}
	if (keys[16]) {	 // SHIFT
		if (keys[32]) {   // SPACE
			jimmy.jump(false, true);	// jump only in the y-direction
		}
		if (keys[37]) {   // LEFT
			jimmy.velocity.x -= jimmy.appliedForce.x;
			jimmy.orientation = -1;
		}
		if (keys[39]) {   // RIGHT
			jimmy.velocity.x += jimmy.appliedForce.x;
			jimmy.orientation = 1;
		}
	}
	else {
		if (keys[32]) {   // SPACE
			jimmy.jump(false, true);	// jump only in the y-direction
		}
		if (keys[37]) {   // LEFT
			jimmy.position.x -= jimmy.appliedForce.x;
			jimmy.orientation = -1;
		}
		if (keys[39]) {   // RIGHT
			jimmy.position.x += jimmy.appliedForce.x;
			jimmy.orientation = 1;
		}
	}
};