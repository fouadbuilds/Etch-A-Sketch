// Comment on Mobile Support at last line
const container = document.querySelector(".container");
const setSizeBtn = document.querySelector(".set-size-btn");
const mode = document.querySelector(".mode-indicator");
const black = document.querySelector(".black");
const eraser = document.querySelector(".eraser");
const gray = document.querySelector(".gray");
const random = document.querySelector(".random");
const reset = document.querySelector(".reset");

let currentColor = "black"; // Default color
let isRandomMode = false; // Flag for random mode

function boardChoice() {
  black.addEventListener("click", () => {
    currentColor = "black";
    isRandomMode = false;
    mode.textContent = 'Color: Black'
  });

  eraser.addEventListener("click", () => {
    currentColor = "white";
    isRandomMode = false;
    mode.textContent = 'Eraser'
  });

  gray.addEventListener("click", () => {
    currentColor = "gray";
    isRandomMode = false;
    mode.textContent = 'Color: Gray'
  });

  random.addEventListener("click", () => {
    isRandomMode = true;
    mode.textContent = 'Color Random'
  });

  reset.addEventListener("click", () => {
    resetBoard()
  })
}

boardChoice();

function populateBoard(size) {
  let board = document.querySelector(".board");
  let box = board.querySelectorAll("div");
  box.forEach((div) => div.remove());

  board.style.gridTemplateColumns = `repeat(${size} , 1fr)`;
  board.style.gridTemplateRows = `repeat(${size} , 1fr)`;

  let amount = size * size;
  for (let i = 0; i < amount; i++) {
    let box = document.createElement("div");

    box.addEventListener("mouseover", () => {
      if (isRandomMode) {
        box.style.backgroundColor = getRandomColor();
      } else {
        box.style.backgroundColor = currentColor;
      }
    });
    board.insertAdjacentElement("beforeend", box);
  }
}

function getRandomColor() {
  let letters = "0123456789ABCDEF";
  let color = "#";

  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}

function resetBoard() {
  let board = document.querySelector(".board");
  let box = board.querySelectorAll("div");
  box.forEach((div) => (div.style.backgroundColor = "white"));
}

const sizeInput = document.getElementById("size");
setSizeBtn.addEventListener("click", () => {
  changeSize(sizeInput.value);
});

function changeSize(input) {
  let message = document.querySelector(".message");
  if (input >= 2 && input <= 100) {
    populateBoard(input);
    message.classList.add("message");
    message.textContent = `Board has been changed to ${input} by ${input}.`;
  } else {
    message.textContent = "Choose a number between 2 and 100";

    const sizeInput = document.getElementById("size");
    sizeInput.value = 32; // or whatever default you want
  }
}


// Mobile Support 
function populateBoard(size) {
  let board = document.querySelector(".board");
  let box = board.querySelectorAll("div");
  box.forEach((div) => div.remove());

  board.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  board.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  let amount = size * size;
  let isDrawing = false; // Track if user is drawing

  for (let i = 0; i < amount; i++) {
    let box = document.createElement("div");

    // Mouse events
    box.addEventListener("mousedown", () => {
      isDrawing = true;
      colorBox(box);
    });

    box.addEventListener("mouseenter", () => {
      if (isDrawing) {
        colorBox(box);
      }
    });

    // Touch events for mobile
    box.addEventListener("touchstart", (e) => {
      e.preventDefault();
      isDrawing = true;
      colorBox(box);
    });

    box.addEventListener("touchmove", (e) => {
      e.preventDefault();
      const touch = e.touches[0];
      const element = document.elementFromPoint(touch.clientX, touch.clientY);
      if (element && element !== box) {
        colorBox(element);
      }
    });

    board.insertAdjacentElement("beforeend", box);
  }

  // Stop drawing when mouse/touch is released
  document.addEventListener("mouseup", () => {
    isDrawing = false;
  });

  document.addEventListener("touchend", () => {
    isDrawing = false;
  });
}

// Helper function to color a box
function colorBox(box) {
  if (isRandomMode) {
    box.style.backgroundColor = getRandomColor();
  } else {
    box.style.backgroundColor = currentColor;
  }
}




// When playing around in Mobile, the mouseover event Listener bubbles to everywhere on the DOM and changes every element's background colour. Pretty cool!
