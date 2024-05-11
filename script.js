let left = document.querySelector(".left");
let bottom = document.querySelector(".bottom");
let right = document.querySelector(".right");
let up = document.querySelector(".top");

let grid = document.querySelector(".grid");
let popup = document.querySelector(".popup");
let playAgain = document.querySelector(".playAgain");
let scoreDisplay = document.querySelector(".scoreDisplay");

let width = 10;
let currentIndex = 0;
let appleIndex = 0;
let currentSnake = [2, 1, 0];
let direction = 1;
let score = 0;
let speed = 0.8;
let intervalTime = 0;
let interval = 0;




document.addEventListener("DOMContentLoaded", function(){
    document.addEventListener("keyup", control);
    createBoard();
    startGame();

    // //squares[1].classList.add("snake");
    // let squares=document.querySelectorAll(".grid div");
    // console.log(squares);
    // currentSnake.forEach((item) => squares[item].classList.add("snake"));
    // randomApple(squares); 
})


up.addEventListener("click", () => (direction = -width));
bottom.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));


function control(event) {
    console.log(event.key);
    if (event.key === "ArrowRight") {
      direction = 1; 
    } else if (event.key === "ArrowUp") {
      direction = -width;
    } else if (event.key === "ArrowLeft") {
      direction = -1; 
    } else if (event.key === "ArrowDown") {
      direction = +width; 
    }
}

function createBoard() {
    popup.style.display = "none";
    for (let i = 0; i < 100; i++) {
      let div = document.createElement("div");
      if((i%2===0 && Math.floor((i/10))%2===0) || (i%2===1 && Math.floor((i/10))%2===1)){
        div.style.backgroundColor="green";
      }
      else{
        div.style.backgroundColor="greenYellow";
      }
      grid.appendChild(div);
    }

}

  
function randomApple(squares) {
    do {
      appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake"));
    squares[appleIndex].classList.add("apple");
}


function startGame() {
  let squares = document.querySelectorAll(".grid div");
  randomApple(squares);
  //direction = 1;
  scoreDisplay.innerHTML = score;
  //intervalTime = 1000;
  //currentSnake = [2, 1, 0];
  //currentIndex = 0;
  currentSnake.forEach((item) => squares[item].classList.add("snake"));
  interval = setInterval(moveOutcome, intervalTime);
}

function moveOutcome() {
  let squares = document.querySelectorAll(".grid div");
  if (checkForHits(squares)) {
    alert("you hit something");
    popup.style.display = "flex";
    clearScore();
    return clearInterval(interval);
  } else {
    moveSnake(squares);
  }
}


