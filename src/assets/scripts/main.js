    /*
  - Igrica memorije: na tabli 10x10 su random brojevi od 1 do 50, svaki se nalazi po 2x ali su izmešani,
  brojevi se ne vide dok ne kliknemo na polje na kojem je broj, ako zaredom 
  kliknemo na 2 polja ispod kojih se krije isti broj te kartice postaju otvorene
  */


    // GAME VARS

    let counter = 0,
        tempArr = [],
        totalTries = 0,
        gameStarted,
        fieldValues,
        level = 2;


    const totalTriesDisplay = document.getElementById('totalMistakes');

    const elementsInit = (min,max) => {
      let collection1 = [],
          collection2 = [];

      for (let i = 0; i < max * 2; i++) {
        let randomNum = Math.floor(Math.random() * (max - min + 1)) + min;
        if (collection1.indexOf(randomNum) == -1) {
          collection1.push(randomNum);

        } else if (collection2.indexOf(randomNum) == -1) {
          collection2.push(randomNum);
        } else {
          --i;
        }

      }
      return collection1.concat(collection2);
    };

    const gameInit = (rows,cols) => {
        let totalFields = rows * cols;
        let numberOfElements = totalFields / 2;
        fieldValues = elementsInit(1,numberOfElements,totalFields);
        let tmpVals = fieldValues.slice();
      console.log(document.getElementById('gameField'))
  if(document.getElementById('gameField') !== null){

        removeDummy(document.getElementById('gameField'));
  }
  let table = document.createElement("table");
  table.setAttribute('id','gameField');
  for (let i = 0; i < rows; i++) {
    let red = document.createElement("tr");
    for (let j = 0; j < cols; j++) {
      let field = document.createElement("td");
      field.className = 'field';
      let field__front = document.createElement("div");
      field__front.classList = 'field__side field__front';
      let field__back =document.createElement("div");
      field__back.classList = 'field__side field__back';

      field.setAttribute('id', `red_${i+1}_field_${j+1}`);
      field__back.textContent = tmpVals.shift();
      field.appendChild(field__front);
      field.appendChild(field__back);

      red.appendChild(field);
    }
    table.appendChild(red);
  }
  document.querySelector('.holder').appendChild(table);


};



    gameInit(level,level);
    document.querySelector('.holder').addEventListener('click',(e)=>{
        if(e.target.parentNode.classList.contains('field')){
            let pick = e.target.parentNode;

            if(!gameStarted){
                timer();
                gameStarted = true;
            }

            if (!pick.classList.contains('done') && counter < 2 && !(pick.classList.contains('kliknuto'))) {
                pick.classList += ' kliknuto';
                counter++;
                if (tempArr.length < 2) {
                    tempArr.push(pick);
                }
                if (counter === 2) {
                    setTimeout(function () {
                        check();
                        totalTriesDisplay.textContent = totalTries;
                    }, 900);
                }
            }
        }
    });


    
    function check() {

      if (tempArr[0].textContent === tempArr[1].textContent) {
        tempArr.forEach(function (item) {
          let index = fieldValues.indexOf(item.textContent * 1);
          fieldValues.splice(index,1);
          item.className += ' done';

          if(fieldValues.length === 0) {
              level = level + 2;
            //clearTimeout(t);
            gameInit(level,level);
          }

        });

      } else {
        tempArr.forEach(function (item) {
          item.classList.remove('kliknuto');
        });
        totalTries++;
      }
      tempArr = [];
      counter = 0;




    }
    let timerr = document.getElementById('time');

    let seconds = 0, minutes = 0, hours = 0,
        t;

    function add() {
      seconds++;
      if (seconds >= 60) {
        seconds = 0;
        minutes++;
        if (minutes >= 60) {
          minutes = 0;
          hours++;
        }
      }

      timerr.textContent = (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);

      timer();
    }
    function timer() {
      t = setTimeout(add, 1000);
    }
    function removeDummy(elem) {
      elem.parentNode.removeChild(elem);
      return false;
    }