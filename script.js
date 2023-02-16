//board
var blockSize = 25;
var rows = 25;
var cols = 25;
var board;
var context;


//Snake head
var snakeyX = blockSize * 3;
var snakeyY = blockSize * 3;

var velocityX = 0;
var velocityY = 0;

//bait
var munchyX; 
var munchyY;


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

function update(){
    context.fillStyle="black";
    context.fillRect(0,0, board.width, board.height);

    context.fillStyle= "teal";
    snakeyX += velocityX;
    snakeyY += velocityY;
    context.fillRect(snakeyX, snakeyY, blockSize,blockSize);

    context.fillStyle="pink";
    context.fillRect(munchyX, munchyY, blockSize, blockSize);
}

function changeDirection(s){
    if (s.code == "ArrowUp"){
        velocityX = 0;
        velocityY = -1;
    }
    else if (s.code == "ArrowDown"){
        velocityX = 0;
        velocityY = 1;
    }
    else if (s.code == "ArrowLeft"){
        velocityX = -1;
        velocityY = 0;
    }
    else if(s.code == "ArrowRight"){
        velocityX = 1;
        velocityY = 0;
    }
} 



function placeFood() {
    munchyX = Math.floor(Math.random() * cols) * blockSize;
    munchyY = Math.floor(Math.random()* rows) * blockSize;
}