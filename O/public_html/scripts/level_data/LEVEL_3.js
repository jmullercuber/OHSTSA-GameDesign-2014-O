function LEVEL_3(currentLevel, currentQuadrant) {
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
}