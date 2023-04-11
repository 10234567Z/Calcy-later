/** Initialiozation of variables needed */
let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator');
let buttons = document.querySelectorAll('.buttons');
let typedText = document.querySelector('.typeText');
let resultText = document.querySelector('.resultText');

let firstInputs = [];
let lastInputs = [];
let value = 0;
let tempValue = 0;
let valueChanged = false;

let operator;
let operatorClicked = false;

for (i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('mousedown', (e) => {

        /** Change font size upon click */
        e.target.style.fontSize = '0.9em'

        /** Build the number before operator while keeping max length and other necessary checks */
        if (operatorClicked === false && firstInputs.length <= 5 && firstInputs[firstInputs.length - 1] !== '%') {
            firstInputs.push(e.target.id);
            typedText.innerHTML = `${firstInputs.join('')}`;
        }
        /** Build the number after operator while keeping max length and other necessary checks */
        else if (operatorClicked === true && lastInputs.length <= 5 && lastInputs[lastInputs.length - 1] !== '%') {

            lastInputs.push(e.target.id);
            typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
            calculate();
        }
        /** If none of the above criteria meets , its invalid for calculator */
        else {
            alert('Invalid Input');
            e.target.style.fontSize = '2em'
        }
    })
}

document.querySelector('.percentage').addEventListener('mousedown', (e) => {
    let firstNumber = parseFloat(firstInputs.join(''));
    let lastNumber = parseFloat(lastInputs.join(''));

    /** Percentage for the 1st number and calculating it instantly */
    if(operatorClicked === false && firstInputs.length > 0){
        firstInputs.push('%');
        typedText.innerHTML = `${firstInputs.join('')}`;
        value = parseFloat((firstNumber / 100).toFixed(2));
        resultText.innerHTML = value;
        valueChanged = true;
    }
    else if(operatorClicked === true && lastInputs.length > 0){
        lastInputs.push('%')
        typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
        tempValue = parseFloat((lastNumber / 100).toFixed(2));
        resultText.innerHTML = value;
        valueChanged = true;
        calculate();
    }
    else{
        alert('Invalid Input');
    }
})

document.querySelector('.reset').addEventListener('mousedown', (e) => {
    e.target.style.fontSize = '0.8em'
    typedText.innerHTML = '';
    resultText.innerHTML = '';
    firstInputs.length = 0;
    lastInputs.length = 0;
    value = 0;
    operator = '';
    operatorClicked = false;
    valueChanged = false;
})

for (i = 0; i < operators.length; i++) {
    operators[i].addEventListener('mousedown', (e) => {
        e.target.style.fontSize = '0.8em'
        operator = e.target.id;
        typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
        operatorClicked = true;

        if (valueChanged === true) {
            lastInputs.length = 0;
            firstInputs.length = 0;
            firstInputs.push(value.toFixed(2));
            typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
            resultText.innerHTML = '';
        }
        if (operator === '=') {
            typedText.innerHTML = `${firstInputs.join('')} `;
        }
    })
}

document.querySelector('.delete').addEventListener('mousedown', (e) => {

    valueChanged = false;
    if (operatorClicked === false && firstInputs.length > 0) {
        firstInputs.length -= 1;
        typedText.innerHTML = `${firstInputs.join('')} `;
    }
    else if(lastInputs.length > 0) {
        lastInputs.length -= 1;
        typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
        calculate();
    }
    else if(lastInputs.length === 0 || operatorClicked === true){
        operatorClicked = false;
        operator = '';
        resultText.innerHTML = '';
        value = '';
        typedText.innerHTML = `${firstInputs.join('')}` ;
    }
    else{
        alert('Invalid Input');
    }
})

for (i = 0; i < buttons.length; i++) {
    buttons[i].addEventListener('mouseup', (e) => {
        e.target.style.fontSize = '2em'
    })
}

function calculate() {

    let firstNumber = parseFloat(firstInputs.join(''));
    let lastNumber = parseFloat(lastInputs.join(''));

    if (valueChanged === false) {
        if (operator === '+') {
            value = firstNumber + lastNumber;
            resultText.innerHTML = value;
            valueChanged = true;
        }
        else if (operator === '-') {
            value = firstNumber - lastNumber;
            resultText.innerHTML = value;
            valueChanged = true;
        }
        else if (operator === 'x') {
            value = firstNumber * lastNumber;
            resultText.innerHTML = value.toFixed(2);
            valueChanged = true;
        }
        else if (operator === '÷') {
            value = firstNumber / lastNumber;
            resultText.innerHTML = value.toFixed(2);
            valueChanged = true;
        }
        else if (operator === '=') {
            typedText.innerHTML = value.toFixed(2);
            resultText.innerHTML = '';
            valueChanged = true;
        }
    }
    else {
        if (operator === '+') {
            value = firstNumber + lastNumber;
            resultText.innerHTML = value;
            if(lastInputs.includes('%')){
                value = firstNumber + tempValue;
                resultText.innerHTML = value;
            }
        }
        else if (operator === '-') {
            value = firstNumber - lastNumber;
            resultText.innerHTML = value;
            if(lastInputs.includes('%')){
                value = firstNumber - tempValue;
                resultText.innerHTML = value;
            }
        }
        else if (operator === 'x') {
            value = firstNumber * lastNumber;
            resultText.innerHTML = value.toFixed(2);
            if(lastInputs.includes('%')){
                value = firstNumber * tempValue;
                resultText.innerHTML = value;
            }
        }
        else if (operator === '÷') {
            value = firstNumber / lastNumber;
            resultText.innerHTML = value.toFixed(2);
            if(lastInputs.includes('%')){
                value = firstNumber / tempValue;
                resultText.innerHTML = value;
            }
        }
    }
}