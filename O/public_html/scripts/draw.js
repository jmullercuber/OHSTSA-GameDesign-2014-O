// Cartensian-style
gameArea.translate(gameArea.canvas.width/2, gameArea.canvas.height/2);
gameArea.scale(1, -1);

staticArea.translate(staticArea.canvas.width/2, staticArea.canvas.height/2);
staticArea.scale(1, -1);

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date(), thisLoop;

// this function draws the scence to the moving canvas
function drawScene() {
	
	// if this is a new scene
	if (time<1) {
		// then draw on the static canvas too
		drawStatic();
	}
	
	// clear the canvas
	gameArea.clearRect(world.where.corner.x, world.where.corner.y, world.where.change.x, world.where.change.y);
	
	
	// draw blocks
	for (var i=0; i<blocksList.length; i++) {
		var block = blocksList[i];
		if (block === world) { continue; }
		// If you are is the scene...
		if (isCollision(world, block)) {
			// If we don't have to paint an image...
			if (block.color) {
				// then don't, draw a rectangle
				var oldStyle = gameArea.fillStyle;
				gameArea.fillStyle = block.color;
				gameArea.fillRect(block.where.corner.x, block.where.corner.y, block.where.change.x, block.where.change.y);
				gameArea.fillStyle = oldStyle;
			}
			else {
				//alert("Drawing from image");
				gameArea.drawImage(block.image[mode], block.where.corner.x, block.where.corner.y, block.where.change.x, block.where.change.y);
			}
		}
	}
	
	
	// draw characters
	for (var j=0; j<charList.length; j++) {
		var elem = charList[j];
		if (isCollision(world, elem)) {
			gameArea.translate(Math.floor(elem.position.x), Math.floor(elem.position.y));
			gameArea.scale(elem.orientation, (mode=="mario"?-1:1));
			gameArea.drawImage(elem.canJump.y?elem.image:elem.jumpImage, -Math.floor(elem.image.width/2), -Math.floor(elem.image.height/2));
			gameArea.scale(elem.orientation, (mode=="mario"?-1:1));
			gameArea.translate(-Math.floor(elem.position.x), -Math.floor(elem.position.y));
		}
	}
	
	var thisFrameTime = (thisLoop=new Date()) - lastLoop;
	frameTime+= (thisFrameTime - frameTime) / filterStrength;
	lastLoop = thisLoop;
	document.getElementById("FPS").innerHTML = "FPS=" + (1000/frameTime).toFixed(1);
	document.getElementById("position").innerHTML = "Position: (" + (jimmy.position.x).toFixed(1) + ", " + (jimmy.position.y).toFixed(1) + ")";
	document.getElementById("velocityX").innerHTML = "velocityX=" + (jimmy.velocity.x).toFixed(1);
	document.getElementById("velocityY").innerHTML = "velocityY=" + (jimmy.velocity.y).toFixed(1);
	document.getElementById("canJump").innerHTML = "CanJump=" + jimmy.canJump.x + ", " + jimmy.canJump.y;
}

// this function draws the scence to the not moving canvas
function drawStatic() {
	// clear the canvas
	staticArea.clearRect(world.where.corner.x, world.where.corner.y, world.where.change.x, world.where.change.y);
	
	// draw a new background
	// the alternative approach would be just to have the html image element behind the canvas and, canvas transparent
	staticArea.scale(1, -1);
	for (var i=-1; i<2; i++) {
		for (var j=-2; j<3; j++) {
			staticArea.drawImage(document.getElementById("backgroundPic"), world.where.corner.x - world.where.corner.x*0.6%1000 + i*world.where.change.x, -world.where.corner.y + world.where.corner.y*0.6%500 + j*world.where.change.y, world.where.change.x, world.where.change.y);
		}
	}
	staticArea.scale(1, -1);
	
	
	// draw static blocks
	for (var i=0; i<staticBlocksList.length; i++) {
		var block = staticBlocksList[i];
		if (isCollision(world, block)) {
			// If we don't have to paint an image...
			if (block.color) {
				// then don't, draw a rectangle
				var oldStyle = staticArea.fillStyle;
				staticArea.fillStyle = block.color;
				staticArea.fillRect(block.where.corner.x, block.where.corner.y, block.where.change.x, block.where.change.y);
				staticArea.fillStyle = oldStyle;
			}
			else {
				//alert("Drawing from image");
				staticArea.drawImage(block.image[mode], block.where.corner.x, block.where.corner.y, block.where.change.x, block.where.change.y);
			}
		}
	}
	
	
	//draw text
	for (var k=0; k<textList.length; k++) {
		var str = textList[k];
		if (isCollision(world, str)) {
			staticArea.font = str.font;
			staticArea.scale(1, -1);
			staticArea.fillText(str.value, str.where.corner.x, -str.where.corner.y);
			staticArea.scale(1, -1);
		}
	}
}

function scoochScreen(dx, dy) {
	if (dx==0 && dy==0) { return; }
	//alert(dx + ", " +  dy + ";" + (dx==0) + ";" + (dy==0) + ";" + (dx==dy)/*+ arguments.callee.caller.toString()*/);
	world.where.corner.x += dx;
	world.where.corner.y += dy;
	gameArea.translate(-dx, -dy);
	staticArea.translate(-dx, -dy);
	drawStatic();
}