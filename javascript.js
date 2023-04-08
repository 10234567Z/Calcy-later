let numbers = document.querySelectorAll('.numbers');
let operators = document.querySelectorAll('.operator')
let typedText = document.querySelector('.typeText');
let firstNumber = [];
let lastNumber = [];
let operator;
let value;
let operatorClicked = false;
let percentageActive = false;

for (i = 0; i < numbers.length; i++) {
    numbers[i].addEventListener('click', (e) => {
        if (operatorClicked === false) {
            firstNumber.push(e.target.id);
            typedText.innerHTML = `${firstNumber.join('')}`;
            console.log(firstNumber.join(''));
        }
        else if(operatorClicked === true){
            
            lastNumber.push(e.target.id);
            typedText.innerHTML = `${firstNumber.join('')} ${operator} ${lastNumber.join('')}`;
            console.log(lastNumber.join(''));
            
        }
    })
}

document.querySelector('.reset').addEventListener('click', (e) => {
    document.querySelector('.typeText').innerHTML = '';
    firstNumber.length = 0;
})

for (i = 0; i < operators.length; i++) {
    operators[i].addEventListener('click', (e) => {
        operator = e.target.id;
        typedText.innerHTML = `${firstNumber.join('')} ${operator} `;
        operatorClicked = true;
    })
}
