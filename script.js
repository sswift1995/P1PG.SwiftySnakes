//board
var blockSize = 20;
var rows = 20;
var cols = 20;
var board;
var context;
var drawScore;
var restartGame;
//Snake head
var snakeyX;
var snakeyY;

var velocityX = 0;
var velocityY = 0;

var snakeBody = [];


var score = 0;

//bait
var munchyX;
var munchyY;

var youLose = false;

var score = 0;

var scoreElement;


var spacebarHint = document.getElementById("spacebar-hint");

document.addEventListener("keydown", function(event) {
	if (event.code === "Space") {
		spacebarHint.style.visibility = "hidden";
		startGame();
	}
});

function startGame() {
	var gameScreen = document.getElementById("game-screen");
	gameScreen.style.display = "block";
	// Initialize your game here
}


var play = true;


// Calculating Score function

function drawScore() {
    context.fillStyle = "white";
    context.font = "10px Verdana";
    context.fillText("Score" + score, 5, 20);
    var scoreElement = document.getElementById("score"); // calling the element to score
    drawScore.display;
    updateScore();// update current score

}
function updateScore() {
    var scoreElement = document.getElementById("score"); // calling the element to score
    scoreElement.innerHTML = "Score: " + score;
}
//Calling the movement 

window.onload = function () {
    board = document.getElementById("board");
    board.height = rows * blockSize;
    board.width = cols * blockSize;
    context = board.getContext("2d"); //drawing on the board

    snakeyX = blockSize * 3;
    snakeyY = blockSize * 3;

    placeFood();
    document.addEventListener("keyup", changeDirection);
    // Add event listener to button
    document.getElementById("restart-button").addEventListener("click", restartGame);

    currentGame = setInterval(startGame, 100);
}

//Operating Objects
function startGame() {
    if (youLose) {
        return;
    }

    drawScore();
    context.fillStyle = "black";
    context.fillRect(0, 0, board.width, board.height);

    context.fillStyle = "pink";
    context.fillRect(munchyX, munchyY, blockSize, blockSize);

    if (snakeyX == munchyX && snakeyY == munchyY) {
        snakeBody.push([munchyX, munchyY]);
        score += 2;
        placeFood();
    }

    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    if (snakeBody.length) {
        snakeBody[0] = [snakeyX, snakeyY];
    }

    context.fillStyle = "teal";
    snakeyX += velocityX * blockSize;
    snakeyY += velocityY * blockSize;
    context.fillRect(snakeyX, snakeyY, blockSize, blockSize);
    for (let i = 0; i < snakeBody.length; i++) {
        context.fillRect(snakeBody[i][0], snakeBody[i][1], blockSize, blockSize);


    }


    //You lose conditioning


    if (snakeyX < 0 || snakeyX > cols * blockSize || snakeyY < 0 || snakeyY > rows * blockSize) {
        youLose = true;
        // Stop ongoing game loop
        clearInterval(currentGame);
        showGameOverMessage();
        updateScore();

    }

    for (let i = 0; i < snakeBody.length; i++) {
        if (snakeyX == snakeBody[i][0] && snakeyY == snakeBody[i][1]) {
            youLose = true;
            // Stop ongoing game loop
            clearInterval(currentGame);
            showGameOverMessage();
            updateScore();
        }
    }

}

function showGameOverMessage()
{
    //Create a div centered inside the board canvas with specific width and hight that are smaller than the canvas 
    //Inside the div add a h1 to show the score and game over Ok button to dismiss the div // CSS visiability: hidden 

}

//Function controls Arrows
function changeDirection(s) {
    if (s.code == "ArrowUp" && velocityY != 1) {
        velocityX = 0;
        velocityY = -1;
    }
    else if (s.code == "ArrowDown" && velocityY != -1) {
        velocityX = 0;
        velocityY = 1;
    }
    else if (s.code == "ArrowLeft" && velocityX != 1) {
        velocityX = -1;
        velocityY = 0;
    }
    else if (s.code == "ArrowRight" && velocityX != -1) {
        velocityX = 1;
        velocityY = 0;
    }
}



function placeFood() {
    munchyX = Math.floor(Math.random() * cols) * blockSize;
    munchyY = Math.floor(Math.random() * rows) * blockSize;
}

//snakeBody collision function
function collision(head, array) {
    for (let i = 0; i < array.length; i++) {
        if (snakeyX == array[i].x && snakeyY == array[i].y) {
            return true;
        }
    }
    return false;
}

// Draw function for canvas

function draw() {

    for (var i = 0; i < snakeyX.length; i++) {
        ctx.fillStyle = "white";
        ctx.fillRect(snakeyX[i].x, snakeyX[i].y, blockSize, blockSize);
    }
}


// Define function to handle button click event
function restartGame() {

    console.log("restarting ...")
    // Reset score
    score = 0;
    youLose = false;
    snakeyX = blockSize * 3;
    snakeyY = blockSize * 3;
    draw()
    placeFood()
    currentGame = setInterval(startGame, 100);
    console.log("Game restarted!");
}



var myAudio = document.getElementById("game Music");

function onKeyDown(event) {
    switch (event.keyCode) {
        case 32: //SpaceBar                    
            if (play) {
                myAudio.pause();
                play = false;
            } else {
                myAudio.play();
                play = true;
            }
            break;
    }
    return false;
}

window.addEventListener("keydown", onKeyDown, false);

