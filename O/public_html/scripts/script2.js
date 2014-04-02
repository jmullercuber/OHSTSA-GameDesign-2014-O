var time = 0;
changeLevel();
var update = function() {
    handleInput();
    reacts();
    drawScene();
    drawUserInterface();
    time++;
};

intervalID = setInterval(update, 1000/60);