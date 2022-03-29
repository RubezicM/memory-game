/*
- Igrica memorije: na tabli 10x10 su random brojevi od 1 do 50, svaki se nalazi po 2x ali su izmešani,
brojevi se ne vide dok ne kliknemo na polje na kojem je broj, ako zaredom
kliknemo na 2 polja ispod kojih se krije isti broj te kartice postaju otvorene
*/


// GAME VARS

let cardsPickedCounter = 0,
  cardsPickedArray = [],
  totalTries = 0,
  isGameStarted,
  fieldValues,
  level = 2


const totalTriesDisplay = document.getElementById('totalMistakes');

const elementsInit = (min, max) => {
  let collection1 = [],
    collection2 = [];

  for (let i = 0; i < max * 2; i++) {
    let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
    if (collection1.indexOf(randomNum) === -1) {
      collection1.push(randomNum);

    } else if (collection2.indexOf(randomNum) === -1) {
      collection2.push(randomNum);
    } else {
      --i;
    }

  }
  return collection1.concat(collection2);
};

const gameInit = (rows, cols) => {
  let totalFields = rows * cols
  let numberOfElements = totalFields / 2
  fieldValues = elementsInit(1, numberOfElements, totalFields)
  let tmpVals = fieldValues.slice()
  if (document.getElementById('gameField') !== null) {

    removeDummy(document.getElementById('gameField'))
  }

  let table = document.createElement('table')
  table.setAttribute('id', 'gameField')

  for (let i = 0; i < rows; i++) {

    let row = document.createElement('tr')

    for (let j = 0; j < cols; j++) {
      let field = document.createElement('td')
      field.className = 'field'
      let field__front = document.createElement('div')
      field__front.classList = 'field__side field__front';
      let field__back = document.createElement('div')
      field__back.classList = 'field__side field__back'

      field.setAttribute('id', `row_${i + 1}_field_${j + 1}`);
      field__back.textContent = tmpVals.shift();
      field.appendChild(field__front);
      field.appendChild(field__back);

      row.appendChild(field);
    }
    table.appendChild(row);
  }

  document.querySelector('.holder').appendChild(table);

};


document.querySelector('.holder').addEventListener('click', (e) => {
  if (e.target.parentNode.classList.contains('field')) {
    let pick = e.target.parentNode;

    if (!isGameStarted) {
      startTime();
      isGameStarted = true;
    }

    if (!pick.classList.contains('done') && cardsPickedCounter < 2 && !(pick.classList.contains('kliknuto'))) {
      pick.classList += ' kliknuto';
      cardsPickedCounter++;
      if (cardsPickedArray.length < 2) {
        cardsPickedArray.push(pick);
      }
      if (cardsPickedCounter === 2) {
        setTimeout(function () {
          checkIfSame();
          totalTriesDisplay.textContent = totalTries;
        }, 900);
      }
    }
  }
});


function checkIfSame () {

  if (cardsPickedArray[0].textContent === cardsPickedArray[1].textContent) {
    cardsPickedArray.forEach(function (item) {
      let index = fieldValues.indexOf(item.textContent * 1);
      fieldValues.splice(index, 1);
      item.className += ' done';

      if (fieldValues.length === 0) {
        level = level + 2;
        gameInit(level, level);
      }

    });

  } else {
    cardsPickedArray.forEach(function (item) {
      item.classList.remove('kliknuto');
    });
    totalTries++;
  }

  cardsPickedArray = [];
  cardsPickedCounter = 0;

}


let seconds = 0, minutes = 0, hours = 0, t

function add () {
  seconds++;
  if (seconds >= 60) {
    seconds = 0;
    minutes++;
    if (minutes >= 60) {
      minutes = 0;
      hours++;
    }
  }

  let timeSpent = document.getElementById('time')

  timeSpent.textContent = (hours ? (hours > 9 ? hours : '0' + hours) : '00') + ':' + (minutes ? (minutes > 9 ? minutes : '0' + minutes) : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);

  startTime();
}

function startTime () {
  t = setTimeout(add, 1000);
}

function removeDummy (elem) {
  elem.parentNode.removeChild(elem);
  return false;
}

// Initialisation 
gameInit(level, level)
