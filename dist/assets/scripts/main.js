/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/assets/scripts/main.js":
/*!************************************!*\
  !*** ./src/assets/scripts/main.js ***!
  \************************************/
/*! no static exports found */
/***/ (function(module, exports) {

/*
- Igrica memorije: na tabli 10x10 su random brojevi od 1 do 50, svaki se nalazi po 2x ali su izmešani,
brojevi se ne vide dok ne kliknemo na polje na kojem je broj, ako zaredom
kliknemo na 2 polja ispod kojih se krije isti broj te kartice postaju otvorene
*/
// GAME VARS
var cardsPickedCounter = 0,
    cardsPickedArray = [],
    totalTries = 0,
    isGameStarted,
    fieldValues,
    level = 2;
var totalTriesDisplay = document.getElementById('totalMistakes');

var elementsInit = function elementsInit(min, max) {
  var collection1 = [],
      collection2 = [];

  for (var i = 0; i < max * 2; i++) {
    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

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

var gameInit = function gameInit(rows, cols) {
  var totalFields = rows * cols;
  var numberOfElements = totalFields / 2;
  fieldValues = elementsInit(1, numberOfElements, totalFields);
  var tmpVals = fieldValues.slice();

  if (document.getElementById('gameField') !== null) {
    removeDummy(document.getElementById('gameField'));
  }

  var table = document.createElement('table');
  table.setAttribute('id', 'gameField');

  for (var i = 0; i < rows; i++) {
    var row = document.createElement('tr');

    for (var j = 0; j < cols; j++) {
      var field = document.createElement('td');
      field.className = 'field';
      var field__front = document.createElement('div');
      field__front.classList = 'field__side field__front';
      var field__back = document.createElement('div');
      field__back.classList = 'field__side field__back';
      field.setAttribute('id', "row_".concat(i + 1, "_field_").concat(j + 1));
      field__back.textContent = tmpVals.shift();
      field.appendChild(field__front);
      field.appendChild(field__back);
      row.appendChild(field);
    }

    table.appendChild(row);
  }

  document.querySelector('.holder').appendChild(table);
};

document.querySelector('.holder').addEventListener('click', function (e) {
  if (e.target.parentNode.classList.contains('field')) {
    var pick = e.target.parentNode;

    if (!isGameStarted) {
      startTime();
      isGameStarted = true;
    }

    if (!pick.classList.contains('done') && cardsPickedCounter < 2 && !pick.classList.contains('kliknuto')) {
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

function checkIfSame() {
  if (cardsPickedArray[0].textContent === cardsPickedArray[1].textContent) {
    cardsPickedArray.forEach(function (item) {
      var index = fieldValues.indexOf(item.textContent * 1);
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

var timeSpent = document.getElementById('time');
var seconds = 0,
    minutes = 0,
    hours = 0,
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

  timeSpent.textContent = (hours ? hours > 9 ? hours : '0' + hours : '00') + ':' + (minutes ? minutes > 9 ? minutes : '0' + minutes : '00') + ':' + (seconds > 9 ? seconds : '0' + seconds);
  startTime();
}

function startTime() {
  t = setTimeout(add, 1000);
}

function removeDummy(elem) {
  elem.parentNode.removeChild(elem);
  return false;
} // Initialisation 


gameInit(level, level);

/***/ }),

/***/ 0:
/*!******************************************!*\
  !*** multi ./src/assets/scripts/main.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\CODE\memory-game\src\assets\scripts\main.js */"./src/assets/scripts/main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOlsiY2FyZHNQaWNrZWRDb3VudGVyIiwiY2FyZHNQaWNrZWRBcnJheSIsInRvdGFsVHJpZXMiLCJpc0dhbWVTdGFydGVkIiwiZmllbGRWYWx1ZXMiLCJsZXZlbCIsInRvdGFsVHJpZXNEaXNwbGF5IiwiZG9jdW1lbnQiLCJnZXRFbGVtZW50QnlJZCIsImVsZW1lbnRzSW5pdCIsIm1pbiIsIm1heCIsImNvbGxlY3Rpb24xIiwiY29sbGVjdGlvbjIiLCJpIiwicmFuZG9tTnVtIiwiTWF0aCIsImZsb29yIiwicmFuZG9tIiwiaW5kZXhPZiIsInB1c2giLCJjb25jYXQiLCJnYW1lSW5pdCIsInJvd3MiLCJjb2xzIiwidG90YWxGaWVsZHMiLCJudW1iZXJPZkVsZW1lbnRzIiwidG1wVmFscyIsInNsaWNlIiwicmVtb3ZlRHVtbXkiLCJ0YWJsZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJyb3ciLCJqIiwiZmllbGQiLCJjbGFzc05hbWUiLCJmaWVsZF9fZnJvbnQiLCJjbGFzc0xpc3QiLCJmaWVsZF9fYmFjayIsInRleHRDb250ZW50Iiwic2hpZnQiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsInBhcmVudE5vZGUiLCJjb250YWlucyIsInBpY2siLCJzdGFydFRpbWUiLCJsZW5ndGgiLCJzZXRUaW1lb3V0IiwiY2hlY2tJZlNhbWUiLCJmb3JFYWNoIiwiaXRlbSIsImluZGV4Iiwic3BsaWNlIiwicmVtb3ZlIiwidGltZVNwZW50Iiwic2Vjb25kcyIsIm1pbnV0ZXMiLCJob3VycyIsInQiLCJhZGQiLCJlbGVtIiwicmVtb3ZlQ2hpbGQiXSwibWFwcGluZ3MiOiI7UUFBQTtRQUNBOztRQUVBO1FBQ0E7O1FBRUE7UUFDQTtRQUNBO1FBQ0E7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QTdDLElBQXFELEdBQXJELElBQTRERCxPQUFPLEdBQUlBLE9BQU8sR0FBRyxDQUFWLEdBQWNBLE9BQWQsR0FBd0IsTUFBTUEsT0FBbEMsR0FBNkMsSUFBaEgsSUFBd0gsR0FBeEgsSUFBK0hELE9BQU8sR0FBRyxDQUFWLEdBQWNBLE9BQWQsR0FBd0IsTUFBTUEsT0FBN0osQ0FBeEI7QUFFQVYsV0FBUztBQUNWOztBQUVELFNBQVNBLFNBQVQsR0FBc0I7QUFDcEJhLEdBQUMsR0FBR1gsVUFBVSxDQUFDWSxHQUFELEVBQU0sSUFBTixDQUFkO0FBQ0Q7O0FBRUQsU0FBU25DLFdBQVQsQ0FBc0JvQyxJQUF0QixFQUE0QjtBQUMxQkEsTUFBSSxDQUFDbEIsVUFBTCxDQUFnQm1CLFdBQWhCLENBQTRCRCxJQUE1QjtBQUNBLFNBQU8sS0FBUDtBQUNELEMsQ0FFRDs7O0FBQ0EzQyxRQUFRLENBQUNqQixLQUFELEVBQVFBLEtBQVIsQ0FBUixDIiwiZmlsZSI6Im1haW4uanMiLCJzb3VyY2VzQ29udGVudCI6WyIgXHQvLyBUaGUgbW9kdWxlIGNhY2hlXG4gXHR2YXIgaW5zdGFsbGVkTW9kdWxlcyA9IHt9O1xuXG4gXHQvLyBUaGUgcmVxdWlyZSBmdW5jdGlvblxuIFx0ZnVuY3Rpb24gX193ZWJwYWNrX3JlcXVpcmVfXyhtb2R1bGVJZCkge1xuXG4gXHRcdC8vIENoZWNrIGlmIG1vZHVsZSBpcyBpbiBjYWNoZVxuIFx0XHRpZihpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSkge1xuIFx0XHRcdHJldHVybiBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXS5leHBvcnRzO1xuIFx0XHR9XG4gXHRcdC8vIENyZWF0ZSBhIG5ldyBtb2R1bGUgKGFuZCBwdXQgaXQgaW50byB0aGUgY2FjaGUpXG4gXHRcdHZhciBtb2R1bGUgPSBpbnN0YWxsZWRNb2R1bGVzW21vZHVsZUlkXSA9IHtcbiBcdFx0XHRpOiBtb2R1bGVJZCxcbiBcdFx0XHRsOiBmYWxzZSxcbiBcdFx0XHRleHBvcnRzOiB7fVxuIFx0XHR9O1xuXG4gXHRcdC8vIEV4ZWN1dGUgdGhlIG1vZHVsZSBmdW5jdGlvblxuIFx0XHRtb2R1bGVzW21vZHVsZUlkXS5jYWxsKG1vZHVsZS5leHBvcnRzLCBtb2R1bGUsIG1vZHVsZS5leHBvcnRzLCBfX3dlYnBhY2tfcmVxdWlyZV9fKTtcblxuIFx0XHQvLyBGbGFnIHRoZSBtb2R1bGUgYXMgbG9hZGVkXG4gXHRcdG1vZHVsZS5sID0gdHJ1ZTtcblxuIFx0XHQvLyBSZXR1cm4gdGhlIGV4cG9ydHMgb2YgdGhlIG1vZHVsZVxuIFx0XHRyZXR1cm4gbW9kdWxlLmV4cG9ydHM7XG4gXHR9XG5cblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGVzIG9iamVjdCAoX193ZWJwYWNrX21vZHVsZXNfXylcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubSA9IG1vZHVsZXM7XG5cbiBcdC8vIGV4cG9zZSB0aGUgbW9kdWxlIGNhY2hlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLmMgPSBpbnN0YWxsZWRNb2R1bGVzO1xuXG4gXHQvLyBkZWZpbmUgZ2V0dGVyIGZ1bmN0aW9uIGZvciBoYXJtb255IGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uZCA9IGZ1bmN0aW9uKGV4cG9ydHMsIG5hbWUsIGdldHRlcikge1xuIFx0XHRpZighX193ZWJwYWNrX3JlcXVpcmVfXy5vKGV4cG9ydHMsIG5hbWUpKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIG5hbWUsIHsgZW51bWVyYWJsZTogdHJ1ZSwgZ2V0OiBnZXR0ZXIgfSk7XG4gXHRcdH1cbiBcdH07XG5cbiBcdC8vIGRlZmluZSBfX2VzTW9kdWxlIG9uIGV4cG9ydHNcbiBcdF9fd2VicGFja19yZXF1aXJlX18uciA9IGZ1bmN0aW9uKGV4cG9ydHMpIHtcbiBcdFx0aWYodHlwZW9mIFN5bWJvbCAhPT0gJ3VuZGVmaW5lZCcgJiYgU3ltYm9sLnRvU3RyaW5nVGFnKSB7XG4gXHRcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsIFN5bWJvbC50b1N0cmluZ1RhZywgeyB2YWx1ZTogJ01vZHVsZScgfSk7XG4gXHRcdH1cbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsICdfX2VzTW9kdWxlJywgeyB2YWx1ZTogdHJ1ZSB9KTtcbiBcdH07XG5cbiBcdC8vIGNyZWF0ZSBhIGZha2UgbmFtZXNwYWNlIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDE6IHZhbHVlIGlzIGEgbW9kdWxlIGlkLCByZXF1aXJlIGl0XG4gXHQvLyBtb2RlICYgMjogbWVyZ2UgYWxsIHByb3BlcnRpZXMgb2YgdmFsdWUgaW50byB0aGUgbnNcbiBcdC8vIG1vZGUgJiA0OiByZXR1cm4gdmFsdWUgd2hlbiBhbHJlYWR5IG5zIG9iamVjdFxuIFx0Ly8gbW9kZSAmIDh8MTogYmVoYXZlIGxpa2UgcmVxdWlyZVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy50ID0gZnVuY3Rpb24odmFsdWUsIG1vZGUpIHtcbiBcdFx0aWYobW9kZSAmIDEpIHZhbHVlID0gX193ZWJwYWNrX3JlcXVpcmVfXyh2YWx1ZSk7XG4gXHRcdGlmKG1vZGUgJiA4KSByZXR1cm4gdmFsdWU7XG4gXHRcdGlmKChtb2RlICYgNCkgJiYgdHlwZW9mIHZhbHVlID09PSAnb2JqZWN0JyAmJiB2YWx1ZSAmJiB2YWx1ZS5fX2VzTW9kdWxlKSByZXR1cm4gdmFsdWU7XG4gXHRcdHZhciBucyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gXHRcdF9fd2VicGFja19yZXF1aXJlX18ucihucyk7XG4gXHRcdE9iamVjdC5kZWZpbmVQcm9wZXJ0eShucywgJ2RlZmF1bHQnLCB7IGVudW1lcmFibGU6IHRydWUsIHZhbHVlOiB2YWx1ZSB9KTtcbiBcdFx0aWYobW9kZSAmIDIgJiYgdHlwZW9mIHZhbHVlICE9ICdzdHJpbmcnKSBmb3IodmFyIGtleSBpbiB2YWx1ZSkgX193ZWJwYWNrX3JlcXVpcmVfXy5kKG5zLCBrZXksIGZ1bmN0aW9uKGtleSkgeyByZXR1cm4gdmFsdWVba2V5XTsgfS5iaW5kKG51bGwsIGtleSkpO1xuIFx0XHRyZXR1cm4gbnM7XG4gXHR9O1xuXG4gXHQvLyBnZXREZWZhdWx0RXhwb3J0IGZ1bmN0aW9uIGZvciBjb21wYXRpYmlsaXR5IHdpdGggbm9uLWhhcm1vbnkgbW9kdWxlc1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5uID0gZnVuY3Rpb24obW9kdWxlKSB7XG4gXHRcdHZhciBnZXR0ZXIgPSBtb2R1bGUgJiYgbW9kdWxlLl9fZXNNb2R1bGUgP1xuIFx0XHRcdGZ1bmN0aW9uIGdldERlZmF1bHQoKSB7IHJldHVybiBtb2R1bGVbJ2RlZmF1bHQnXTsgfSA6XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0TW9kdWxlRXhwb3J0cygpIHsgcmV0dXJuIG1vZHVsZTsgfTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kKGdldHRlciwgJ2EnLCBnZXR0ZXIpO1xuIFx0XHRyZXR1cm4gZ2V0dGVyO1xuIFx0fTtcblxuIFx0Ly8gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm8gPSBmdW5jdGlvbihvYmplY3QsIHByb3BlcnR5KSB7IHJldHVybiBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwob2JqZWN0LCBwcm9wZXJ0eSk7IH07XG5cbiBcdC8vIF9fd2VicGFja19wdWJsaWNfcGF0aF9fXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnAgPSBcIlwiO1xuXG5cbiBcdC8vIExvYWQgZW50cnkgbW9kdWxlIGFuZCByZXR1cm4gZXhwb3J0c1xuIFx0cmV0dXJuIF9fd2VicGFja19yZXF1aXJlX18oX193ZWJwYWNrX3JlcXVpcmVfXy5zID0gMCk7XG4iLCIvKlxyXG4tIElncmljYSBtZW1vcmlqZTogbmEgdGFibGkgMTB4MTAgc3UgcmFuZG9tIGJyb2pldmkgb2QgMSBkbyA1MCwgc3Zha2kgc2UgbmFsYXppIHBvIDJ4IGFsaSBzdSBpem1lxaFhbmksXHJcbmJyb2pldmkgc2UgbmUgdmlkZSBkb2sgbmUga2xpa25lbW8gbmEgcG9samUgbmEga29qZW0gamUgYnJvaiwgYWtvIHphcmVkb21cclxua2xpa25lbW8gbmEgMiBwb2xqYSBpc3BvZCBrb2ppaCBzZSBrcmlqZSBpc3RpIGJyb2ogdGUga2FydGljZSBwb3N0YWp1IG90dm9yZW5lXHJcbiovXHJcblxyXG5cclxuLy8gR0FNRSBWQVJTXHJcblxyXG5sZXQgY2FyZHNQaWNrZWRDb3VudGVyID0gMCxcclxuICBjYXJkc1BpY2tlZEFycmF5ID0gW10sXHJcbiAgdG90YWxUcmllcyA9IDAsXHJcbiAgaXNHYW1lU3RhcnRlZCxcclxuICBmaWVsZFZhbHVlcyxcclxuICBsZXZlbCA9IDJcclxuXHJcblxyXG5jb25zdCB0b3RhbFRyaWVzRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbE1pc3Rha2VzJyk7XHJcblxyXG5jb25zdCBlbGVtZW50c0luaXQgPSAobWluLCBtYXgpID0+IHtcclxuICBsZXQgY29sbGVjdGlvbjEgPSBbXSxcclxuICAgIGNvbGxlY3Rpb24yID0gW107XHJcblxyXG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbWF4ICogMjsgaSsrKSB7XHJcbiAgICBsZXQgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxuICAgIGlmIChjb2xsZWN0aW9uMS5pbmRleE9mKHJhbmRvbU51bSkgPT09IC0xKSB7XHJcbiAgICAgIGNvbGxlY3Rpb24xLnB1c2gocmFuZG9tTnVtKTtcclxuXHJcbiAgICB9IGVsc2UgaWYgKGNvbGxlY3Rpb24yLmluZGV4T2YocmFuZG9tTnVtKSA9PT0gLTEpIHtcclxuICAgICAgY29sbGVjdGlvbjIucHVzaChyYW5kb21OdW0pO1xyXG4gICAgfSBlbHNlIHtcclxuICAgICAgLS1pO1xyXG4gICAgfVxyXG5cclxuICB9XHJcbiAgcmV0dXJuIGNvbGxlY3Rpb24xLmNvbmNhdChjb2xsZWN0aW9uMik7XHJcbn07XHJcblxyXG5jb25zdCBnYW1lSW5pdCA9IChyb3dzLCBjb2xzKSA9PiB7XHJcbiAgbGV0IHRvdGFsRmllbGRzID0gcm93cyAqIGNvbHNcclxuICBsZXQgbnVtYmVyT2ZFbGVtZW50cyA9IHRvdGFsRmllbGRzIC8gMlxyXG4gIGZpZWxkVmFsdWVzID0gZWxlbWVudHNJbml0KDEsIG51bWJlck9mRWxlbWVudHMsIHRvdGFsRmllbGRzKVxyXG4gIGxldCB0bXBWYWxzID0gZmllbGRWYWx1ZXMuc2xpY2UoKVxyXG4gIGlmIChkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUZpZWxkJykgIT09IG51bGwpIHtcclxuXHJcbiAgICByZW1vdmVEdW1teShkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnZ2FtZUZpZWxkJykpXHJcbiAgfVxyXG4gIFxyXG4gIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RhYmxlJylcclxuICB0YWJsZS5zZXRBdHRyaWJ1dGUoJ2lkJywgJ2dhbWVGaWVsZCcpXHJcbiAgXHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcclxuICAgIFxyXG4gICAgbGV0IHJvdyA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3RyJylcclxuICAgIFxyXG4gICAgZm9yIChsZXQgaiA9IDA7IGogPCBjb2xzOyBqKyspIHtcclxuICAgICAgbGV0IGZpZWxkID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgndGQnKVxyXG4gICAgICBmaWVsZC5jbGFzc05hbWUgPSAnZmllbGQnXHJcbiAgICAgIGxldCBmaWVsZF9fZnJvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKVxyXG4gICAgICBmaWVsZF9fZnJvbnQuY2xhc3NMaXN0ID0gJ2ZpZWxkX19zaWRlIGZpZWxkX19mcm9udCc7XHJcbiAgICAgIGxldCBmaWVsZF9fYmFjayA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ2RpdicpXHJcbiAgICAgIGZpZWxkX19iYWNrLmNsYXNzTGlzdCA9ICdmaWVsZF9fc2lkZSBmaWVsZF9fYmFjaydcclxuXHJcbiAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcm93XyR7aSArIDF9X2ZpZWxkXyR7aiArIDF9YCk7XHJcbiAgICAgIGZpZWxkX19iYWNrLnRleHRDb250ZW50ID0gdG1wVmFscy5zaGlmdCgpO1xyXG4gICAgICBmaWVsZC5hcHBlbmRDaGlsZChmaWVsZF9fZnJvbnQpO1xyXG4gICAgICBmaWVsZC5hcHBlbmRDaGlsZChmaWVsZF9fYmFjayk7XHJcblxyXG4gICAgICByb3cuYXBwZW5kQ2hpbGQoZmllbGQpO1xyXG4gICAgfVxyXG4gICAgdGFibGUuYXBwZW5kQ2hpbGQocm93KTtcclxuICB9XHJcbiAgXHJcbiAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbGRlcicpLmFwcGVuZENoaWxkKHRhYmxlKTtcclxuXHJcbn07XHJcblxyXG5cclxuZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmhvbGRlcicpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKGUpID0+IHtcclxuICBpZiAoZS50YXJnZXQucGFyZW50Tm9kZS5jbGFzc0xpc3QuY29udGFpbnMoJ2ZpZWxkJykpIHtcclxuICAgIGxldCBwaWNrID0gZS50YXJnZXQucGFyZW50Tm9kZTtcclxuXHJcbiAgICBpZiAoIWlzR2FtZVN0YXJ0ZWQpIHtcclxuICAgICAgc3RhcnRUaW1lKCk7XHJcbiAgICAgIGlzR2FtZVN0YXJ0ZWQgPSB0cnVlO1xyXG4gICAgfVxyXG5cclxuICAgIGlmICghcGljay5jbGFzc0xpc3QuY29udGFpbnMoJ2RvbmUnKSAmJiBjYXJkc1BpY2tlZENvdW50ZXIgPCAyICYmICEocGljay5jbGFzc0xpc3QuY29udGFpbnMoJ2tsaWtudXRvJykpKSB7XHJcbiAgICAgIHBpY2suY2xhc3NMaXN0ICs9ICcga2xpa251dG8nO1xyXG4gICAgICBjYXJkc1BpY2tlZENvdW50ZXIrKztcclxuICAgICAgaWYgKGNhcmRzUGlja2VkQXJyYXkubGVuZ3RoIDwgMikge1xyXG4gICAgICAgIGNhcmRzUGlja2VkQXJyYXkucHVzaChwaWNrKTtcclxuICAgICAgfVxyXG4gICAgICBpZiAoY2FyZHNQaWNrZWRDb3VudGVyID09PSAyKSB7XHJcbiAgICAgICAgc2V0VGltZW91dChmdW5jdGlvbiAoKSB7XHJcbiAgICAgICAgICBjaGVja0lmU2FtZSgpO1xyXG4gICAgICAgICAgdG90YWxUcmllc0Rpc3BsYXkudGV4dENvbnRlbnQgPSB0b3RhbFRyaWVzO1xyXG4gICAgICAgIH0sIDkwMCk7XHJcbiAgICAgIH1cclxuICAgIH1cclxuICB9XHJcbn0pO1xyXG5cclxuXHJcbmZ1bmN0aW9uIGNoZWNrSWZTYW1lICgpIHtcclxuXHJcbiAgaWYgKGNhcmRzUGlja2VkQXJyYXlbMF0udGV4dENvbnRlbnQgPT09IGNhcmRzUGlja2VkQXJyYXlbMV0udGV4dENvbnRlbnQpIHtcclxuICAgIGNhcmRzUGlja2VkQXJyYXkuZm9yRWFjaChmdW5jdGlvbiAoaXRlbSkge1xyXG4gICAgICBsZXQgaW5kZXggPSBmaWVsZFZhbHVlcy5pbmRleE9mKGl0ZW0udGV4dENvbnRlbnQgKiAxKTtcclxuICAgICAgZmllbGRWYWx1ZXMuc3BsaWNlKGluZGV4LCAxKTtcclxuICAgICAgaXRlbS5jbGFzc05hbWUgKz0gJyBkb25lJztcclxuXHJcbiAgICAgIGlmIChmaWVsZFZhbHVlcy5sZW5ndGggPT09IDApIHtcclxuICAgICAgICBsZXZlbCA9IGxldmVsICsgMjtcclxuICAgICAgICBnYW1lSW5pdChsZXZlbCwgbGV2ZWwpO1xyXG4gICAgICB9XHJcblxyXG4gICAgfSk7XHJcblxyXG4gIH0gZWxzZSB7XHJcbiAgICBjYXJkc1BpY2tlZEFycmF5LmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgaXRlbS5jbGFzc0xpc3QucmVtb3ZlKCdrbGlrbnV0bycpO1xyXG4gICAgfSk7XHJcbiAgICB0b3RhbFRyaWVzKys7XHJcbiAgfVxyXG5cclxuICBjYXJkc1BpY2tlZEFycmF5ID0gW107XHJcbiAgY2FyZHNQaWNrZWRDb3VudGVyID0gMDtcclxuXHJcbn1cclxuXHJcbmxldCB0aW1lU3BlbnQgPSBkb2N1bWVudC5nZXRFbGVtZW50QnlJZCgndGltZScpXHJcbmxldCBzZWNvbmRzID0gMCwgbWludXRlcyA9IDAsIGhvdXJzID0gMCwgdFxyXG5cclxuZnVuY3Rpb24gYWRkICgpIHtcclxuICBzZWNvbmRzKys7XHJcbiAgaWYgKHNlY29uZHMgPj0gNjApIHtcclxuICAgIHNlY29uZHMgPSAwO1xyXG4gICAgbWludXRlcysrO1xyXG4gICAgaWYgKG1pbnV0ZXMgPj0gNjApIHtcclxuICAgICAgbWludXRlcyA9IDA7XHJcbiAgICAgIGhvdXJzKys7XHJcbiAgICB9XHJcbiAgfVxyXG5cclxuICB0aW1lU3BlbnQudGV4dENvbnRlbnQgPSAoaG91cnMgPyAoaG91cnMgPiA5ID8gaG91cnMgOiAnMCcgKyBob3VycykgOiAnMDAnKSArICc6JyArIChtaW51dGVzID8gKG1pbnV0ZXMgPiA5ID8gbWludXRlcyA6ICcwJyArIG1pbnV0ZXMpIDogJzAwJykgKyAnOicgKyAoc2Vjb25kcyA+IDkgPyBzZWNvbmRzIDogJzAnICsgc2Vjb25kcyk7XHJcblxyXG4gIHN0YXJ0VGltZSgpO1xyXG59XHJcblxyXG5mdW5jdGlvbiBzdGFydFRpbWUgKCkge1xyXG4gIHQgPSBzZXRUaW1lb3V0KGFkZCwgMTAwMCk7XHJcbn1cclxuXHJcbmZ1bmN0aW9uIHJlbW92ZUR1bW15IChlbGVtKSB7XHJcbiAgZWxlbS5wYXJlbnROb2RlLnJlbW92ZUNoaWxkKGVsZW0pO1xyXG4gIHJldHVybiBmYWxzZTtcclxufVxyXG5cclxuLy8gSW5pdGlhbGlzYXRpb24gXHJcbmdhbWVJbml0KGxldmVsLCBsZXZlbClcclxuIl0sInNvdXJjZVJvb3QiOiIifQ==