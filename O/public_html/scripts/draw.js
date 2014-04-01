// Cartensian-style
gameArea.translate(canvas.width/2, canvas.height/2);
gameArea.scale(1, -1);

var filterStrength = 20;
var frameTime = 0, lastLoop = new Date(), thisLoop;

// this function draws the scence to the canvas
function drawScene() {
    // clear the canvas
    gameArea.clearRect(world.where.corner.x, world.where.corner.y, world.where.change.x, world.where.change.y);
    gameArea.scale(1, -1);
    for (var i=-1; i<2; i++) {
		for (var j=-2; j<3; j++) {
			gameArea.drawImage(document.getElementById("backgroundPic"), world.where.corner.x - world.where.corner.x*0.6%1000 + i*world.where.change.x, -world.where.corner.y + world.where.corner.y*0.6%500 + j*world.where.change.y, world.where.change.x, world.where.change.y);
		}
    }
    gameArea.scale(1, -1);
    // the alternative approach would be just to have the html image element behind the canvas and, canvas transparent
    for (var i=0; i<blocksList.length; i++) {
        var block = blocksList[i];
        if (isCollision(world, block)) {
            gameArea.drawImage(block.image[mode], block.where.corner.x, block.where.corner.y, block.where.change.x, block.where.change.y);
        }
    }
    for (var k=0; k<textList.length; k++) {
        var str = textList[k];
        if (isCollision(world, str)) {
            gameArea.font = str.font;
            gameArea.scale(1, -1);
            gameArea.fillText(str.value, str.where.corner.x, -str.where.corner.y);
            gameArea.scale(1, -1);
        }
    }
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

function scoochScreen(dx, dy) {
    world.where.corner.x += dx;
    world.where.corner.y += dy;
    gameArea.translate(-dx, -dy);
}