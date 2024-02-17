// DATA SETUP

const numbers = document.querySelectorAll(".num");
const operations = document.querySelectorAll(".operator");

let firstTerm = "";
let secondTerm = "";
let operator = "";

// UTILITIES

const convertToNumber = (string) => Number(string);
const convertToString = (number) => number.toString();

// DISPLAY MANAGEMENT

const clearBtn = document.querySelector("#clear-btn");
const backSpaceBtn = document.querySelector("#back-space");

const expression = document.querySelector("#expression");
expression.innerText = "0";

const updateExpression = (firstTerm = "", operator = "", secondTerm = "") => {
  let newExpression = `${firstTerm} ${operator} ${secondTerm}`;
  expression.innerText = newExpression;
};

// TERMS MANAGEMENT

const updateFirstTerm = (newValue) => {
  firstTerm = newValue;
  updateExpression(firstTerm);
};

const updateSecondTerm = (newValue) => {
  secondTerm = newValue;
  updateExpression(firstTerm, operator, secondTerm);
};

const updateOperator = (newOperator) => {
  if (newOperator === "*") {
    operator = "x";
  } else if (newOperator === "/") {
    operator = "÷";
  } else {
    operator = newOperator;
  }

  updateExpression(firstTerm, operator);
};

// CLEAR ACTIONS

backSpaceBtn.addEventListener("click", () => cancelLastDigit());
clearBtn.addEventListener("click", () => resetCalculator());

const resetDefaultDisplay = () => (expression.innerText = "0");

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

  if (operator) {
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

  if (result === Infinity || result === NaN) {
    resetCalculator();
    updateExpression("Haha nice try!")
  } else {
    clearSecondTerm();
    clearOperator();

    // The calculation result become the new first term
    updateFirstTerm(result);
    updateExpression(result);
  }
};

const handleOperateCommand = () => {
  if (operator && firstTerm && secondTerm) {
    if (operator === "x") {
      operator = "*";
    } else if (operator === "÷") {
      operator = "/";
    } else {
      operator = operator;
    }
    operate(operator, firstTerm, secondTerm);
  } else {
    console.log("ERROR: terms or operator missing");
  }
};

let equalSign = document.querySelector(".equal-sign");

equalSign.addEventListener("click", function () {
  handleOperateCommand();
});

// INPUTS MANAGEMENT

const isAlreadyDecimal = (term) => term.includes(".");

const numberInputHandler = (value) => {
  let newValue;

  if (operator) {
    if (value == "." && isAlreadyDecimal(secondTerm)) {
      console.log("ERROR: Decimal already present");
      return;
    }

    newValue = secondTerm + value;
    updateSecondTerm(newValue);
  } else {
    if (value == "." && isAlreadyDecimal(firstTerm)) {
      console.log("ERROR: Decimal already present");
      return;
    }

    newValue = firstTerm + value;
    updateFirstTerm(newValue);
  }
};

const operatorInputHandler = (newOperator) => {
  if (firstTerm) {
    // If the operator is already valorized it perform the operation and add the calculator after the result
    if (operator) {
      handleOperateCommand();
    }
    updateOperator(newOperator);
  } else {
    console.log("ERROR: firstTerm not present");
  }
};

// Numbers Input
numbers.forEach((number) => {
  number.addEventListener("click", () => {
    numberInputHandler(number.innerText);
  });
});

// Operators Input
operations.forEach((button) => {
  button.addEventListener("click", () => {
    operatorInputHandler(button.value);
  });
});

// KEYBOARD SUPPORT

const isANumberOrDecimalPoint = (value) =>
  !isNaN(parseInt(value)) || value == ".";
const isAnOperator = (value) =>
  value == "+" || value == "-" || value == "*" || value == "/";
const isEnterOrEqual = (value) => value == "Enter" || value == "=";
const isBackspace = (value) => value == "Backspace";
const isClear = (value) => value == "Escape";

const handleKeyPress = (key) => {
  if (isANumberOrDecimalPoint(key)) {
    numberInputHandler(key);
  } else if (isAnOperator(key)) {
    operatorInputHandler(key);
  } else if (isEnterOrEqual(key)) {
    handleOperateCommand(key);
  } else if (isBackspace(key)) {
    cancelLastDigit();
  } else if (isClear(key)) {
    resetCalculator();
  }
};

document.addEventListener("keydown", function (event) {
  let pressedKey = event.key;
  handleKeyPress(pressedKey);
});
