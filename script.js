const numbers = document.querySelectorAll("#num");
const operations = document.querySelectorAll('#operator');
const secondTerm = document.querySelector('#displayPrevious');
const firstTerm = document.querySelector("#displayCurrent");
const operationDisplay = document.querySelector('#operationDisplay');
const mockup = document.querySelector('#mockup');

let firstTermValue = '';
let secondTermValue = '';


numbers.forEach(number => {
    number.addEventListener("click", () => {
        if (mockup.style.display = "block") {
            mockup.style.display = "none";
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
        operationDisplay.innerText = button.innerText;
    })
})


