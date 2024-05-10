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
  
