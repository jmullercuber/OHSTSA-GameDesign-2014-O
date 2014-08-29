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
var imgPaths = [
	"images/background.png",
	"images/block.png",
	"images/transitionwall.png",
	"images/dangerblock.png",
	"images/portal.png",
	"images/Spike.png",
	"images/Spitter.png",
	"images/Spit Fire.png",
	"images/Spring.png",
	"images/blueKey.png",
	"images/blueButton_up.png",
	"images/blueButton_down.png",
	"images/Mad Boss.png"
];

// Thanks Emmett and Jonathan Fingland @ stackoverflow
function preload(sources)
{
  for (i=0; i < sources.length; ++i) {
    imgDictionary[sources[i]] = new Image();
    imgDictionary[sources[i]].src = sources[i];
  }
}
preload(imgPaths);