/** Initialiozation of variables needed */
let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator');
let buttons = document.querySelectorAll('.buttons');
let typedText = document.querySelector('.typeText');
let resultText = document.querySelector('.resultText');
let resultBox = document.querySelector('.result');
let calculator = document.querySelector('.calculator');

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
        if (operatorClicked === false && firstInputs.length - 2 <= 8 && firstInputs[firstInputs.length - 1] !== '%') {
            if (e.target.id === '.' && firstInputs.length < 1) {
                firstInputs[0] = 0;
                firstInputs.push(e.target.id);
                typedText.innerHTML = `${firstInputs.join('')}`;
            }
            else if (e.target.id === '.' && firstInputs.includes('.')) {
                return null
            }
            else {
                firstInputs.push(e.target.id);
                typedText.innerHTML = `${firstInputs.join('')}`;
            }
        }
        /** Build the number after operator while keeping max length and other necessary checks */
        else if (operatorClicked === true && lastInputs.length - 2 <= 8 && lastInputs[lastInputs.length - 1] !== '%') {
            if (e.target.id === '.' && lastInputs.length < 1) {
                lastInputs[0] = 0;
                lastInputs.push(e.target.id);
                typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;

            }
            else if (e.target.id === '.' && lastInputs.includes('.')) {
                return null;
            }
            else {
                lastInputs.push(e.target.id);
                typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
                calculate();
            }
        }
        /** If none of the above criteria meets , its invalid for calculator */
        else {
            e.target.style.fontSize = '2em'
            return null;
        }
    })
}

document.querySelector('.percentage').addEventListener('mousedown', () => {
    percentage();
})

document.querySelector('.negate').addEventListener('mousedown', () => {
    /** Negate the first number if the number is typed before operator chosen and it exists */
    if (operatorClicked === false && firstInputs.length > 0 && !(firstInputs.includes('-'))) {
        firstInputs.unshift('-');
        typedText.innerHTML = `${firstInputs.join('')}`;
    }
    /** Negate the last number if the number is typed after operator chosen and it exists */
    else if (operatorClicked === true && lastInputs.length > 0 && !(lastInputs.includes('-'))) {
        lastInputs.unshift('-');
        typedText.innerHTML = `${firstInputs.join('')} ${operator} (${lastInputs.join('')}`;
        calculate();
    }
    else if(firstInputs.includes('-') && operatorClicked === false){
        firstInputs.shift();
        typedText.innerHTML = `${firstInputs.join('')}`;
    }
    else if(lastInputs.includes('-') && operatorClicked === true){
        lastInputs.shift();
        typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
        calculate();
    }
})

document.querySelector('.reset').addEventListener('mousedown', () => {
    Reset();
})

for (i = 0; i < operators.length; i++) {
    /** Choosing operator upon click of operator buttons */
    operators[i].addEventListener('mousedown', (e) => {
        if (firstInputs.length >= 1 && firstInputs.join('') !== '0.' && firstInputs.join('') !== '-0.') {

            if(value.toFixed(2).length > 10){
                calculator.style.gridTemplateRows = '30% 5% 13% 13% 13% 13% 13%';
            }
            else{
                calculator.style.gridTemplateRows = '20% 5% 15% 15% 15% 15% 15%';
            }
            e.target.style.fontSize = '0.8em'
            operator = e.target.id;
            typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
            operatorClicked = true;
        }

        /** Value change here just defines that if the value has been changed from its initial value or not i.e if the calculator has been used even once before this 
         * current equation.
         * So it just resets the previous equation's numbers and push the value in first number
         */
        if (valueChanged === true) {
            lastInputs.length = 0;
            firstInputs.length = 0;
            firstInputs = Array.from(value.toFixed(2));
            typedText.innerHTML = `${firstInputs.join('')} ${operator}`
            resultText.innerHTML = '';
        }
    })
}

document.querySelector('.delete').addEventListener('mousedown', () => {
    Backspace();
})

for (i = 0; i < buttons.length; i++) {
    /** For the transition of font size on mouseup from button */
    buttons[i].addEventListener('mouseup', (e) => {
        e.target.style.fontSize = '2em'
    })
}

/** TLDR; If value changed is false normally take in keyboard inputs and calculate if its true , then reset calculator make the value changed false and
 * again make the calculator pick up the keyboard inputs.
 */
document.addEventListener('keydown', (e) => {
    Keyboard(e);
    if (firstInputs.length > 0 && valueChanged === false) {
        if (e.key === '*') {
            operator = 'x';
            typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
            operatorClicked = true;
        }
        else if (e.key === '-') {
            operator = '-';
            typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
            operatorClicked = true;
        }
        else if (e.key === '+') {
            operator = '+';
            typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
            operatorClicked = true;
        }
        else if (e.key === '/') {
            operator = '÷';
            typedText.innerHTML = `${firstInputs.join('')} ${operator} `;
            operatorClicked = true;
        }
        else if (e.key === '%') {
            percentage();
        }
        else if (e.key === 'c' || e.key === 'C' || e.key === 'Escape') {
            Reset();
        }
        else if(e.key === 'Enter' || e.key === '='){
            calculate();
            Equals();
        }
    }
    else if (valueChanged === true) {
        lastInputs.length = 0;
        operator = '';
        firstInputs = Array.from(value.toFixed(2));
        typedText.innerHTML = `${firstInputs.join('')}`;
        resultText.innerHTML = '';
        valueChanged = false;
        Keyboard(e);
    }
})

document.querySelector('.equal').addEventListener('mousedown', () => {
    Equals();
})
function calculate() {

    let firstNumber = parseFloat(firstInputs.join(''));
    let lastNumber = parseFloat(lastInputs.join(''));

    /** Value is not changed , so do the normal and basic calculating function */

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
            resultText.innerHTML = value;
            valueChanged = true;
        }
        else if (operator === '÷') {
            value = firstNumber / lastNumber;
            resultText.innerHTML = value;
            valueChanged = true;
        }
    }
    else {
        /** Same here but just first number is last value now 
         *  And for the percentage, It adds the first number and then add the temp value calculated before when % button was pressed
        */
        if (operator === '+') {
            value = firstNumber + lastNumber;
            resultText.innerHTML = value;
            if (lastInputs.includes('%')) {
                value = firstNumber + tempValue;
                resultText.innerHTML = value;
            }
        }
        else if (operator === '-') {
            value = firstNumber - lastNumber;
            resultText.innerHTML = value;
            if (lastInputs.includes('%')) {
                value = firstNumber - tempValue;
                resultText.innerHTML = value;
            }
        }
        else if (operator === 'x') {
            value = firstNumber * lastNumber;
            resultText.innerHTML = value;
            if (lastInputs.includes('%')) {
                value = firstNumber * tempValue;
                resultText.innerHTML = value;
            }
        }
        else if (operator === '÷') {
            value = firstNumber / lastNumber;
            resultText.innerHTML = value;
            if (lastInputs.includes('%')) {
                value = firstNumber / tempValue;
                resultText.innerHTML = value;
            }
        }
    }


    if (value === Infinity || value === NaN) {
        value = 'Infinity';
        resultText.innerHTML = '';
    }
}

function Reset() {
    /** Basically just reset everything (variable n' all) */
    typedText.innerHTML = '';
    resultText.innerHTML = '';
    firstInputs.length = 0;
    lastInputs.length = 0;
    value = 0;
    operator = '';
    operatorClicked = false;
    valueChanged = false;
    calculator.style.gridTemplateRows = '20% 5% 15% 15% 15% 15% 15%';
}

function Keyboard(e) {
    if (isFinite(e.key) || e.key === '.') {
        /** Build the number before operator while keeping max length and other necessary checks */
        if (operatorClicked === false && firstInputs.length <= 7 && firstInputs[firstInputs.length - 1] !== '%') {

            if (e.key === '.' && firstInputs.length < 1) {
                firstInputs[0] = 0;
                firstInputs.push(e.key);
                typedText.innerHTML = `${firstInputs.join('')}`;
            }
            else if (e.key === '.' && firstInputs.includes('.')) {
                return null;
            }
            else {
                firstInputs.push(e.key);
                typedText.innerHTML = `${firstInputs.join('')}`;

            }

        }
        /** Build the number after operator while keeping max length and other necessary checks */
        else if (operatorClicked === true && lastInputs.length <= 7 && lastInputs[lastInputs.length - 1] !== '%') {

            if (e.key === '.' && lastInputs.length < 1) {
                lastInputs[0] = 0;
                lastInputs.push(e.key);
                typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
            }
            else if (e.key === '.' && lastInputs.includes('.')) {
                return null;
            }
            else {
                lastInputs.push(e.key);
                typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
            }
        }
    }
}

function percentage() {
    let firstNumber = parseFloat(firstInputs.join(''));
    let lastNumber = parseFloat(lastInputs.join(''));

    /** Percentage for the 1st number and calculating it instantly */
    if (operatorClicked === false && firstInputs.length > 0) {

        if (firstInputs.includes('%')) {
            return null;
        }
        else {
            firstInputs.push('%');
            typedText.innerHTML = `${firstInputs.join('')}`;
            value = parseFloat((firstNumber / 100).toFixed(2));
            resultText.innerHTML = value;
            valueChanged = true;
        }
    }
    /** Puts the percentage value in the tempValue and then let it calculate whole equation in the calculate() function */
    else if (operatorClicked === true && lastInputs.length > 0) {

        if (lastInputs.includes('%')) {
            return null;
        }
        else {
            lastInputs.push('%')
            typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
            tempValue = parseFloat((lastNumber / 100).toFixed(2));
            resultText.innerHTML = value;
            valueChanged = true;
            calculate();
        }
    }
}

function Backspace() {
    /** To not go into operator's if statement */
    valueChanged = false;

    /** if pressing delete before choosing operator , negate from first number */
    if (operatorClicked === false && firstInputs.length > 0) {
        firstInputs.length -= 1;
        typedText.innerHTML = `${firstInputs.join('')} `;
    }
    /** if pressing delete after choosing operator , negate from last number */
    else if (lastInputs.length > 1) {
        lastInputs.length -= 1;
        typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
        calculate();
    }
    else if (lastInputs.length === 1) {
        lastInputs.length -= 1;
        typedText.innerHTML = `${firstInputs.join('')} ${operator} ${lastInputs.join('')}`;
        resultText.innerHTML = "";
    }
    /** If the last number dont exists and operator exists , pressing delete would clear the operator */
    else if (lastInputs.length === 0 && operatorClicked === true) {
        operatorClicked = false;
        operator = '';
        resultText.innerHTML = '';
        value = 0;
        typedText.innerHTML = `${firstInputs.join('')}`;
    }
}

function Equals() {
    let lastNumber = parseFloat(lastInputs.join(''));
    if(value === 'Infinity' || lastNumber === 0. && operator === '÷'){
        alert('Cant divide with zero');
        Reset();
    }
    else{
        firstInputs.length = 0;
        lastInputs.length = 0;
        operator = '';
        typedText.innerHTML = value.toFixed(2);
        resultText.innerHTML = '';
        firstInputs = Array.from(value.toFixed(2));
        operatorClicked = false;
        valueChanged = false;
    }
}