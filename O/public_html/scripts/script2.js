var requestAnimationFrame = 
	window.requestAnimationFrame || window.mozRequestAnimationFrame ||
	window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;

var cancelAnimationFrame = window.cancelAnimationFrame || window.mozCancelAnimationFrame;

var time = 0;
changeLevel();
var update = function() {
	handleInput();
	reacts();
	drawScene();
	drawUserInterface();
	time++;
	intervalID = requestAnimationFrame(update);
};

intervalID = requestAnimationFrame(update);
//intervalID = setInterval(update, 1000/60);