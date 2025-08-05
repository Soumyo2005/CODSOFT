let currentInput = '';
let previousInput = '';
let operation = null;
let resetScreen = false;

const result = document.getElementById('result');

function appendToDisplay(value) {
    if (resetScreen) {
        currentInput = '';
        resetScreen = false;
    }
    
    // Prevent multiple decimal points
    if (value === '.' && currentInput.includes('.')) return;
    
    // Prevent operator as first input (except for negative numbers)
    if (isOperator(value) && currentInput === '' && value !== '-') return;
    
    // Handle negative numbers
    if (value === '-' && currentInput === '' || isOperator(value) && !isOperator(currentInput.slice(-1))) {
        currentInput += value;
    } 
    // Replace operator if last input was an operator
    else if (isOperator(value) && isOperator(currentInput.slice(-1))) {
        currentInput = currentInput.slice(0, -1) + value;
    } 
    else {
        currentInput += value;
    }
    
    result.value = currentInput;
}

function isOperator(value) {
    return ['+', '-', '*', '/', '%'].includes(value);
}

function clearDisplay() {
    currentInput = '';
    previousInput = '';
    operation = null;
    result.value = '0';
}

function deleteLastChar() {
    currentInput = currentInput.slice(0, -1);
    result.value = currentInput || '0';
}

function calculate() {
    if (currentInput === '' || isOperator(currentInput.slice(-1))) return;
    
    try {
        // Replace × with * for evaluation
        const expression = currentInput.replace(/×/g, '*');
        currentInput = eval(expression).toString();
        result.value = currentInput;
        resetScreen = true;
    } catch (error) {
        result.value = 'Error';
        currentInput = '';
    }
}