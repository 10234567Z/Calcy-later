let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator')
let typedText = document.querySelector('.typeText');
let firstNumber = [];
let lastNumber = [];
let operator;
let operatorClicked = false;
let percentageActive = false;

for (i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        let displayText = document.createTextNode(e.target.id);
        typedText.appendChild(displayText);
        firstNumber.push(e.target.id);
    })
}

document.querySelector('.reset').addEventListener('click', (e) => {
    document.querySelector('.typeText').innerHTML = '';
    firstNumber.length = 0;
})


for (i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', (e) => {
        operator = e.target.id;
        typedText.innerHTML = firstNumber + operator;
    })
}