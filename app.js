/*-------------------------------- Constants --------------------------------*/
const operatorMap = {
    '+': (a, b) => a + b,
    '-': (a, b) => a - b,
    '*': (a, b) => a * b,
    '/': (a, b) => a / b,
};

/*-------------------------------- Variables --------------------------------*/
let currentInput = '';
let previousInput = '';
let operator = '';

/*------------------------ Cached Element References ------------------------*/
const display = document.querySelector('.display');
const buttons = document.querySelectorAll('.button');

/*----------------------------- Event Listeners -----------------------------*/
buttons.forEach(button => {
    button.addEventListener('click', handleButtonClick);
});

/*-------------------------------- Functions --------------------------------*/
function handleButtonClick(event) {
    const buttonValue = event.target.textContent;

    if (buttonValue === 'C') {
        clearCalculator();
    } else if (buttonValue === '=') {
        calculateResult();
    } else if (operatorMap[buttonValue]) {
        setOperator(buttonValue);
    } else {
        appendNumber(buttonValue);
    }
    updateDisplay();
}

function appendNumber(number) {
    currentInput += number;
}

function setOperator(op) {
    if (currentInput === '') return;
    if (previousInput !== '') {
        calculateResult();
    }
    operator = op;
    previousInput = currentInput;
    currentInput = '';
}

function calculateResult() {
    if (previousInput === '' || currentInput === '') return;
    const result = operatorMap[operator](parseFloat(previousInput), parseFloat(currentInput));
    currentInput = result.toString();
    previousInput = '';
    operator = '';
}

function clearCalculator() {
    currentInput = '';
    previousInput = '';
    operator = '';
}

function updateDisplay() {
    display.textContent = currentInput || previousInput || '0';
}