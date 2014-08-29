function LEVEL_4(currentLevel, currentQuadrant) {
			switch (currentQuadrant) {
				case 1:
					mode = "mario";
					world.size.where.corner.x = 0;
					world.size.where.change = new Vector(5000, 750);
					scoochScreen(4500, 0);
					jimmy = new character(4750, -200, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = -1;
					new movingBlock(4500, -250, 300, 20,	// upwards
						function(t){
							this.acceleration.y = (t===5)?2:(t==95)?-2:0;
						}
					);
					new wall(4500, -300, 500, 50);		// floor next to elevator
					new wall(5000, -250, 50, 800);		// wall right of the elevator
					new wall(2000, -250, 2500, 200);	// big block that you walk on most of the time
					new wall(3200, 310, 1800, 200);		// other big block, but on the ceiling
					new wall(3480, -50, 80, 50);		// step here before lava
					new dangerblock(3210, -50, 270, 15);// the lava
					new wall(3340, 200, 80, 110);		// step on ceiling to advoid the lava
					new wall(2600, 310, 640, 200);		// ... and the ceiling resumes
					new wall(3200, -50, 80, 50);		// second ground stepping stone
					new dangerblock(2700, -50, 500, 15);// more lava on the floor
					new wall(2990, 260, 90, 50);		// stepping stone on ceiling 2
					new dangerblock(2900, 290, 90, 20);	// static lava, in place of lava animated
					var al = new movingBlock(2920, 280, 60, 30);// animated lava
						al.color = "#660000";
						al.collide = function(who) {	// copy n pasted from dangerblock
							if (who==jimmy)
							{
								jimmy.health-=2;
							}
						};
						al.do = function(t) {
							t/=10;
							this.acceleration = new Vector(0, 0);
							this.velocity = new Vector(0, 0);
							this.where.corner = new Vector(
								2*Math.pow(
									Math.abs((t+Math.PI/2)%(2*Math.PI) - Math.PI),
									3
								)*Math.cos(t) + 2920,
								
								80*(Math.sin(t)-1) + 280
							);
						};
					new wall(2810, 260, 90, 50);		// stepping stone on ceiling 3
					new wall(2600, 290, 20, 20);		// block so you don't slide after escaping animated lava
					new wall(2000, -50, 700, 30);		// floor elevation levels out to lava
					new wall(1500, 350, 1100, 150);		// ceiling elevation changes
					new wall(1200, -250, 800, 50);		// floor for the little secret area where you get a key
					new wall(1500, -110, 400, 25);		// lower-right wall holding key
					new wall(1875, -85, 25, 150);		// right wall holding key
					new wall(1300, 65, 600, 25);		// top wall holding key
					new wall(1300, -85, 25, 150);		// left wall holding key
					new wall(1300, -110, 100, 25);		// lower-left wall holding key
					new simpleActionBlock(1800, -50, imgGather("images/blueKey.png"),		// key
						function(who) {
							if (who==jimmy) {
								addToInventory( {name:"blueKey", data:this, img:this.image.mario} );
								blocksList.splice( blocksList.indexOf(this), 1 );
							}
						}
					);
					new wall(200, -250, 1000, 200);		// big floor resumes
					
					new simpleActionBlock(1000, -50, imgGather("images/blueButton_up.png"),		// button
						function(who, colsVector) {
							if (who==jimmy) {
								if (findElemWithKey(jimmy.inventory,["name"],"blueKey") > -1 && simpliflyCollisionVector(colsVector)=="Do y" && this.image.mario!=imgGather("images/blueButton_down.png")) {
									removeFromInventory( findElemWithKey(jimmy.inventory,["name"],"blueKey") );
									this.image.invert = this.image.mario = imgGather("images/blueButton_down.png");
									this.where.change.y = this.image.mario.height;
									new transitionwall(25, 450, 200, 20, 2);
									new movingBlock(25, 250, 175, 20, function(){},
										function(who, anothercolvector) {
											if (who == jimmy && simpliflyCollisionVector(anothercolvector)=="Do y") {
												new wall(225, 250, 50, 200);
												this.where.change.x = 225;
												this.velocity.y = 1;
											}
										}
									);
								}
							}
						}
					);
					new dangerblock(250, 470, 1250, 30);	// lava on the ceiling, you can't walk up to escape stairs
					new wall(25, 470, 225, 30);		// ceiling again
					new wall(225, 450, 25, 20);		// hit before wall
					// add stairs here - 32 blocks before, subtract one if you have the key
					for (var i=0; i<7; i++) {
						for (var j=0; j<i; j++) {
							new movingBlock(800-1-i*100, -50+j*50, 100+1, 50,
								(function(ii, jj) {
								return function(){
									this.toX = 800-1-ii*100;
									this.toY = -50+jj*50;
									this.to = new Vector(this.toX, this.toY);
									this.acceleration=new Vector(Math.random()/4-0.125, Math.random()/4-0.125);
									this.where.corner = maxOfVectors( minOfVectors(this.where.corner, (new Vector(900, 400))), new Vector(200, -50) );
									if (this.where.corner.x == 900 || this.where.corner.x == 200) {this.velocity.x*=-0.8}
									if (this.where.corner.y == 400 || this.where.corner.y == -50) {this.velocity.y*=-0.8}
									if (findElemWithKey( blocksList, ["image", "mario"], imgGather("images/blueButton_down.png") ) > -1 ){
										this.do = function() {
											this.acceleration = new Vector(0, 0);
											this.velocity = subtractVectors((new Vector(this.toX, this.toY)), this.where.corner).asUnit();
											if (subtractVectors(this.where.corner, (new Vector(this.toX, this.toY))).magnitude() <= 1) {
												this.where.corner = new Vector(this.toX, this.toY);
												this.velocity = new Vector(0, 0);
												this.do = function(){};
											}
										};
									}
								};
								}(i, j))
							);
						}
					}
					new wall(0, -250, 200, 500);		// elevator stands on top of this
					new wall(-25, -250, 50, 800);		// left wall
					break;
				case 2:	//Level4.2
					// this is the top-left corner
					mode = "mario";
					world.size.where.corner = new Vector(0, 0);
					world.size.where.change = new Vector(1000, 3000);
					scoochScreen(500, 2750);
					jimmy = new character(75, 2800, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = 1;
					
					new wall(-50, -25, 1100, 50);	// bottom wall
					new wall(-50, 2975, 1100, 50);	// top wall
					new wall(-25, -50, 50, 3100);	// left wall
					new wall(975, -50, 50, 3100);	// right wall
					
					new wall(0, 2700, 300, 50);		// jimmy stands here
					new wall(500, 1000, 50, 2000);	//divinging the level
					for (var i=0; i<4; i++) {
						new movingBlock(475+300*Math.cos(i*Math.PI/2), 490+300*Math.sin(i*Math.PI/2), 50, 20,
							(function(ii){
								return function(t) {
									this.velocity = new Vector(-2*Math.sin(t/100+ii*Math.PI/2), 2*Math.cos(t/100+ii*Math.PI/2));
								};
							})(i)
						);
					}
					for (var k=0; k<2; k++) {
						for (var j=0; j<3; j++) {
							for (var i=0; i<4; i++) {
								var twirlblock = new movingBlock(263+(k==0?0:500)+75*Math.cos(i*Math.PI/2), 2000-j*500+75*Math.sin(i*Math.PI/2), 40, 20,
									(function(ii){
										return function(t) {
											this.velocity = new Vector(-Math.sin(t/100+ii*Math.PI/2), Math.cos(t/100+ii*Math.PI/2));
										};
									})(i)
								);
								if (i%2 == 0) {
									twirlblock.do = (function(ii){
										return function() {
											this.color = "#660000";
											this.image.invert = this.image.mario = imgGather("images/dangerblock.png");
											this.do = function(t) {
												this.velocity = new Vector(-Math.sin(t/100+ii*Math.PI/2), Math.cos(t/100+ii*Math.PI/2));
											}
										};
									})(i);
									twirlblock.collide = function(who) {
										if (who==jimmy)
										{
											jimmy.health-=2;
										}
									}
								}
							}
						}
					}
					new dangerblock(-500, -250, 50, 250); //bottom left dangerous wall 
					new wall(-350, -100, 50, 100);
					new portal(700, 2800, 100, 100, 5);
					break;
			}
}