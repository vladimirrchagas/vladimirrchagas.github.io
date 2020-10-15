const colors = document.querySelectorAll('.color');
const pixelBoard = document.querySelector('.pixel-board');

function randomColor() {
  for (let index = 1; index <= 3; index += 1) {
    const red = Math.round(Math.random() * 256);
    const yellow = Math.round(Math.random() * 256);
    const green = Math.round(Math.random() * 256);

    colors[index].style.backgroundColor = `rgb(${red}, ${yellow}, ${green})`;
  }
}

randomColor();

function clearBoard() {
  const pixels = document.querySelectorAll('.pixel');
  for (let index = 0; index < pixels.length; index += 1) {
    pixelBoard.removeChild(pixels[index]);
  }
}

function createBoard(nbPixelValue) {
  const pixelLine = Math.sqrt(nbPixelValue);
  const boardLength = (pixelLine * 42);
  document.querySelector('.pixel-board').style.height = `${boardLength}px`;
  document.querySelector('.pixel-board').style.width = `${boardLength}px`;

  for (let index = 0; index < nbPixelValue; index += 1) {
    const pixelCreation = document.createElement('div');
    pixelCreation.className = 'pixel';
    pixelBoard.appendChild(pixelCreation);
  }
}

function resetSelectedColor() {
  colors[0].className = 'color size-color-rectangle black selected';
  colors[1].className = 'color size-color-rectangle random-color1';
  colors[2].className = 'color size-color-rectangle random-color2';
  colors[3].className = 'color size-color-rectangle random-color3';
  randomColor();
}

function clearPixel() {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].style.backgroundColor = 'white';
  }
  resetSelectedColor();
}

function applyColor(event) {
  const colorToApply = document.querySelector('.selected');
  const cssObj = window.getComputedStyle(colorToApply, null);
  event.target.style.backgroundColor = cssObj.getPropertyValue('background-color');
}

function changeSelectedColor(event) {
  for (let index = 0; index < colors.length; index += 1) {
    switch (index) {
      case 0:
        colors[0].className = 'color size-color-rectangle black';
        break;
      case 1:
        colors[1].className = 'color size-color-rectangle random-color1';
        break;
      case 2:
        colors[2].className = 'color size-color-rectangle random-color2';
        break;
      default:
        colors[3].className = 'color size-color-rectangle random-color3';
        break;
    }
  }
  event.target.className += ' selected';
}

function pixelEventListener() {
  const pixels = document.querySelectorAll('.pixel');

  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index].addEventListener('click', applyColor);
  }
}

pixelEventListener();

function dynamicBoard() {
  let matrixValue = document.querySelector('#board-size').value;

  if (matrixValue === '') {
    alert('Board inválido!');
  } else {
    switch (true) {
      case (matrixValue < 5):
        matrixValue = 5;
        break;
      case (matrixValue > 50):
        matrixValue = 50;
        break;
      default:
        break;
    }

    const pixelQty = matrixValue * matrixValue;
    clearBoard();
    createBoard(pixelQty);
    pixelEventListener();
    resetSelectedColor();
  }
}

for (let index = 0; index < colors.length; index += 1) {
  colors[index].addEventListener('click', changeSelectedColor);
}

document.querySelector('.button-clear').addEventListener('click', clearPixel);

document.querySelector('#generate-board').addEventListener('click', dynamicBoard);
