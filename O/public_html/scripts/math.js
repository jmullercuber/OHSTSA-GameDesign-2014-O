var physics = {
    mario: {
        gravity: new Vector(0, -1.75),
        jumpFrom: {  // original name: grabCeiling      // it might be really interesting to have each character use different jumpFroms
            x:[false, false],   //neg, pos      // need to work on
            y:[false, true]     //neg, pos
        }
    },
    invert: {
        gravity: new Vector(0, 1.75),
        jumpFrom: {  // original name: grabCeiling      // it might be really interesting to have each character use different jumpFroms
            x:[false, false],   //neg, pos      // need to work on
            y:[true, false]     //neg, pos
        }
    }
};
var showBoundingBox = false;

var sign = function(n){
    return (n!==0?((n>0)?1:-1):0);
};	// end sign function

var isCollision = function(obj1, obj2, typeTo) {
    var wheres = [];
    for (var i=0; i < 2; i++) {
        var obj = arguments[i];
        if (obj.position !== undefined) {    // if it's a character
            wheres.push({corner:{x: obj.position.x - obj.image.width/2,
                                 y: obj.position.y - obj.image.height/2}, // HY!!! must the operation be subtract??
                                 // Oh, because to the canvas, the coordinate system is a bit different,
                                 //AND IT DRAWS FROM TOP TO BOTTOM, the top is LESS positive, and thus a SMALLER number!!!
                                 //OH ho oh
                        change:{x: obj.image.width,
                                y: obj.image.height}});
        }
        else {  // if it's a block
            wheres.push(obj.where);
        }
        if (showBoundingBox) {
            gameArea.strokeRect(wheres[i].corner.x, wheres[i].corner.y, wheres[i].change.x, wheres[i].change.y);
        }
    }
    
    if (typeTo == "vertical"){
        if (isCollision(obj1, obj2) &&  // if there is and actual collision
            !(wheres[0].corner.y > wheres[1].corner.y+wheres[1].change.y ||
            wheres[1].corner.y > wheres[0].corner.y+wheres[0].change.y)) {   // if it actually collides in the y direction
                if (wheres[0].corner.y+wheres[0].change.y/2 > wheres[1].corner.y+wheres[1].change.y/2) {   // obj1 should be above obj2           // is the < and > confusing? sorry!, its because of converting from canvas to cartesian styles
                    console.log("Collided from Character's Bottom");
                    return (wheres[1].corner.y+wheres[1].change.y - wheres[0].corner.y + 1);    // +1 for safety
                }
                else if (wheres[0].corner.y+wheres[0].change.y/2 < wheres[1].corner.y+wheres[1].change.y/2) {   // obj1 should be beneath obj2; Wall's COM is most positive to you
                    console.log("Collided from Character's Top");
                    return -(wheres[0].corner.y+wheres[0].change.y - wheres[1].corner.y + 1);   // +1 for safety
                }
                else {
                    console.log("Collision at Y-Axis Center Of Mass");
                    return 0;   // needs work
                    // Work taken care of at reacts(). Pretty sure it works.
                    // Probably fails when objects overlap, and centers are the same 
                }
            }
        else {
            return 0;
        }
    }
    else if (typeTo == "horizontal"){
        if (isCollision(obj1, obj2) &&  // if there is and actual collision
            !(wheres[0].corner.x > wheres[1].corner.x+wheres[1].change.x ||
            wheres[1].corner.x > wheres[0].corner.x+wheres[0].change.x)) {   // if it actually collides in the x direction
                if (wheres[0].corner.x+wheres[0].change.x/2 > wheres[1].corner.x+wheres[1].change.x/2) {   // obj1 should be right of obj2
                    console.log("Collided from Character's Left");
                    return (wheres[1].corner.x+wheres[1].change.x - wheres[0].corner.x + 1);    // +1 for safety
                }
                else if (wheres[0].corner.x+wheres[0].change.x/2 < wheres[1].corner.x+wheres[1].change.x/2) {   // obj1 should be left of obj2
                    console.log("Collided from Character's Right");
                    return -(wheres[0].corner.x+wheres[0].change.x - wheres[1].corner.x + 1);   // +1 for safety
                }
                else {
                    console.log("Collision at X-Axis Center Of Mass");
                    return 0;
                }
            }
        else {
            return 0;
        }
    }
    else if (typeTo == "Vector"){
        return new Vector(
			isCollision(obj1, obj2, "horizontal"),
			isCollision(obj1, obj2, "vertical")
        );
    }
    
    return !(wheres[0].corner.x > wheres[1].corner.x+wheres[1].change.x ||
            wheres[1].corner.x > wheres[0].corner.x+wheres[0].change.x ||
            wheres[0].corner.y > wheres[1].corner.y+wheres[1].change.y ||
            wheres[1].corner.y > wheres[0].corner.y+wheres[0].change.y);
};	// end isCollision function

function simpliflyCollisionVector(v, specs) {
	if (specs == "Vector") {
		if ((Math.abs(v.x) < Math.abs(v.y) || !v.y) && v.x) {
			return new Vector(v.x, 0);
		}
		else if ((Math.abs(v.x) > Math.abs(v.y) || !v.x) && v.y) {
			return new Vector(0, v.y);
		}
		else if (v.x) {
			return new Vector(v.x, v.y);
		}
		else {
			return new Vector(0, 0);
		}
	}
	// else
	if ((Math.abs(v.x) < Math.abs(v.y) || !v.y) && v.x) {
		return "Do x";
	}
	else if ((Math.abs(v.x) > Math.abs(v.y) || !v.x) && v.y) {
		return "Do y";
	}
	else if (possibleDP.x) {
		return "Both";
	}
	else {
		return "Nuthin";
	}
}

var reacts = function() {
	for (var i=0; i<blocksList.length; i++) {
        if (blocksList[i].do) {
        
			blocksList[i].do(time);
        
			// orders of integration. Calculate velocity before position
			blocksList[i].velocity.Plus( blocksList[i].acceleration );
			
			// .where.corner insted of .position
			blocksList[i].where.corner.Plus( blocksList[i].velocity );
        }
    }
	for (var i=0; i<charList.length; i++) {
        //Gravity
        charList[i].forceList.push( physics[mode].gravity );
		
		var numCollisions = blocksList.length;
        for (var j=0; j<blocksList.length; j++) {
            if (isCollision(charList[i], blocksList[j])) {
                blocksList[j].collide(charList[i], isCollision(charList[i], blocksList[j], "Vector"));
                
                if (blocksList[j] === world) { continue; }
                
				// isCollision returns the right amount to stay away from objects
                //var possibleDX = isCollision(charList[i], blocksList[j], "horizontal") * (blocksList[j] !== world);
                //var possibleDY = isCollision(charList[i], blocksList[j], "vertical") * (blocksList[j] !== world);
                var possibleDP = isCollision(charList[i], blocksList[j], "Vector");
                var TriangleP = new Vector(0, 0);
                
                //Normal Force
                if ((Math.abs(possibleDP.x) < Math.abs(possibleDP.y) || !possibleDP.y) && possibleDP.x) {          // least drastic change is in x. Not Zerosos
					TriangleP = someOtherProduct(
						possibleDP,
						new Vector(1, 0)
                    );
                    console.log("HORIZONTAL COLLISION");
                    charList[i].canJump.x = physics[mode].jumpFrom.x[(possibleDP.x>0)+0];       // the +0 might help cast the result to a number. I don't know if it actually matters, I mean, this is Javascript :J
                                                                                        // Okay, yes it does. ...y[true] = undefined. Also, true+0 = 1, and there were problems when canJump.x is boolean
                    charList[i].velocity.x*=blocksList[j].bouncieness;     // bump
                }
                else if ((Math.abs(possibleDP.x) > Math.abs(possibleDP.y) || !possibleDP.x) && possibleDP.y) {     // least drastic change is in y. Not Zeros
                    TriangleP = someOtherProduct(
						possibleDP,
						new Vector(0, 1)
                    );
                    console.log("VERTICAL COLLISION");
                    charList[i].canJump.y = physics[mode].jumpFrom.y[(possibleDP.y>0)+0];       // the +0 casts the result to a number
                    charList[i].velocity.y*=blocksList[j].bouncieness;     // bouncy
                }
                else if (possibleDP.x) {                                  // equal change in x and y. Not Zero. Sorta like diagonal
					TriangleP = someOtherProduct(
						possibleDP,
						new Vector(1, 1)
                    );
                    console.log("DIAGONAL COLLISION");
                }
                /*
                charList[i].velocity = someOtherProduct(
					charList[i].velocity,
					scalarMultiply(
						blocksList[j].bouncieness,
						signForVectors( charList[i].normalForce )
					)
                );*/
                charList[i].position.Plus( TriangleP );
                var NForce = new Vector(0, 0);
                if ( !TriangleP.isZero() ) {
					NForce = projectionDirection(sumVectors(charList[i].forceList), TriangleP);
					//charList[i].acceleration.Plus( NForce );
				}
                /*alert(
					"TriangleP: " + TriangleP + "\n" +
					"NForce: " + NForce + "\n\n" + 
					"Net force: " + sumVectors(charList[i].forceList)
				);*/
                //charList[i].velocity.Scale(blocksList[j].bouncieness);
                
//                charList[i].friction.x = charList[i].normalForce.y*blocksList[j].mu*((charList[i].velocity.x>0)*2-1);   // Trippy Friction
//                charList[i].friction.y = charList[i].normalForce.x*blocksList[j].mu*((charList[i].velocity.y>0)*2-1);   // Trippy Friction
				/*charList.friction = scalarMultiply(
					sign(blocksList[j].mu),
					someOtherProduct(
						minAbsOfVectors(
							scalarMultiply(
								blocksList[j].mu,
								componentSwap(charList[i].normalForce)
							),
							charList[i].velocity
						),
						signForVectors(charList[i].velocity)
					)
				);*/
                charList[i].friction.x = Math.min(
                    Math.abs(TriangleP.y*blocksList[j].mu),   // Actual Friction
                    Math.abs(charList[i].velocity.x)
                )*sign(charList[i].velocity.x)*sign(blocksList[j].mu);
                charList[i].friction.y = Math.min(
                    Math.abs(TriangleP.x*blocksList[j].mu),   // Actual Friction
                    Math.abs(charList[i].velocity.y)
                )*sign(charList[i].velocity.y)*sign(blocksList[j].mu);
                charList[i].velocity.x += charList[i].friction.x;
                //charList[i].velocity.y += charList[i].friction.y;
            }
			else {numCollisions--;}
        }
		if (!numCollisions) {
			charList[i].canJump.x = charList[i].canJump.y = false;
		}
/*        for (var j=0; j<charList.length; j++) {
            if (i == j) {
                continue;
            }
            if (isCollision(charList[i], charList[j])) {
                charList[j].collide(charList[i]);
            }
            // no longer the need for while(collision). isCollision returns the right amount to stay away from objects
                //var possibleDX = isCollision(charList[i], charList[j], "horizontal") * (charList[j] !== world);
                //var possibleDY = isCollision(charList[i], charList[j], "vertical") * (charList[j] !== world);
                var possibleDP = scalarMultiply(
                    blocksList[j] !== world,
                    new Vector (
                        isCollision(charList[i], charList[j], "horizontal"),
                        isCollision(charList[i], charList[j], "vertical")
                    )
                );
                
                //Normal Force
                if ((Math.abs(possibleDP.x) < Math.abs(possibleDP.y) || !possibleDP.y) && possibleDP.x) {          // least drastic change is in x. Not Zerosos
                    charList[i].normalForce.x = possibleDP.x;
                    charList[i].position.x += charList[i].normalForce.x;
                    console.log("HORIZONTAL COLLISION");
                    charList[i].canJump.x = physics[mode].jumpFrom.x[(possibleDP.x>0)+0];       // the +0 might help cast the result to a number. I don't know if it actually matters, I mean, this is Javascript :J
                                                                                        // Okay, yes it does. ...y[true] = undefined. Also, true+0 = 1, and there were problems when canJump.x is boolean
                    charList[i].velocity.x*=charList[j].bouncieness;     // bump
                }
                else if ((Math.abs(possibleDP.x) > Math.abs(possibleDP.y) || !possibleDP.x) && possibleDP.y) {     // least drastic change is in y. Not Zeros
                    charList[i].normalForce.y = possibleDP.y;
                    charList[i].position.y += charList[i].normalForce.y;
                    console.log("VERTICAL COLLISION");
                    charList[i].canJump.y = physics[mode].jumpFrom.y[(possibleDP.y>0)+0];       // the +0 casts the result to a number
                    charList[i].velocity.y*=charList[j].bouncieness;     // bouncy
                }
                else if (possibleDP.x) {                                  // equal change in x and y. Not Zero. Sorta like diagonal
                    charList[i].normalForce.x = possibleDP.x;
                    charList[i].position.x += charList[i].normalForce.x;
                    charList[i].normalForce.y = possibleDP.y;
                    charList[i].position.y += charList[i].normalForce.y;
                    console.log("DIAGONAL COLLISION");
                }
                
//                charList[i].friction.x = charList[i].normalForce.y*charList[j].mu*((charList[i].velocity.x>0)*2-1);   // Trippy Friction
                charList[i].friction.x = Math.min(
                    Math.abs(charList[i].normalForce.y*charList[j].mu),   // Actual Friction
                    Math.abs(charList[i].velocity.x)
                )*sign(charList[i].velocity.x)*sign(charList[j].mu);
                charList[i].velocity.x += charList[i].friction.x;
//                charList[i].friction.y = charList[i].normalForce.x*charList[j].mu*((charList[i].velocity.y>0)*2-1);   // Trippy Friction
                charList[i].friction.y = Math.min(
                    Math.abs(charList[i].normalForce.x*charList[j].mu),   // Actual Friction
                    Math.abs(charList[i].velocity.y)
                )*sign(charList[i].velocity.y)*sign(charList[j].mu);
                //charList[i].velocity.y += charList[i].friction.y;
                
                charList[i].velocity.x *= (Math.abs(charList[i].velocity.x)>1) + 0;
                charList[i].velocity.y *= (Math.abs(charList[i].velocity.y)>1) + 0;
        }*/
        
        // Calculate Net Forces
           charList[i].acceleration.Plus( sumVectors(charList[i].forceList) );
        
        // orders of integration. Calculate acceleration before velocity
        charList[i].velocity.Plus( charList[i].acceleration );
		// Restart forces
		charList[i].acceleration = new Vector(0, 0);
		charList[i].forceList = [];
		
        // orders of integration. Calculate velocity before position
        
        // cap the velocity so things dont get too wild
        // unless you want it to be like rockets
        charList[i].velocity = someOtherProduct(
            minAbsOfVectors( charList[i].velocity, charList[i].maxVelocity ),
            signForVectors(charList[i].velocity)
        );
		
		// Is it too small?
		charList[i].velocity.x *= (Math.abs(charList[i].velocity.x)>1) + 0;
		charList[i].velocity.y *= (Math.abs(charList[i].velocity.y)>1) + 0;
		
        charList[i].position.Plus( charList[i].velocity );
    }
};	// end reacts function