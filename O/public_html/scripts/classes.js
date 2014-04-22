var mode = "mario";
var currentLevel = 0;
var currentQuadrant = 1;
var charList = [];
var staticBlocksList = [];
var blocksList = [];
var textList = [];
var jimmy;

/*
 * Many different classes are avaliable:
 * 	 character
 * 	 wall
 * 		WORLD
 * 		portal
 * 		transitionwall
 * 		dangerblock
 * 		text
 * You probably won't need to call new WORLD()
*/

// Credit to Chris Pickett @ Stack Overflow for this one
function findElemWithKey(array, propList, value) {
	for(var i = 0; i < array.length; i++) {
		var endProp = array[i];
		for (var j=0; j<propList.length; j++) {
			if (!endProp[propList[j]]) {
				break;
			}
			endProp = endProp[propList[j]];
		}
		if(endProp === value) {
			return i;
		}
	}
	return -1;
}

function Vector(x, y) {
	this.x = x?x:0;
	this.y = y?y:0;
	this.magnitude = function() {
		return Math.sqrt(this.x*this.x + this.y*this.y);
	};
	this.Plus = function(v) {
		this.x += v.x;
		this.y += v.y;
	};
	this.Scale = function(c) {
		this.x *= c;
		this.y *= c;
	};
	this.asUnit = function() {
		return scalarMultiply(
			1/this.magnitude(),
			this
		);
	};
	this.isZero = function() {
		return (this.magnitude() === 0);
	};
	this.toString = function() {
		return "(" + this.x + ", " + this.y + ")";
	};
}

function addVectors(v1, v2) {
	return new Vector(
		v1.x+v2.x,
		v1.y+v2.y
	);
}

function subtractVectors(v1, v2) {
	return new Vector(
		v1.x-v2.x,
		v1.y-v2.y
	);
}

function sumVectors(vList) {
	var sum = new Vector(0, 0);
	for (var index=0; index<vList.length; index++) {
		sum.Plus( vList[index] );
	}
	return sum;
}

function scalarMultiply(c, v) {
	return new Vector(c*v.x, c*v.y);
}

function dotProduct(v1, v2) {
	return (v1.x*v2.x + v1.y*v2.y);
}

function someOtherProduct(v1, v2) {
	return new Vector(
		v1.x*v2.x,
		v1.y*v2.y
	);
}

// projection u onto v
// vector component of u parallel to v
function projection(u, v) {
	return scalarMultiply(
		dotProduct(u, v)/(v.magnitude()*v.magnitude()),
		v
	);
}

function projectionDirection(u, v) {
	return scalarMultiply(
		Math.abs(dotProduct(u, v)/(v.magnitude()*v.magnitude())),
		v
	);
}

function minOfVectors(v1, v2) {
	return new Vector(
		Math.min(v1.x, v2.x),
		Math.min(v1.y, v2.y)
	);
}

function minAbsOfVectors(v1, v2) {
	return new Vector(
		Math.min(Math.abs(v1.x), Math.abs(v2.x)),
		Math.min(Math.abs(v1.y), Math.abs(v2.y))
	);
}

function maxOfVectors(v1, v2) {
	return new Vector(
		Math.max(v1.x, v2.x),
		Math.max(v1.y, v2.y)
	);
}

function maxAbsOfVectors(v1, v2) {
	return new Vector(
		Math.max(Math.abs(v1.x), Math.abs(v2.x)),
		Math.max(Math.abs(v1.y), Math.abs(v2.y))
	);
}

function signForVectors(v) {
	return new Vector (
		sign(v.x),
		sign(v.y)
	);
}

function componetSwap(v) {
	return new Vector(
		v.y,
		v.x
	);
}

// Class for all characters in the game
// Properties are position, speed, image, and radius
// Object is then added to the charList array
function character(xpos, ypos, img1, img2) {
	this.position = new Vector(xpos, ypos);
	this.orientation = 1;
	this.rotation = 0;
	this.forceList = [];
	this.velocity = new Vector(0, 0);
	this.acceleration = new Vector(0, 0);
	this.maxVelocity = new Vector(15, 35);
	this.appliedForce = new Vector(3, 12);
	this.friction = new Vector(0, 0);
	this.normalForce = new Vector(0, 0);
	this.mu = -0.3;
	this.bouncieness = 0;
	this.image = img1;
	this.jumpImage = img2?img2:img1;
	this.canJump = {
		x:false,
		y:false
	};
	this.jump = function() {
		if (this.canJump.y) {
			this.forceList.push(
				new Vector(
					0,
					this.appliedForce.y*(mode=="mario"?1:-1)
				)
			);
		}
		//this.velocity.x += (this.appliedForce.x)*(this.canJump.x)*(jumpX);
		//this.velocity.y += (this.appliedForce.y)*(this.canJump.y)*(mode=="mario"?1:-1);   // The last segment accounts for the direction you should jump in, determined by mode
//		this.canJump.x *= true;
		this.canJump.y = false;
	};
	this.health = 100;
	this.inventory = [];
	charList.push(this);
}

// Currently, a class for all blocks in the game
// Properties are where and image
// Object is then added to the blocksList array
function wall(x, y, dx, dy) {
	this.where = {
		corner: new Vector(x, y),
		change: new Vector(dx, dy)
	};
	this.mu = -0.3;   // I don't think the actual greek letter would be valid
	this.bouncieness = 0;
	this.color = "#666666";
	this.image = {
		invert: document.getElementById("blockPic"),
		mario: document.getElementById("blockPic")
	};
	this.collide = function(who) {
		
	};
	staticBlocksList.push(this);
}

function WORLD(x, y, sx, sy) {
	this.where = {
		corner: new Vector(
			-canvasHolder.clientWidth/2,
			-canvasHolder.clientHeight/2
		),
		change: new Vector(
			canvasHolder.clientWidth,
			canvasHolder.clientHeight
		)
	};
	this.size = {   // sorta wierd having two similar objects, but for different purposes. Shouldn't they be instantiated seperately, in to two blocks
		where: {
			corner: new Vector(
				(x?x:this.where.corner.x-1),
				(y?y:this.where.corner.y-1)
			),
			change: new Vector(
				(sx?sx:this.where.change.x),
				(sy?sy:this.where.change.y)
			)
		}
	};
	this.velocity = new Vector(0, 0);
	this.acceleration = new Vector(0, 0);
	this.mu = 0;
	this.bouncieness = 0;
	this.image = {
		invert: document.getElementById("transwallPic"),
		mario: document.getElementById("transwallPic")
	};
	this.collide = function(who, collVector) {
		if (who === jimmy) {
			var potentialWorld = {
				where: {
					corner: {
						x: this.where.corner.x-sign(isCollision(this, jimmy, "horizontal"))*Math.max(Math.abs(jimmy.velocity.x), 5),
						y: this.where.corner.y-sign(isCollision(this, jimmy, "vertical"))*Math.max(Math.abs(jimmy.velocity.y), 5)
					},
					change: this.where.change
				}
			};
			scoochScreen(
				(Math.abs(isCollision(this, jimmy, "horizontal"))<300)*							 // If jimmy is close enough to the screen to scooch
				(Math.abs(isCollision(potentialWorld, this.size, "horizontal"))>=this.where.change.x)*	  // If it will fit
				-sign(isCollision(this, jimmy, "horizontal"))*Math.max(Math.abs(jimmy.velocity.x), 5),  // Direction and magnitude to scooch
				
				(Math.abs(isCollision(this, jimmy, "vertical"))<150)*
				(Math.abs(isCollision(potentialWorld, this.size, "vertical"))>=this.where.change.y)*
				-sign(isCollision(this, jimmy, "vertical"))*Math.max(Math.abs(jimmy.velocity.y), 5)
			);
		}
	};
	this.do = function(t) {
		if (jimmy.health <= 0) {
			changeLevel(currentLevel, 1);
		}
	};
	blocksList.push(this);
}

function portal(x, y, dx, dy, n, q) {
/*	wall.call(this);
	this.prototype = new wall();
	this.prototype.constructor = portal;
	this.collide = function(who) {
		if (who==jimmy)
		{
			currentLevel++;
			changeLevel();
		}
	};*/
	
	this.where = {
		corner: new Vector(x, y),
		change: new Vector(dx, dy)
	};
	this.mu = 0;
	this.bouncieness = 0;
	this.image = {
		invert: document.getElementById("portalPic"),
		mario: document.getElementById("portalPic")
	};
	this.collide = function(who) {
		if (who==jimmy)
		{
			changeLevel(n!=null?n:currentLevel+1, q?q:1);
		}
		
	};
	staticBlocksList.push(this);
}

function transitionwall(x, y, dx, dy, n) {
	this.where = {
		corner: new Vector(x, y),
		change: new Vector(dx, dy)
	};
	this.mu = 0;
	this.bouncieness = 0;
	this.color = "BLANK";
	this.image = {
		invert: document.getElementById("transwallPic"),
		mario: document.getElementById("transwallPic")
	};
	this.collide = function(who) {
		if (who==jimmy)
		{
			changeLevel(currentLevel, (n!=null?n:currentQuadrant+1));
		}
		
	};
	staticBlocksList.push(this);
}

function dangerblock(x, y, dx, dy) {
	this.where = {
		corner: new Vector(x, y),
		change: new Vector(dx, dy)
	};
	this.mu = 0;
	this.bouncieness = 0;
	this.color = "#660000";
	this.image = {
		invert: document.getElementById("dangerblockPic"),
		mario: document.getElementById("dangerblockPic")
	};
	this.collide = function(who) {
		if (who==jimmy)
		{
			jimmy.health-=2;
		}
		
	};
	staticBlocksList.push(this);
}

function movingBlock(x, y, dx, dy, f, g) {
	this.where = {
		corner: new Vector(x, y),
		change: new Vector(dx, dy)
	};
	this.velocity = new Vector(0, 0);
	this.acceleration = new Vector(0, 0);
	this.mu = 0;
	this.bouncieness = 0;
	this.color = "#666666";
	this.image = {
		invert: document.getElementById("blockPic"),
		mario: document.getElementById("blockPic")
	};
	this.do = f?f:function(t) {};
	this.collide = g?g:function(who) {
		if (who)
		{
			who.position.Plus( this.velocity );
		}
		
	};
	blocksList.push(this);
}

function simpleActionBlock(x, y, img, f, g) {
	this.where = {
		corner: new Vector(x, y),
		change: new Vector(img.width, img.height)
	};
	this.velocity = new Vector(0, 0);
	this.acceleration = new Vector(0, 0);
	this.mu = 0;
	this.bouncieness = 0;
	this.image = {
		invert: img,
		mario: img
	};
	this.collide = f?f:function(who) {
		if (who)
		{
			who.position.Plus( this.velocity );
		}
		
	};
	this.do = g?g:function(t) {};
	blocksList.push(this);
}

function text(v, x, y, s, f) {
	this.value = v;
	this.where = {
		corner: new Vector(x, y),
		change: new Vector(staticArea.measureText(v), (s?s:18))
	};
	this.mu = 0;
	this.bouncieness = 0;
	this.font = (s?s:18) + "pt " + (f?f:"Trebuchet MS");
	textList.push(this);
}