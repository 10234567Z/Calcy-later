let firstInput = prompt('Write the First Number you want to add', '');
let operator = prompt('Write the Operator', '');
let lastInput = prompt('Write the Number', '');
let firstNumber = parseInt(firstInput);
let lastNumber = parseInt(lastInput);

function operate(operator,number1,number2){
    if (number1) {
        let value;
        if (operator === '+') {
            value = number1 + number2
        }
        else if (operator === '-') {
            value = number1 - number2
        }
        else if (operator === '*') {
            value = number1 * number2
        }
        else if (operator === '/') {
            vaue = number1 / number2
        }
        console.log(value);
    }
}

operate(operator,firstNumber,lastNumber);