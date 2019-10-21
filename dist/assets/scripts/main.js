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
var counter = 0,
    tempArr = [],
    totalTries = 0,
    gameStarted,
    fieldValues,
    level = 2;
var totalTriesDisplay = document.getElementById('totalMistakes');

var elementsInit = function elementsInit(min, max) {
  var collection1 = [],
      collection2 = [];

  for (var i = 0; i < max * 2; i++) {
    var randomNum = Math.floor(Math.random() * (max - min + 1)) + min;

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

var gameInit = function gameInit(rows, cols) {
  var totalFields = rows * cols;
  var numberOfElements = totalFields / 2;
  fieldValues = elementsInit(1, numberOfElements, totalFields);
  var tmpVals = fieldValues.slice();
  console.log(document.getElementById('gameField'));

  if (document.getElementById('gameField') !== null) {
    removeDummy(document.getElementById('gameField'));
  }

  var table = document.createElement("table");
  table.setAttribute('id', 'gameField');

  for (var i = 0; i < rows; i++) {
    var red = document.createElement("tr");

    for (var j = 0; j < cols; j++) {
      var field = document.createElement("td");
      field.className = 'field';
      var field__front = document.createElement("div");
      field__front.classList = 'field__side field__front';
      var field__back = document.createElement("div");
      field__back.classList = 'field__side field__back';
      field.setAttribute('id', "red_".concat(i + 1, "_field_").concat(j + 1));
      field__back.textContent = tmpVals.shift();
      field.appendChild(field__front);
      field.appendChild(field__back);
      red.appendChild(field);
    }

    table.appendChild(red);
  }

  document.querySelector('.holder').appendChild(table);
};

gameInit(level, level);
document.querySelector('.holder').addEventListener('click', function (e) {
  if (e.target.parentNode.classList.contains('field')) {
    var pick = e.target.parentNode;

    if (!gameStarted) {
      timer();
      gameStarted = true;
    }

    if (!pick.classList.contains('done') && counter < 2 && !pick.classList.contains('kliknuto')) {
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
      var index = fieldValues.indexOf(item.textContent * 1);
      fieldValues.splice(index, 1);
      item.className += ' done';

      if (fieldValues.length === 0) {
        level = level + 2; //clearTimeout(t);

        gameInit(level, level);
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

var timerr = document.getElementById('time');
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

  timerr.textContent = (hours ? hours > 9 ? hours : "0" + hours : "00") + ":" + (minutes ? minutes > 9 ? minutes : "0" + minutes : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
  timer();
}

function timer() {
  t = setTimeout(add, 1000);
}

function removeDummy(elem) {
  elem.parentNode.removeChild(elem);
  return false;
}

/***/ }),

/***/ 0:
/*!******************************************!*\
  !*** multi ./src/assets/scripts/main.js ***!
  \******************************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(/*! F:\Coding-practice\memory-game\src\assets\scripts\main.js */"./src/assets/scripts/main.js");


/***/ })

/******/ });
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly8vd2VicGFjay9ib290c3RyYXAiLCJ3ZWJwYWNrOi8vLy4vc3JjL2Fzc2V0cy9zY3JpcHRzL21haW4uanMiXSwibmFtZXMiOlsiY291bnRlciIsInRlbXBBcnIiLCJ0b3RhbFRyaWVzIiwiZ2FtZVN0YXJ0ZWQiLCJmaWVsZFZhbHVlcyIsImxldmVsIiwidG90YWxUcmllc0Rpc3BsYXkiLCJkb2N1bWVudCIsImdldEVsZW1lbnRCeUlkIiwiZWxlbWVudHNJbml0IiwibWluIiwibWF4IiwiY29sbGVjdGlvbjEiLCJjb2xsZWN0aW9uMiIsImkiLCJyYW5kb21OdW0iLCJNYXRoIiwiZmxvb3IiLCJyYW5kb20iLCJpbmRleE9mIiwicHVzaCIsImNvbmNhdCIsImdhbWVJbml0Iiwicm93cyIsImNvbHMiLCJ0b3RhbEZpZWxkcyIsIm51bWJlck9mRWxlbWVudHMiLCJ0bXBWYWxzIiwic2xpY2UiLCJjb25zb2xlIiwibG9nIiwicmVtb3ZlRHVtbXkiLCJ0YWJsZSIsImNyZWF0ZUVsZW1lbnQiLCJzZXRBdHRyaWJ1dGUiLCJyZWQiLCJqIiwiZmllbGQiLCJjbGFzc05hbWUiLCJmaWVsZF9fZnJvbnQiLCJjbGFzc0xpc3QiLCJmaWVsZF9fYmFjayIsInRleHRDb250ZW50Iiwic2hpZnQiLCJhcHBlbmRDaGlsZCIsInF1ZXJ5U2VsZWN0b3IiLCJhZGRFdmVudExpc3RlbmVyIiwiZSIsInRhcmdldCIsInBhcmVudE5vZGUiLCJjb250YWlucyIsInBpY2siLCJ0aW1lciIsImxlbmd0aCIsInNldFRpbWVvdXQiLCJjaGVjayIsImZvckVhY2giLCJpdGVtIiwiaW5kZXgiLCJzcGxpY2UiLCJyZW1vdmUiLCJ0aW1lcnIiLCJzZWNvbmRzIiwibWludXRlcyIsImhvdXJzIiwidCIsImFkZCIsImVsZW0iLCJyZW1vdmVDaGlsZCJdLCJtYXBwaW5ncyI6IjtRQUFBO1FBQ0E7O1FBRUE7UUFDQTs7UUFFQTtRQUNBO1FBQ0E7UUFDQTtRQUNBO1FBQ0E7UUFDQTtRQUNB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LENBQVIsR0FBWUEsS0FBWixHQUFvQixNQUFNQSxLQUE5QixHQUF1QyxJQUE3QyxJQUFxRCxHQUFyRCxJQUE0REQsT0FBTyxHQUFJQSxPQUFPLEdBQUcsQ0FBVixHQUFjQSxPQUFkLEdBQXdCLE1BQU1BLE9BQWxDLEdBQTZDLElBQWhILElBQXdILEdBQXhILElBQStIRCxPQUFPLEdBQUcsQ0FBVixHQUFjQSxPQUFkLEdBQXdCLE1BQU1BLE9BQTdKLENBQXJCO0FBRUFWLE9BQUs7QUFDTjs7QUFDRCxTQUFTQSxLQUFULEdBQWlCO0FBQ2ZhLEdBQUMsR0FBR1gsVUFBVSxDQUFDWSxHQUFELEVBQU0sSUFBTixDQUFkO0FBQ0Q7O0FBQ0QsU0FBU25DLFdBQVQsQ0FBcUJvQyxJQUFyQixFQUEyQjtBQUN6QkEsTUFBSSxDQUFDbEIsVUFBTCxDQUFnQm1CLFdBQWhCLENBQTRCRCxJQUE1QjtBQUNBLFNBQU8sS0FBUDtBQUNELEMiLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXNDb250ZW50IjpbIiBcdC8vIFRoZSBtb2R1bGUgY2FjaGVcbiBcdHZhciBpbnN0YWxsZWRNb2R1bGVzID0ge307XG5cbiBcdC8vIFRoZSByZXF1aXJlIGZ1bmN0aW9uXG4gXHRmdW5jdGlvbiBfX3dlYnBhY2tfcmVxdWlyZV9fKG1vZHVsZUlkKSB7XG5cbiBcdFx0Ly8gQ2hlY2sgaWYgbW9kdWxlIGlzIGluIGNhY2hlXG4gXHRcdGlmKGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdKSB7XG4gXHRcdFx0cmV0dXJuIGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdLmV4cG9ydHM7XG4gXHRcdH1cbiBcdFx0Ly8gQ3JlYXRlIGEgbmV3IG1vZHVsZSAoYW5kIHB1dCBpdCBpbnRvIHRoZSBjYWNoZSlcbiBcdFx0dmFyIG1vZHVsZSA9IGluc3RhbGxlZE1vZHVsZXNbbW9kdWxlSWRdID0ge1xuIFx0XHRcdGk6IG1vZHVsZUlkLFxuIFx0XHRcdGw6IGZhbHNlLFxuIFx0XHRcdGV4cG9ydHM6IHt9XG4gXHRcdH07XG5cbiBcdFx0Ly8gRXhlY3V0ZSB0aGUgbW9kdWxlIGZ1bmN0aW9uXG4gXHRcdG1vZHVsZXNbbW9kdWxlSWRdLmNhbGwobW9kdWxlLmV4cG9ydHMsIG1vZHVsZSwgbW9kdWxlLmV4cG9ydHMsIF9fd2VicGFja19yZXF1aXJlX18pO1xuXG4gXHRcdC8vIEZsYWcgdGhlIG1vZHVsZSBhcyBsb2FkZWRcbiBcdFx0bW9kdWxlLmwgPSB0cnVlO1xuXG4gXHRcdC8vIFJldHVybiB0aGUgZXhwb3J0cyBvZiB0aGUgbW9kdWxlXG4gXHRcdHJldHVybiBtb2R1bGUuZXhwb3J0cztcbiBcdH1cblxuXG4gXHQvLyBleHBvc2UgdGhlIG1vZHVsZXMgb2JqZWN0IChfX3dlYnBhY2tfbW9kdWxlc19fKVxuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5tID0gbW9kdWxlcztcblxuIFx0Ly8gZXhwb3NlIHRoZSBtb2R1bGUgY2FjaGVcbiBcdF9fd2VicGFja19yZXF1aXJlX18uYyA9IGluc3RhbGxlZE1vZHVsZXM7XG5cbiBcdC8vIGRlZmluZSBnZXR0ZXIgZnVuY3Rpb24gZm9yIGhhcm1vbnkgZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5kID0gZnVuY3Rpb24oZXhwb3J0cywgbmFtZSwgZ2V0dGVyKSB7XG4gXHRcdGlmKCFfX3dlYnBhY2tfcmVxdWlyZV9fLm8oZXhwb3J0cywgbmFtZSkpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgbmFtZSwgeyBlbnVtZXJhYmxlOiB0cnVlLCBnZXQ6IGdldHRlciB9KTtcbiBcdFx0fVxuIFx0fTtcblxuIFx0Ly8gZGVmaW5lIF9fZXNNb2R1bGUgb24gZXhwb3J0c1xuIFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yID0gZnVuY3Rpb24oZXhwb3J0cykge1xuIFx0XHRpZih0eXBlb2YgU3ltYm9sICE9PSAndW5kZWZpbmVkJyAmJiBTeW1ib2wudG9TdHJpbmdUYWcpIHtcbiBcdFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgU3ltYm9sLnRvU3RyaW5nVGFnLCB7IHZhbHVlOiAnTW9kdWxlJyB9KTtcbiBcdFx0fVxuIFx0XHRPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cywgJ19fZXNNb2R1bGUnLCB7IHZhbHVlOiB0cnVlIH0pO1xuIFx0fTtcblxuIFx0Ly8gY3JlYXRlIGEgZmFrZSBuYW1lc3BhY2Ugb2JqZWN0XG4gXHQvLyBtb2RlICYgMTogdmFsdWUgaXMgYSBtb2R1bGUgaWQsIHJlcXVpcmUgaXRcbiBcdC8vIG1vZGUgJiAyOiBtZXJnZSBhbGwgcHJvcGVydGllcyBvZiB2YWx1ZSBpbnRvIHRoZSBuc1xuIFx0Ly8gbW9kZSAmIDQ6IHJldHVybiB2YWx1ZSB3aGVuIGFscmVhZHkgbnMgb2JqZWN0XG4gXHQvLyBtb2RlICYgOHwxOiBiZWhhdmUgbGlrZSByZXF1aXJlXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLnQgPSBmdW5jdGlvbih2YWx1ZSwgbW9kZSkge1xuIFx0XHRpZihtb2RlICYgMSkgdmFsdWUgPSBfX3dlYnBhY2tfcmVxdWlyZV9fKHZhbHVlKTtcbiBcdFx0aWYobW9kZSAmIDgpIHJldHVybiB2YWx1ZTtcbiBcdFx0aWYoKG1vZGUgJiA0KSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnICYmIHZhbHVlICYmIHZhbHVlLl9fZXNNb2R1bGUpIHJldHVybiB2YWx1ZTtcbiBcdFx0dmFyIG5zID0gT2JqZWN0LmNyZWF0ZShudWxsKTtcbiBcdFx0X193ZWJwYWNrX3JlcXVpcmVfXy5yKG5zKTtcbiBcdFx0T2JqZWN0LmRlZmluZVByb3BlcnR5KG5zLCAnZGVmYXVsdCcsIHsgZW51bWVyYWJsZTogdHJ1ZSwgdmFsdWU6IHZhbHVlIH0pO1xuIFx0XHRpZihtb2RlICYgMiAmJiB0eXBlb2YgdmFsdWUgIT0gJ3N0cmluZycpIGZvcih2YXIga2V5IGluIHZhbHVlKSBfX3dlYnBhY2tfcmVxdWlyZV9fLmQobnMsIGtleSwgZnVuY3Rpb24oa2V5KSB7IHJldHVybiB2YWx1ZVtrZXldOyB9LmJpbmQobnVsbCwga2V5KSk7XG4gXHRcdHJldHVybiBucztcbiBcdH07XG5cbiBcdC8vIGdldERlZmF1bHRFeHBvcnQgZnVuY3Rpb24gZm9yIGNvbXBhdGliaWxpdHkgd2l0aCBub24taGFybW9ueSBtb2R1bGVzXG4gXHRfX3dlYnBhY2tfcmVxdWlyZV9fLm4gPSBmdW5jdGlvbihtb2R1bGUpIHtcbiBcdFx0dmFyIGdldHRlciA9IG1vZHVsZSAmJiBtb2R1bGUuX19lc01vZHVsZSA/XG4gXHRcdFx0ZnVuY3Rpb24gZ2V0RGVmYXVsdCgpIHsgcmV0dXJuIG1vZHVsZVsnZGVmYXVsdCddOyB9IDpcbiBcdFx0XHRmdW5jdGlvbiBnZXRNb2R1bGVFeHBvcnRzKCkgeyByZXR1cm4gbW9kdWxlOyB9O1xuIFx0XHRfX3dlYnBhY2tfcmVxdWlyZV9fLmQoZ2V0dGVyLCAnYScsIGdldHRlcik7XG4gXHRcdHJldHVybiBnZXR0ZXI7XG4gXHR9O1xuXG4gXHQvLyBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGxcbiBcdF9fd2VicGFja19yZXF1aXJlX18ubyA9IGZ1bmN0aW9uKG9iamVjdCwgcHJvcGVydHkpIHsgcmV0dXJuIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmplY3QsIHByb3BlcnR5KTsgfTtcblxuIFx0Ly8gX193ZWJwYWNrX3B1YmxpY19wYXRoX19cbiBcdF9fd2VicGFja19yZXF1aXJlX18ucCA9IFwiXCI7XG5cblxuIFx0Ly8gTG9hZCBlbnRyeSBtb2R1bGUgYW5kIHJldHVybiBleHBvcnRzXG4gXHRyZXR1cm4gX193ZWJwYWNrX3JlcXVpcmVfXyhfX3dlYnBhY2tfcmVxdWlyZV9fLnMgPSAwKTtcbiIsIiAgICAvKlxyXG4gIC0gSWdyaWNhIG1lbW9yaWplOiBuYSB0YWJsaSAxMHgxMCBzdSByYW5kb20gYnJvamV2aSBvZCAxIGRvIDUwLCBzdmFraSBzZSBuYWxhemkgcG8gMnggYWxpIHN1IGl6bWXFoWFuaSxcclxuICBicm9qZXZpIHNlIG5lIHZpZGUgZG9rIG5lIGtsaWtuZW1vIG5hIHBvbGplIG5hIGtvamVtIGplIGJyb2osIGFrbyB6YXJlZG9tIFxyXG4gIGtsaWtuZW1vIG5hIDIgcG9samEgaXNwb2Qga29qaWggc2Uga3JpamUgaXN0aSBicm9qIHRlIGthcnRpY2UgcG9zdGFqdSBvdHZvcmVuZVxyXG4gICovXHJcblxyXG5cclxuICAgIC8vIEdBTUUgVkFSU1xyXG5cclxuICAgIGxldCBjb3VudGVyID0gMCxcclxuICAgICAgICB0ZW1wQXJyID0gW10sXHJcbiAgICAgICAgdG90YWxUcmllcyA9IDAsXHJcbiAgICAgICAgZ2FtZVN0YXJ0ZWQsXHJcbiAgICAgICAgZmllbGRWYWx1ZXMsXHJcbiAgICAgICAgbGV2ZWwgPSAyO1xyXG5cclxuXHJcbiAgICBjb25zdCB0b3RhbFRyaWVzRGlzcGxheSA9IGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCd0b3RhbE1pc3Rha2VzJyk7XHJcblxyXG4gICAgY29uc3QgZWxlbWVudHNJbml0ID0gKG1pbixtYXgpID0+IHtcclxuICAgICAgbGV0IGNvbGxlY3Rpb24xID0gW10sXHJcbiAgICAgICAgICBjb2xsZWN0aW9uMiA9IFtdO1xyXG5cclxuICAgICAgZm9yIChsZXQgaSA9IDA7IGkgPCBtYXggKiAyOyBpKyspIHtcclxuICAgICAgICBsZXQgcmFuZG9tTnVtID0gTWF0aC5mbG9vcihNYXRoLnJhbmRvbSgpICogKG1heCAtIG1pbiArIDEpKSArIG1pbjtcclxuICAgICAgICBpZiAoY29sbGVjdGlvbjEuaW5kZXhPZihyYW5kb21OdW0pID09IC0xKSB7XHJcbiAgICAgICAgICBjb2xsZWN0aW9uMS5wdXNoKHJhbmRvbU51bSk7XHJcblxyXG4gICAgICAgIH0gZWxzZSBpZiAoY29sbGVjdGlvbjIuaW5kZXhPZihyYW5kb21OdW0pID09IC0xKSB7XHJcbiAgICAgICAgICBjb2xsZWN0aW9uMi5wdXNoKHJhbmRvbU51bSk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgIC0taTtcclxuICAgICAgICB9XHJcblxyXG4gICAgICB9XHJcbiAgICAgIHJldHVybiBjb2xsZWN0aW9uMS5jb25jYXQoY29sbGVjdGlvbjIpO1xyXG4gICAgfTtcclxuXHJcbiAgICBjb25zdCBnYW1lSW5pdCA9IChyb3dzLGNvbHMpID0+IHtcclxuICAgICAgICBsZXQgdG90YWxGaWVsZHMgPSByb3dzICogY29scztcclxuICAgICAgICBsZXQgbnVtYmVyT2ZFbGVtZW50cyA9IHRvdGFsRmllbGRzIC8gMjtcclxuICAgICAgICBmaWVsZFZhbHVlcyA9IGVsZW1lbnRzSW5pdCgxLG51bWJlck9mRWxlbWVudHMsdG90YWxGaWVsZHMpO1xyXG4gICAgICAgIGxldCB0bXBWYWxzID0gZmllbGRWYWx1ZXMuc2xpY2UoKTtcclxuICAgICAgY29uc29sZS5sb2coZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2dhbWVGaWVsZCcpKVxyXG4gIGlmKGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lRmllbGQnKSAhPT0gbnVsbCl7XHJcblxyXG4gICAgICAgIHJlbW92ZUR1bW15KGRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdnYW1lRmllbGQnKSk7XHJcbiAgfVxyXG4gIGxldCB0YWJsZSA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoXCJ0YWJsZVwiKTtcclxuICB0YWJsZS5zZXRBdHRyaWJ1dGUoJ2lkJywnZ2FtZUZpZWxkJyk7XHJcbiAgZm9yIChsZXQgaSA9IDA7IGkgPCByb3dzOyBpKyspIHtcclxuICAgIGxldCByZWQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidHJcIik7XHJcbiAgICBmb3IgKGxldCBqID0gMDsgaiA8IGNvbHM7IGorKykge1xyXG4gICAgICBsZXQgZmllbGQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwidGRcIik7XHJcbiAgICAgIGZpZWxkLmNsYXNzTmFtZSA9ICdmaWVsZCc7XHJcbiAgICAgIGxldCBmaWVsZF9fZnJvbnQgPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiZGl2XCIpO1xyXG4gICAgICBmaWVsZF9fZnJvbnQuY2xhc3NMaXN0ID0gJ2ZpZWxkX19zaWRlIGZpZWxkX19mcm9udCc7XHJcbiAgICAgIGxldCBmaWVsZF9fYmFjayA9ZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKTtcclxuICAgICAgZmllbGRfX2JhY2suY2xhc3NMaXN0ID0gJ2ZpZWxkX19zaWRlIGZpZWxkX19iYWNrJztcclxuXHJcbiAgICAgIGZpZWxkLnNldEF0dHJpYnV0ZSgnaWQnLCBgcmVkXyR7aSsxfV9maWVsZF8ke2orMX1gKTtcclxuICAgICAgZmllbGRfX2JhY2sudGV4dENvbnRlbnQgPSB0bXBWYWxzLnNoaWZ0KCk7XHJcbiAgICAgIGZpZWxkLmFwcGVuZENoaWxkKGZpZWxkX19mcm9udCk7XHJcbiAgICAgIGZpZWxkLmFwcGVuZENoaWxkKGZpZWxkX19iYWNrKTtcclxuXHJcbiAgICAgIHJlZC5hcHBlbmRDaGlsZChmaWVsZCk7XHJcbiAgICB9XHJcbiAgICB0YWJsZS5hcHBlbmRDaGlsZChyZWQpO1xyXG4gIH1cclxuICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9sZGVyJykuYXBwZW5kQ2hpbGQodGFibGUpO1xyXG5cclxuXHJcbn07XHJcblxyXG5cclxuXHJcbiAgICBnYW1lSW5pdChsZXZlbCxsZXZlbCk7XHJcbiAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuaG9sZGVyJykuYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLChlKT0+e1xyXG4gICAgICAgIGlmKGUudGFyZ2V0LnBhcmVudE5vZGUuY2xhc3NMaXN0LmNvbnRhaW5zKCdmaWVsZCcpKXtcclxuICAgICAgICAgICAgbGV0IHBpY2sgPSBlLnRhcmdldC5wYXJlbnROb2RlO1xyXG5cclxuICAgICAgICAgICAgaWYoIWdhbWVTdGFydGVkKXtcclxuICAgICAgICAgICAgICAgIHRpbWVyKCk7XHJcbiAgICAgICAgICAgICAgICBnYW1lU3RhcnRlZCA9IHRydWU7XHJcbiAgICAgICAgICAgIH1cclxuXHJcbiAgICAgICAgICAgIGlmICghcGljay5jbGFzc0xpc3QuY29udGFpbnMoJ2RvbmUnKSAmJiBjb3VudGVyIDwgMiAmJiAhKHBpY2suY2xhc3NMaXN0LmNvbnRhaW5zKCdrbGlrbnV0bycpKSkge1xyXG4gICAgICAgICAgICAgICAgcGljay5jbGFzc0xpc3QgKz0gJyBrbGlrbnV0byc7XHJcbiAgICAgICAgICAgICAgICBjb3VudGVyKys7XHJcbiAgICAgICAgICAgICAgICBpZiAodGVtcEFyci5sZW5ndGggPCAyKSB7XHJcbiAgICAgICAgICAgICAgICAgICAgdGVtcEFyci5wdXNoKHBpY2spO1xyXG4gICAgICAgICAgICAgICAgfVxyXG4gICAgICAgICAgICAgICAgaWYgKGNvdW50ZXIgPT09IDIpIHtcclxuICAgICAgICAgICAgICAgICAgICBzZXRUaW1lb3V0KGZ1bmN0aW9uICgpIHtcclxuICAgICAgICAgICAgICAgICAgICAgICAgY2hlY2soKTtcclxuICAgICAgICAgICAgICAgICAgICAgICAgdG90YWxUcmllc0Rpc3BsYXkudGV4dENvbnRlbnQgPSB0b3RhbFRyaWVzO1xyXG4gICAgICAgICAgICAgICAgICAgIH0sIDkwMCk7XHJcbiAgICAgICAgICAgICAgICB9XHJcbiAgICAgICAgICAgIH1cclxuICAgICAgICB9XHJcbiAgICB9KTtcclxuXHJcblxyXG4gICAgXHJcbiAgICBmdW5jdGlvbiBjaGVjaygpIHtcclxuXHJcbiAgICAgIGlmICh0ZW1wQXJyWzBdLnRleHRDb250ZW50ID09PSB0ZW1wQXJyWzFdLnRleHRDb250ZW50KSB7XHJcbiAgICAgICAgdGVtcEFyci5mb3JFYWNoKGZ1bmN0aW9uIChpdGVtKSB7XHJcbiAgICAgICAgICBsZXQgaW5kZXggPSBmaWVsZFZhbHVlcy5pbmRleE9mKGl0ZW0udGV4dENvbnRlbnQgKiAxKTtcclxuICAgICAgICAgIGZpZWxkVmFsdWVzLnNwbGljZShpbmRleCwxKTtcclxuICAgICAgICAgIGl0ZW0uY2xhc3NOYW1lICs9ICcgZG9uZSc7XHJcblxyXG4gICAgICAgICAgaWYoZmllbGRWYWx1ZXMubGVuZ3RoID09PSAwKSB7XHJcbiAgICAgICAgICAgICAgbGV2ZWwgPSBsZXZlbCArIDI7XHJcbiAgICAgICAgICAgIC8vY2xlYXJUaW1lb3V0KHQpO1xyXG4gICAgICAgICAgICBnYW1lSW5pdChsZXZlbCxsZXZlbCk7XHJcbiAgICAgICAgICB9XHJcblxyXG4gICAgICAgIH0pO1xyXG5cclxuICAgICAgfSBlbHNlIHtcclxuICAgICAgICB0ZW1wQXJyLmZvckVhY2goZnVuY3Rpb24gKGl0ZW0pIHtcclxuICAgICAgICAgIGl0ZW0uY2xhc3NMaXN0LnJlbW92ZSgna2xpa251dG8nKTtcclxuICAgICAgICB9KTtcclxuICAgICAgICB0b3RhbFRyaWVzKys7XHJcbiAgICAgIH1cclxuICAgICAgdGVtcEFyciA9IFtdO1xyXG4gICAgICBjb3VudGVyID0gMDtcclxuXHJcblxyXG5cclxuXHJcbiAgICB9XHJcbiAgICBsZXQgdGltZXJyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ3RpbWUnKTtcclxuXHJcbiAgICBsZXQgc2Vjb25kcyA9IDAsIG1pbnV0ZXMgPSAwLCBob3VycyA9IDAsXHJcbiAgICAgICAgdDtcclxuXHJcbiAgICBmdW5jdGlvbiBhZGQoKSB7XHJcbiAgICAgIHNlY29uZHMrKztcclxuICAgICAgaWYgKHNlY29uZHMgPj0gNjApIHtcclxuICAgICAgICBzZWNvbmRzID0gMDtcclxuICAgICAgICBtaW51dGVzKys7XHJcbiAgICAgICAgaWYgKG1pbnV0ZXMgPj0gNjApIHtcclxuICAgICAgICAgIG1pbnV0ZXMgPSAwO1xyXG4gICAgICAgICAgaG91cnMrKztcclxuICAgICAgICB9XHJcbiAgICAgIH1cclxuXHJcbiAgICAgIHRpbWVyci50ZXh0Q29udGVudCA9IChob3VycyA/IChob3VycyA+IDkgPyBob3VycyA6IFwiMFwiICsgaG91cnMpIDogXCIwMFwiKSArIFwiOlwiICsgKG1pbnV0ZXMgPyAobWludXRlcyA+IDkgPyBtaW51dGVzIDogXCIwXCIgKyBtaW51dGVzKSA6IFwiMDBcIikgKyBcIjpcIiArIChzZWNvbmRzID4gOSA/IHNlY29uZHMgOiBcIjBcIiArIHNlY29uZHMpO1xyXG5cclxuICAgICAgdGltZXIoKTtcclxuICAgIH1cclxuICAgIGZ1bmN0aW9uIHRpbWVyKCkge1xyXG4gICAgICB0ID0gc2V0VGltZW91dChhZGQsIDEwMDApO1xyXG4gICAgfVxyXG4gICAgZnVuY3Rpb24gcmVtb3ZlRHVtbXkoZWxlbSkge1xyXG4gICAgICBlbGVtLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZWxlbSk7XHJcbiAgICAgIHJldHVybiBmYWxzZTtcclxuICAgIH0iXSwic291cmNlUm9vdCI6IiJ9