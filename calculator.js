const calcDisplay = document.querySelector('#calc-screen');
const numBtn = document.querySelectorAll('[data-num]');
const oprBtn = document.querySelectorAll('[data-opr]');
const clearBtn = document.querySelector('#btn-clr');
const deleteBtn = document.querySelector('#btn-del')
const equalsBtn = document.querySelector('#btn-equals')
const pointBtn = document.querySelector('[data-point]');
const historyDisp = document.querySelector('#calc-history')

let inputNum = '';
let resultNum = '';
let resultInt = 0;
let selectedOpr = '';
let readyToClear = false;

deleteBtn.addEventListener('click', backspace);
clearBtn.addEventListener('click', clearAll);
pointBtn.addEventListener('click', appendPoint)

document.addEventListener("keydown", (e) => {
    resetDisplay();
    numpadInput(e);
    updateHistory()
})

numBtn.forEach((btn) => {
    btn.addEventListener("click", (val) => {
        resetDisplay();
        appendText(val.target.dataset.num);
        updateHistory()
    });
});

oprBtn.forEach((btn) => {
    btn.addEventListener("click", (val) => {
        selectOpr(val.target.dataset.opr);
        updateHistory();
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
    if (selectedOpr === 'divide' && inputNum === '0') {
        calcDisplay.value = "You can't divide by 0!";
        inputNum = '';
        readyToClear = true;
        return;
    }
    resultInt = operate(selectedOpr, parseFloat(resultNum), parseFloat(inputNum));
    resultNum = resultInt.toString();
    calcDisplay.value = resultNum;
    inputNum = '';
    readyToClear = true;
}

function appendText(val) {
    calcDisplay.value += val;
    inputNum += val;
    limitText();
}

function limitText() {
if (calcDisplay.value.length > 14) {
    calcDisplay.value = calcDisplay.value.slice(0, -1);  
        inputNum = inputNum.slice(0,-1);
    }
}

function appendPoint() {
    if(readyToClear) resetDisplay();
    if(calcDisplay.value === '') {
        calcDisplay.value += 0;
        inputNum += '0.';
    }
    if(calcDisplay.value.includes('.')) return;
    calcDisplay.value += '.';
}

function numpadInput(input) {
    let key = input.key;
    if (key === '.') {
        appendPoint();
    } else if (key === 'Backspace') {
        backspace();
    } else if (input.keyCode === 13) {
        input.preventDefault();
        equalsBtn.click();
    } else if (key >= 0 && key <= 9) {
        appendText(key);
    } else if (/[+-/*]/i.test(key)) {
        let convertedOpr = '';
        switch(key){
            case '+': convertedOpr = 'add'; break;
            case '-': convertedOpr = 'subtract'; break;
            case '*': convertedOpr = 'multiply'; break;
            case '/': convertedOpr = 'divide'; break;
        }
        selectOpr(convertedOpr);
    }
}
function backspace() {
    calcDisplay.value = calcDisplay.value.slice(0, -1);
    inputNum = inputNum.slice(0, -1);
}

function resetDisplay() {
    if (readyToClear === false) return;
    inputNum = '';
    calcDisplay.value = '';
    historyDisp.innerHTML = '';
    readyToClear = false;
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

function updateHistory(){
    let opr = '';
    switch(selectedOpr) {
        case 'add': 
            opr = '+';
            break;
        case 'subtract':
            opr = '-';
            break;
        case 'multiply':
            opr = '*';
            break;
        case 'divide': 
            opr = '/';
            break;
    }
    historyDisp.innerHTML = `${resultNum} ${opr} ${inputNum}`;
}