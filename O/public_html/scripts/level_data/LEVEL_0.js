function LEVEL_0(currentLevel, currentQuadrant) {
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
}