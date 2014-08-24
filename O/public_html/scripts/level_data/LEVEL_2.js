function LEVEL_2(currentLevel, currentQuadrant) {
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
					
					new simpleActionBlock(470, -30, imgGather("images/Spitter.png"), function(){},
						function(t) {
							if (t%50 == 49) {
								new simpleActionBlock(493, -7, imgGather("images/Spit Fire.png"),
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
					new simpleActionBlock(380, -1000, imgGather("images/Skipe.png"),		// Spike!
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
					new simpleActionBlock(1080, -1000, imgGather("images/Skipe.png"),		// Second spike
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
}