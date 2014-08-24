var canvasHolder = document.getElementById("holdCanvases");

var movingCanvas = document.getElementById("gameArea");
var gameArea = movingCanvas.getContext("2d");

var notMovingCanvas = document.getElementById("doesNotMove");
var staticArea = notMovingCanvas.getContext("2d");


// ImageDefinitions
var imgDictionary = {};
var imgGather = function(src) {
	// if a qunique image
	if (!(src in imgDictionary)) {
		// create it and store it
		imgDictionary[src] = new Image();
		imgDictionary[src].src = src;
	}
	
	// either way, return the image
	return imgDictionary[src];
};

// Preload Here
imgGather("images/background.png");
imgGather("images/block.png");
imgGather("images/transitionwall.png");
imgGather("images/dangerblock.png");
imgGather("images/portal.png");
imgGather("images/Spike.png");
imgGather("images/Spitter.png");
imgGather("images/Spit Fire.png");
imgGather("images/Spring.png");
imgGather("images/blueKey.png");
imgGather("images/blueButton_up.png");
imgGather("images/blueButton_down.png");
imgGather("images/Mad Boss.png");