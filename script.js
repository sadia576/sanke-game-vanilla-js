let board = document.getElementById("board");
let scoreDisplay = document.getElementById("score");
let restartBtn = document.getElementById("restartBtn");
let score = 0;
let rows = 20;
let cols = 20;
let snake = [{ x: 5, y: 5 }];// use array for snake because with passage of time its size increase
let food = { x: 10, y: 10 };
let velocity = { x: 1, y: 0 }// use for direction of snake(x=1 move horizontally left to right & x=-1 it moves from right to left))
let gameOver = false;


// board function 
function createBoard() {
    board.innerHTML = "";
    // create grid cells(rows&cols)
    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < cols; x++) {
            let cell = document.createElement("div");// create single cell 
            cell.classList.add("cell");
            // to check current cell is part of snake use (some) iterate method of array 
            if (snake.some(s => s.x === x && s.y === y)) {
                cell.classList.add("snake");
            }
            //Food ( if current cell is part of food)
            if (food.x === x && food.y === y) {
                cell.classList.add("food");
            }
            // add cell to board
            board.appendChild(cell);
        }
    }
}
createBoard();// call function

// update the game loop
function upadate() {
    if (gameOver) return;
    // new head position 
    let head = {
        x: snake[0].x + velocity.x,
        y: snake[0].y + velocity.y
    };// to move left to rigt  forward snake

    // gameOvercondition
    if (head.x < 0 || head.x >= cols || head.y < 0 || head.y >= rows || snake.some(s => s.x === head.x && s.y === head.y)) {
        gameOver = true;
        document.querySelector("h2").innerText = "Game Over! Final Score: " + score;
    }
    // add new head in  snake array
    snake.unshift(head);

    // Eat Food condition
    if (head.x === food.x && head.y === food.y) {
        score += 10;                // Score increase
        scoreDisplay.textContent = score;
        placeFood(); //new food
    } else {
        // if now food eaten remove last part
        snake.pop();
    }
    createBoard();
}

function placeFood() {// place food randomly
    food = {
        x: Math.floor(Math.random() * cols),
        y: Math.floor(Math.random() * rows)
    }
}

//  keydown controls
document.addEventListener("keydown", e => {
    if (e.code === "ArrowUp" && velocity.y !== 1) {
        velocity = { x: 0, y: -1 }
    } else if
        (e.code === "ArrowDown" && velocity.y !== -1) {
        velocity = { x: 0, y: 1 }
    }
    else if
        (e.code === "ArrowLeft" && velocity.x !== 1) {
        velocity = { x: -1, y: 0 }
    }
    else if
        (e.code === "ArrowRight" && velocity.x !== -1) {
        velocity = { x: 1, y: 0 }
    }
})
createBoard();

// run update function with regular intervals
setInterval(upadate, 200);

// restart game
restartBtn.addEventListener("click", () => {
    snake = [{ x: 5, y: 5 }];
    velocity = { x: 1, y: 0 };
    food = { x: 10, y: 10 };
    score = 0;
    scoreDisplay.textContent = score;
    gameOver = false;
    createBoard();
});
