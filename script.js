const numbers = document.querySelectorAll(".num");
const operations = document.querySelectorAll('#operation');
const clear = document.querySelector('#clear');
const equals = document.querySelector('#equals');
const remove = document.querySelector('#remove');
const secondTerm = document.querySelector('#history-value');
const firstTerm = document.querySelector("#output-value")

class Calculator {
    constructor(secondTerm, currentNumber) {
        this.secondTerm = secondTerm;
        this.firstTerm = firstTerm;
        this.clear();
    }
    equal() {

    }

    Chooseoperation(operation) {
        if (this.currentNum === '') return;
        if (this.previousNum != '') {
            this.calculate();
        }
        this.operation = operation;
        this.previousNum = this.currentNum;
        this.currentNum = '';
    }

    clear() {
        this.currentNum = '';
        this.previousNum = '';
        this.operation = undefined;
    }
    delete() {
        this.currentNum = this.currentNum.toString().slice(0, -1);
    }

    addNumber(number) {
        if (number === "." && this.currentNum.includes('.')) return;
        this.currentNum = this.currentNum.toString() + number.toString();
    }

    calculate() {
        let result;
        const previous = parseFloat(this.previousNum);
        const current = parseFloat(this.currentNum);
        if (isNaN(previous) || isNaN(current)) return;
        switch (this.operation) {
            case '+':
                result = previous + current;
                break
            case '-':
                result = previous - current;
                break
            case '*':
                result = previous * current;
                break
            case '/':
                result = previous / current;
                break
            case '%':
                result = previous % current;
                break
            default:
                return;

        }
        this.currentNum = result;
        this.operation = undefined;
        this.previousNum = '';
    }

    screenNumber() {
        return
    }

    refreshScreen() {
        this.firstTerm.innerText = this.currentNum;
        if (this.operation != null) {
            this.secondTerm.innerText = `${this.previousNum} ${this.operation}`;
        }

    }
}

const calculator = new Calculator(secondTerm, firstTerm);

numbers.forEach(number => {
    number.addEventListener("click", () => {
        calculator.addNumber(number.innerText)
        calculator.refreshScreen()
    })
})


operations.forEach(button => {
    button.addEventListener("click", () => {
        calculator.Chooseoperation(button.innerText)
        calculator.refreshScreen()
    })
})


equals.addEventListener("click", () => {
    calculator.calculate();
    calculator.refreshScreen();
})

clear.addEventListener("click", () => {
    calculator.clear();
    calculator.refreshScreen();
})

remove.addEventListener("click", () => {
    calculator.delete();
    calculator.refreshScreen();
})


