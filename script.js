
// DATA SETUP
const numbers = document.querySelectorAll("#num");
const operations = document.querySelectorAll('#operator');
const secondTerm = document.querySelector('#displayPrevious');
const firstTerm = document.querySelector("#displayCurrent");
const operationDisplay = document.querySelector('#operationDisplay');
const mockup = document.querySelector('#mockup');
const clearBtn = document.querySelector('#clear-btn');

let firstTermValue = '';
let secondTermValue = '';
let operatorValue = '';

// TERMS MANAGEMENT

const updateFirstTerm = (newValue) => {
  firstTermValue = newValue;
  firstTerm.innerText = newValue;
}

const updateSecondTerm = (newValue) => {
  secondTermValue = newValue;
  secondTerm.innerText = newValue;
}

const updateOperator = (newValue) => {
  operationDisplay.innerText = newValue;
  operatorValue = newValue;
}

// CLEAR ACTIONS
clearBtn.addEventListener("click", () => resetCalculator());

const clearDisplay = () => {
  firstTerm.innerText = '';
  secondTerm.innerText = '';
  operationDisplay.innerText = null;

  // Reset deafult value
  mockup.style.display = "block"
} 

const clearTerms = () => {
  firstTermValue = '';
  secondTermValue = '';
}

const clearOperator = () => {
  operatorValue = '';
  operationDisplay.innerText = '';
}

const clearResult = () => result = null;

const resetCalculator = () => {
    clearTerms();
    clearOperator();
    // clearResult();
    clearDisplay();
}

const removeLastCharacter = (string) => string.slice(0, -1);

const cancelLastDigit = () => {

  if(firstTermValue){
    if(firstTermValue.length > 1){
      updateFirstTerm(removeLastCharacter(firstTermValue));
    } else {
      clearFirstTerm(firstTermValue);
    }
  } else if (operatorValue) {
    clearOperator();

    if (secondTermValue){

      // Switch terms
      updateFirstTerm(secondTermValue);
      // firstTermValue = secondTermValue;
      // firstTerm.innerText = firstTermValue;

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
equalSign.addEventListener("click", function () {});

// OPERATION TESTS

// operate("+", 1, 3);
// console.log(add(1, 2));
// console.log(subtract(5, 2));
// console.log(multiply(6, 3));
// console.log(divide(4, 2));

// INPUTS MANAGEMENT

numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (mockup.style.display = "block") {
            mockup.style.display = "none";
        }
        updateFirstTerm(firstTermValue + number.innerText);

        // OLD
        // firstTerm.innerText += number.innerText;
        // firstTermValue += number.innerText;
    })
})

//firstTermValue is the first numbers inputed and the secondTermValue are the second set of numbers after a usedd operator;

operations.forEach(button => {
    button.addEventListener("click", () => {

        updateSecondTerm(firstTermValue);

        //OLD
        // secondTerm.innerText = firstTerm.innerText;
        // secondTermValue = firstTermValue;

        clearFirstTerm();

        updateOperator(button.innerText);

        // OLD
        // operationDisplay.innerText = button.innerText;
        // operatorValue = button.innerText;
    })
})

