function LEVEL_5(currentLevel, currentQuadrant) {
			mode = "mario";
			world.size.where.corner = new Vector(-500, -375);
			world.size.where.change = new Vector(1000, 750);
			jimmy = new character(0, -250, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
			jimmy.orientation = 1;
			new wall(-500, -375, 50, 750);		// left wall
			new wall(450, -375, 50, 750);		// right wall
			new wall(-500, 325, 1000, 50);		// top wall
			new wall(-500, -375, 1000, 50);// floor
			
			new simpleActionBlock(0, 0, document.getElementById("2Boss"),
				function(who) {
					if (who==jimmy) {
						jimmy.health-=4;
					}
				},
				function() {
					this.health=4;
					this.do = function() {
						this.velocity = scalarMultiply( 8/this.health, subtractVectors(jimmy.position, addVectors( this.where.corner, new Vector(35, 35) )).asUnit() );
						if (this.health<=0) {
							//removeFromInventory( findElemWithKey(jimmy.inventory,["name"],"blueKey") );
							new portal(this.where.corner.x, this.where.corner.y, 70, 70, 6, 1);
						}
					};
				}
			);
			
			new simpleActionBlock(0, 0, document.getElementById("blueKey"),		// key
				function(who) {
					if (who==jimmy) {
						//addToInventory( {name:"blueKey", data:this, img:this.image.mario} );
						blocksList[findElemWithKey(blocksList, ["image", "mario"], document.getElementById("2Boss"))].health--;
						this.where.corner = new Vector(
							Math.random()*875 - 450,
							Math.random()*650 - 325
						);
						if (blocksList[findElemWithKey(blocksList, ["image", "mario"], document.getElementById("2Boss"))].health <= 0) {
							blocksList.splice(blocksList.indexOf(this), 1);
						}
					}
				}
			);
}