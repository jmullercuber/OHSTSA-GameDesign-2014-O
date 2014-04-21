// Initialize the stuff in our game
// no need to personally name everything, since they are all within charList and blocksList
var world;
function changeLevel(cl, cq, f) {
	//clearInventory();
	//while( document.getElementById("inventory").hasChildNodes() ){
	//	document.getElementById("inventory").removeChild(document.getElementById("inventory").lastChild);
	//}
	//document.getElementById("inventory").innerHTML = "";
	time = 0;
	charList = [];
	staticBlocksList = [];
	blocksList = [];
	textList = [];
	// or ... .setTransform(1, 0, 0, -1, 500, 250);
	gameArea.setTransform(1, 0, 0, 1, 0, 0);
	gameArea.translate(gameArea.canvas.width/2, gameArea.canvas.height/2);
	gameArea.scale(1, -1);
	staticArea.setTransform(1, 0, 0, 1, 0, 0);
	staticArea.translate(staticArea.canvas.width/2, staticArea.canvas.height/2);
	staticArea.scale(1, -1);
	currentLevel = (arguments.length > 0 ? cl:currentLevel);
	currentQuadrant = (cq || 1);
	world = new WORLD();
	switch (currentLevel) {
		case 0:		// pre game
			LEVEL_0(currentLevel, currentQuadrant);
			break;
		case 1:	// level1
			LEVEL_1(currentLevel, currentQuadrant);
			break;
		case 2:	// Level2	// Jorge's
			LEVEL_2(currentLevel, currentQuadrant);
			break;
		case 3:	// Level3	// Kehmoni
			LEVEL_3(currentLevel, currentQuadrant);
			break;
		case 4://Bossification
			LEVEL_4(currentLevel, currentQuadrant);
			break;
		case 5:	// Level5
			// and this is the final (boss)
			LEVEL_5(currentLevel, currentQuadrant);
			break;
//		default:
//			changeLevel(0, 1);
	}
	
	if (f) {f();}
}