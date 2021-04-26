const calcDisplay = document.querySelector('#calc-screen');
const numBtn = document.querySelectorAll('[data-num]');
const oprBtn = document.querySelectorAll('[data-opr]');
const clearBtn = document.querySelector('#btn-clr');
const deleteBtn = document.querySelector('#btn-del')
const equalsBtn = document.querySelector('#btn-equals')

let firstNum = '';
let secondNum = '';
let result = 0;
let selectedOpr = '';
let readyToClear = false;

clearBtn.addEventListener('click', clearButton);
deleteBtn.addEventListener('click', backspace);

numBtn.forEach((btn) => {
    btn.addEventListener("click", (val) => {
        if (readyToClear === true) {
            resetNum()
            readyToClear = false;
        }
        appendText(val.target.dataset.num);
    });
});

oprBtn.forEach((btn) => {
    btn.addEventListener("click", (val) => {
        selectOpr(val.target.dataset.opr);
    });
});

equalsBtn.addEventListener("click", equals)

// Operator Function
function add(a, b) {return a + b;} 
function subtract(a,b) {return a - b;}
function multiply(a,b) {return a * b;}
function divide(a,b) {return a / b;}

///////////////////////////////////

function operate(opr, a, b) {
    return window[opr](a, b);
}

function equals() {
    if (firstNum === '') return
    result = operate(selectedOpr, parseInt(secondNum), parseInt(firstNum));
    calcDisplay.value = result;
    firstNum = '';
    secondNum = '';
    readyToClear = true;
}

function resetNum() {
    calcDisplay.value = '';
    firstNum = '';
}

function clearButton() {
    calcDisplay.value = '';
    firstNum = '';
    selectedOpr = '';
    secondNum = '';
}

function appendText(val) {
    calcDisplay.value += val;
    firstNum += val;
}

function backspace() {
    calcDisplay.value = calcDisplay.value.slice(0, -1);
    firstNum = firstNum.slice(0, -1);
}

function selectOpr(val) {
    if(!selectedOpr){
        secondNum = firstNum;
        selectedOpr = val;
        readyToClear = true;
    }
    else {
        equals()
        secondNum = result
        selectedOpr = val;
        readyToClear = true;
    }
}