var intervalID;

document.getElementById("flipScreenButton").onclick = function(e) {
	canvasHolder.className = (canvasHolder.className=="vertFlip")?"":"vertFlip";
};

document.getElementById("restartLevelButton").onclick = function(e) {
	changeLevel(currentLevel, currentQuadrant);
};

document.getElementById("fullscreenButton").onclick = function(e) {
	gzone = document.getElementById("zone");
	
	gzone.requestFullscreen = gzone.requestFullscreen || gzone.mozRequestFullScreen || gzone.webkitRequestFullscreen || gzone.msRequestFullscreen;
	document.exitFullscreen = document.exitFullscreen || document.mozCancelFullScreen ||  document.webkitExitFullscreen || document.msExitFullscreen;
	
	if (document.mozFullScreenElement === null && gzone.requestFullscreen) {
		gzone.requestFullscreen();
		document.getElementById("fullscreenButton").innerHTML = "-";
	}
	else if (document.mozFullScreenElement && document.exitFullscreen) {
		document.exitFullscreen();
		document.getElementById("fullscreenButton").innerHTML = "+";
	}
};

document.getElementById("pauseButton").onclick = function(e) {
	// If it's off, turn it on.
	// I manually set it to -1 below
	if (intervalID == -1) {
		intervalID = requestAnimationFrame(update);
	}
	// Otherwise, it must be on and we want it stopped.
	else {
		cancelAnimationFrame(intervalID);
		intervalID = -1;
	}
};

function drawUserInterface() {
	document.getElementById("health").style.width = (document.getElementById("healthHolder").offsetWidth * jimmy.health/100) + "px";
	document.getElementById("levelStat").innerHTML = "Level: " + currentLevel + " - " + currentQuadrant;
	document.getElementById("timeStat").innerHTML = "Time: " + (time/55).toFixed(0);
}

//document.getElementById("inventory").getContext("2d").translate(275, 0);

function addToInventory(item) {
	jimmy.inventory.push(item);
	var newPic = Image();
		newPic.src = item.img.src;
	document.getElementById("inventory").getContext("2d").drawImage(newPic, 15*jimmy.inventory.length, 20, 10, 40);
}

function removeFromInventory(index) {
	jimmy.inventory.splice( index, 1 );
	document.getElementById("inventory").getContext("2d").clearRect(15*(jimmy.inventory.length+1), 20, 10, 40);
}

function clearInventory() {
	if (jimmy) {
		jimmy.inventory = [];
	}
	document.getElementById("inventory").getContext("2d").clearRect(0, 0, 550, 55);
}