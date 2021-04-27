const calcDisplay = document.querySelector('#calc-screen');
const numBtn = document.querySelectorAll('[data-num]');
const oprBtn = document.querySelectorAll('[data-opr]');
const clearBtn = document.querySelector('#btn-clr');
const deleteBtn = document.querySelector('#btn-del')
const equalsBtn = document.querySelector('#btn-equals')
const pointBtn = document.querySelector('[data-point]');

let inputNum = '';
let resultNum = '';
let resultInt = 0;
let selectedOpr = '';
let readyToClear = false;

deleteBtn.addEventListener('click', backspace);
clearBtn.addEventListener('click', clearAll);
pointBtn.addEventListener('click', appendPoint)

numBtn.forEach((btn) => {
    btn.addEventListener("click", (val) => {
        if (readyToClear === true) {
            resetDisplay();
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

equalsBtn.addEventListener("click", () => {
    equals();
    selectedOpr = '';
})

///////// Operator Function ////////
function add(a, b) {return a + b;} 
function subtract(a,b) {return a - b;}
function multiply(a,b) {return a * b;}
function divide(a,b) {return a / b;}
///////////////////////////////////

// Main Operate Function
function operate(opr, a, b) {
    return window[opr](a, b);
}

function equals() {
    if (!selectedOpr) return;
    resultInt = operate(selectedOpr, parseFloat(resultNum), parseFloat(inputNum));
    resultNum = resultInt.toString();
    calcDisplay.value = resultNum;
    inputNum = '';
    readyToClear = true;
}

function appendText(val) {
    calcDisplay.value += val;
    inputNum += val;
}

function appendPoint() {
    if(readyToClear) resetDisplay();
    if(calcDisplay.value === '') calcDisplay.value += 0;
    if(calcDisplay.value.includes('.')) return;
    calcDisplay.value += '.';
}

function backspace() {
    calcDisplay.value = calcDisplay.value.slice(0, -1);
    inputNum = inputNum.slice(0, -1);
}

function resetDisplay() {
    inputNum = '';
    calcDisplay.value = '';
}

function clearAll() {
    resetDisplay();
    resultInt = 0;
    resultNum = '';
    selectedOpr = '';
}

function selectOpr(opr) {
    if (selectedOpr) equals();
    if (inputNum) resultNum = inputNum;
    selectedOpr = opr;
    readyToClear = true;
}