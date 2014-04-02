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
			switch (currentQuadrant) {
				case 1:	// home screen
					mode = "mario";
					jimmy = new character(-300, 200, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = 1;
					new wall(-400, 50, 875, 30);	// jimmy stands here	// walk to how to play
					new text("Welcome to O", -75, 180, 20);
					new text("Press the right arrow key", 110, 120, 12);
					new text("How to play  -->", 110, 150, 12);
					new movingBlock(-475, 50, 75, 25,	// up and down
						function(t) {
							if (this.where.corner.y<-250 || this.where.corner.y>70) {
								this.velocity.y *= -1;
							}
						},
						function(who) {
							if (who == jimmy) {
								this.mu=-0.5;
								this.velocity.y = -1;
								this.collide = function(who){
									if (who) {
										who.position.Plus( this.velocity );
									}
								};
							}
						}
					);
					new transitionwall(300, 90, 120, 120, 2);
					for (var i=0; i<5; i++) {
						new text("Level " + (i+1), -345+175*i, -230, 16);
						var p = new portal(175*i-375, -225, 175, 20, i+1, 1);
							p.image.mario = p.image.invert = document.getElementById("blockPic");
						new wall(175*i-400, -225, 25, 145);
						new movingBlock(175*i-400, -105, 175, 25,	// up and down
							function() {this.tme=0; this.do = function(){};},
							function(who) {
								if (who == jimmy) {
									this.tme++;
								}
								if (this.tme>=30) {
									this.mu=-0.5;
									this.velocity.y = -0.5;
									this.collide = function(who){
										if (who) {
											who.position.Plus( this.velocity );
										}
									};
								}
							}
						);
					}
					new wall(-500, 225, 1000, 25);  // ceiling
					new wall(-500, -250, 1000, 25);  // ground
					new wall(-500, -250, 25, 500);  // left wall
					new wall(475, -250, 25, 500);  // right wall
					break;
				case 2:
					mode = "mario";
					jimmy = new character(-400, -75, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = 1;
					new wall(-500, -250, 100, 100);	// jimmy stands here
					new text("How to play (1):", -450, 180, 20);
					new text("As you can see, you use the left and right arrow keys to move", -440, 160, 12);
					new text("But you can also take advantage of Shift to accelerate", -435, 145, 12);
					new transitionwall(400, -225, 150, 150, 3);
					new wall(-500, 225, 1000, 25);  // ceiling
					new wall(-500, -250, 1000, 25);  // ground
					new wall(-500, -250, 25, 500);  // left wall
					new wall(475, -250, 25, 500);  // right wall
					break;
				case 3:
					mode = "mario";
					jimmy = new character(-400, -75, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = 1;
					new wall(-500, -250, 200, 100);	// jimmy stands here
					new wall(-50, -250, 100, 100);	// jump
					new wall(300, -250, 200, 100);	// gap
					new text("How to play (2):", -450, 180, 20);
					new text("Use the space bar to jump", -450, 160, 12);
					new transitionwall(400, -150, 150, 150, 4);
					new wall(-500, 225, 1000, 25);  // ceiling
					new wall(-500, -250, 1000, 25);  // ground
					new wall(-500, -250, 25, 500);  // left wall
					new wall(475, -250, 25, 500);  // right wall
					break;
				case 4:
					mode = "mario";
					jimmy = new character(-400, -75, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = 1;
					new wall(300, -250, 200, 300);	// shelf
					new text("How to play (3):", -450, 180, 20);
					new text("When the time is right, you will find yourself using \"G\"", -450, 160, 12);
					new transitionwall(400, 50, 150, 150, 5);
					new wall(-500, 225, 1000, 25);  // ceiling
					new wall(-500, -250, 1000, 25);  // ground
					new wall(-500, -250, 25, 500);  // left wall
					new wall(475, -250, 25, 500);  // right wall
					break;
				case 5:
					mode = "mario";
					jimmy = new character(-400, -75, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = 1;
					new wall(300, -50, 200, 100);	// broken-shelf
					new text("How to play (4):", -450, 180, 20);
					new text("If you chose, totally optional, you can use \"F\" in combination with \"G\"", -450, 160, 12);
					new transitionwall(400, 50, 150, 150, 6);
					new transitionwall(400, -200, 150, 150, 6);
					new wall(-500, 225, 1000, 25);  // ceiling
					new wall(-500, -250, 1000, 25);  // ground
					new wall(-500, -250, 25, 500);  // left wall
					new wall(475, -250, 25, 500);  // right wall
					break;
				case 6:
					mode = "mario";
					jimmy = new character(-400, -75, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = 1;
					new wall(-500, -250, 200, 100);	// jimmy stands here
					new dangerblock(-50, -225, 100, 10);	// jump
					new wall(300, -250, 200, 100);	// gap
					new text("How to play (5):", -450, 180, 20);
					new text("This is an example of a simple obstacle: Lava", -450, 160, 12);
					new text("Standing on it will deplete your health.", -450, 145, 12);
					new text("So be careful!", -430, 130, 12);
					new transitionwall(400, -150, 150, 150, 7);
					new wall(-500, 225, 1000, 25);  // ceiling
					new wall(-500, -250, 1000, 25);  // ground
					new wall(-500, -250, 25, 500);  // left wall
					new wall(475, -250, 25, 500);  // right wall
					break;
				case 7:
					mode = "mario";
					jimmy = new character(-400, -75, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
						jimmy.orientation = 1;
					new text("How to play (6):", -450, 180, 20);
					new text("Oh, did I mention restarting brings you to the begining of the level!", -450, 160, 12);
					new text("There's a distinction between scene and level", -450, 145, 12);
					new text("This is just the begining and there is much more to come", -450, 120, 12);
					new text("Continue at will..", -400, 105, 12);
					new transitionwall(400, -200, 150, 150, 0);
					new wall(-500, 225, 1000, 25);  // ceiling
					new wall(-500, -250, 1000, 25);  // ground
					new wall(-500, -250, 25, 500);  // left wall
					new wall(475, -250, 25, 500);  // right wall
					break;
				default:
					changeLevel(0, 1);
					break;
			}
			break;
        case 1:	// level1
			switch (currentQuadrant) {
				case 1:	// level1.1
                    mode = "mario";
                    world.size.where.change.x = 1100;
                    jimmy = new character(-450, -150, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
                        jimmy.orientation = 1;
                    for (var i=1; i<=4; i++) {
                        new wall (-450+i*70, -225, 65, i*60);
                    }
					new wall (-100, -225, 65, 400);
					new dangerblock(-490, 240, 300, 10);
                    for (i=1; i<=4; i++) {
                        new wall (-10+i*70, 250-i*60, 65, i*60);
                    }
                    new wall (340, -150, 65, 400);
					new dangerblock(-25, -225, 275, 10);
                    new wall(-500, 251, 1500, 25);  // ceiling
                    new wall(-500, -250, 1500, 25);  // ground
                    new wall(-525, -250, 25, 500);  // left wall // positioned to be hidden
                    new transitionwall(500, -225, 25, 450); // continue to quad2
                    break;
                case 2: //level 1.2
					mode = "mario";
                    world.size.where.change.x = 1250;
                    //world.size.where.change.y = 1500;
                    jimmy = new character(-450, -150, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
                        jimmy.orientation = 1;
                    for (var i=1; i<=4; i++) {
                        new wall (-450+i*70, -225, 71, i*50);
                    }
                    new text("Some Blocks Move...", -420, 85, 24);
					new dangerblock(-490, 240, 800, 10);	
                    new dangerblock(400, 100, 25, 150);	// slot left
                    new dangerblock(500, 100, 25, 150);	// slot right
					new dangerblock(-25, -225, 275, 10);
                    new wall(-500, 251, 1500, 25);  // ceiling
                    new wall(-500, -250, 1500, 25);  // ground
                    new wall(-525, -250, 25, 500);  // left wall // positioned to be hidden
                    new wall(725, -250, 25, 500);  // right wall
                    new movingBlock(-100, -160, 75, 10,	// upwards, then sideways
						function(t){
							this.acceleration.x = (t==350)?5:0;
							this.acceleration.y = (t==300)?2:(t==350)?-2:0;
						}
					);
                    new movingBlock(-124, 219, 75, 10,	// upwards, then sideways
						function(t){
							this.acceleration.x = (t==350)?5:0;
						}
					);
                    new wall(500, -50, 25, 75);	// blocking you to move
                    new movingBlock(425, -225, 75, 10,	// upwards
						function(t){
							this.acceleration.y = (t==550)?5:0;
							if (t==650) {
								new text("If you missed it,", 510, -150, 12);
								new text("you can always press R", 510, -165, 12);
								new text("to restart the sub-level", 510, -180, 12);
							}
						}
					);
                    new transitionwall(425, 225, 75, 25, 3); //move ssideways
                    new wall(375, 150, 25, 100);	// blocking you to move
                    
                    break;
				case 3: //level1.3
                    mode = "mario";
                    world.size.where.change.x = 1100;
                    jimmy = new character(-450, -130, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
                        jimmy.orientation = 1;
                    new dangerblock(-500, 230, 1100, 200);	
                    new dangerblock(-1000, -300, 2000, 50);	
					new wall(-500, 251, 1500, 25);  // ceiling
                    new wall(-500, -250, 1500, 25);  // ground
                    new wall(-550, -250, 50, 500);	// left wall
                    new wall(600, -250, 50, 500);	// right wall
					
					// The first moving layer goes slowly
					var width;
					var xcoor=-480;
					for (var i=1; i<=10; i++) {
						width = Math.floor(Math.random()*71)+50;	// width is from 50 to 120
						new movingBlock(xcoor, -250, width, 10,
							function(t) {
								this.acceleration.y = (t==Math.floor(Math.random()*60)+30)?2:0;
							}
						);
						xcoor += 75 + width;
					}
					
					// The second moving layer goes faster
					xcoor=-480;
					for (var i=1; i<=10; i++) {
						width = Math.floor(Math.random()*71)+50;	// width is from 50 to 120
						new movingBlock(xcoor, -250, width, 10,
							function(t) {
								this.acceleration.y = (t==Math.floor(Math.random()*60)+30+340)?3.5:0;
							}
						);
						xcoor += 75 + width;
					}
					
					// The third moving layer goes fast
					xcoor=-480;
					for (var i=1; i<=10; i++) {
						width = Math.floor(Math.random()*71)+50;	// width is from 50 to 120
						new movingBlock(xcoor, -250, width, 10,
							function(t) {
								this.acceleration.y = (t==Math.floor(Math.random()*60)+30+573)?5:0;
							}
						);
						xcoor += 75 + width;
					}
					
					// At last, the floor moves and a portal appers
					new movingBlock(-500, -250, 1100, 25,
						function(t) {
							this.acceleration.y = (t==663)?2:0;
							if (t==663) {
								// possibly include a text arrow
								new portal(453, 80, 150, 150);
							}
						}
					);
					
					break;
			}
			break;
		
        case 2:	// Level2	// Jorge's
            switch (currentQuadrant) {
                case 1:	// Level2.1
					mode = "mario";
					world.size.where.corner = new Vector(0, -550);
					world.size.where.change = new Vector(3000, 1750);
					scoochScreen(500,0);
					jimmy = new character(100, 50, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
					new wall(-50, world.size.where.corner.y, 50, world.size.where.change.y);		// right wall
					new wall(3000, world.size.where.corner.y, 25, world.size.where.change.y);		// left wall
					new dangerblock(0, world.size.where.corner.y + world.size.where.change.y-50, 3000, 50);		// top wall
					new dangerblock(0, world.size.where.corner.y, 3000, 200);// lava floor
					
					new wall(0, -350, 300, 350);		// starting block
					new movingBlock(305, -30, 150, 20,	// first moving platform, side to side
						function(t) {
							if (this.where.corner.x<300 || this.where.corner.x>850) {
								this.velocity.x *= -1;
							}
						},
						function(who) {
							if (who == jimmy) {
								this.mu=-0.7;
								this.velocity.x = 2;
								this.collide = function(who){
									if (who) {
										who.position.Plus( this.velocity );
									}
								};
							}
						}
					);
					new wall(1000, -50, 50, 125);		// blocking you to move
					new movingBlock(1055, 45, 150, 50,	// up and down
						function(t) {
							if (this.where.corner.y<45 || this.where.corner.y>1000) {
								this.velocity.y *= -1;
							}
						},
						function(who) {
							if (who == jimmy) {
								this.mu=-0.7;
								this.velocity.y = 2;
								this.collide = function(who){
									if (who) {
										who.position.Plus( this.velocity );
									}
								};
							}
						}
					);
					new dangerblock(1000, 1100, 300, 100);	// important lava
					new movingBlock(1250, -110, 250, 30,	// another, side to side
						function(t) {
							if (this.where.corner.x<1200 || this.where.corner.x>2000) {
								this.velocity.x *= -1;
							}
						},
						function(who) {
							if (who == jimmy) {
								this.mu=-0.7;
								this.velocity.x = 2;
								this.collide = function(who){
									if (who) {
										who.position.Plus( this.velocity );
									}
								};
							}
						}
					);
					new movingBlock(2050, 10, 100, 30,	// 3rd that moves side to side
						function(t) {
							if (this.where.corner.x<2000 || this.where.corner.x>2700) {
								this.velocity.x *= -1;
							}
						},
						function(who) {
							if (who == jimmy) {
								this.mu=-0.7;
								this.velocity.x = 2;
								this.collide = function(who){
									if (who) {
										who.position.Plus( this.velocity );
									}
								};
							}
						}
					);
					new wall(2800, -275, 200, 300);
					new transitionwall(2950, 25, 50, 50, 2);   // go to 2-2
					break;
				case 2:	// Level2.2
					mode = "mario";
					world.size.where.corner = new Vector(0, -550);
					world.size.where.change = new Vector(3000, 1750);
					scoochScreen(500,0);
					jimmy = new character(100, 50, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
					new wall(-50, world.size.where.corner.y, 50, world.size.where.change.y);		// right wall
					new wall(3025, world.size.where.corner.y, 25, world.size.where.change.y);		// left wall
					new dangerblock(0, world.size.where.corner.y + world.size.where.change.y-50, 3000, 50);		// top wall
					new dangerblock(0, world.size.where.corner.y, 3000, 200);// lava floor
					
					new wall(0, -350, 300, 350);		// starting block
					new movingBlock(305, 0, 150, 20,	// first moving platform, side to side
						function(t) {
							if (this.where.corner.x<300 || this.where.corner.x>850) {
								this.velocity.x *= -1;
							}
						},
						function(who) {
							if (who == jimmy) {
								this.mu=-0.7;
								this.velocity.x = 2;
								this.collide = function(who){
									if (who) {
										who.position.Plus( this.velocity );
									}
								};
							}
						}
					);
					// Stairs
					for (var i=0; i<5; i++) {
						new wall(1000+100*i, -50, 100, 125+100*i);
					}
					for (var i=0; i<3; i++) {
						new movingBlock(1500+175*i, 600-300*i, 150, 30,	// up and down
							function(t) {
								if (this.where.corner.y<-100 || this.where.corner.y>2000) {
									this.velocity.y *= -1;
								}
							},
							function(who) {
								if (who == jimmy) {
									this.mu=-0.7;
									this.velocity.y = -2;
									this.collide = function(who){
										if (who) {
											who.position.Plus( this.velocity );
										}
									};
								}
							}
						);
					}
					new wall(2000, -275, 200, 300);		// get here and proceed to next level
					new transitionwall(2000, 25, 200, 100, 3);   // go to 2-3
					break;
				case 3:	// Level2.3
					mode = "mario";
					world.size.where.corner = new Vector(0, -1000);
					world.size.where.change = new Vector(5000, 2000);
					scoochScreen(500, -525);
					jimmy = new character(50, -750, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
					new wall(-50, world.size.where.corner.y, 50, world.size.where.change.y);		// right wall
					new wall(1950, world.size.where.corner.y, 25, world.size.where.change.y);		// left wall
					new dangerblock(0, world.size.where.corner.y, world.size.where.change.x, 100);// lava on bottom
					new dangerblock(0, world.size.where.corner.y + world.size.where.change.y-100, world.size.where.change.x, 100);		// mirroring lava on top
					
					new simpleActionBlock(470, -30, document.getElementById("spitterPic"), function(){},
						function(t) {
							if (t%50 == 49) {
								new simpleActionBlock(493, -7, document.getElementById("spitFirePic"),
									function(who) {
										if (who==jimmy) {
											jimmy.health-=6;
											blocksList.splice( blocksList.indexOf(this), 1 );
										}
									},
									function() {
										this.velocity = scalarMultiply( 10, subtractVectors(jimmy.position, new Vector(493, -7)).asUnit() );
									}
								);
							}
						}
					);
					
					new wall(0, -1000, 200, 250);		// first platform
					new wall(0, world.size.where.corner.y + world.size.where.change.y - 150, 500, 150);		// simmilar platform on top
					new simpleActionBlock(380, -1000, document.getElementById("lavaSpikePic"),		// Spike!
						function(who) {
							if (who==jimmy) {
								jimmy.health-=5;
							}
						},
						function(t) {
							this.where.corner.y = 400*Math.abs(Math.sin(t/50))-1000;
						}
					);
					new dangerblock(200, world.size.where.corner.y, 400, 200);		// So you can't see spike underlava
					new wall(600, world.size.where.corner.y, 300, 500);		// Second stepping block
					new simpleActionBlock(1080, -1000, document.getElementById("lavaSpikePic"),		// Second spike
						function(who) {
							if (who==jimmy) {
								jimmy.health-=5;
							}
						},
						function(t) {
							this.where.corner.y = 700*Math.abs(Math.sin(t/50))-1000;
						}
					);
					new dangerblock(900, world.size.where.corner.y, 400, 400);		// Hidding second spike
					new wall(1300, world.size.where.corner.y, 700, 800);		// Third stepping block
					new portal(1500, -200, 100, 100, 3);	//transitionwall
            }
            break;
        case 3:	// Level3	// Kehmoni
            switch (currentQuadrant) {
                case 1://3.1
					mode = "mario";
					world.size.where.corner.x = 0;
					world.size.where.corner.y=-1000;
					world.size.where.change = new Vector(5000, 2000);
					scoochScreen(250, 0);
					jimmy = new character(-190, 100, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
					new wall(-250, -90, 135, 75);   //starting platform
					new dangerblock(-250, 400, 1000, 20); //dangerceiling
					new dangerblock(-250, -300, 1000, 20);//dangerfloor
					for (var i=0; i<10; i++) {
						new movingBlock(i*120-90, -250, 75, 10, //falls when touch, bottom
							function() {this.tme=0; this.do = function(){};},
							function(who) {
								if (who == jimmy) {
									this.tme++;
								}
								if (this.tme>=30) {
									this.mu=-0.5;
									this.acceleration.y = -1.5;
									this.collide = function(who){
										if (who) {
											who.position.Plus( this.velocity );
										}
									};
								}
							}
						);
					}
					for (var i=0; i<10; i++) {
						new movingBlock(i*120-90, 300, 75, 10, //falls when touch, bottom
							function() {this.tme=0; this.do = function(){};},
							function(who) {
								if (who == jimmy) {
									this.tme++;
								}
								if (this.tme>=30) {
									this.mu=-0.5;
									this.acceleration.y = 1.5;
									this.collide = function(who){
										if (who) {
											who.position.Plus( this.velocity );
										}
									};
								}
							}
						);
					}
					new portal(630, -50, 100, 100, 4);
					
					break;
                case 2://3.2
					mode = "mario";
					world.size.where.corner.x = 0;
					world.size.where.change = new Vector(5000, 800);
					scoochScreen(500, 0);
					jimmy = new character(35, -23, document.getElementById("charWalkRight"), document.getElementById("charFlyRight"));
					new wall(0, -100, 135, 75);   //starting platform
					new portal(225, -200, 100, 100, 4);   // small portal swasck
					break;
            }
            break;
        case 4://Bossification
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
					new simpleActionBlock(1800, -50, document.getElementById("blueKey"),		// key
						function(who) {
							if (who==jimmy) {
								addToInventory( {name:"blueKey", data:this, img:this.image.mario} );
								blocksList.splice( blocksList.indexOf(this), 1 );
							}
						}
					);
					new wall(200, -250, 1000, 200);		// big floor resumes
					
					new simpleActionBlock(1000, -50, document.getElementById("blueButtonUp"),		// button
						function(who, colsVector) {
							if (who==jimmy) {
								if (findElemWithKey(jimmy.inventory,["name"],"blueKey") > -1 && simpliflyCollisionVector(colsVector)=="Do y" && this.image.mario!=document.getElementById("blueButtonDown")) {
									removeFromInventory( findElemWithKey(jimmy.inventory,["name"],"blueKey") );
									this.image.invert = this.image.mario = document.getElementById("blueButtonDown");
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
									if (findElemWithKey( blocksList, ["image", "mario", "id"], "blueButtonDown" ) > -1 ){
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
					for (var j=0; j<3; j++) {
						for (var i=0; i<4; i++) {
							if (i%2 === 0) {
								new movingBlock(230+75*Math.cos(i*Math.PI/2), 2000-j*500+75*Math.sin(i*Math.PI/2), 40, 20,
									function() {
										this.image.invert = this.image.mario = document.getElementById("dangerblockPic");
										this.do =
											(function(ii){
												return function(t) {
													this.velocity = new Vector(-Math.sin(t/100+ii*Math.PI/2), Math.cos(t/100+ii*Math.PI/2));
												};
											})(i);
									}
								);
							}
							else {
								new movingBlock(230+75*Math.cos(i*Math.PI/2), 2000-j*500+75*Math.sin(i*Math.PI/2), 40, 20,
									(function(ii){
										return function(t) {
											this.velocity = new Vector(-Math.sin(t/100+ii*Math.PI/2), Math.cos(t/100+ii*Math.PI/2));
										};
									})(i),
									function(who) {
										if (who==jimmy)
										{
											jimmy.health-=2;
										}
        
									}
								);
							}
						}
					}
					for (var j=0; j<3; j++) {
						for (var i=0; i<4; i++) {
							if (i%2 === 0) {
								new movingBlock(530+75*Math.cos(i*Math.PI/2), 2000-j*500+75*Math.sin(i*Math.PI/2), 40, 20,
									function() {
										this.image.invert = this.image.mario = document.getElementById("dangerblockPic");
										this.do =
											(function(ii){
												return function(t) {
													this.velocity = new Vector(-Math.sin(t/100+ii*Math.PI/2), Math.cos(t/100+ii*Math.PI/2));
												};
											})(i);
									},
									function(who) {
										if (who==jimmy)
										{
											jimmy.health-=2;
										}
        
									}
								);
							}
							else {
								new movingBlock(530+75*Math.cos(i*Math.PI/2), 2000-j*500+75*Math.sin(i*Math.PI/2), 40, 20,
									(function(ii){
										return function(t) {
											this.velocity = new Vector(-Math.sin(t/100+ii*Math.PI/2), Math.cos(t/100+ii*Math.PI/2));
										};
									})(i)
								);
							}
						}
					}
					new dangerblock(-500, -250, 50, 250); //bottom left dangerous wall 
					new wall(-350, -100, 50, 100);
					new portal(700, 2800, 100, 100, 5);
					break;
            }
            break;
        case 5:	// Level5
			// and this is the final (boss)
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
			
			break;
		case 6:
			changeLevel(0, 1);
			break;
//		default:
//			changeLevel(0, 1);
    }
    
    if (f) {f();}
}