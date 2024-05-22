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
    playAgain.addEventListener("click", replay);
})


up.addEventListener("click", () => (direction = -width));
bottom.addEventListener("click", () => (direction = +width));
left.addEventListener("click", () => (direction = -1));
right.addEventListener("click", () => (direction = 1));



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
  direction = 1;
  scoreDisplay.innerHTML = score;
  intervalTime = 1000;
  currentSnake = [2, 1, 0];
  currentSnake.forEach((item) => squares[item].classList.add("snake"));
  randomApple(squares);
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

function checkForHits(squares) {
  if (
    (currentSnake[0] + width >= width * width && direction === width) ||
    (currentSnake[0] % width === width - 1 && direction === 1) ||
    (currentSnake[0] % width === 0 && direction === -1) ||
    (currentSnake[0] - width <= 0 && direction === -width) ||
    squares[currentSnake[0] + direction].classList.contains("snake")
  ) {
    return true;
  } else {
    return false;
  }
}


function eatApple(squares, tail) {
  if (squares[currentSnake[0]].classList.contains("apple")) {
    squares[currentSnake[0]].classList.remove("apple");
    squares[tail].classList.add("snake");
    currentSnake.push(tail);
    randomApple(squares);
    score++;
    scoreDisplay.innerText = score;
    clearInterval(interval);
    intervalTime = intervalTime * speed;
    interval = setInterval(moveOutcome, intervalTime);
  }
}

function moveSnake(squares) {
  let tail = currentSnake.pop();
  squares[tail].classList.remove("snake");
  currentSnake.unshift(currentSnake[0] + direction);
  eatApple(squares, tail);
  squares[currentSnake[0]].classList.add("snake");
}

function replay(){
  grid.innerHTML = "";
  createBoard();
  startGame();
  popup.style.display = "none";
}

let timesPlayed=0;
function clearScore(){
  timesPlayed++;
  const scoreTable=document.getElementById("scoreTable")
  const tr=document.createElement("tr");
  const td1=document.createElement("td");
  td1.innerText=`Play number ${timesPlayed} score:`
  const td2=document.createElement("td");
  td2.innerText=score;
  tr.append(td1,td2);
  scoreTable.appendChild(tr);
  score=0;
  scoreDisplay.innerText = score;
}


function control(event){
  if (event.key === "ArrowRight") {
    direction = 1;
    document.getElementById("left").style.opacity="1";
    document.getElementById("top").style.opacity="1";
    document.getElementById("bottom").style.opacity="1";
    document.getElementById("right").style.opacity="0.7"; 
    document.getElementById("right").style.backgroundColor="black";
    document.getElementById("left").style.backgroundColor="green";
    document.getElementById("top").style.backgroundColor="green";
    document.getElementById("bottom").style.backgroundColor="green";

  } else if (event.key === "ArrowUp") {
    direction = -width;
    document.getElementById("left").style.opacity="1";
    document.getElementById("top").style.opacity="0.7";
    document.getElementById("bottom").style.opacity="1";
    document.getElementById("right").style.opacity="1"; 
    document.getElementById("right").style.backgroundColor="green";
    document.getElementById("left").style.backgroundColor="green";
    document.getElementById("top").style.backgroundColor="black";
    document.getElementById("bottom").style.backgroundColor="green";

  } else if (event.key === "ArrowLeft") {
    direction = -1;
    document.getElementById("left").style.opacity="0.7";
    document.getElementById("top").style.opacity="1";
    document.getElementById("bottom").style.opacity="1";
    document.getElementById("right").style.opacity="1"; 
    document.getElementById("right").style.backgroundColor="green";
    document.getElementById("left").style.backgroundColor="black";
    document.getElementById("top").style.backgroundColor="green";
    document.getElementById("bottom").style.backgroundColor="green";

  } else if (event.key === "ArrowDown") {
    direction = +width;
    document.getElementById("left").style.opacity="1";
    document.getElementById("top").style.opacity="1";
    document.getElementById("bottom").style.opacity="0.7";
    document.getElementById("right").style.opacity="1";  
    document.getElementById("right").style.backgroundColor="green";
    document.getElementById("left").style.backgroundColor="green";
    document.getElementById("top").style.backgroundColor="green";
    document.getElementById("bottom").style.backgroundColor="black";
  }
}


