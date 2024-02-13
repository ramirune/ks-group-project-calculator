
// CLEAR ACTIONS
let term1;
let term2;

let operator;

let result;

let displayedValue;

const clearDisplay = () => displayedValue = null;

const clearTerms = () => {
    term1 = null;
    term2 = null;
}

const clearOperator = () => operator = null;

const clearResult = () => result = null;

const resetCalculator = () => {
    clearTerms();
    clearOperator();
    clearResult();
    clearDisplay();
}

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
equalSign.addEventListener("click", function () {});

// operate("+", 1, 3);
// console.log(add(1, 2));
// console.log(subtract(5, 2));
// console.log(multiply(6, 3));
// console.log(divide(4, 2));
