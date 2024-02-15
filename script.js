// DATA SETUP
const numbers = document.querySelectorAll("#num");
const operations = document.querySelectorAll("#operator");
// const secondTerm = document.querySelector("#displayPrevious");
// const firstTerm = document.querySelector("#displayCurrent");
const operationDisplay = document.querySelector("#operationDisplay");
const mockup = document.querySelector("#mockup");
const clearBtn = document.querySelector("#clear-btn");
const backSpaceBtn = document.querySelector("#back-space");

// APP

let firstTerm = "";
let secondTerm = "";
let operator = "";

// UTILITIES

const convertToNumber = (string) => Number(string);
const convertToString = (number) => number.toString();

// DISPLAY MANAGEMENT

const expression = document.querySelector("#expression");
expression.innerText = "0";

const updateExpression = (firstTerm = "", operator = "", secondTerm = "") => {
  let newExpression = `${firstTerm} ${operator} ${secondTerm}`;
  expression.innerText = newExpression;
};

// TERMS MANAGEMENT

const updateFirstTerm = (newValue) => {
  firstTerm = newValue;
  updateExpression(newValue);
};

const updateSecondTerm = (newValue) => {
  secondTerm = newValue;
  updateExpression(firstTerm, operator, newValue);
};

const updateOperator = (newOperator) => {
  operator = newOperator;
};

// CLEAR ACTIONS

backSpaceBtn.addEventListener("click", () => cancelLastDigit());
clearBtn.addEventListener("click", () => resetCalculator());

const resetDefaultDisplay = () => expression.innerText = "0";

const clearDisplay = () => {
  // Clear the expression
  updateExpression();
  // Put the mock value
  resetDefaultDisplay();
};

const clearFirstTerm = () => {
  firstTerm = "";
  clearDisplay();
};

const clearSecondTerm = () => {
  secondTerm = "";
  updateExpression(firstTerm, operator);
};

const clearTerms = () => {
  clearFirstTerm();
  clearSecondTerm();
};

const clearOperator = () => {
  operator = "";
  updateExpression(firstTerm);
};

const clearResult = () => (result = null);

const resetCalculator = () => {
  clearTerms();
  clearOperator();
  // clearResult();
  clearDisplay();
};

const removeLastCharacter = (number) => convertToString(number).slice(0, -1);

const cancelLastDigit = () => {

  if (secondTerm) {
    if (secondTerm.length > 1) {
      let newSecondTermValue = removeLastCharacter(secondTerm);
      updateSecondTerm(newSecondTermValue);
    } else {
      clearSecondTerm();
    }

    return;
  }

  if (operator){
    clearOperator();

    return;
  }

  if (firstTerm) {

    if (firstTerm.length > 1) {
      let newFirstTermValue = removeLastCharacter(firstTerm);
      updateFirstTerm(newFirstTermValue);
    } else {
      clearFirstTerm();
    }

    return;
  }

};

// OPERATIONS

const add = (num1, num2) => {
  return num1 + num2;
};

const subtract = (num1, num2) => {
  return num1 - num2;
};

const multiply = (num1, num2) => {
  return num1 * num2;
};

const divide = (num1, num2) => {
  return num1 / num2;
};

const operate = (operator, num1, num2) => {
  num1 = convertToNumber(num1);
  num2 = convertToNumber(num2);

  let result;

  switch (operator) {
    case "+":
      result = add(num1, num2);
      break;
    case "-":
      result = subtract(num1, num2);
      break;
    case "*":
      result = multiply(num1, num2);
      break;
    case "/":
      result = divide(num1, num2);
      break;
  }

  clearSecondTerm();
  clearOperator();

  // The calculation result become the new first term
  updateFirstTerm(result);
  updateExpression(result);
};

const handleOperateCommand = () => {
  if(operator && firstTerm && secondTerm) {
    operate(operator, firstTerm, secondTerm);
  } else {
    console.log("ERROR: terms or operator missing")
  }
}

let equalSign = document.querySelector(".equal-sign");
equalSign.addEventListener("click", function () {
  handleOperateCommand();
});

// INPUTS MANAGEMENT

const isAlreadyDecimal = (term) => term.includes('.');

const numberInputHandler = (value) => {
  let newValue;

  if (operator) {

    if(value == '.' && isAlreadyDecimal(secondTerm)){
      console.log("ERROR: Decimal already present");
      return;
    }

    newValue = secondTerm + value;
    updateSecondTerm(newValue);
  } else {

    if(value == '.' && isAlreadyDecimal(firstTerm)){
      console.log("ERROR: Decimal already present");
      return;
    }

    newValue = firstTerm + value;
    updateFirstTerm(newValue);
  }
};

const operatorInputHandler = (operator) => {
  if (firstTerm) {
    updateOperator(operator);
    updateExpression(firstTerm, operator);
  } else {
    console.log("ERROR: firstTerm not present");
  }
};

// Numbers
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    numberInputHandler(number.innerText);
  });
});

// Operators
operations.forEach((button) => {
  button.addEventListener("click", () => {
    operatorInputHandler(button.value);
  });
});
