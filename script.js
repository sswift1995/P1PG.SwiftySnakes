//board
var blockSize = 25;
var rows = 25;
var cols = 25;
var board;
var context;
var drawScore;

//Snake head
var snakeyX = blockSize * 3;
var snakeyY = blockSize * 3;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];


var score = 0;

//bait
var munchyX; 
var munchyY;

var youLose = false;

//Calling the movement 
window.onload = function() {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //drawing on the board
    
    placeFood();
    document.addEventListener("keyup", changeDirection);
    
    //update();
    setInterval(update,1000/10); //100 millisec
}

//Operating Objects

function update() {

if (youLose){
    return;
}

    context.fillStyle="black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle="pink";
    context.fillRect(munchyX, munchyY, blockSize, blockSize);

if (snakeyX == munchyX && snakeyY == munchyY){
    snakeBody.push([munchyX, munchyY]);
    placeFood();
}
    
for (let i = snakeBody.length-1; i > 0; i--) {
    snakeBody[i] = snakeBody[i-1];
}
if (snakeBody.length){
    snakeBody[0] = [snakeyX, snakeyY];
}

    context.fillStyle= "teal";
    snakeyX += velocityX * blockSize;
    snakeyY += velocityY * blockSize; 
    context.fillRect(snakeyX, snakeyY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) { 
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize,blockSize);
        
    }


//You lose conditioning
if (snakeyX < 0 || snakeyX > cols*blockSize || snakeyY < 0 || snakeyY > rows*blockSize) {
    youLose = true;
    alert("Game Over");
}

for (let i = 0; i < snakeBody.length; i++) {
    if (snakeyX == snakeBody[i][0] && snakeyY == snakeBody[i][1]) {
        youLose = true;
        alert("Game Over");
    }
}

    function newFunction() {
        if (snakeyX === munchyX && snakeyY === munchyY) {
            snakeBody++ +
                score; 1;
        }
    }
}

function drawScore(){
    context.fillStyle = "white";
    context.font = "10px Verdana";
    context.fillText("Score" + score, board.width-50, 10);
}

//Function controls Arrows
function changeDirection(s){
    if (s.code == "ArrowUp" && velocityY != 1){
        velocityX = 0;
        velocityY = -1;
    }
    else if (s.code == "ArrowDown" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
    }
    else if (s.code == "ArrowLeft" && velocityX != 1){
        velocityX = -1;
        velocityY = 0;
    }
    else if(s.code == "ArrowRight" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
    }
} 


 
function placeFood() {
    munchyX = Math.floor(Math.random() * cols) * blockSize;
    munchyY = Math.floor(Math.random()* rows) * blockSize;
}