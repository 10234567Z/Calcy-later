// let firstInput = prompt('Write the First Number you want to add', '');
// let operator = prompt('Write the Operator', '');
// let lastInput = prompt('Write the Number', '');
// let firstNumber = parseInt(firstInput);
// let lastNumber = parseInt(lastInput);

let numbers = document.querySelectorAll('.numbers');
let firstNumber = [];
let lastNumber = [];
let operator = '';

for(i = 0; i < numbers.length;i++){
    numbers[i].addEventListener('click',(e) => {
        let displayText = document.createTextNode(e.target.id);
        document.querySelector('.typeText').appendChild(displayText);
        firstNumber.push(e.target.id);
        console.log(firstNumber.join(''));
    })
}

// function operate(operator,number1,number2){
//     if (number1) {
//         let value;
//         if (operator === '+') {
//             value = number1 + number2
//         }
//         else if (operator === '-') {
//             value = number1 - number2
//         }
//         else if (operator === '*') {
//             value = number1 * number2
//         }
//         else if (operator === '/') {
//             vaue = number1 / number2
//         }
//         console.log(value);
//     }
// }

// operate(operator,firstNumber,lastNumber);



/** 1 2 3 4 5 6 7 8 9 0 .
 *  0 1 2 3 4 5 6 7 8 9 10
 */