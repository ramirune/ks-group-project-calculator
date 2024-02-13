
// DATA SETUP
const numbers = document.querySelectorAll("#num");
const operations = document.querySelectorAll('#operator');
const secondTerm = document.querySelector('#displayPrevious');
const firstTerm = document.querySelector("#displayCurrent");
const operationDisplay = document.querySelector('#operationDisplay');
const mockup = document.querySelector('#mockup');
const clearBtn = document.querySelector('#clear-btn');
const backSpaceBtn = document.querySelector('#back-space');

let firstTermValue = '';
let secondTermValue = '';
let operatorValue = '';

// CLEAR ACTIONS

backSpaceBtn.addEventListener("click", () => cancelLastDigit());
clearBtn.addEventListener("click", () => resetCalculator());

const resetDefaultDisplay = () => mockup.style.display = "block";

const clearDisplay = () => {
  firstTerm.innerText = '';
  secondTerm.innerText = '';
  operationDisplay.innerText = null;

  resetDefaultDisplay();
}

const clearFirstTerm = () => {
  firstTermValue = '';
  firstTerm.innerText = '';

  if (!operatorValue && !secondTermValue) resetDefaultDisplay();
}

const clearSecondTerm = () => {
  secondTermValue = '';
  secondTerm.innerText = '';
}

const clearTerms = () => {
  clearFirstTerm();
  clearSecondTerm();
}

const clearOperator = () => {
  operatorValue = null;
  operationDisplay.innerText = '';
}

const clearResult = () => result = null;

const resetCalculator = () => {
  clearTerms();
  clearOperator();
  // clearResult();
  clearDisplay();
}

const updateFirstTerm = (newValue) => {
  firstTermValue = newValue;
  firstTerm.innerText = newValue;
}

const removeLastCharacter = (string) => string.slice(0, -1);

const cancelLastDigit = () => {

  if (firstTermValue) {
    if (firstTermValue.length > 1) {
      updateFirstTerm(removeLastCharacter(firstTermValue));
    } else {
      clearFirstTerm(firstTermValue);
    }
  } else if (operatorValue) {
    clearOperator();

    if (secondTermValue) {
      // Switch terms
      firstTermValue = secondTermValue;
      firstTerm.innerText = firstTermValue;

      clearSecondTerm();
    }
  }

}

// OPERATIONS

function add(num1, num2) {
  return num1 + num2;
}

function subtract(num1, num2) {
  return num1 - num2;
}

function multiply(num1, num2) {
  return num1 * num2;
}

function divide(num1, num2) {
  return num1 / num2;
}

function operate(operator, num1, num2) {
  switch (operator) {
    case "+":
      console.log(add(num1, num2));
      break;
    case "-":
      console.log(subtract(num1, num2));
      break;
    case "*":
      console.log(multiply(num1, num2));
      break;
    case "/":
      console.log(divide(num1, num2));
      break;
  }
}

let equalSign = document.querySelector(".equal-sign");
equalSign.addEventListener("click", function () { });

// operate("+", 1, 3);
// console.log(add(1, 2));
// console.log(subtract(5, 2));
// console.log(multiply(6, 3));
// console.log(divide(4, 2));

// INPUTS

numbers.forEach(number => {
  number.addEventListener("click", () => {
    if (mockup.style.display = "block") {
      mockup.style.display = "none";
    }

    if (number.innerText == '.' && firstTerm.innerText.includes('.')) return;
    if (number.innerText == '.' && firstTerm.innerText == '') {
      if (secondTerm.innerText != '') return;
      mockup.style.display = "block";
    }


    firstTerm.innerText += number.innerText;

    firstTermValue += number.innerText;

  })
})

//firstTermValue is the first numbers inputed and the secondTermValue are the second set of numbers after a usedd operator;

operations.forEach(button => {
  button.addEventListener("click", () => {
    secondTerm.innerText = firstTerm.innerText;
    secondTermValue = firstTermValue;
    firstTerm.innerText = '';
    firstTermValue = '';
    if (secondTerm.innerText != '') {
      operationDisplay.innerText = button.innerText;
    }

  })
})

