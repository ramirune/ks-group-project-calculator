
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