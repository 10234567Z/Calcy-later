let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator');
let typedText = document.querySelector('.typeText');
let resultText = document.querySelector('.resultText');
let firstInputs = [];
let lastInputs = [];
let operator;
let value = 0;
let operatorClicked = false;
let percentageActive = false;
let valueChanged = false;

for (i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        if (operatorClicked === false && firstInputs.length <= 5) {
            firstInputs.push(e.target.id);
            typedText.innerHTML = `${firstInputs.join('')}`;
        }
        else if (operatorClicked === true && lastInputs.length <= 5) {

            lastInputs.push(e.target.id);
            typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
            calculate();
        }
        else {
            alert('Numbers limit exceeded');
        }
    })
}

document.querySelector('.reset').addEventListener('click', (e) => {
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
    operators[i].addEventListener('click', (e) => {
        operator = e.target.id;
        typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
        operatorClicked = true;

        if (valueChanged === true) {
            lastInputs.length = 0;
            firstInputs.length = 0;
            firstInputs.push(value);
            typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
            resultText.innerHTML = '';
        }
        if(operator === '='){
            typedText.innerHTML = `${firstInputs.join('')} `;
        }
    })
}


function calculate() {

    let firstNumber = parseFloat(firstInputs.join(''));
    let lastNumber = parseFloat(lastInputs.join(''));

    if(valueChanged === false){
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
        else if(operator === '='){
            typedText.innerHTML = value.toFixed(2);
            resultText.innerHTML = '';
            valueChanged = true;
        }
    }
    else {
        if (operator === '+') {
            value = firstNumber + lastNumber;
            resultText.innerHTML = value;
        }
        else if (operator === '-') {
            value = firstNumber - lastNumber;
            resultText.innerHTML = value;
        }
        else if (operator === 'x') {
            value = firstNumber * lastNumber;
            resultText.innerHTML = value.toFixed(2);
        }
        else if (operator === '÷') {
            value = firstNumber / lastNumber;
            resultText.innerHTML = value.toFixed(2);
        }
    }
}
