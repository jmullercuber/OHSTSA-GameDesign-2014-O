function LEVEL_1(currentLevel, currentQuadrant) {
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
}